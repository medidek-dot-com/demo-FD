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
import styled from "@emotion/styled";

const useStyles = styled((theme) => ({
    hidden: {
        opacity: 0,
        filter: "blur(5px)",
        transform: "translateX(-100%)",
        transition: "all 1s",
    },
    show: {
        opacity: 1,
        filter: "blur(0)",
        transform: "translateX(0)",
    },
    logos: {
        display: "flex",
    },
    logo: {
        transitionDelay: "200ms",
        "&:nth-child(3)": {
            transitionDelay: "400ms",
        },
        "&:nth-child(4)": {
            transitionDelay: "600ms",
        },
    },
}));

const Home = () => {
    const classes = useStyles();

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const hospital_id = user?.user?._id;
    const email = user?.user?.enterEmailId;
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add(classes.show);
                } else {
                    entry.target.classList.remove(classes.show);
                }
            });
        });

        const hiddenElements = document.querySelectorAll(`.${classes.hidden}`);
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            // Cleanup observer if needed
            observer.disconnect();
        };
    }, [classes.hidden, classes.show]);

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
                <Banner classes={classes} />
                <Section_I />
                <Section_II />
            </Box>
            <Footer />
        </>
    );
};

export default Home;
