import React, { useState } from 'react'

const KebabMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="kebab-menu">
      <div className={`menu-icon ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && (
        <div className="menu-items">
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default KebabMenu
