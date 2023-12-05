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
import ErrorIcon from "@mui/icons-material/Error";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { axiosClient } from "../../Utils/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import OTPInput, { ResendOTP } from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import { login } from "../../Store/authSlice";
import { useDispatch } from "react-redux";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import Footer from "../../Components/Footer/Footer";

const MobileImageStyle = styled("img")({
    position: "absolute",
    bottom: -20,
});

const TextFeildStyle = styled(TextField)({
    [`& input`]: {
        color: "#ffffff",
    },
    [`& input[type = "number"]::-webkit-inner-spin-button`]: {
        display: "none",
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
    let [phone, setPhone] = useState("");
    let [email, setEmail] = useState("");
    const [eye, setEye] = useState(false);
    const [password, setPassword] = useState("");
    const [err, setError] = useState(false);
    const [rol, setRol] = useState("PATIENT");
    const [asUser, setAsUser] = useState("");
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [couter, setCouter] = useState(59);
    const [showOTP, setShowOTP] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [OTP, setOTP] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const togglePassword = () => {
        setEye(!eye);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !phone || !password || !rol) {
            setError(true);
            return false;
        }
        setDisableButton(true);

        try {
            const response = await axiosClient.post("/v2/userCreation", {
                email,
                phone,
                password,
                rol,
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
        email = email.trim();

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
                    setAsUser(response.result.role);
                    return setPhoneExists(true);
                } else if (response.result.email == email) {
                    console.log(response.result.phone);
                    setDisableButton(false);
                    setError(true);
                    setAsUser(response.result.role);
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
                if (error?.code === "auth/captcha-check-failed") {
                    return;
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
                rol: "PATIENT",
            });

            if (response.status === "ok") {
                navigate("/");
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

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 30px)",
                        // position: "fixed",
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
                        background: {
                            xs: "url('/backgroundForMobileView.jpeg')",
                            sm: "",
                            md: "none",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    >
                        <MobileImageStyle src="/hand image.png" alt="img" />
                    </Box>
                    <Box>
                        <div id="recaptcha-container"></div>
                        {!showOTP ? (
                            <Card
                                sx={{
                                    p: { xs: "10px", sm: "35px", md: "52px" },
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "500px",
                                    },
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
                                <form onSubmit={isUserExist}>
                                    <Stack>
                                        <TextFeildStyle
                                            color="secondary"
                                            autoFocus
                                            onChange={(e) =>
                                                setPhone(e.target.value) &
                                                setError(false) &
                                                setPhoneExists(false) &
                                                setInvalidPhone(false)
                                            }
                                            variant="standard"
                                            type="number"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        sx={{
                                                            color: "#ffffff",
                                                        }}
                                                    >
                                                        +91
                                                    </InputAdornment>
                                                ),
                                            }}
                                            error={
                                                err && !phone
                                                    ? true
                                                    : false ||
                                                      (err && phoneExists)
                                                    ? true
                                                    : false ||
                                                      (err && invalidPhone)
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                err && !phone ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />{" "}
                                                        &nbsp; Phone Number is
                                                        required !
                                                    </Box>
                                                ) : "" ||
                                                  (err && phoneExists) ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />
                                                        &nbsp; Phone Number
                                                        already exists as a{" "}
                                                        {asUser} !
                                                    </Box>
                                                ) : "" ||
                                                  (err && invalidPhone) ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />
                                                        &nbsp; Plase Enter a
                                                        Valid phone number !
                                                    </Box>
                                                ) : (
                                                    ""
                                                )
                                            }
                                        />
                                        <TextFeildStyle
                                            color="secondary"
                                            onChange={(e) =>
                                                setEmail(e.target.value) &
                                                setError(false) &
                                                setInvalidEmail(false) &
                                                setEmailExists(false)
                                            }
                                            variant="standard"
                                            label="Email Address"
                                            InputLabelProps={{
                                                className: "lableStyle",
                                            }}
                                            error={
                                                err && !email
                                                    ? true
                                                    : false ||
                                                      (err && emailExists)
                                                    ? true
                                                    : false ||
                                                      (err && invalidEmail)
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                err && !email ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />
                                                        &nbsp; Email is required
                                                        !
                                                    </Box>
                                                ) : "" ||
                                                  (err && emailExists) ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />
                                                        &nbsp; Email already
                                                        exists as a {asUser}
                                                    </Box>
                                                ) : "" ||
                                                  (err && invalidEmail) ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />
                                                        &nbsp; Plase Enter a
                                                        Valid Email Address
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
                                                setError(false)
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
                                                            onClick={
                                                                togglePassword
                                                            }
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
                                                    : false ||
                                                      (err && emailExists)
                                                    ? true
                                                    : false ||
                                                      (err && invalidEmail)
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                err && !password ? (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "#FFDF41",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />
                                                        &nbsp; Password is
                                                        required!
                                                    </Box>
                                                ) : (
                                                    ""
                                                )
                                            }
                                        />
                                        <Typography
                                            onClick={() =>
                                                navigate(
                                                    "/medidek/terms&PrivacyPolicy"
                                                )
                                            }
                                            sx={{
                                                my: { xs: 1, sm: 1, md: 2 },
                                                fontFamily: "Poppins",
                                                color: "#ffffff",
                                                fontWeight: "500",
                                            }}
                                        >
                                            By continuing, you agree to
                                            Medidek’s Terms of Service & Privacy
                                            Policy
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
                                                fontSize: {
                                                    xs: "1rem",
                                                    md: "1.25rem",
                                                },
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
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                fontFamily: "Lato",
                                                fontWeight: "medium",
                                                color: "#ffffff",
                                            }}
                                        >
                                            Already have an account?
                                        </Typography>
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
                                            Click Here.
                                        </Link>
                                    </Stack>
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
                                    <Box
                                        component={"span"}
                                        sx={{ color: "#1F51C6" }}
                                    >
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
                                    <Box
                                        sx={{
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
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
                                                color: invalidOtp
                                                    ? "red"
                                                    : "#1F51C6",
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
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default SignUp;
