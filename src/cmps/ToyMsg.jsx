import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveToy } from '../store/actions/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function ToyMsg({ toy }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [msg, setMsg] = useState('')

  function handleChange({ target }) {
    const { value } = target
    setMsg(value)
  }

  async function onAddMsg(ev) {
    ev.preventDefault()
    toy.msgs.push(msg)

    try {
      await saveToy(toy)
      showSuccessMsg('Message added')
      setMsg('')
    } catch (err) {
      console.error('Had issues in adding msg', err)
      showErrorMsg('Had issues in adding your message')
    }
  }

  return (
    <section className="toy-msgs">
      {user && (
        <form onSubmit={onAddMsg} className="flex">
          <input
            type="text"
            name="msg"
            className="msg-input"
            value={msg}
            placeholder="Your message"
            onChange={handleChange}
          />

          <button className="btn-add-msg">Add</button>
        </form>
      )}

      <h3 className="msgs-title">Toys Messages:</h3>
      <ul className="flex clean-list">
        {toy.msgs.map(msg => (
          <li key={`${msg._id}`} className="toy-msg">
            <p>
              By: <span>{msg.by.fullname}</span>: <span>{msg.txt}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
