import React from 'react'
import {LogOut} from 'react-feather'
import { useAuth } from '../utils/AuthContext'
// import logo from '../assets/logo.jpg'

const Header = () => {
  const {user , handleUserLogout} = useAuth();
  return (
    <div id='header--wrapper'>
      {user ? (
        <>
        {/* <img src={logo} alt="" /> */}
        <h1> Welcome, <span className='header--username'>{user.name}</span> </h1>
        <LogOut onClick={handleUserLogout}  className='header--link'/>
       </>
      ):(
        <div>
          <h1>Login to start...</h1>
        </div>
      )}
    </div>
  )
}

export default Header