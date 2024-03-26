export function ToyPreview({ toy, onRemoveToy }) {
  function getIsInStock(toy) {
    if (toy.inStock) return 'In stock'
    else return 'Out of stock'
  }

  return (
    <section className="toy-preview flex column align-center">
      <h4 className="toy-name">{toy.name}</h4>

      <div className="toy-desc-container flex column">
        <p className="toy-price">
          Price: <span>${toy.price}</span>
        </p>
        <p className="toy-stock">{getIsInStock(toy)}</p>
      </div>

      <button className="btn-remove" onClick={() => onRemoveToy(toy._id)}>
        Remove
      </button>
    </section>
  )
}
