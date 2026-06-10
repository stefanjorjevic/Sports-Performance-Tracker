import MetricCard from "./MetricCard.jsx";

function DashboardMetrics({ players }) {
  const activePlayers = players.filter(
    (player) => player.status === "Active"
  ).length;

  const totalAttendance = players.reduce(
    (sum, player) => sum + player.attendancePercentage,
    0
  );
  const totalFitness = players.reduce(
    (sum, player) => sum + player.fitnessScore,
    0
  );

  const averageAttendance =
    players.length > 0 ? Math.round(totalAttendance / players.length) : 0;
  const averageFitness =
    players.length > 0 ? (totalFitness / players.length).toFixed(1) : "0.0";

  return (
    <section className="metrics-grid" aria-label="Dashboard metrics">
      <MetricCard
        label="Total active players"
        value={activePlayers}
        tone="players"
      />
      <MetricCard
        label="Average attendance"
        value={averageAttendance}
        detail="%"
        tone="attendance"
      />
      <MetricCard
        label="Average fitness score"
        value={averageFitness}
        detail="/10"
        tone="fitness"
      />
    </section>
  );
}

export default DashboardMetrics;
