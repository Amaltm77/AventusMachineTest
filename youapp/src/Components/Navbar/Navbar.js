import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const activeStyle = { color: 'yellow' };
  const inactiveStyle = { color: 'white' };

  return (
    <nav className='mainnav'>
      <ul>
        <li>
          <NavLink to="/" exact style={inactiveStyle} activeStyle={activeStyle}>Registration</NavLink>
        </li>
        <li>
          <NavLink to="/admin" style={inactiveStyle} activeStyle={activeStyle}>Admin</NavLink>
        </li>
      </ul>
    </nav>
  )
}
