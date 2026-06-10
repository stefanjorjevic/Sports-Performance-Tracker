import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const playersFileUrl = new URL("../../data/players.json", import.meta.url);
const playersFilePath = fileURLToPath(playersFileUrl);

export async function getPlayers() {
  const fileContent = await readFile(playersFilePath, "utf-8");
  return JSON.parse(fileContent);
}

export async function savePlayers(players) {
  const formattedPlayers = JSON.stringify(players, null, 2);
  await writeFile(playersFilePath, `${formattedPlayers}\n`, "utf-8");
}
