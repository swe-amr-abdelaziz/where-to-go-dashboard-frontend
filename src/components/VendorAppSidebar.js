import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import LogoIcon from './../assets/brand/Icon.svg'
import LogoText from './../assets/brand/Text.svg'

// sidebar nav config
import navigationAdmin from '../_nav_vendor'

const EmpAppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.slidebar.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand
        className="d-none d-md-flex justify-content-start"
        style={{ paddingLeft: '36px' }}
        to="/"
      >
        <img src={LogoIcon} alt="Logo Icon" className="green-logo" />
        <img src={LogoText} alt="Logo Text" className="sidebar-brand-text" />
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav className="shadow">
        <SimpleBar>
          <AppSidebarNav items={navigationAdmin} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(EmpAppSidebar)
