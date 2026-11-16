
import Dropdown from './Dropdown'

export default function FilterBar({
  filterType,
  sortBy,
  showTypeDropdown,
  showSortDropdown,
  onToggleTypeDropdown,
  onToggleSortDropdown,
  onSelectFilterType,
  onSelectSortBy,
  onReset,
  filterTypes,
  sortOptions,
}) {
  return (
    <div className="sorting-bar">
      <div className="left-side-bar">
        <div className="type-class">
          <p className="by">Filter by type</p>

          <Dropdown
            value={filterType}
            options={filterTypes}
            isOpen={showTypeDropdown}
            onToggle={onToggleTypeDropdown}
            onSelect={onSelectFilterType}
          />
        </div>

        <div className="price-class">
          <p className="by">Sort by</p>

          <Dropdown
            value={sortBy}
            options={sortOptions}
            isOpen={showSortDropdown}
            onToggle={onToggleSortDropdown}
            onSelect={onSelectSortBy}
          />
        </div>
      </div>

      <div className="right-side-bar">
        <button
          className="reset-button"
          onClick={onReset}
        >
          Reset Filter
        </button>
      </div>
    </div>
  )
}
