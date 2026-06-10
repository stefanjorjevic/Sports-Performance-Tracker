export function createPlayerInsights(player) {
  const recommendations = [];

  if (player.attendancePercentage < 60) {
    recommendations.push(
      "Attendance is low. This player may need follow-up."
    );
  }

  if (player.fitnessScore < 5) {
    recommendations.push(
      "Fitness score is low. Consider extra conditioning work."
    );
  }

  if (
    player.attendancePercentage > 85 &&
    player.fitnessScore > 8
  ) {
    recommendations.push("Strong performance and consistency.");
  }

  if (player.status === "Injured") {
    recommendations.push(
      "Player is injured. Avoid high-intensity training."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Performance is stable. Continue monitoring regular progress."
    );
  }

  return recommendations;
}

export function createAllPlayerInsights(players) {
  return players.map((player) => ({
    playerId: player.id,
    playerName: player.name,
    recommendations: createPlayerInsights(player)
  }));
}
