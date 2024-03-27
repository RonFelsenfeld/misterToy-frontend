import { BranchesMap } from '../cmps/BranchesMap'

export function About() {
  return (
    <section className="about">
      <h1 className="about-title">About us:</h1>
      <h3 className="greet">Hi there!</h3>

      <div className="about-desc flex column">
        <p>MisterToy is one of the most popular and top-rated toys store in Israel. </p>
        <p>Our motivation is to give you the best service for the lowest price. </p>
        <p>You can find us at our branches, take a look at the map below:</p>
      </div>

      <BranchesMap />

      <h4 className="greet">We are waiting for you!</h4>
    </section>
  )
}
