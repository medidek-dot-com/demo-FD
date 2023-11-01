import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { registerApi } from "../../Services/Apis";
import { axiosClient } from "../../Utils/axiosClient";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import SaveIcon from "@mui/icons-material/Save";
import OTPInput, { ResendOTP } from "otp-input-react";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";
import validator from "validator";

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
    [`& input[type = "number"]::-webkit-inner-spin-button`]: {
        display: "none",
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

const MsignUp = () => {
    // const [inputData, setInputData] = useState({
    //     email: "",
    //     phone: "",
    //     role: "HOSPITAL",
    // });

    let [phone, setPhone] = useState("");
    let [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [OTP, setOTP] = useState("");
    // const [Otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [couter, setCouter] = useState(59);
    const [showOTP, setShowOTP] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);

    const [signUpActive, setSignUpActive] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    // const [invalidOtp, setInvalidOtp] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [err, setError] = useState(false);
    const dispatch = useDispatch();
    const [manyReq, setManyReq] = useState("");

    const togglePassword = () => {
        setEye(!eye);
    };

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => {},
                },
                auth
            );
        }
    }

    const isUserExist = async (e) => {
        e.preventDefault();
        setDisableButton(true);

        if (!email || !password || !phone) {
            setDisableButton(false);
            setError(true);
            return false;
        }
        email = email.trim();
        if (phone.length != 10) {
            setDisableButton(false);
            setError(true);
            return setInvalidPhone(true);
        }
        
        if (!validator.isEmail(email)) {
            setDisableButton(false);
            setError(true);
            return setInvalidEmail(true);
        }
        setDisableButton(true);
        phone = phone.trim();

        try {
            const response = await axiosClient.post("/v2/isUserExist", {
                phone,
                email,
            });
            setDisableButton(true);
            console.log(response);
            if (response.status === "ok") {
                console.log(response.status);
                if (response.result.phone == phone) {
                    console.log(response.result.phone);
                    setDisableButton(false);
                    setError(true);
                    return setPhoneExists(true);
                } else if (response.result.email == email) {
                    console.log(response.result.phone);
                    setDisableButton(false);
                    setError(true);
                    return setEmailExists(true);
                }
            }
        } catch (error) {
            setDisableButton(false);
            if (error.statusCode === 404) {
                return onSignup();
            } else {
                return toast.error(error.message);
            }
        }
    };

    function onSignup() {
        setDisableButton(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+91" + phone;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setDisableButton(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error?.code);
                console.log(error?.message);
                if (error?.code === "auth/captcha-check-failed") {
                    toast.error("Something went wrong");
                    return;
                } else if (
                    error?.message ===
                    "reCAPTCHA client element has been removed: 0"
                ) {
                    toast.error("Something went wrong");
                    setDisableButton(false);
                } else {
                    toast.error(error.code);
                    setDisableButton(false);
                }
                // setManyReq(error.code);
            });
    }

    function onOTPVerify() {
        setInvalidOtp(false);
        setDisableButton(true);
        window.confirmationResult
            .confirm(OTP)
            .then(async (res) => {
                console.log(res);
                toast.success("OTP verified successfully!");
                setUser(res.user);
                setDisableButton(false);
            })
            .catch((err) => {
                setInvalidOtp(true);
                console.log(err.message);
                console.log(err.code);
                setDisableButton(false);
            });
    }

    const signUpUser = async () => {
        phone = phone.trim();
        email = email.trim();

        try {
            const response = await axiosClient.post("/v2/userCreation", {
                phone,
                email,
                password,
                rol: "HOSPITAL",
            });

            if (response.status === "ok") {
                navigate(`/master/user/profile/${response.result.user._id}`);
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                dispatch(login(response.result.user));
            }
        } catch (error) {
            return toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            signUpUser();
        }
    }, [user]);

    useEffect(() => {
        const timer =
            couter > 0 && setInterval(() => setCouter(couter - 1), 1000);
        return () => clearInterval(timer);
    }, [couter]);

    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //     if (!email || !password) {
    //         setError(true);
    //         return false;
    //     }
    //     setDisableButton(true);

    //     try {
    //         const response = await axiosClient.post("/v2/sendotp", {
    //             email,
    //             password,
    //         });
    //         console.log(response);
    //         setDisableButton(false);
    //         if (response.status === "ok") {
    //             toast.success("Otp has been sent ");
    //             setDisableButton(false);
    //             navigate(`/master/login/verify/${email}`, { state: password });
    //             // navigate("/user/otp",{state:email})
    //         }
    //     } catch (error) {
    //         // console.log(error);
    //         if (error.status === "error" && error.statusCode === 409) {
    //             setError(true);
    //             setEmailExists(error.message);
    //             setDisableButton(false);
    //         }
    //     }
    // };

    return (
        <Container
            sx={{
                width: "80%",
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                // flexWrap:'wrap'
                // position:'relative'
            }}
        >
            {/* <div id="recaptcha-container"></div> */}
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
                <div id="recaptcha-container"></div>
                {!showOTP ? (
                    <Card
                        sx={{
                            mx: "auto",
                            p: 3,
                            // width: "100%",
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
                                    fontSize: {
                                        xs: "1rem",
                                        lineHeight: "18.78px",
                                    },
                                    color: signUpActive ? "#383838" : "#ffffff",
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => navigate("/")}
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
                                        color: signUpActive
                                            ? "#ffffff"
                                            : "#383838",
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                        {/* </ButtonGroup> */}
                        <form onSubmit={isUserExist}>
                            <TextFiledStyle
                                autoFocus
                                type="number"
                                fullWidth={true}
                                name="email"
                                size="small"
                                label="Enter Your Phone Number"
                                // error={err && !email && true}
                                error={
                                    err && !phone
                                        ? true
                                        : false || (err && phoneExists)
                                        ? true
                                        : false || (err && invalidPhone)
                                        ? true
                                        : false
                                }
                                helperText={
                                    err && !phone
                                        ? "Phone Number is required"
                                        : "" || (err && phoneExists)
                                        ? "Phone Number already exists"
                                        : "" || (err && invalidPhone)
                                        ? "Plase Enter a Valid phone number"
                                        : ""
                                }
                                // helperText={
                                //     err && !email && "Please enter your email"
                                // }
                                onChange={(e) =>
                                    setPhone(e.target.value) &
                                    setError(false) &
                                    setPhoneExists(false) &
                                    setInvalidPhone(false)
                                }
                            />
                            <TextFiledStyle
                                fullWidth={true}
                                name="email"
                                size="small"
                                label="Enter Your Email"
                                // error={err && !email && true}
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
                                        ? "Email already exists"
                                        : "" || (err && invalidEmail)
                                        ? "Plase Enter a Valid Email Address"
                                        : ""
                                }
                                // helperText={
                                //     err && !email && "Please enter your email"
                                // }
                                onChange={(e) =>
                                    setEmail(e.target.value) &
                                    setError(false) &
                                    setInvalidEmail(false) &
                                    setEmailExists(false)
                                }
                                onKeyUpCapture={(e) => e.preventDefault()}
                            />
                            <TextFiledStyle
                                fullWidth={true}
                                size="small"
                                name="password"
                                label="Please Set Your Password "
                                type={eye ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePassword}
                                            >
                                                {eye ? (
                                                    <AiFillEye color="#1F51C6" />
                                                ) : (
                                                    <AiFillEyeInvisible color="#1F51C6" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={err && !password ? true : false}
                                helperText={
                                    err && !password
                                        ? "Password is required"
                                        : ""
                                }
                                onChange={(e) =>
                                    setPassword(e.target.value) &
                                    setError(false)
                                }
                            />

                            <LoadingButton
                                // onClick={onSignup}
                                type="submit"
                                size="small"
                                fullWidth
                                // type="submit"
                                loading={disableButton}
                                // loadingPosition="end"
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    borderRadius: 40,
                                    textTransform: "none",
                                    cursor: disableButton
                                        ? "not-allowed"
                                        : "pointer",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "Lato",
                                        fontWeight: "700",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Sign Up
                                </span>
                            </LoadingButton>

                            {/* <Button
                            type="submit"
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
                           
                            Signup
                        </Button> */}
                            {/* <Link
                            to="/master/signin"
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
                            // sx={{ display: "block", mt: 2, borderRadius: 40, textTransform:'none' }}
                        >
                            Already have an account Sign In
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
                            Sign Up with Mobile instead
                        </Link> */}
                        </form>
                    </Card>
                ) : (
                    <Card
                        sx={{
                            mx: "auto",
                            p: 3,
                            // width: "100%",
                            // height: "80%",
                            border: " 1px solid #706D6D61",
                            borderRadius: "13px",
                            boxShadow: "none",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                fontWeight: "700",
                                mt: "35px",
                                mb: "16px",
                                lineHeight: "34.05px",
                            }}
                        >
                            {" "}
                            Verification code
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                mb: "24px",
                                color: "#706D6D",
                                lineHeight: "19.2px",
                            }}
                        >
                            We have sent the code verification to
                            <Box component={"span"} sx={{ color: "#1F51C6" }}>
                                &nbsp; {phone}
                            </Box>
                        </Typography>
                        {/* <TextField/> */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "center",
                            }}
                        >
                            <Box sx={{ width: "100%", textAlign: "center" }}>
                                <OTPInput
                                    value={OTP}
                                    onChange={setOTP}
                                    inputStyles={{
                                        width: "45px",
                                        height: "57px",
                                        borderRadius: "5px",
                                        border: "1px solid #706D6D8A",
                                        margin: "0 4px",
                                    }}
                                    autoFocus
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                />

                                <Typography
                                    sx={{
                                        mt: 2,
                                        color: invalidOtp ? "red" : "#1F51C6",
                                    }}
                                >
                                    {(couter === 0 && (
                                        <Button
                                            onClick={onSignup}
                                            sx={{ color: "1F51C6" }}
                                        >
                                            Resend Otp
                                        </Button>
                                    )) ||
                                        `Resend OTP in ${couter} seconds`}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            component="span"
                            sx={{
                                color: "red",
                                textAlign: "center",
                                display: "block",
                            }}
                        >
                            {invalidOtp && "Invalid OTP"}
                        </Box>
                        {/* <Typography
                            sx={{
                                mt: 2,
                                color: invalidOtp ? "red" : "#706D6D",
                            }}
                        >
                            {(couter === 0 && (
                                <Button onClick={resendOtp}>Resend Otp</Button>
                            )) ||
                                `Resend OTP in ${couter} seconds`}
                        </Typography> */}
                        <LoadingButton
                            onClick={onOTPVerify}
                            fullWidth
                            loading={disableButton}
                            variant="contained"
                            sx={{
                                mt: 2,
                                borderRadius: 40,
                                textTransform: "none",
                                my: 2,
                                width: "100%",
                                boxShadow: "none",
                            }}
                        >
                            <span>Sign Up</span>
                        </LoadingButton>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default MsignUp;
