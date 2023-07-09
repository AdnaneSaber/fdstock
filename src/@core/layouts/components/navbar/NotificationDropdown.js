// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import {  } from "moment"
// ** Custom Components
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import  axios  from 'axios'
import moment from 'moment/moment'
import { getColorBasedOnName } from '@utils'
const NotificationDropdown = () => {

  const [unreadMessages, setUnreadMessages] = useState([])
  const fetchUnreadMessages = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { data } = await axios.post(`${process.env.REACT_APP_API}/unseen`, {
        token: userData.token
    })
    const new_data =  data.map(message => {
      const dateToCompare = moment(message.timestamp)
      
      const currentDate = moment()
      const diffInMinutes = currentDate.diff(dateToCompare, 'minutes')
      const diffInHours = currentDate.diff(dateToCompare, 'hours')
      const diffInDays = currentDate.diff(dateToCompare, 'days')
      let date_state = ""
      if (diffInMinutes === 0) {
        date_state = "now"
      } else if (diffInMinutes < 60) {
        date_state = `${diffInMinutes} minute(s) ago`
      } else if (diffInHours < 24) {
        date_state = `${diffInHours} hour(s) ago`
      } else if (diffInDays === 1) {
        date_state = "yesterday"
      } else {
        date_state = dateToCompare.format("D MMM")
      }
      return {
          sender: message.sender,
          avatarContent: message.sender.name,
          color: getColorBasedOnName(message.sender.name),
          subtitle: message.message,
          title: (
            <p className='media-heading d-flex'>
              <span className='fw-bolder'>{message.sender.name}</span>
              <span className="fw-lighte small ms-auto">{date_state}</span>
            </p>
          )
      }
    })
    setUnreadMessages(new_data)
  }

  async function readAllMessages() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { status } = await axios.post(`${process.env.REACT_APP_API}/read_all`, {
        token: userData.token
    })
    if (status === 200) {
      setUnreadMessages([])
    }
  }
  useEffect(() => {
    fetchUnreadMessages()
  }, [])
  
  // ** Notification Array
  // const notificationsArray = [
  //   {
  //     img: require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
  //     subtitle: 'Won the monthly best seller badge.',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
  //       </p>
  //     )
  //   },
  //   {
  //     img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
  //     subtitle: 'You have 10 unread messages.',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>New message</span>&nbsp;received
  //       </p>
  //     )
  //   },
  //   {
  //     avatarContent: 'MD',
  //     color: 'light-danger',
  //     subtitle: 'MD Inc. order updated',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Revised Order 👋</span>&nbsp;checkout
  //       </p>
  //     )
  //   }
  // ]

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      
      <Fragment>
        <PerfectScrollbar
          component='li'
          className='media-list scrollable-container'
          options={{
            wheelPropagation: false
          }}
        >
          {unreadMessages.length ? unreadMessages.map((item, index) => {
            console.log(item)
            return (
              <Link key={index} className='d-flex' to={`/apps/chat/${item.sender._id}`}>
                <div
                  className={classnames('list-item d-flex', {
                    'align-items-start': !item.switch,
                    'align-items-center': item.switch
                  })}
                >
                  <Fragment>
                    <div className='me-1'>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                          ? {
                              content: item.avatarContent,
                              color: item.color
                            }
                          : item.avatarIcon
                          ? {
                              icon: item.avatarIcon,
                              color: item.color
                            }
                          : null)}
                      />
                    </div>
                    <div className='list-item-body flex-grow-1 w-0' style={{width: 0}}>
                      {item.title}
                      <small className='notification-text'style={{
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        display: "block"
                      }}>{item.subtitle}</small>
                    </div>
                  </Fragment>
                </div>
              </Link>
            )
          }) : 
            <div className='media-list mx-auto p-2 text-center'>
              <small className=''>Vous n'avez aucune notification.</small>
            </div>}
        </PerfectScrollbar>
        {
          unreadMessages.length ? <li className='dropdown-menu-footer'>
            <Button color='primary' block onClick={readAllMessages}>
              Read all notifications
            </Button>
          </li> : ""
        }
      </Fragment>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        {unreadMessages.length ? <Badge pill color='danger' className='badge-up'>
          {unreadMessages.length}
        </Badge> : ""}
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {unreadMessages.length} New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
