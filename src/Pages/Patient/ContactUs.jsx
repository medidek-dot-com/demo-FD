import React, { useEffect, useState } from "react";
// import "../../Styles/SignUpStyle/signUp.css";
import {
    Box,
    Button,
    Card,
    Container,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    colors,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { grey, lime } from "@mui/material/colors";
import styled from "@emotion/styled";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { tab } from "../../Store/tabSlice";

const MobileImageStyle = styled("img")({
    // width:"100%",
    // height:"",
});

const TextFeildStyle = styled(TextField)({
    color: "#ffffff",
    borderBottom: "#ffffff",
    marginTop: "10px",
    "& .css-1pnmrwp-MuiTypography-root": {
        color: "#ffffff",
    },
    "& .css-1yana92-MuiInputBase-root-MuiInput-root": {
        color: "#ffffff",
        borderBottom: "1px solid #ffffff",
    },
    "& label": {
        color: "#ffffff",
    },
    "& .css-1gl19ua-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
        color: "#ffffff",
    },
});

const ContactUs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(3));
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
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "90vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Card
                        sx={{
                            py: { xs: "10px", sm: "35px", md: "52px" },
                            px: { xs: "20px", sm: "30px", md: "68px" },
                            width: { xs: "100%", sm: "100%", md: "586px" },
                            height: {
                                xs: "max-content",
                                sm: "450px",
                                md: "450px",
                            },
                            background: "#1F51C6",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: {
                                    xs: "25px",
                                    sm: "30px",
                                    md: "30px",
                                },
                                fontFamily: "Raleway",
                                color: "#ffffff",
                                textAlign: {
                                    xs: "center",
                                    sm: "center",
                                    md: "left",
                                },
                            }}
                        >
                            Get In Touch
                        </Typography>
                        <form>
                            <Stack>
                                <TextFeildStyle
                                    className="input"
                                    variant="standard"
                                    label="Name"
                                    InputLabelProps={{
                                        className: "lableStyle",
                                    }}
                                />
                                <TextFeildStyle
                                    className="input"
                                    variant="standard"
                                    label="Email Address"
                                    InputLabelProps={{
                                        className: "lableStyle",
                                    }}
                                />
                                <TextFeildStyle
                                    className="textFeild"
                                    variant="standard"
                                    label="Phone Number"
                                    type="text"
                                    InputLabelProps={{
                                        className: "lableStyle",
                                    }}
                                />
                                <TextFeildStyle
                                    className="textFeild"
                                    variant="standard"
                                    label="Your Message"
                                    type="text"
                                    InputLabelProps={{
                                        className: "lableStyle",
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: { xs: 1.2, sm: 1.4, md: 3 },
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        textTransform: "none",
                                        background: "#ffffff",
                                        color: "#383838",
                                        borderRadius: "53px",
                                        "&:hover": {
                                            background: "#DCE3F6",
                                        },
                                    }}
                                >
                                    Send Message
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default ContactUs;
