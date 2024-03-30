import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  function getIsInStock(toy) {
    if (toy.inStock) return 'In stock'
    return 'Out of stock'
  }

  function getStockClass(toy) {
    if (!toy.inStock) return 'out-stock'
    return ''
  }

  return (
    <article className="toy-preview flex column">
      <Link to={`/toy/${toy._id}`}>
        <h4 className="toy-name">{toy.name}</h4>

        <div className="toy-desc-container flex column align-center">
          <p className="toy-price">${toy.price}</p>
          <p className={`toy-stock ${getStockClass(toy)}`}>{getIsInStock(toy)}</p>
        </div>

        <img className="toy-img" src={`https://robohash.org/${toy.name}?set=set1`} alt="" />
      </Link>

      <div className="actions-container flex justify-center">
        {user && user.isAdmin && (
          <>
            <button className="btn remove" onClick={() => onRemoveToy(toy._id)}></button>

            <Link to={`/toy/edit/${toy._id}`}>
              <button className="btn edit"></button>
            </Link>
          </>
        )}
      </div>
    </article>
  )
}
