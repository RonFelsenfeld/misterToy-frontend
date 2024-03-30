import { Link } from 'react-router-dom'

import homePageImg from '../assets/img/home-page-img.png'

export function HomePage() {
  return (
    <section className="home-page flex align-center">
      <div className="welcome-container">
        <h1 className="main-title">Welcome to Mister Toy!</h1>
        <h3 className="secondary-title">The place for you to discover the Magic of Playtime.</h3>
        <Link to="/toy">
          <button className="btn-cta flex align-center">Start shopping</button>
        </Link>
      </div>

      <img src={homePageImg} alt="Kids playing" />
    </section>
  )
}
