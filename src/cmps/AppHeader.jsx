import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <section className="app-header flex align-center justify-between">
      <h1 className="main-title">Mister Toy</h1>

      <nav className="main-nav flex align-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/toy">Toys</NavLink>
      </nav>
    </section>
  )
}