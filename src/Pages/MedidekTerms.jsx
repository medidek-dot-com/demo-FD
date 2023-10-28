import { Box, Typography } from "@mui/material";
import React from "react";
import Footer from "../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { tab } from "../Store/tabSlice";

const MedidekTerms = () => {
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
                        md: "calc(100% - 30px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "100vh",
                }}
            >
                <Box
                    sx={{
                        height: { xs: "100px", sm: "100px", md: "181px" },
                        background: "#1F51C6",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "Raleway",
                            fontSize: "2.188",
                            fontWeight: "700",
                            color: "#ffffff",
                        }}
                    >
                        Terms & Condition
                    </Typography>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default MedidekTerms;
