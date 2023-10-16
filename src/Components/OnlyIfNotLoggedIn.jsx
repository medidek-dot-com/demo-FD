import React from "react";
import { Navigate, Outlet } from "react-router";
import { getItem, KEY_ACCESS_TOKEN } from "../Utils/localStorageManager";

function OnlyIfNotLoggedIn({ isLoggedIn, user }) {
    // const user = getItem(KEY_ACCESS_TOKEN);
    // return (
    //   isLoggedIn && user?.user?.role === 'DOCTOR' ? <Navigate to="/doctor/select-hospital" /> : <Outlet /> || isLoggedIn && user?.user?.role === 'MASTER' ? <Navigate to={`/master/user/home/${user?.user?.hospital_id}`} /> : <Outlet />
    //   )
}

export default OnlyIfNotLoggedIn;
