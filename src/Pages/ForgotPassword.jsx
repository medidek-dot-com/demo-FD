import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { axiosClient } from "../Utils/axiosClient";
import OTPInput, { ResendOTP } from "otp-input-react";
import { auth } from "../firebase.config";
import LoadingButton from "@mui/lab/LoadingButton";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";

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
});

const ForgotPassword = () => {
    const [phone, setPhone] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [OTP, setOTP] = useState("");
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [userData, setUserData] = useState({});
    const [user, setUser] = useState(null);
    const [couter, setCouter] = useState(59);
    const [err, setError] = useState(false);


    const sendOtp = async () => {
        setDisableButton(true);
        if(!phone){
            setDisableButton(false);
           return setError(true)
        }
        try {
            const response = await axiosClient.post("/v2/forgotpassword", {
                phone,
            });
            if (response.status === "ok") {
                setDisableButton(false);
                setUserData(response.result);
                // setShowOTP(true);
                requestForForgotPasssword();
            }
        } catch (error) {
            if (error.statusCode === 404) {
                setDisableButton(false);
                return setNotFound(true);
            }
        }
    };
    console.log(userData);

    function onOTPVerify() {
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
                console.log(err);
                setDisableButton(false);
            });
    }

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

    function requestForForgotPasssword() {
        console.log("fuction called");
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
                toast.error(error.code)
                setDisableButton(false);
            });
    }

    useEffect(() => {
        const timer =
            couter > 0 && setInterval(() => setCouter(couter - 1), 1000);
        return () => clearInterval(timer);
    }, [couter]);

    return (
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "100%" },
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: "5px",
            }}
        >
            {user ? (
                <ForgotPasswordForm userData={userData} />
            ) : (
                <div>
                    <div id="recaptcha-container"></div>

                    {!showOTP ? (
                        <Box
                            sx={{
                                padding: "30px",
                                width: { xs: "100%", sm: "100%", md: "396px" },
                                borderRadius: "10px",
                                background: "#1F51C6",
                                display: "flex",
                                gap:'10px',
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: "Raleway",
                                    fontWeight: "700",
                                    fontSize: "1.5rem",
                                    color: "#FFFFFF",
                                }}
                            >
                                Forgot Password?
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.75rem",
                                    color: "#D9D9D9",
                                    textAlign: "center",
                                }}
                            >
                                Please enter your Mobile number so we can send
                                you a verification code
                            </Typography>
                            <TextFeildStyle
                                onChange={(e) =>
                                    setPhone(e.target.value) &
                                    setNotFound(false)
                                }
                                autoFocus
                                color="secondary"
                                variant="standard"
                                type="number"
                                error={
                                    err && !phone
                                        ? true
                                        : false
                                }
                                helperText={
                                    err && !phone
                                        ? "Phone Number is required"
                                        : ""
                                }
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
                                sx={{ width: "100%" }}
                            />
                            {notFound && (
                                <Typography
                                    sx={{
                                        color: "yellow",
                                        mt: "10px",
                                        fontFamily: "Lato",
                                        fontWeight: "700",
                                    }}
                                >
                                    User Not Found!
                                </Typography>
                            )}
                            <LoadingButton
                                size="small"
                                fullWidth
                                onClick={sendOtp}
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
                                <span>Send Otp</span>
                            </LoadingButton>
                        </Box>
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
                                </Box>
                            </Box>
                            <Typography
                                sx={{
                                    mt: 2,
                                    color: invalidOtp ? "red" : "#1F51C6",
                                    textAlign:'center',
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
                                <span>Verify Otp </span>
                            </LoadingButton>
                        </Card>
                    )}
                </div>
            )}

            {/* {user && <ForgotPasswordForm/>} */}
        </Box>
    );
};

export default ForgotPassword;
