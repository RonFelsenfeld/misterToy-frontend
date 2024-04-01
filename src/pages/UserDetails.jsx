import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadReviews } from '../store/actions/review.action'

export function UserDetails() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const userReviews = useSelector(storeState => storeState.reviewModule.reviews)

  console.log(userReviews)

  useEffect(() => {
    loadReviews({ userId: user._id })
  }, [])

  return (
    <section className="user-details">
      <h1 className="profile-title">User Profile</h1>

      <div className="details-container flex column">
        <h3 className="details-title">User's Details</h3>

        <h2 className="user-name">
          Full name: <span>{user.fullname}</span>
        </h2>
        <h2 className="user-id">
          ID: <span>{user._id}</span>
        </h2>
      </div>

      <div className="reviews-container flex column">
        <h3 className="reviews-title">User's reviews</h3>

        {userReviews && !!userReviews.length && (
          <ul className="flex column clean-list">
            {userReviews.map(review => (
              <li key={`${review._id}`} className="user-review flex align-center">
                <p className="review-txt">
                  {review?.txt}
                  <span className="review-toy">({review?.aboutToy?.name})</span>
                </p>
              </li>
            ))}
          </ul>
        )}

        {!userReviews.length && <p className="no-reviews">-No reviews-</p>}
      </div>
    </section>
  )
}
