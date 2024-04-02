import { useState } from 'react'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addReview, removeReview } from '../store/actions/review.action'

export function ToyReview({ toy, toyReviews }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [review, setReview] = useState('')

  function handleChange({ target }) {
    const { value } = target
    setReview(value)
  }

  async function onAddReview(ev) {
    ev.preventDefault()

    try {
      await addReview(review, toy._id)
      showSuccessMsg('Review added')
      setReview('')
    } catch (err) {
      console.error('Had issues in adding msg', err)
      showErrorMsg('Had issues in adding your message')
    }
  }

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review deleted')
    } catch (err) {
      console.error('Had issues in removing review', err)
      showErrorMsg('Had issues in removing your')
    }
  }

  return (
    <section className="toy-review">
      {user && (
        <form className="flex">
          <input
            type="text"
            name="review"
            className="review-input"
            placeholder="Your review"
            value={review}
            onChange={handleChange}
            required
            maxLength={30}
          />

          <button className="btn-add-review" onClick={onAddReview}>
            Add
          </button>
        </form>
      )}

      <h3 className="reviews-title">Toys Reviews:</h3>

      {toyReviews && !!toyReviews.length && (
        <ul className="flex column clean-list">
          {toyReviews.map(review => (
            <li key={`${review._id}`} className="toy-review flex align-center">
              <p className="review-txt">
                {review?.txt}
                <span className="review-by">({review?.byUser?.nickname || user.fullname})</span>
              </p>

              {/* The new  review added to the store is not in it's aggregation state, therefore it's not has byUser.nickname
              Still not perfect, but if it's not defined, using the loggedin user instead (he's has to be the one who added the new)
              */}

              {user && (user._id === review?.byUser?._id || user.isAdmin) && (
                <button
                  className="btn-remove-msg"
                  onClick={() => onRemoveReview(review._id)}
                ></button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!toyReviews.length && <p className="no-reviews">Be the first to add a review</p>}
    </section>
  )
}
