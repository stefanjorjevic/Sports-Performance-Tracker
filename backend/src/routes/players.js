import { Router } from "express";
import { randomUUID } from "node:crypto";
import { getPlayers, savePlayers } from "../services/playerStorage.js";
import {
  normalizePlayer,
  validatePlayer
} from "../validation/playerValidation.js";

const router = Router();

router.get("/", async (request, response, next) => {
  try {
    const players = await getPlayers();
    response.json(players);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const validationErrors = validatePlayer(request.body);

    if (validationErrors.length > 0) {
      return response.status(400).json({
        message: "Player data is invalid.",
        errors: validationErrors
      });
    }

    const players = await getPlayers();
    const newPlayer = {
      id: randomUUID(),
      ...normalizePlayer(request.body)
    };

    players.push(newPlayer);
    await savePlayers(players);

    return response.status(201).json(newPlayer);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const validationErrors = validatePlayer(request.body);

    if (validationErrors.length > 0) {
      return response.status(400).json({
        message: "Player data is invalid.",
        errors: validationErrors
      });
    }

    const players = await getPlayers();
    const playerIndex = players.findIndex(
      (player) => player.id === request.params.id
    );

    if (playerIndex === -1) {
      return response.status(404).json({ message: "Player not found." });
    }

    const updatedPlayer = {
      id: players[playerIndex].id,
      ...normalizePlayer(request.body)
    };

    players[playerIndex] = updatedPlayer;
    await savePlayers(players);

    return response.json(updatedPlayer);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const players = await getPlayers();
    const playerExists = players.some(
      (player) => player.id === request.params.id
    );

    if (!playerExists) {
      return response.status(404).json({ message: "Player not found." });
    }

    const remainingPlayers = players.filter(
      (player) => player.id !== request.params.id
    );

    await savePlayers(remainingPlayers);
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;
