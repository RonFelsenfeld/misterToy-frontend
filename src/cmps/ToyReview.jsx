import { useState } from 'react'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addReview } from '../store/actions/review.action'

export function ToyReview({ toy, setToy }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  const [review, setReview] = useState('')

  function handleChange({ target }) {
    const { value } = target
    setReview(value)
  }

  async function onAddReview(ev) {
    ev.preventDefault()

    try {
      const savedReview = await addReview(review, toy._id)
      showSuccessMsg('Review added')
      setReview('')
    } catch (err) {
      console.error('Had issues in adding msg', err)
      showErrorMsg('Had issues in adding your message')
    }
  }

  return (
    <section className="toy-review">
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

      <h3 className="reviews-title">Toys Reviews:</h3>

      <p className="no-reviews">Be the first to add a review</p>
    </section>
  )
}
