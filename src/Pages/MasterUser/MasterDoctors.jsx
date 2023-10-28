import React, { useEffect } from "react";
import MasterUserDoctors from "./MasterUserDoctors";
import MasterNavBar from "../../Components/Master/MasterNavBar";
import Footer from "../../Components/Footer/Footer";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";

const MasterDoctors = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(2));
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
                    minHeight: "80vh",
                }}
            >
                <MasterUserDoctors />
            </Box>
            <Footer />
        </>
    );
};

export default MasterDoctors;
