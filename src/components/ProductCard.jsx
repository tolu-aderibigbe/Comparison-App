
export default function ProductCard({ item }) {
  return (
    <div className="card">
      <img
        className="image"
        src={item.image}
        alt={item.service}
      />

      <div className="card-description">
        <div className="card-section1">
          <p className="cancellation-detail">
            {item.cancellation}
          </p>

          <p className="reviews">
            <span className="star">&#9733;</span>
            <span className="rating">{item.rating}</span>
            <span className="no-of-review">
              ({item.reviews})
            </span>
          </p>
        </div>

        <div className="card-section2">
          <p className="service">{item.service}</p>
        </div>

        <div className="card-section3">
          <p className="card-code">{item.category}</p>
        </div>

        <div className="card-section4">
          <p className="service-description">
            {item.description}
          </p>
        </div>

        <div className="card-section5">
          <span className="price">
            £{item.price.toFixed(2)}
          </span>
          <span className="trip">per trip</span>
        </div>

        <div className="card-section6">
          <p className="brand">{item.brand}</p>
        </div>
      </div>

      <div className="convenience-level">
        <p>Convenience</p>

        <div className="rating-wrapper">
          <div className="rating-bar">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className={
                  i < item.convenience
                    ? 'segment-filled'
                    : 'segment-unfilled'
                }
              ></span>
            ))}
          </div>

          <span className="card-rating">
            {item.convenience}/10
          </span>
        </div>
      </div>

      <div className="card-section7">
        <button className="view-details-button">
          View Details
        </button>
      </div>
    </div>
  )
}
