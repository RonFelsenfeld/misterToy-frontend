import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function onToggleMenu() {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
  }

  function closeMenu() {
    if (isMenuOpen) setIsMenuOpen(false)
  }

  function getMenuClass() {
    return isMenuOpen ? 'menu-open' : ''
  }

  return (
    <section className="app-header main-layout full">
      <div className={`main-screen ${getMenuClass()}`} onClick={() => setIsMenuOpen(false)}></div>

      <div className="flex align-center justify-between">
        <h1 className="main-title ">Mister Toy</h1>

        <nav className={`main-nav flex align-center ${getMenuClass()}`}>
          <NavLink to="/">
            <button onClick={closeMenu}>Home</button>
          </NavLink>
          <NavLink to="/about">
            <button onClick={closeMenu}>About</button>
          </NavLink>
          <NavLink to="/toy">
            <button onClick={closeMenu}>Shop</button>
          </NavLink>

          {user && user.isAdmin && (
            <NavLink to="/dashboard">
              <button onClick={closeMenu}>Dashboard</button>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/login">
              <button onClick={closeMenu}>Login</button>
            </NavLink>
          )}
        </nav>

        <button className="btn-menu" onClick={onToggleMenu}></button>
      </div>
    </section>
  )
}
