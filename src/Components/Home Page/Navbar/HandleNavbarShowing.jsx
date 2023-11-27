import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HandleNavbarShowing = ({ NavBar }) => {
    const location = useLocation();
    const [showNavbar, setShowNavBar] = useState(false);
    useEffect(() => {
        if (
            location.pathname === "/sign-up" ||
            location.pathname === "/sign-in" ||
            location.pathname === "/master/signin" ||
            location.pathname === "/master/signup" ||
            location.pathname === "/master/login/verify/:email" ||
            location.pathname === "/master/user/doctor/dashboard/:id"
        ) {
            setShowNavBar(false);
            console.log("nav bar hide");
        } else {
            setShowNavBar(true);
        }
    }, [location]);
    return <>{console.log(NavBar)}</>;
};

export default HandleNavbarShowing;
