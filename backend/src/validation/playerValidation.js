const allowedPositions = [
  "Forward",
  "Midfielder",
  "Defender",
  "Goalkeeper"
];

const allowedStatuses = ["Active", "Injured", "Inactive"];

export function validatePlayer(player) {
  if (!player || typeof player !== "object" || Array.isArray(player)) {
    return ["Request body must be a player object."];
  }

  const errors = [];

  if (typeof player.name !== "string" || player.name.trim().length < 2) {
    errors.push("Name must contain at least 2 characters.");
  }

  if (!Number.isInteger(player.age) || player.age < 5 || player.age > 60) {
    errors.push("Age must be a whole number between 5 and 60.");
  }

  if (!allowedPositions.includes(player.position)) {
    errors.push(`Position must be one of: ${allowedPositions.join(", ")}.`);
  }

  if (
    typeof player.attendancePercentage !== "number" ||
    player.attendancePercentage < 0 ||
    player.attendancePercentage > 100
  ) {
    errors.push("Attendance percentage must be between 0 and 100.");
  }

  if (
    typeof player.fitnessScore !== "number" ||
    player.fitnessScore < 1 ||
    player.fitnessScore > 10
  ) {
    errors.push("Fitness score must be between 1 and 10.");
  }

  if (!allowedStatuses.includes(player.status)) {
    errors.push(`Status must be one of: ${allowedStatuses.join(", ")}.`);
  }

  return errors;
}

export function normalizePlayer(player) {
  return {
    name: player.name.trim(),
    age: player.age,
    position: player.position,
    attendancePercentage: player.attendancePercentage,
    fitnessScore: player.fitnessScore,
    status: player.status
  };
}
