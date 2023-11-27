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
import { toast } from "react-toastify";
import { axiosClient } from "../../Utils/axiosClient";

const MobileImageStyle = styled("img")({
    // width:"100%",
    // height:"",
});

const TextFeildStyle = styled(TextField)({
    color: "#ffffff",
    borderBottom: "#ffffff",
    marginTop: "10px",
    [`& input[type = "number"]::-webkit-inner-spin-button`]: {
        display: "none",
    },
    [`& input`]: {
        color: "#ffffff",
    },
    [`& fieldset`]: {
        color: "#ffffff",
        borderBottom: "1px solid #ffffff",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
        color: "yellow",
    },
    "& .MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
        color: "yellow",
    },
    "& .Mui-error": {
        color: "yellow",
    },
    "& div:before:hover": {
        borderBottom: "1px solid #ffffff",
    },
    ["& label"]: {
        color: "#ffffff",
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
});

const ContactUs = () => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });
    const [err, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputValue);
        if (
            !inputValue.name ||
            !inputValue.phone ||
            !inputValue.email ||
            !inputValue.message
        ) {
            return setError(true);
        }
        try {
            const response = await axiosClient.post(
                "/v2/contactCreation",
                inputValue
            );
            if (response.status === "ok") {
                toast.success("Thank you for contacting with medidek");
                setInputValue("");
                setError(false);
                return;
            }
            console.log(response);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

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
                            // height: {
                            //     xs: "max-content",
                            //     sm: "450px",
                            //     md: "450px",
                            // },
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
                        <form onSubmit={handleSubmit}>
                            <Stack>
                                <TextFeildStyle
                                    color="secondary"
                                    name="name"
                                    variant="standard"
                                    label="Name"
                                    // InputLabelProps={{
                                    //     className: "lableStyle",
                                    // }}
                                    error={
                                        err && !inputValue.name ? true : false
                                    }
                                    helperText={
                                        err && !inputValue.name ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Please enter your name
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                    value={
                                        inputValue.name ? inputValue.name : ""
                                    }
                                    onChange={handleChange}
                                />
                                <TextFeildStyle
                                    // className="input"
                                    type="email"
                                    color="secondary"
                                    name="email"
                                    variant="standard"
                                    label="Email Address"
                                    // InputLabelProps={{
                                    //     className: "lableStyle",
                                    // }}
                                    error={
                                        err && !inputValue.email ? true : false
                                    }
                                    helperText={
                                        err && !inputValue.email ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Please enter your email
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                    value={
                                        inputValue.email ? inputValue.email : ""
                                    }
                                    onChange={handleChange}
                                />
                                <TextFeildStyle
                                    // className="textFeild"
                                    color="secondary"
                                    name="phone"
                                    variant="standard"
                                    label="Phone Number"
                                    type="number"
                                    // InputLabelProps={{
                                    //     className: "lableStyle",
                                    // }}
                                    error={
                                        err && !inputValue.phone ? true : false
                                    }
                                    helperText={
                                        err && !inputValue.phone ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Please enter your phone
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                    value={
                                        inputValue.phone ? inputValue.phone : ""
                                    }
                                    onChange={handleChange}
                                />
                                <TextFeildStyle
                                    className="textFeild"
                                    color="secondary"
                                    name="message"
                                    variant="standard"
                                    label="Your Message"
                                    type="text"
                                    // InputLabelProps={{
                                    //     className: "lableStyle",
                                    // }}
                                    error={
                                        err && !inputValue.message
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        err && !inputValue.phone ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Please enter your message
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                    value={
                                        inputValue.message
                                            ? inputValue.message
                                            : ""
                                    }
                                    onChange={handleChange}
                                />

                                <Button
                                    variant="contained"
                                    type="submit"
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
