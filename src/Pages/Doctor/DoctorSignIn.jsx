import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { axiosClient } from "../../Utils/axiosClient";
import { toast } from "react-toastify";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoadingButton } from "@mui/lab";
import { login } from "../../Store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LadyImgStyle = styled("img")({
    width: "230px",
    // height:'90%',
    display: "block",
    margin: "0 auto",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
});

const TextFiledStyle = styled(TextField)({
    margin: "20px 0 10px 0",

    [`& input`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    [`& label`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    [`& fieldset`]: {
        borderRadius: "36px",
    },
});

const TabsOnImgStyle = styled(Typography)`
    margin: 15px;
    z-index: 1;
    border-radius: 30px;
    padding: 2px 13px;
    background: #1f51c6;
    width: max-content;
    color: #ffffff;
`;

const DoctorSignIn = () => {
    const [signUpActive, setSignUpActive] = useState(false);
    const navigate = useNavigate();
    let [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState(false);
    const [eye, setEye] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const dispatch = useDispatch();
    // const { isLoggedIn, user } = useSelector((state) => state.auth);

    const togglePassword = () => {
        setEye(!eye);
    };

    const handleCLick = async (e) => {
        e.preventDefault();
        console.log("clicked from doctor");
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
                    role: "DOCTOR",
                }
            );
            console.log(response);
            if (response.status === "ok") {
                setDisableButton(false);
                console.log(response.result);
                dispatch(login(response.result.isdoctor));
                navigate("/doctor/select-hospital");

                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
          

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
        <Container
            sx={{
                width: "80%",
                height: "100vh",
                // mt: 15,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                width={"370px"}
                sx={{
                    bgcolor: "#DCE3F6",
                    height: "70%",
                    mx: 5,
                    position: "relative",
                    borderRadius: "9px",
                    display: { xs: "none", sm: "block" },
                }}
            >
                <LadyImgStyle src="/lady-img-flip.png" alt="img" />
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        pb: 5,
                    }}
                >
                    <TabsOnImgStyle
                        component={"span"}
                        display={"flex"}
                        alignItems={"center"}
                    >
                        <HiOutlineDevicePhoneMobile size={"20px"} /> Book
                        Appointments
                    </TabsOnImgStyle>
                    <TabsOnImgStyle component={"span"} alignSelf={"end"}>
                        Medical Records
                    </TabsOnImgStyle>
                    <TabsOnImgStyle component={"span"}>
                        Appointment Tracking
                    </TabsOnImgStyle>
                </Box>
            </Box>
            <Box
                width={"370px"}
                sx={{
                    // bgcolor: "yellow",
                    // height: "70%",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    position: "relative",
                    mx: 5,
                }}
            >
                <Card
                    sx={{
                        mx: "auto",
                        p: 3,
                        // width: "80%",
                        // height: "80%",
                        border: " 1px solid #706D6D61",
                        borderRadius: "13px",
                        boxShadow: "none",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            fontFamily: "Raleway",
                            fontWeight: "700",
                            fontSize: "29px",
                            lineHeight: "34.05px",
                        }}
                    >
                        Hi, Welcome Back
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            fontFamily: "Raleway",
                            fontWeight: "700",
                            fontSize: "29px",
                            lineHeight: {
                                xs: "24px",
                                sm: "25px",
                                md: "34.05px",
                            },
                        }}
                    >
                        Doctor
                    </Typography>

                    <Box
                        sx={{
                            background: "#DCE3F6",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "36px",
                            my: 2,
                        }}
                    >
                        <Button
                            onClick={() => navigate("/doctor/signin")}
                            variant={!signUpActive ? "contained" : "text"}
                            fullWidth={true}
                            sx={{
                                borderRadius: "20px",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "700",
                                fontSize: { xs: "1rem", lineHeight: "18.78px" },
                                color: signUpActive ? "#383838" : "#ffffff",
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            onClick={() => navigate("/doctor/signup")}
                            variant={signUpActive ? "contained" : "text"}
                            fullWidth
                            sx={{
                                borderRadius: "20px",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "700",
                                fontSize: {
                                    xs: "1rem",
                                    lineHeight: "18.78px",
                                    color: signUpActive ? "#ffffff" : "#383838",
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <form onSubmit={handleCLick}>
                        <TextFiledStyle
                            autoFocus
                            fullWidth={true}
                            size="small"
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
                                err && !email
                                    ? "Email is required"
                                    : "" || (err && emailExists)
                                    ? emailExists
                                    : "" || (err && invalidEmail)
                                    ? invalidEmail
                                    : ""
                            }
                            label="Enter Your Email"
                            onChange={(e) =>
                                setEmail(e.target.value) &
                                setError(false) &
                                setEmailExists(false)
                            }
                        />
                        <TextFiledStyle
                            fullWidth={true}
                            size="small"
                            type={eye ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePassword}>
                                            {eye ? (
                                                <AiFillEye color="#1F51C6" />
                                            ) : (
                                                <AiFillEyeInvisible color="#1F51C6" />
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
                                err && !password
                                    ? "Password is required"
                                    : "" || (err && wrongPassword)
                                    ? wrongPassword
                                    : ""
                            }
                            label="Enter Your Password"
                            onChange={(e) =>
                                setPassword(e.target.value) &
                                setError(false) &
                                setWrongPassword(false)
                            }
                        />

                        <LoadingButton
                            size="small"
                            fullWidth
                            type="submit"
                            // onClick={handleCLick}
                            loading={disableButton}
                            // loadingPosition="end"
                            variant="contained"
                            sx={{
                                mt: 2,
                                display: "flex",
                                borderRadius: 40,
                                textTransform: "none",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                }}
                            >
                                Sign In
                            </span>
                        </LoadingButton>
                    </form>
                    {/* <Button
                        onClick={handleCLick}
                        fullWidth
                        disabled={disableButton}
                        variant="contained"
                        sx={{
                            mt: 2,
                            display: "flex",
                            borderRadius: 40,
                            textTransform: "none",
                        }}
                    >
                        Sign In
                    </Button> */}

                    {/* <Link
                        to="/doctor/signup"
                        style={{
                            marginTop: "16px",
                            display: "block",
                            textAlign: "center",
                            textDecoration: "none",
                            color: "#1F51C6",
                        }}
                    >
                        Don't have an account Sign Up
                    </Link> */}
                    {/* <Link
                        to="/doctor/signin"
                        style={{
                            marginTop: "16px",
                            display: "block",
                            textAlign: "center",
                            textDecoration: "none",
                            color: "#1F51C6",
                        }}
                    >
                        Login with Mobile instead
                    </Link> */}
                </Card>
            </Box>
        </Container>
    );
};

export default DoctorSignIn;
