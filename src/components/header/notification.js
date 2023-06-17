import React from 'react'
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
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Notification = () => {
  const navigate = useNavigate()
  const notifications = useSelector((state) => state.notification.notifications)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {notifications.length > 0 ? (
          <>
            <FontAwesomeIcon icon={faBell} size={'lg'} color={'red'} />
            <CBadge color="info" className="ms-2">
              {notifications.length}
            </CBadge>
          </>
        ) : (
          <FontAwesomeIcon icon={faBell} size={'lg'} />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Vendors To Approve</CDropdownHeader>
        <CDropdownItem onClick={() => navigate('/vendors')} href="#">
          New Vendors
          <CBadge color="info" className="ms-2">
            {notifications.length}
          </CBadge>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default Notification
