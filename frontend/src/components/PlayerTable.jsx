function PlayerTable({ players, onEdit, onDelete, deletingPlayerId }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Age</th>
            <th>Position</th>
            <th>Attendance</th>
            <th>Fitness</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="player-name" data-label="Player">
                {player.name}
              </td>
              <td data-label="Age">{player.age}</td>
              <td data-label="Position">{player.position}</td>
              <td data-label="Attendance">{player.attendancePercentage}%</td>
              <td data-label="Fitness">{player.fitnessScore}/10</td>
              <td data-label="Status">
                <span className={`status-badge status-${player.status.toLowerCase()}`}>
                  {player.status}
                </span>
              </td>
              <td data-label="Actions">
                <div className="table-actions">
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => onEdit(player)}
                    disabled={deletingPlayerId === player.id}
                    aria-label={`Edit ${player.name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="text-button danger-button"
                    type="button"
                    onClick={() => onDelete(player)}
                    disabled={deletingPlayerId === player.id}
                    aria-label={`Delete ${player.name}`}
                  >
                    {deletingPlayerId === player.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {players.length === 0 && (
        <p className="empty-message">No players match your search.</p>
      )}
    </div>
  );
}

export default PlayerTable;
