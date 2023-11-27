import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import Home from "./Pages/Patient/Home";

import SignIn from "./Pages/Patient/SignIn";
import FindDoctors from "./Pages/Patient/FindDoctors";
import NavBar from "./Components/Home Page/Navbar/NavBar";
import ContactUs from "./Pages/Patient/ContactUs";
import { Box, Container } from "@mui/material";
import MedicalCourses from "./Pages/MedicalCourses";
import DoctorsList from "./Components/FindDoctors/DoctorsList/DoctorsList";
import DoctorInfo from "./Components/FindDoctors/DoctorsInfo/DoctorInfo";
import Payment from "./Components/Payment/Payment";
import MsignIn from "./Pages/MasterUser/MsignIn";
import Verify from "./Components/Varification/Verify";
import MasterUserProfile from "./Pages/MasterUser/MasterUserProfile";
import SignUp from "./Pages/Patient/SignUp";
import NotFound from "./Pages/NotFound";
import MhomePage from "./Pages/MasterUser/MhomePage";
import MasterUserDoctors from "./Pages/MasterUser/MasterUserDoctors";
import MasterUserDoctorDetails from "./Pages/MasterUser/MasterUserDoctorDetails";
import MasterUserDoctorAppointments from "./Pages/MasterUser/MasterUserDoctorAppointments";
import MsignUp from "./Pages/MasterUser/MsignUp";
import MUDDashboard from "./Pages/Doctor/MUDDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpScreen from "./Components/Master/OtpScreen";
import CourseDetails from "./Pages/CourseDetails";
import UserProfile from "./Pages/Doctor/UserProfile";
import RequireUser from "./Components/RequireUser";
import OnlyIfNotLoggedIn from "./Components/OnlyIfNotLoggedIn";
import EditHospitalProfile from "./Pages/MasterUser/EditHospitalProfile";
import Management from "./Pages/MasterUser/Management";
import MasterDoctors from "./Pages/MasterUser/MasterDoctors";
import Appoinments from "./Pages/MasterUser/Appoinments";
import MasterNavBar from "./Components/Master/MasterNavBar";
import {
    KEY_ACCESS_TOKEN,
    MASTER_USER,
    getItem,
} from "./Utils/localStorageManager";
import Footer from "./Components/Footer/Footer";
import SignUpVarify from "./Pages/Patient/SignUpVarify";
import { useDispatch, useSelector } from "react-redux";
import EditPetientProfile from "./Pages/Patient/EditPetientProfile";
import NavBarWrapper from "./Components/NavBarWrapper/NavBarWrapper";
import ComingSoon from "./ComingSoon";
import DoctorSignIn from "./Pages/Doctor/DoctorSignIn";
import DoctorSignUp from "./Pages/Doctor/DoctorSignUp";
import SelectHospital from "./Pages/Doctor/SelectHospital";
import ManageStaff from "./Pages/MasterUser/ManageStaff";
import Tracking from "./Pages/Patient/Tracking";
import { logout } from "./Store/authSlice";
import ViewPetiantAppointment from "./Pages/Patient/ViewPetiantAppointment";
import MedidekTerms from "./Pages/MedidekTerms";
import DoctorEditProfile from "./Pages/Doctor/DoctorEditProfile";
import DoctorAppointments from "./Pages/Doctor/DoctorAppointments";
import ForgotPassword from "./Pages/ForgotPassword";
import MedicalRecords from "./Pages/Patient/MedicalRecords";
import DoctorCourses from "./Pages/Doctor/DoctorCourses";
import DoctorCourseDetails from "./Pages/Doctor/DoctorCourseDetails";
import AppointmentSettings from "./Pages/Doctor/AppointmentSettings";
import ViewPatientCompletedAppointment from "./Pages/Patient/ViewPatientCompletedAppointment";
import Help from "./Help";
import MedidekPrivacy from "./MedidekPrivacy";
import MedidekCancellationPolicy from "./MedidekCancellationPolicy";

const App = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { email, hospital_id, doctor_id } = useParams();
    const location = useLocation();
    const [showNavbar, setShowNavBar] = useState(false);
    // const masterUser = getItem(MASTER_USER);
    const accessToken = getItem(KEY_ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) {
            dispatch(logout());
        }
    }, [accessToken]);

    useEffect(() => {
        if (
            location.pathname == "/sign-up" ||
            location.pathname == "/sign-in" ||
            location.pathname == "/master/signin" ||
            location.pathname == "/master/signup" ||
            location.pathname == "/doctor/signup" ||
            location.pathname == "/doctor/signin" ||
            location.pathname == "/user/signin" ||
            location.pathname == "/user/signup" ||
            location.pathname == "/forgot-password" ||
            location.pathname ==
                `/doctor/dashboard/${hospital_id}/${doctor_id}` ||
            location.pathname == `/master/login/verify/${email}`
        ) {
            setShowNavBar(false);
        } else {
            setShowNavBar(true);
        }
    }, [location]);
    return (
        <>
            {/* <ComingSoon/> */}

            {/* <NavBar /> */}
            {showNavbar && <NavBarWrapper />}

            <ToastContainer />

            {/* <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 100px)",
                    },
                    m: "0px auto",
                    p: 1,
                }}
            > */}
            <Routes>
                {/* Routes For Patient Starts From Here */}
                {/* <Route path="/nav" element={<NavBarWrapper />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/medidek/help" element={<Help />} />
                <Route
                    path="/medidek/Privacy-policy"
                    element={<MedidekPrivacy />}
                />
                <Route
                    path="/medidek/terms&Privacy-policy"
                    element={<MedidekTerms />}
                />
                <Route
                    path="/medidek/cancellation-policy"
                    element={<MedidekCancellationPolicy />}
                />
                <Route path="/user/signup" element={<SignUp />} />
                <Route
                    path="/user/signup/varify/:email"
                    element={<SignUpVarify />}
                />
                <Route path="/user/signin" element={<SignIn />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route
                    path="/user/profile/edit/:id"
                    element={<EditPetientProfile />}
                />
                <Route path="/find-doctors" element={<FindDoctors />} />
                <Route path="/doctors" element={<DoctorsList />} />
                <Route
                    path="/doctor/details/:doctorsId"
                    element={<DoctorInfo />}
                />
                <Route
                    path="/doctor/appointment/payment"
                    element={<Payment />}
                />
                <Route path="/tracking" element={<Tracking />} />
                <Route
                    path="/tracking/view-appointment/:appointmentId"
                    element={<ViewPetiantAppointment />}
                />
                <Route
                    path="/tracking/view-completed-appointment/:appointmentId"
                    element={<ViewPatientCompletedAppointment />}
                />
                <Route
                    path="/user/upload/records"
                    element={<MedicalRecords />}
                />

                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/medical-courses" element={<MedicalCourses />} />
                <Route
                    path="/medical-course/:course_id/details"
                    element={<CourseDetails />}
                />

                {/* Master User Routes Starts From Here */}

                <Route element={<RequireUser isLoggedIn={isLoggedIn} />}>
                    <Route
                        path="/master/user/profile/:hospital_id"
                        element={<MasterUserProfile />}
                    />
                    <Route
                        path="/master/user/profile/edit/:hospital_id"
                        element={<EditHospitalProfile />}
                    />
                    <Route
                        path="/master/user/home/:hospital_id"
                        element={<MhomePage />}
                    />
                    <Route
                        path="/master/user/management/doctors/:hospital_id"
                        element={<Management />}
                    />
                    <Route
                        path="/master/user/management/staff/:hospital_id"
                        element={<ManageStaff />}
                    />
                    <Route
                        path="/master/user/doctors/:hospital_id"
                        element={<MasterDoctors />}
                    />
                    <Route
                        path="/master/user/appointments/:hospital_id"
                        element={<Appoinments />}
                    />
                    <Route
                        path="/master/user/doctor/details/:hospital_id/:doctor_id"
                        element={<MasterUserDoctorDetails />}
                    />
                    <Route
                        path="/master/user/doctor/confirmAppointment/:id"
                        element={<MasterUserDoctorAppointments />}
                    />
                    <Route
                        path="/master/user/doctor/appointments/:hospital_id/:doctor_id"
                        element={<MasterUserDoctorAppointments />}
                    />
                    <Route
                        path="/doctor/select-hospital"
                        element={<SelectHospital />}
                    />
                    <Route
                        path="/doctor/dashboard/:doctorid"
                        element={<MUDDashboard />}
                    />
                    <Route
                        path="/doctor/appointments/:doctorid"
                        element={<DoctorAppointments />}
                    />
                    <Route
                        path="/doctor/courses/:doctorid"
                        element={<DoctorCourses />}
                    />
                    <Route
                        path="/doctor/course/details/:doctorid/:course_id"
                        element={<DoctorCourseDetails />}
                    />
                    <Route
                        path="/doctor/appointment-settings/:doctorid"
                        element={<AppointmentSettings />}
                    />
                    <Route
                        path="/doctor/edit-profile/:doctorid"
                        element={<DoctorEditProfile />}
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
                {/* <Route
                        element={<OnlyIfNotLoggedIn isLoggedIn={isLoggedIn} user={user} />}
                    > */}
                <Route path="/master/signin" element={<MsignIn />} />
                <Route path="/master/signup" element={<MsignUp />} />
                <Route path="/doctor/signin" element={<DoctorSignIn />} />
                <Route path="/doctor/signup" element={<DoctorSignUp />} />
                {/* </Route> */}
                <Route
                    path="/master/login/verify/:email"
                    element={<OtpScreen />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            {/* </Box> */}

            {/* {showNavbar && <Footer />} */}
        </>
    );
};

export default App;
