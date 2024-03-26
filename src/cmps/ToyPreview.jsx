import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
  function getIsInStock(toy) {
    if (toy.inStock) return 'In stock'
    return 'Out of stock'
  }

  return (
    <section className="toy-preview flex column align-center">
      <h4 className="toy-name">{toy.name}</h4>

      <div className="toy-desc-container flex column align-center">
        <p className="toy-price">
          Price: <span>${toy.price}</span>
        </p>
        <p className="toy-stock">{getIsInStock(toy)}</p>
      </div>

      <div className="actions-container flex">
        <button className="btn" onClick={() => onRemoveToy(toy._id)}>
          Remove
        </button>

        <Link to={`/toy/${toy._id}`}>
          <button className="btn">Details</button>
        </Link>
      </div>
    </section>
  )
}
