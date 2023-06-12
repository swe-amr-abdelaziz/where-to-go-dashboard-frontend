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
    component: CNavTitle,
    name: 'Vendors',
  },
  {
    component: CNavItem,
    name: 'All Vendors',
    to: '/vendors',
    icon: <LuFileSpreadsheet size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavItem,
    name: 'Approve',
    to: '/vendorAdd',
    icon: <LuVerified size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavTitle,
    name: 'Customers',
  },
  {
    component: CNavItem,
    name: 'All Customers',
    to: '/customers',
    icon: <LuFileSpreadsheet size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavTitle,
    name: 'Features',
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/theme/colors',
    icon: <MdOutlineCategory size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavItem,
    name: 'Tags',
    to: '/theme/colors',
    icon: <LuTag size={24} style={{ marginRight: '16px' }} />,
  },
  {
    component: CNavItem,
    name: 'Mood',
    to: '/theme/colors',
    icon: <TbMoodSmile size={24} style={{ marginRight: '16px' }} />,
  },
]

export default _nav
