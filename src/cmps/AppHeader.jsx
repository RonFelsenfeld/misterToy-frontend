import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  return (
    <section className="app-header main-layout full">
      <div className="flex align-center justify-between">
        <h1 className="main-title ">Mister Toy</h1>

        <nav className="main-nav flex align-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/toy">Shop</NavLink>

          {user && user.isAdmin && <NavLink to="/dashboard">Dashboard</NavLink>}
          {!user && <NavLink to="/login">Login</NavLink>}
        </nav>
      </div>
    </section>
  )
}
