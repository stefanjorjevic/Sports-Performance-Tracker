import express from "express";
import cors from "cors";
import playersRouter from "./routes/players.js";
import insightsRouter from "./routes/insights.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({ message: "Sports tracker API is running." });
});

app.use("/api/players", playersRouter);
app.use("/api/insights", insightsRouter);

app.use((request, response) => {
  response.status(404).json({ message: "API route not found." });
});

app.use((error, request, response, next) => {
  console.error(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).json({ message: "Request body contains invalid JSON." });
  }

  return response.status(500).json({
    message: "An unexpected server error occurred."
  });
});

app.listen(port, () => {
  console.log(`Sports tracker API is running on http://localhost:${port}`);
});
