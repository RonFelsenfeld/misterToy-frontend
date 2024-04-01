import { reviewService } from '../../services/review.service.js'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from '../reducers/review.reducer.js'
import { store } from '../store.js'

// Command Creators
export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}

export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}

export async function loadReviews() {
  try {
    const reviews = await reviewService.query()
    store.dispatch({ type: SET_REVIEWS, reviews })
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(txt, aboutToyId) {
  try {
    const addedReview = await reviewService.add({ txt, aboutToyId })
    store.dispatch(getActionAddReview(addedReview))
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}
