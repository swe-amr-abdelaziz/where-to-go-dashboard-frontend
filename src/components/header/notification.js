import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { getNotifications } from '../../Redux/NotificationSlice/NotificationSlice'

const Notification = () => {
  const logedInUser = useSelector((state) => state.notification.role)
  const navigate = useNavigate()
  const notifications = useSelector((state) => state.notification.notifications)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification.notifications)
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    if (logedInUser === 'Employee') {
      dispatch(getNotifications())
    }
  }, [logedInUser])

  useEffect(() => {
    let count = 0
    notification.forEach((item) => {
      if (item.isApproved === false) {
        count++
      }
    })
    setNotificationCount(count)
  }, [notification])

  return (
    <>
      {logedInUser === 'Employee' ? (
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            {notifications.length > 0 ? (
              <>
                <FontAwesomeIcon icon={faBell} size={'lg'} color={'red'} />
                <CBadge color="info" className="ms-2">
                  {notificationCount}
                </CBadge>
              </>
            ) : (
              <FontAwesomeIcon icon={faBell} size={'lg'} />
            )}
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">
              Vendors To Approve
            </CDropdownHeader>
            <CDropdownItem onClick={() => navigate('/vendors')} href="#">
              New Vendors
              <CBadge color="info" className="ms-2">
                {notificationCount}
              </CBadge>
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      ) : (
        <></>
      )}
    </>
  )
}

export default Notification
