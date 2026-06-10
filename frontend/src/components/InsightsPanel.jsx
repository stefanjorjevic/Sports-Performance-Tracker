function InsightsPanel({ insights }) {
  return (
    <section className="panel insights-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Rule-based analysis</p>
          <h2>Performance insights</h2>
        </div>
      </div>

      <div className="insights-list">
        {insights.map((insight) => (
          <article className="insight-card" key={insight.playerId}>
            <h3>{insight.playerName}</h3>
            <ul>
              {insight.recommendations.map((recommendation) => (
                <li key={recommendation}>{recommendation}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {insights.length === 0 && (
        <p className="empty-message">Add a player to generate insights.</p>
      )}
    </section>
  );
}

export default InsightsPanel;
