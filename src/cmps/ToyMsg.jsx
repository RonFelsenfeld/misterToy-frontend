import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
import {
  SOCKET_EMIT_REMOVE_MSG,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EMIT_TYPING,
  SOCKET_EVENT_TYPING,
} from '../services/socket.service'

export function ToyMsg({ toy, setToy }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [msg, setMsg] = useState('')
  const [typingUser, setTypingUser] = useState(null)
  console.log(toy.msgs)

  useEffect(() => {
    socketService.on(SOCKET_EVENT_TYPING, userName => {
      setTypingUser(userName)
    })

    return () => {
      socketService.off(SOCKET_EVENT_TYPING)
    }
  }, [])

  function handleChange({ target }) {
    const { value } = target

    const typingUser = value ? user.fullname : null
    socketService.emit(SOCKET_EMIT_TYPING, typingUser)

    setMsg(value)
  }

  async function onAddMsg(ev) {
    ev.preventDefault()

    try {
      const savedMsg = await toyService.addToyMsg(toy, msg)
      socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
      socketService.emit(SOCKET_EMIT_TYPING, null)

      setMsg('')
      setTypingUser(null)
      setToy(prevToy => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))

      showSuccessMsg('Message added')
    } catch (err) {
      console.error('Had issues in adding msg', err)
      showErrorMsg('Had issues in adding your message')
    }
  }

  async function onRemoveMsg(msgId) {
    try {
      const removedMsgId = await toyService.removeToyMsg(toy, msgId)
      socketService.emit(SOCKET_EMIT_REMOVE_MSG, msgId)

      showSuccessMsg('Message deleted')
      setToy(prevToy => ({
        ...prevToy,
        msgs: [...prevToy.msgs.filter(m => m.id !== removedMsgId)],
      }))
    } catch (err) {
      console.error('Had issues in remove msg', err)
      showErrorMsg('Had issues in remove your message')
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
            maxLength={30}
          />

          <button className="btn-add-msg">Add</button>
        </form>
      )}

      <h3 className="msgs-title">Toys Messages:</h3>

      {!!toy.msgs.length && (
        <ul className="flex column clean-list">
          {toy.msgs.map(msg => (
            <li key={`${msg.id}`} className="toy-msg flex align-center">
              <p className="msg-txt">
                {msg.txt} <span className="msg-by">({msg.by.fullname})</span>
              </p>

              {/* If the logged in user added the msg or it's an admin, give the option to remove the msg */}
              {user && (user._id === msg.by._id || user.isAdmin) && (
                <button className="btn-remove-msg" onClick={() => onRemoveMsg(msg.id)}></button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!toy.msgs.length && <p className="no-msgs">Be the first to add a message</p>}

      {typingUser && <p className="typing-msg">{`${typingUser} is typing...`}</p>}
    </section>
  )
}
