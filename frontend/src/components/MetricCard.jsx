function MetricCard({ label, value, detail, tone }) {
  return (
    <article className={`metric-card metric-card-${tone}`}>
      <span className="metric-accent" aria-hidden="true" />
      <p className="metric-label">{label}</p>
      <p className="metric-value">
        {value}
        {detail && <span className="metric-detail">{detail}</span>}
      </p>
    </article>
  );
}

export default MetricCard;
