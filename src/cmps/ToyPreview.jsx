export function ToyPreview({ toy }) {
  function getIsInStock(toy) {
    if (toy.inStock) return 'In stock'
    else return 'Out of stock'
  }

  return (
    <section className="toy-preview flex align-center">
      <h4 className="toy-name">{toy.name}</h4>

      <p className="toy-price">
        Price: <span>${toy.price}</span>
      </p>

      <p className="toy-stock">{getIsInStock(toy)}</p>
    </section>
  )
}
