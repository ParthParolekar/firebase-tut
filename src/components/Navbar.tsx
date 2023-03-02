import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const [user] = useAuthState(auth)

  const signUserOut = async () => {
    await signOut(auth)
  }
  //   console.log(user)
  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
      </div>
      <div className='user'>
        {user && (
          <>
            <p> {user?.displayName} </p>
            <p> {user?.email} </p>
            <img
              src={user?.photoURL || ''}
              width='20'
              height='20'
              alt='display'
            />
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
