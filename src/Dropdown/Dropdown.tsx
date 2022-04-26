import React, { useState } from 'react'
import './style.css'

const App = () => {
  return (
    <NavBar>
      <NavBarItem icon="🦘">Home</NavBarItem>
      <NavBarItem icon="🦘">Bell</NavBarItem>
      <NavBarItem icon="🦘">Home</NavBarItem>
    </NavBar>
  )
}

interface NavBarProps {
  children: React.ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">{children}</ul>
    </nav>
  )
}

export default NavBar

const NavBarItem: React.FC<{
  icon: React.ReactNode
  children?: React.ReactNode
}> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <li className="navbar-item">
      <a href="#" className="navbar-item-icon" onClick={() => setOpen(true)}>
        {props.icon}

        {open && props.children}
      </a>
    </li>
  )
}
