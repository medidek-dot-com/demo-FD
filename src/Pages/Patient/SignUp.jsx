import React, { useState } from "react";
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
import ErrorIcon from "@mui/icons-material/Error";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { axiosClient } from "../../Utils/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MobileImageStyle = styled("img")({
    position: "fixed",
    bottom: 0,
});

const TextFeildStyle = styled(TextField)({
    [`& input`]: {
        color: "#ffffff",
    },
    [`& P`]: {
        color: "#ffffff",
    },
    [`& fieldset`]: {
        color: "#ffffff",
        borderBottomColor: "#ffffff",
    },
    [`&:hover fieldset`]: {
        color: "#ffffff",
        borderBottomColor: "#ffffff",
    },
    "& input:after": {
        borderBottom: "#ffffff",
    },
    "&:hover > div:before": {
        borderBottom: "1px solid #ffffff",
    },
    "& div:before:hover": {
        borderBottom: "1px solid red",
    },
    "& label": {
        color: "#ffffff",
    },
    color: "#ffffff",
    // borderBottom: "#ffffff",
    marginTop: "10px",
    "&:hover": {
        borderBottomColor: "#ffffff",
    },
    // "& .css-1pnmrwp-MuiTypography-root": {
    //     color: "#ffffff",
    // },
    // "& .css-1yana92-MuiInputBase-root-MuiInput-root": {
    //     color: "#ffffff",
    //     borderBottom: "1px solid #ffffff",
    // },
    // "& label": {
    //     color: "#ffffff",
    // },
    // "& .css-1x5krvu-MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
    //     color: "#ffffff",
    // },
    // "& .css-1gl19ua-MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
    //     color: "#ffffff",
    // },
    // ".css-1yana92-MuiInputBase-root-MuiInput-root.Mui-error:after": {
    //     borderBottomColor: "#ffffff",
    // },
    // "& .css-1yana92-MuiInputBase-root-MuiInput-root.Mui-error:before": {
    //     borderBottomColor: "#ffffff",
    //     "&:hover": {
    //         borderBottomColor: "#ffffff",
    //     },
    // },
    // "& .css-1gl19ua-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    //     color: "#ffffff",
    // },
});

// const LinkStyle = styled(Link)`
// my: { xs: 0.5, sm: 0.7, md: 2 },
// textAlign: "center",
// fontFamily: "Poppins",
// fontWeight: "500",
// color: "#ffffff",
// `
// '& .MuiInput-underline:after':{
//   borderBottomColor: '#ffffff'
// }

const SignUp = () => {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [phone, setphone] = useState("");
    const [err, setError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const togglePassword = () => {
        setEye(!eye);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !phone || !password) {
            setError(true);
            return false;
        }
        setDisableButton(true);

        try {
            const response = await axiosClient.post("/v2/userCreation", {
                email,
                phone,
                password,
            });
            console.log(response);
            setDisableButton(false);
            if (response.status === "ok") {
                toast.success("Otp has been sent ");
                setDisableButton(false);
                navigate(`/user/signup/varify/${email}`, {
                    state: { phone, password },
                });
                // navigate("/user/otp",{state:email})
            }
        } catch (error) {
            // console.log(error);
            if (error.status === "error" && error.statusCode === 409) {
                setError(true);
                setEmailExists(error.message);
                setDisableButton(false);
            }
        }
    };
    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "calc(100% - 30px)",
                    position: "fixed",
                },
                m: "0px auto",
                p: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                    <MobileImageStyle src="/hand image.png" alt="img" />
                </Box>
                <Box>
                    <Card
                        sx={{
                            p: { xs: "10px", sm: "35px", md: "52px" },
                            width: { xs: "100%", sm: "100%", md: "500px" },
                            background: "#1F51C6",
                            borderRadius: "10px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                fontSize: {
                                    xs: "1.563rem",
                                    sm: "1.875rem",
                                    md: "2.5rem",
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
                            Create Account
                        </Typography>
                        <form onSubmit={handleSignUp}>
                            <Stack>
                                <TextFeildStyle
                                    color="secondary"
                                    autoFocus
                                    onChange={(e) => setphone(e.target.value)}
                                    variant="standard"
                                    type="phone"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{ color: "#ffffff" }}
                                            >
                                                +91
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={err && !phone ? true : false}
                                    helperText={
                                        err && !phone ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <ErrorIcon
                                                    sx={{ fontSize: "15px" }}
                                                />{" "}
                                                &nbsp; Phone is required !
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                />
                                <TextFeildStyle
                                    color="secondary"
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="standard"
                                    label="Email Address"
                                    InputLabelProps={{
                                        className: "lableStyle",
                                    }}
                                    error={
                                        err && !email
                                            ? true
                                            : false || (err && emailExists)
                                            ? true
                                            : false || (err && invalidEmail)
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        err && !email ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <ErrorIcon
                                                    sx={{ fontSize: "15px" }}
                                                />
                                                &nbsp; Email is required !
                                            </Box>
                                        ) : "" || (err && emailExists) ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <ErrorIcon
                                                    sx={{ fontSize: "15px" }}
                                                />
                                                &nbsp;
                                                {emailExists}
                                            </Box>
                                        ) : "" || (err && invalidEmail) ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <ErrorIcon
                                                    sx={{ fontSize: "15px" }}
                                                />
                                                &nbsp; Plase Enter a Valid Email
                                                Address
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                />
                                <TextFeildStyle
                                    color="secondary"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    variant="standard"
                                    label="Password"
                                    type={eye ? "text" : "password"}
                                    InputLabelProps={{
                                        className: "lableStyle",
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePassword}
                                                >
                                                    {eye ? (
                                                        <AiFillEye color="#ffffff" />
                                                    ) : (
                                                        <AiFillEyeInvisible color="#ffffff" />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={
                                        err && !password
                                            ? true
                                            : false || (err && emailExists)
                                            ? true
                                            : false || (err && invalidEmail)
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        err && !password ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: "#FFDF41",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <ErrorIcon
                                                    sx={{ fontSize: "15px" }}
                                                />
                                                &nbsp; Password is required!
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                />
                                <Typography
                                    onClick={() =>
                                        navigate("/medidek/terms&PrivacyPolicy")
                                    }
                                    sx={{
                                        my: { xs: 1, sm: 1, md: 2 },
                                        fontFamily: "Poppins",
                                        color: "#ffffff",
                                        fontWeight: "500",
                                    }}
                                >
                                    By continuing, you agree to Medidek’s Terms
                                    of Service & Privacy Policy
                                </Typography>
                                <LoadingButton
                                    size="small"
                                    fullWidth
                                    type="submit"
                                    loading={disableButton}
                                    // loadingPosition="end"
                                    variant="contained"
                                    sx={{
                                        my: { xs: 0.5, sm: 0.7, md: 1 },
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: { xs: "1rem", md: "1.25rem" },
                                        textTransform: "none",
                                        background: "#ffffff",
                                        color: "#383838",
                                        height: "32px",
                                        boxShadow: "none",
                                        borderRadius: "53px",
                                        "&:hover": {
                                            background: "#d9d9d9",
                                        },
                                    }}
                                >
                                    <span>Sign Up</span>
                                </LoadingButton>
                                {/* <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    my: { xs: 0.5, sm: 0.7, md: 1 },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    background: "#ffffff",
                                    color: "#383838",
                                    borderRadius: "53px",
                                    "&:hover": {
                                        background: "#d9d9d9",
                                    },
                                }}
                            >
                                Continue
                            </Button> */}
                                {/* <Button
                                    variant="contained"
                                    sx={{
                                        my: { xs: 0.5, sm: 0.7, md: 1 },
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize:'18px',
                                        textTransform: "none",
                                        background: "#ffffff",
                                        height:'35px',
                                        color: "#383838",
                                        borderRadius: "53px",
                                        "&:hover": {
                                            background: "#d9d9d9",
                                            cursor:'no-drop'
                                        },
                                    }}
                                >
                                    <FcGoogle size={"20px"} />
                                    &nbsp; Sign Up with Google
                                </Button> */}
                                <Link
                                    to="/user/signin"
                                    style={{
                                        margin: "10px auto",
                                        textAlign: "center",
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        color: "#ffffff",
                                    }}
                                >
                                    Already have an account? Click Here.
                                </Link>
                            </Stack>
                        </form>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
