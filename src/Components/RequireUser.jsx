import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../Utils/localStorageManager';
import { Navigate, Outlet } from 'react-router-dom';

const RequireUser = ({isLoggedIn}) => {
   
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/"/>
  )
}

export default RequireUser