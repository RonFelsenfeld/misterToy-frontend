import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function getMenuClass() {
    return isMenuOpen ? 'menu-open' : ''
  }

  return (
    <section className="app-header main-layout full">
      <div className="flex align-center justify-between">
        <h1 className="main-title ">Mister Toy</h1>

        <nav className={`main-nav flex align-center ${getMenuClass()}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/toy">Shop</NavLink>

          {user && user.isAdmin && <NavLink to="/dashboard">Dashboard</NavLink>}
          {!user && <NavLink to="/login">Login</NavLink>}
        </nav>

        <button
          className="btn-menu"
          onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)}
        ></button>
      </div>
    </section>
  )
}
