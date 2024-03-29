import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../store/actions/user.actions'
import { showSuccessMsg } from '../services/event-bus.service'

export function UserGreet() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('Logout successfully')
      navigate('/')
    } catch (err) {
      showSuccessMsg('Could not logout')
    }
  }

  return (
    <section className="user-greet flex align-center">
      <h3>
        Hello, <span>{user.fullname}</span>
      </h3>
      <button className="btn-logout" onClick={onLogout}>
        Logout
      </button>
    </section>
  )
}
