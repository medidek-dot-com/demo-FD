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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    KEY_ACCESS_TOKEN,
    PATIENT_USER,
    setItem,
} from "../../Utils/localStorageManager";
import { login } from "../../Store/authSlice";

const MobileImageStyle = styled("img")({
    position: "fixed",
    bottom: 0,
});

const TextFeildStyle = styled(TextField)({
    color: "#ffffff",
    borderBottom: "#ffffff",
    marginTop: "10px",
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
        color:"yellow"
    },
    '& .MuiFormLabel-root-MuiInputLabel-root.Mui-error':{
        color:"yellow",
    },
    "& div:before:hover": {
        borderBottom: "1px solid #ffffff",
    },
    "& label": {
        color: "#ffffff",
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    // "&:hover": {
    //     borderBottomColor: "#ffffff",
    // },
    // "& .css-1pnmrwp-MuiTypography-root": {
    //     color: "#ffffff",
    // },
    // "& .css-1yana92-MuiInputBase-root-MuiInput-root": {
    //     color: "#ffffff",
    //     borderBottom: "1px solid #ffffff",
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
// '& .MuiInput-underline:after':{
//   borderBottomColor: '#ffffff'
// }

const SignIn = () => {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    let [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    let [phone, setphone] = useState("");
    const [err, setError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const dispatch = useDispatch();
    const locationUrl = useLocation();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const inputStyles = {
        "&:hover": {
            backgroundColor: "#1F51C6", // Change background color on hover
        },
        "&:focus": {
            backgroundColor: "#1F51C6", // Change background color on focus
        },
    };

    const togglePassword = () => {
        setEye(!eye);
    };
    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError(true);
            return;
        }
        setDisableButton(true);
        email = email.trim();

        try {
            const response = await axiosClient.post(
                "/v2/FindUserByNameAndPassword",
                {
                    email,
                    password,
                    role:"PATIENT"
                }
            );
            console.log(response);
            if (response.status === "ok") {
                setDisableButton(false);
                console.log(response.result);
                dispatch(login(response.result.ispatient));
                navigate(
                    locationUrl?.state?.prevUrl
                        ? locationUrl?.state?.prevUrl
                        : "/"
                );

                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                setItem(PATIENT_USER, response.result.PATIENT_USER);

                // const userData = await axiosClient.get("/v2/masterData");
                // console.log(userData.result.user.nameOfhospitalOrClinic);
                // setItem(HOSPITAL_ID, userData.result.user._id);

                toast.success("Sign in successfully");
                // if (userData.result.user.nameOfhospitalOrClinic) {
                //     // window.location.href = `/master/user/home/${userData.result.user._id}`
                //     navigate(`/master/user/home/${userData.result.user._id}`);
                // } else {
                //     // window.location.href = `/master/user/profile`
                //     navigate(
                //         `/master/user/profile/${userData.result.user._id}`
                //     );
                // }
            }
        } catch (error) {
            if (error.status === "error" && error.statusCode === 404) {
                setError(true);
                setInvalidEmail(error.message);
                setDisableButton(false);
            } else if (error.status === "error" && error.statusCode === 403) {
                setError(true);
                setWrongPassword(error.message);
                setDisableButton(false);
            }
            console.log(error);
        }
    };
    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 30px)",
                    },
                    position: "fixed",
                    // top:0,
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
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    >
                        <MobileImageStyle src="/hand image.png" alt="" />
                    </Box>
                    {/* <Box sx={{width:'100%'}}> */}
                    <Card
                        sx={{
                            p: {
                                xs: "0.625rem",
                                sm: "2.188rem",
                                // md: "3.25rem",
                            },
                            // px: { xs: "20px", sm: "30px", md: "68px" },
                            width: { xs: "100%", sm: "100%", md: "500px" },
                            // height: { xs: "max-content", sm: "450px", md: "500px" },
                            borderRadius: "10px",
                            background: "#1F51C6",
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
                                // backgroundColor: "red",
                                color: "#ffffff",
                                textAlign: {
                                    xs: "center",
                                    sm: "center",
                                    md: "left",
                                },
                            }}
                        >
                            Welcome Back!
                        </Typography>
                        <form onSubmit={handleSignIn}>
                            <Stack spacing="10px">
                                {/* <input type="text" style={{background:'#1F51C6', '&:focus':{background:'red'}, height:'41px', border:'none', borderBottom:'1px solid red'}}/> */}
                                <TextFeildStyle
                                    color="secondary"
                                    autoFocus
                                    onChange={(e) =>
                                        setEmail(e.target.value) &
                                        setError(false) &
                                        setInvalidEmail(false)
                                    }
                                    variant="standard"
                                    label="Email Address"
                                    InputProps={{ style: inputStyles }}
                                    error={
                                        err && !email
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
                                                &nbsp;
                                                {invalidEmail}
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
                                        setPassword(e.target.value) &
                                        setError(false) &
                                        setWrongPassword(false)
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
                                            : false || (err && wrongPassword)
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
                                        ) : "" || (err && wrongPassword) ? (
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
                                                {wrongPassword}
                                            </Box>
                                        ) : (
                                            ""
                                        )
                                    }
                                />
                                <Link
                                    to="/forgot-password"
                                    style={{
                                        textAlign: "right",
                                        color: "#ffffff",
                                        textDecoration: "none",
                                        fontFamily: "Lato",
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Forgot Password?
                                </Link>
                                {/* <Typography
                            onClick={()=>navigate('/medidek/terms&PrivacyPolicy')}
                                sx={{
                                    my: { xs: 1, sm: 1, md: 2 },
                                    fontFamily: "Poppins",
                                    color: "#ffffff",
                                    fontWeight: "500",
                                    fontSize:'0.938rem',
                                }}
                            >
                                By continuing, you agree to Medidek’s Terms of
                                Service & Privacy Policy
                            </Typography> */}
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
                                        textTransform: "none",
                                        fontSize: { xs: "1rem", md: "1.25rem" },
                                        background: "#ffffff",
                                        height: "32px",
                                        color: "#383838",
                                        borderRadius: "53px",
                                        boxShadow: "none",
                                        "&:hover": {
                                            background: "#d9d9d9",
                                        },
                                    }}
                                >
                                    <span>Sign In</span>
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
                            // disabled
                                variant="contained"
                                sx={{
                                    my: { xs: 0.5, sm: 0.7, md: 1 },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    background: "#d9d9d9",
                                    fontSize:'20px',
                                    color: "#383838",
                                    borderRadius: "53px",
                                    height:'35px',
                                    cursor:'no-drop',
                                    "&:hover": {
                                        background: "#d9d9d9",
                                        cursor:'no-drop',
                                    },
                                }}
                            >
                                <FcGoogle size={"20px"} />
                                &nbsp; Sign Up with Google
                            </Button> */}

                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontFamily: "Lato",
                                        fontWeight: "medium",
                                        color: "#ffffff",
                                    }}
                                >
                                    Don't have an account?
                                </Typography>
                                <Link
                                    to="/user/signup"
                                    style={{
                                        // margin: "10px auto",
                                        textAlign: "center",
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        color: "#ffffff",
                                        cursor: "pointer",
                                    }}
                                >
                                    Click Here.
                                </Link>
                            </Stack>
                        </form>
                    </Card>

                    {/* <Card className="signup-card">
                    <Typography variant="h5">Create Account</Typography>
                    <form className="form">
                            <TextFeildStyle
                                variant="standard"
                                type="phone"
                                InputLabelProps={{ className: "lableStyle" }}
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            +91
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextFeildStyle
                                className="input"
                                variant="standard"
                                label="Email Address"
                                InputLabelProps={{ className: "lableStyle" }}
                            />
                            <TextFeildStyle
                                className="textFeild"
                                variant="standard"
                                label="Password"
                                type={eye ? "text" : "password"}
                                InputLabelProps={{ className: "lableStyle" }}
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
                            />
                            <Typography component={"p"} className="terms-con">
                                By continuing, you agree to Medidek’s Terms of
                                Service & Privacy Policy
                            </Typography>
                            <Button variant="contained" className="btn">
                                Continue
                            </Button>
                            <Button variant="contained" className="btn">
                                <FcGoogle size={"20px"} />
                                &nbsp; Sign Up with Google
                            </Button>
                            <Typography
                                component={"p"}
                                className="already-have-acc"
                            >
                                Already have an account? Click Here.
                            </Typography>
                        </form>
                </Card> */}
                    {/* </Box> */}
                </Box>
            </Box>
        </>
    );
};

export default SignIn;
