import React, { useEffect } from 'react'
import MasterNavBar from '../Master/MasterNavBar';
import NavBar from '../Home Page/Navbar/NavBar';
import { useSelector } from 'react-redux';

const NavBarWrapper = () => {


    const { isLoggedIn, user } = useSelector((state) => state.auth);


  return (
    <>
            {isLoggedIn && user?.role == 'DOCTOR' && <></> || isLoggedIn && user?.role == 'MASTER' && <MasterNavBar /> || isLoggedIn && user?.role == 'PATIENT' && <NavBar/> || !isLoggedIn && <NavBar/>}
    
    </>
  )
}

export default NavBarWrapper