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
    font-family: Raleway;
    font-weight: 600;
    font-size: 1rem;
`;

const MsignUpIn = () => {
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
        console.log("clicked");
        if (!email || !password) {
            setError(true);
            return;
        }
        setDisableButton(true);
        email = email.trim();

        try {
            const response = await axiosClient.post("/v2/FindUserByNameAndPassword", {
                email,
                password,
                role:"MASTER"
            });

            if (response.status === "ok") {
                console.log("signin successful bcccccc");
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                // setItem(MASTER_USER, response.result.MASTER_USER);

                dispatch(login(response.result.ishospital));
                // const userData = await axiosClient.get("/v2/masterData");

                if (response.result.ishospital.nameOfhospitalOrClinic) {
                    console.log(response.result.ishospital.nameOfhospitalOrClinic)
                    return navigate(
                        `/master/user/home/${response.result.ishospital._id}`
                    );
                } else {
                    console.log(response.result.ishospital.nameOfhospitalOrClinic)
                    navigate(
                        `/master/user/profile/${response.result.ishospital._id}`
                    );
                }
                

                toast.success("Sign in successfully");
                console.log(response.result.ishospital.nameOfhospitalOrClinic);
                
            }
        } catch (error) {
            if (error.status === "error" && error.statusCode === 404) {
                setError(true);
                setEmailExists(error.message);
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
                height: "90vh",
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
                <img
                    src="/m-logonew.png"
                    alt="logo"
                    style={{
                        width: 110,
                        display: "block",
                        marginLeft: "auto",
                        marginTop: 10,
                        position: "absolute",
                        right: 0,
                        top: -40,
                    }}
                />
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
                            fontSize: {
                                xs: "1.5rem",
                                sm: "1.6rem",
                                md: "1.813rem",
                            },
                        }}
                    >
                        Hi, Welcome 👋
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
                            onClick={() => navigate("/master/signin")}
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
                            onClick={() => navigate("/master/signup")}
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
                                    ? "Plase Enter a Valid Email Address"
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
                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Link
                                to="/forgot-password"
                                style={{
                                    alignSelf: "flex-end",
                                    textDecoration: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "bolder",
                                    marginLeft: "auto",
                                    textAlign: "right",
                                    display: "block",
                                    color: "#1F51C6",
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </Box>

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
                        to="/master/signup"
                        style={{
                            marginTop: "16px",
                            display: "block",
                            textAlign: "center",
                            textDecoration: "none",
                            color: "#1F51C6",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "1rem",
                        }}
                    >
                        Don't have an account Sign Up
                    </Link> */}
                    {/* <Link
                        to="/master/signup"
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

export default MsignUpIn;
