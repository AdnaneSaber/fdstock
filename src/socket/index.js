import React, { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import axios from "axios"
// Create the Socket.IO context
export const SocketContext = createContext(null)

// Create the Socket.IO provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const parsable_data = localStorage.getItem("userData")
  let user_id, token
  if (parsable_data) {
     token  = JSON.parse(parsable_data).token
     user_id = JSON.parse(parsable_data).user_id
  } else {
    token = null
    user_id = null
  }
  async function fetchFriends(socket) {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/profile/${user_id}/friends_ids`,
      {
        token
      }
    )
    data.map(id => socket.emit('join', {room: [id, user_id].sort().join('-')}))
  }

  useEffect(() => {
    (async function() {
        const socket = io("http://localhost:8000/")
        if (user_id) {
            await fetchFriends(socket)
        }
        setSocket(socket)
        return () => {
            socket.disconnect()
        }
    })()
  }, [])

  return (
    <SocketContext.Provider value={socket}>{socket && children}</SocketContext.Provider>
  )
}
