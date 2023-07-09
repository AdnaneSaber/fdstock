/* eslint-disable no-unused-vars */
// ** React Imports
import ReactDOM from 'react-dom'
import { useState, useEffect, useContext, useRef, Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import { SocketContext } from '../../../socket'

import { useParams } from 'react-router-dom'
import { getColorBasedOnName } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather'

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown
} from 'reactstrap'
import axios from 'axios'
import AvatarColors from '../../components/avatar/AvatarColors'

const ChatLog = props => {
  // ** Props & Store
  const { handleSidebar, store, userSidebarLeft } = props
  const { userProfile } = store
  const socket = useContext(SocketContext)

  // ** Refs & Dispatch
  const chatArea = useRef(null)
  const [selectedUser, setSelectedUser] = useState({})
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState()
  const { user_id } = useParams()
  // ** State
  const [msg, setMsg] = useState('')

  const { token, user_id: my_id, name } = JSON.parse(localStorage.getItem('userData'))
  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    if (chatContainer) {
      chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }
  async function fetchMessages() {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/messages/${user_id}`, {
        token
    })
    setMessages(data)
  }
  async function fetchUser() {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/profile/${user_id}`, {
        token
    })
    setSelectedUser(data)
  }
  async function readMessage(id) {
    await axios.post(`${process.env.REACT_APP_API}/message/read/${id}/${user_id}`, {
      token
    })
  }

  // ** Renders user chat
  const renderChats = (messages) => {
    let lastSender = null
  
    const chatItems = messages.map((item) => {
      const isFirstMessage = item.sender !== lastSender
      const chatClass = classnames('chat', {
        'chat-left': item.sender !== my_id
      })
  
      lastSender = item.sender
  
      return {
        ...item,
        isFirstMessage,
        chatClass
      }
    })    
    return (
      <Fragment> 
        {chatItems.map((chat, index) => (
            <div key={index} className={chat.chatClass}>
              {chat.isFirstMessage && (
                <div className='chat-avatar'>
                  <Avatar
                    className='box-shadow-1 cursor-pointer'
                    color={getColorBasedOnName(chat.sender === my_id ? name : selectedUser.name)}
                    content={chat.sender === my_id ? name : selectedUser.name}
                    initials
                  />
                </div>
              )}
        
              <div className='chat-body'>
                <div className='chat-content'>
                  <p>{chat.message}</p>
                </div>
              </div>
            </div>
          ))
        }
      </Fragment> 
    )
  }
  useEffect(() => {
    // Example: Listen for a socket event
    socket.on('private_message', (data) => {
      setMessages(msgs => [...msgs, data])
      setChats(renderChats(messages))
      scrollToBottom()
      readMessage(data._id)
    })
  }, [socket])
  useEffect(() => {
    (async function () {
      setLoading(true)
      await fetchMessages()
      await fetchUser()
      setLoading(false)
      setChats(renderChats(messages))
      scrollToBottom()
    })()
  }, [user_id])
  useEffect(() => {
      if (messages && selectedUser.name) {
        setChats(renderChats(messages))
      }
  }, [selectedUser])
  const handleStartConversation = () => {
    if (!Object.keys(selectedUser).length && !userSidebarLeft && window.innerWidth < 992) {
      handleSidebar()
    }
  }
  // ** Sends New Msg
  const handleSendMsg = e => {
    e.preventDefault()
    if (msg.length) {
      socket.emit('private_message', { message: msg, recipient: user_id, token })
      setMsg('')
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = Object.keys(selectedUser).length && !loading ? PerfectScrollbar : 'div'

  return (
    <div className='chat-app-window'>
      <div className={classnames('start-chat-area', { 'd-none': user_id })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {Object.keys(selectedUser).length ? (
        <div className={classnames('active-chat', { 'd-none': selectedUser === null })}>
          <div className='chat-navbar'>
            <header className='chat-header'>
              <div className='d-flex align-items-center'>
                <div className='sidebar-toggle d-block d-lg-none me-1' onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight='36'
                  imgWidth='36'
                  img={userProfile.avatar}
                  status={"online"}
                  className='avatar-border user-profile-toggle m-0 me-1'
                  // onClick={() => handleAvatarClick(selectedUser.contact)}
                />
                <h6 className='mb-0'>{selectedUser.name}</h6>
              </div>
              <div className='d-flex align-items-center'>
                <PhoneCall size={18} className='cursor-pointer d-sm-block d-none me-1' />
                <Video size={18} className='cursor-pointer d-sm-block d-none me-1' />
                <Search size={18} className='cursor-pointer d-sm-block d-none' />
                <UncontrolledDropdown className='more-options-dropdown'>
                  <DropdownToggle className='btn-icon' color='transparent' size='sm'>
                    <MoreVertical size='18' />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>

          <ChatWrapper ref={chatArea} className='user-chats' options={{ wheelPropagation: false }}>
            <div className='chats'>{renderChats(messages)}</div>
          </ChatWrapper>
          

          <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
            <InputGroup className='input-group-merge me-1 form-send-message'>
              <InputGroupText>
                <Mic className='cursor-pointer' size={14} onClick={() => setChats(renderChats(messages))} />
              </InputGroupText>
              <Input
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder='Type your message or use speech to text'
              />
              <InputGroupText>
                <Label className='attachment-icon mb-0' for='attach-doc'>
                  <Image className='cursor-pointer text-secondary' size={14} />
                  <input type='file' id='attach-doc' hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button className='send' color='primary'>
              <Send size={14} className='d-lg-none' />
              <span className='d-none d-lg-block'>Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ChatLog
