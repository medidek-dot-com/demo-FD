import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Card,
    Container,
    IconButton,
    InputAdornment,
    Snackbar,
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
import OTPInput, { ResendOTP } from "otp-input-react";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import validator from "validator";
import { selectedDoctorsData } from "../../Store/doctorDataSlice";

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
    // '& input:-internal-autofill-selected': {
    //     'background-color':'#ffffff !important',
    //     '-webkit-box-shadow': 'none',
    //     '-webkit-text-fill-color': 'red',
    // },
    // [`& div:-webkit-autofill`]: {
    //     background: "blue",
    //     '-webkit-background-color': 'yellow',
    //     '-webkit-text-fill-color': 'yellow',
    // },

    // input:-webkit-autofill{
    //     -webkit-text-fill-color: yellow !important;
    // }

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

const DoctorSignUp = () => {
    // const [inputData, setInputData] = useState({
    //     email: "",
    //     phone: "",
    // });

    let [phone, setPhone] = useState("");
    let [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("DOCTOR");
    const [showOTP, setShowOTP] = useState(false);
    const [OTP, setOTP] = useState("");
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [user, setUser] = useState(null);
    const [couter, setCouter] = useState(70);
    const [signUpActive, setSignUpActive] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [notOtp, setNotOtp] = useState(false);
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [err, setError] = useState(false);
    const [catchError, setCatchError] = useState(null);
    const dispatch = useDispatch();

    const togglePassword = () => {
        setEye(!eye);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError(true);
            return false;
        }
        setDisableButton(true);

        try {
            const response = await axiosClient.post("/v2/userCreation", {
                email,
                password,
                rol,
                phone,
            });
            console.log(response);
            setDisableButton(false);
            if (response.status === "ok") {
                toast.success("Otp has been sent ");
                setDisableButton(false);

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
                return setCatchError(error.message);
            }
        }
    };

    function onSignup() {
        setOTP("");
        setInvalidOtp(false);
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
                console.log(error);
                if (error == "reCAPTCHA client element has been removed") {
                    console.log("too many attemps");
                }
                if (error?.code === "auth/captcha-check-failed") {
                    return;
                } else {
                    setCatchError("Something went wrong");
                    return setDisableButton(false);
                }
            });
    }

    function onOTPVerify() {
        setDisableButton(true);
        if (!OTP) {
            setDisableButton(false);
            return setNotOtp(true);
        }
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
                rol,
            });

            if (response.status === "ok") {
                console.log(response);
                dispatch(login(response.result.user));
                dispatch(selectedDoctorsData(response.result.user));
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                navigate(`/doctor/edit-profile/${response.result.user._id}`);
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

    return (
        <Container
            sx={{
                width: "80%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                // flexWrap:'wrap'
                // position:'relative'
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
                                fontSize: "29px",
                                lineHeight: "34.05px",
                            }}
                        >
                            Hi, Welcome
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
                                type="number"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                autoFocus
                                fullWidth={true}
                                name="phone"
                                size="small"
                                label="Enter Your phone"
                                // error={err && !email && true}
                                error={
                                    err && !email
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
                                size="small"
                                fullWidth
                                type="submit"
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
                                    Signup
                                </span>
                            </LoadingButton>

                            {/* <Snackbar open={catchError} autoHideDuration={6000} onClose={()=>setCatchError(false)}>
                                <Alert  onClose={()=>setCatchError(false)} severity="error" sx={{ width: '100%' }}>
                                {catchError} jjnknjk
                                </Alert>
                              </Snackbar> */}

                            {catchError && (
                                <Alert
                                    onClose={() => setCatchError(false)}
                                    sx={{ mt: "10px" }}
                                    severity="error"
                                >
                                    {catchError}
                                </Alert>
                            )}
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
                            to="/doctor/signin"
                            style={{
                                marginTop: "16px",
                                display: "block",
                                textAlign: "center",
                                textDecoration: "none",
                                color: "#1F51C6",
                            }}
                            // sx={{ display: "block", mt: 2, borderRadius: 40, textTransform:'none' }}
                        >
                            Already have an account Sign In
                        </Link> */}
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
                            <Box sx={{ width: "100%" }}>
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
                                        textAlign: "center",
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
                            {(invalidOtp && "Invalid OTP") ||
                                (notOtp && OTP && "Please enter otp")}
                        </Box>
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

export default DoctorSignUp;
