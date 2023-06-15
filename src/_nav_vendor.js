import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { LuLayoutDashboard, LuFileSpreadsheet, LuVerified, LuTag, LuLock } from 'react-icons/lu'
import { HiOutlineIdentification } from 'react-icons/hi'
import { ImStatsDots } from 'react-icons/im'
import { MdOutlineCategory } from 'react-icons/md'
import { TbMoodSmile } from 'react-icons/tb'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <LuLayoutDashboard size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavItem,
    name: 'Statistics',
    to: '/statistics',
    icon: <ImStatsDots size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/vendor/details',
    icon: <CIcon icon={cilUser} className="me-2" />,
  },
]

export default _nav
