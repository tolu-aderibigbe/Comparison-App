
export default function Dropdown({
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}) {
  return (
    <div className="dropdown-wrapper">
      <button
        className="sorting-button"
        onClick={onToggle}
      >
        {value}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-item ${
                value === option ? 'selected' : ''
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
