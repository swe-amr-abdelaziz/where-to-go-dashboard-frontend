import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '44px',
      }}
    >
      <div>
        <a
          href="https://github.com/mostafa2080/where-to-go-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Where To Go
        </a>
        <span className="ms-1">&copy; 2023 All rights reserved</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
