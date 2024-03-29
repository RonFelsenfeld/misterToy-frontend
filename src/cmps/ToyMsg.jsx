import { useState } from 'react'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'

export function ToyMsg({ toy, setToy }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [msg, setMsg] = useState('')

  function handleChange({ target }) {
    const { value } = target
    setMsg(value)
  }

  async function onAddMsg(ev) {
    ev.preventDefault()

    try {
      const savedMsg = await toyService.addToyMsg(toy, msg)
      showSuccessMsg('Message added')
      setMsg('')
      setToy(prevToy => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))
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
            required
          />

          <button className="btn-add-msg">Add</button>
        </form>
      )}

      <h3 className="msgs-title">Toys Messages:</h3>

      <ul className="flex column clean-list">
        {toy.msgs.map(msg => (
          <li key={`${msg.id}`} className="toy-msg flex align-center">
            <p className="msg-txt">
              {msg.txt} <span className="msg-by">({msg.by.fullname})</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
