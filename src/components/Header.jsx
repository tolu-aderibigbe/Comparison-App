
export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <div className="header">
      <button className="logo">TX.</button>
      <button className="header-content">Airport extras</button>
      <button className="header-content">Travel Insurance</button>
      <button className="header-content">Other Extras</button>

      <div className="search">
        <span className="material-symbols-outlined">search</span>
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button className="header-content">Log in</button>
      <button className="header-content">Sign Up</button>
      <button className="header-content2">Get Started</button>
      <button className="header-content3">Support</button>
    </div>
  )
}
