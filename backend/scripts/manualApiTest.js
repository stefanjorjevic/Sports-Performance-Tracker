import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const testPort = 3101;
const apiUrl = `http://localhost:${testPort}/api`;
const playersFileUrl = new URL("../data/players.json", import.meta.url);

function check(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function waitForServer() {
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      const response = await fetch(`${apiUrl}/health`);

      if (response.ok) {
        return;
      }
    } catch {
      // The server may need a short moment before it accepts requests.
    }

    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  throw new Error("The test server did not start in time.");
}

async function sendJsonRequest(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const body = response.status === 204 ? null : await response.json();
  return { response, body };
}

function reportTest(name) {
  console.log(`PASS: ${name}`);
}

const originalPlayersData = await readFile(playersFileUrl, "utf-8");
const serverProcess = spawn("node", ["src/server.js"], {
  cwd: new URL("../", import.meta.url),
  env: {
    ...process.env,
    PORT: String(testPort)
  },
  stdio: "ignore"
});

try {
  await waitForServer();

  const healthResult = await sendJsonRequest("/health");
  check(healthResult.response.status === 200, "Health route should return 200.");
  reportTest("GET /api/health");

  const playersResult = await sendJsonRequest("/players");
  check(playersResult.response.status === 200, "Players route should return 200.");
  check(Array.isArray(playersResult.body), "Players response should be an array.");
  check(playersResult.body.length === 4, "Sample data should contain 4 players.");
  reportTest("GET /api/players");

  const newPlayerData = {
    name: "Test Player",
    age: 17,
    position: "Forward",
    attendancePercentage: 90,
    fitnessScore: 8.5,
    status: "Active"
  };

  const createResult = await sendJsonRequest("/players", {
    method: "POST",
    body: JSON.stringify(newPlayerData)
  });
  check(createResult.response.status === 201, "Create route should return 201.");
  check(typeof createResult.body.id === "string", "Created player should have an ID.");
  const createdPlayerId = createResult.body.id;
  reportTest("POST /api/players");

  const updatedPlayerData = {
    ...newPlayerData,
    attendancePercentage: 55,
    fitnessScore: 4.5,
    status: "Injured"
  };

  const updateResult = await sendJsonRequest(`/players/${createdPlayerId}`, {
    method: "PUT",
    body: JSON.stringify(updatedPlayerData)
  });
  check(updateResult.response.status === 200, "Update route should return 200.");
  check(
    updateResult.body.status === "Injured",
    "Updated player status should be saved."
  );
  reportTest("PUT /api/players/:id");

  const insightsResult = await sendJsonRequest("/insights");
  check(insightsResult.response.status === 200, "Insights route should return 200.");
  const testPlayerInsight = insightsResult.body.find(
    (insight) => insight.playerId === createdPlayerId
  );
  check(testPlayerInsight, "Insights should include the test player.");
  check(
    testPlayerInsight.recommendations.length === 3,
    "Low attendance, low fitness, and injury should create 3 recommendations."
  );
  reportTest("GET /api/insights");

  const invalidResult = await sendJsonRequest("/players", {
    method: "POST",
    body: JSON.stringify({
      ...newPlayerData,
      age: 3,
      status: "Unknown"
    })
  });
  check(invalidResult.response.status === 400, "Invalid player should return 400.");
  check(
    invalidResult.body.errors.length === 2,
    "Invalid player should return useful validation errors."
  );
  reportTest("POST validation error");

  const missingPlayerResult = await sendJsonRequest("/players/missing-player", {
    method: "PUT",
    body: JSON.stringify(newPlayerData)
  });
  check(
    missingPlayerResult.response.status === 404,
    "Updating a missing player should return 404."
  );
  reportTest("PUT missing player");

  const malformedJsonResponse = await fetch(`${apiUrl}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: "{\"name\":"
  });
  check(
    malformedJsonResponse.status === 400,
    "Malformed JSON should return 400."
  );
  reportTest("Malformed JSON error");

  const deleteResult = await sendJsonRequest(`/players/${createdPlayerId}`, {
    method: "DELETE"
  });
  check(deleteResult.response.status === 204, "Delete route should return 204.");
  reportTest("DELETE /api/players/:id");

  const secondDeleteResult = await sendJsonRequest(
    `/players/${createdPlayerId}`,
    { method: "DELETE" }
  );
  check(
    secondDeleteResult.response.status === 404,
    "Deleting a missing player should return 404."
  );
  reportTest("DELETE missing player");

  const unknownRouteResult = await sendJsonRequest("/unknown");
  check(
    unknownRouteResult.response.status === 404,
    "Unknown API route should return 404."
  );
  reportTest("Unknown API route");

  console.log("\nAll manual API checks passed.");
} finally {
  serverProcess.kill();
  await writeFile(playersFileUrl, originalPlayersData, "utf-8");
}
