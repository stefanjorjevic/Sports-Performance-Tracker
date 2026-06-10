import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardMetrics from "./components/DashboardMetrics.jsx";
import InsightsPanel from "./components/InsightsPanel.jsx";
import PlayerForm from "./components/PlayerForm.jsx";
import PlayerRoster from "./components/PlayerRoster.jsx";
import {
  createPlayer,
  deletePlayer,
  getInsights,
  getPlayers,
  updatePlayer
} from "./services/playerApi.js";

function App() {
  const [players, setPlayers] = useState([]);
  const [insights, setInsights] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingPlayerId, setDeletingPlayerId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [loadedPlayers, loadedInsights] = await Promise.all([
        getPlayers(),
        getInsights()
      ]);

      setPlayers(loadedPlayers);
      setInsights(loadedInsights);
    } catch (error) {
      setErrorMessage(`Could not load dashboard data. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const filteredPlayers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return players;
    }

    return players.filter((player) => {
      const searchableText =
        `${player.name} ${player.position} ${player.status}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [players, searchTerm]);

  async function refreshInsights() {
    try {
      const updatedInsights = await getInsights();
      setInsights(updatedInsights);
    } catch (error) {
      setErrorMessage(
        `Player data changed, but insights could not refresh. ${error.message}`
      );
    }
  }

  async function handleSavePlayer(playerData) {
    setIsSaving(true);
    setErrorMessage("");

    try {
      if (playerData.id) {
        const { id, ...playerDetails } = playerData;
        const updatedPlayer = await updatePlayer(id, playerDetails);

        setPlayers((currentPlayers) =>
          currentPlayers.map((player) =>
            player.id === id ? updatedPlayer : player
          )
        );
        setPlayerToEdit(null);
      } else {
        const createdPlayer = await createPlayer(playerData);
        setPlayers((currentPlayers) => [...currentPlayers, createdPlayer]);
      }

      await refreshInsights();
      return true;
    } catch (error) {
      setErrorMessage(`Could not save player. ${error.message}`);
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeletePlayer(player) {
    const shouldDelete = window.confirm(
      `Delete ${player.name} from the roster?`
    );

    if (!shouldDelete) {
      return;
    }

    setDeletingPlayerId(player.id);
    setErrorMessage("");

    try {
      await deletePlayer(player.id);
      setPlayers((currentPlayers) =>
        currentPlayers.filter(
          (currentPlayer) => currentPlayer.id !== player.id
        )
      );

      if (playerToEdit?.id === player.id) {
        setPlayerToEdit(null);
      }

      await refreshInsights();
    } catch (error) {
      setErrorMessage(`Could not delete player. ${error.message}`);
    } finally {
      setDeletingPlayerId(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Football academy dashboard</p>
          <h1>Sports Performance Tracker</h1>
          <p className="page-description">
            Track player attendance, fitness, status, and simple coaching
            recommendations.
          </p>
        </div>
        <span className="connection-badge">Express API</span>
      </header>

      {errorMessage && (
        <div className="message error-message" role="alert">
          <span>{errorMessage}</span>
          <button type="button" onClick={loadDashboardData}>
            Reload data
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="message loading-message" role="status">
          Loading players and insights...
        </div>
      ) : (
        <>
          <DashboardMetrics players={players} />

          <main className="dashboard-layout">
            <PlayerForm
              playerToEdit={playerToEdit}
              onSave={handleSavePlayer}
              onCancelEdit={() => setPlayerToEdit(null)}
              isSaving={isSaving}
            />
            <PlayerRoster
              players={filteredPlayers}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEdit={setPlayerToEdit}
              onDelete={handleDeletePlayer}
              deletingPlayerId={deletingPlayerId}
            />
          </main>

          <InsightsPanel insights={insights} />
        </>
      )}
    </div>
  );
}

export default App;
