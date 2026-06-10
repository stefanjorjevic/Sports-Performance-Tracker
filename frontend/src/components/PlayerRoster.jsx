import PlayerTable from "./PlayerTable.jsx";
import SearchInput from "./SearchInput.jsx";

function PlayerRoster({
  players,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
  deletingPlayerId
}) {
  return (
    <section className="panel roster-panel">
      <div className="panel-heading roster-heading">
        <div>
          <p className="eyebrow">Academy roster</p>
          <div className="title-with-count">
            <h2>Players</h2>
            <span>{players.length} shown</span>
          </div>
        </div>
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>

      <PlayerTable
        players={players}
        onEdit={onEdit}
        onDelete={onDelete}
        deletingPlayerId={deletingPlayerId}
      />
    </section>
  );
}

export default PlayerRoster;
