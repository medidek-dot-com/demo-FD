import { Box } from "@mui/material";
import React from "react";
import Footer from "./Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tab } from "./Store/tabSlice";

const Help = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(null));
    }, []);
    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 100px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "100vh",
                }}
            >
                help
            </Box>
            <Footer />
        </>
    );
};

export default Help;
