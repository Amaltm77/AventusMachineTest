import React from 'react'
import './Admin.css'
import { Link, Outlet } from 'react-router-dom'

function Admin() {

  return (
    <div className='adminpage'>
      <nav className='adminnav'>
        <Link to='List'>User List</Link>
        <Link to='Manage'>Manage User List</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Admin
