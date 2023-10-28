import Banner from "../../Components/Home Page/Banner/Banner";
import Section_I from "../../Components/Home Page/Section-I/Section_I";
import Section_II from "../../Components/Home Page/Section_II/Section_II";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBarWrapper from "../../Components/NavBarWrapper/NavBarWrapper";
import { Box } from "@mui/material";
import { tab } from "../../Store/tabSlice";

const Home = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const hospital_id = user?.user?._id;
    const email = user?.user?.enterEmailId;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user?.role === "MASTER") {
            console.log("Master loged in");
            return navigate(`/master/user/home/${hospital_id}`);
        } else if (isLoggedIn && user?.role === "DOCTOR") {
            console.log("doctor loged in");
            return navigate("/doctor/select-hospital");
        } else if (isLoggedIn && user?.role === "PATIENT") {
            console.log("patient loged in");
            return navigate(`/`);
        } else {
            console.log("logged out");
            return navigate("/");
        }
    }, [user?.role]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(0));
    }, []);

    return (
        <>
            {/* <NavBarWrapper/> */}
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 48px)",
                    },
                    m: "0px auto",
                    p: 1,
                }}
            >
                <Banner />
                <Section_I />
                <Section_II />
            </Box>
            <Footer />
        </>
    );
};

export default Home;
