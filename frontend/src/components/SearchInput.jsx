function SearchInput({ searchTerm, onSearchChange }) {
  return (
    <div className="search-field">
      <label htmlFor="player-search">Search players</label>
      <input
        id="player-search"
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name, position, or status"
      />
    </div>
  );
}

export default SearchInput;
