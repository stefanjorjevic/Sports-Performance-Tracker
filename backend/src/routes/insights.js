import { Router } from "express";
import { createAllPlayerInsights } from "../services/insightService.js";
import { getPlayers } from "../services/playerStorage.js";

const router = Router();

router.get("/", async (request, response, next) => {
  try {
    const players = await getPlayers();
    const insights = createAllPlayerInsights(players);
    response.json(insights);
  } catch (error) {
    next(error);
  }
});

export default router;
