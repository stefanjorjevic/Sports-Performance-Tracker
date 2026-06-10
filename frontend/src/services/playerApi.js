const apiBaseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function sendRequest(path, options = {}) {
  const headers = { ...options.headers };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    const validationDetails = data.errors?.join(" ");
    throw new Error(validationDetails || data.message || "Request failed.");
  }

  return data;
}

export function getPlayers() {
  return sendRequest("/players");
}

export function getInsights() {
  return sendRequest("/insights");
}

export function createPlayer(player) {
  return sendRequest("/players", {
    method: "POST",
    body: JSON.stringify(player)
  });
}

export function updatePlayer(playerId, player) {
  return sendRequest(`/players/${playerId}`, {
    method: "PUT",
    body: JSON.stringify(player)
  });
}

export function deletePlayer(playerId) {
  return sendRequest(`/players/${playerId}`, {
    method: "DELETE"
  });
}
