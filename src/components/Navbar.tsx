import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to='/'>
        <h3>Home</h3>
      </Link>
      <Link to='/login'>
        <h3>Login</h3>
      </Link>
    </div>
  )
}

export default Navbar
