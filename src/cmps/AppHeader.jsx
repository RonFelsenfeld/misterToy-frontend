import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <section className="app-header main-layout full">
      <div className="flex align-center justify-between">
        <h1 className="main-title ">Mister Toy</h1>

        <nav className="main-nav flex align-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </div>
    </section>
  )
}
