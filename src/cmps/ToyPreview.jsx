import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
  function getIsInStock(toy) {
    if (toy.inStock) return 'In stock'
    return 'Out of stock'
  }

  function getStockClass(toy) {
    if (!toy.inStock) return 'out-stock'
    return ''
  }

  return (
    <article className="toy-preview flex column align-center">
      <h4 className="toy-name">{toy.name}</h4>

      <div className="toy-desc-container flex column align-center">
        <p className="toy-price">${toy.price}</p>
        <p className={`toy-stock ${getStockClass(toy)}`}>{getIsInStock(toy)}</p>
      </div>

      <img className="toy-img" src={`https://robohash.org/${toy.name}?set=set1`} alt="" />

      <div className="actions-container flex">
        <button className="btn remove" onClick={() => onRemoveToy(toy._id)}></button>

        <Link to={`/toy/${toy._id}`}>
          <button className="btn details"></button>
        </Link>

        <Link to={`/toy/edit/${toy._id}`}>
          <button className="btn edit"></button>
        </Link>
      </div>
    </article>
  )
}
