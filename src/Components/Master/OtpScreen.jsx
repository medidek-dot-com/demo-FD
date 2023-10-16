import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Card,
    Container,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../../Utils/axiosClient";
import { useNavigate, useLocation } from "react-router-dom";
import { getItem, setItem } from "../../Utils/localStorageManager";
import { LoadingButton } from "@mui/lab";

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
    [`& input[type = "number"]::-webkit-inner-spin-button`]: {
        display: "none",
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

const OtpInputBoxStyle = styled(Box)`
    width: 35px;
    height: 45px;
    border: 1px solid rgba(112, 109, 109, 0.54);
    border-radius: 5px;
    padding: 10px;
    font-size: 1.5rem;
`;

const OtpScreen = () => {
    const { email } = useParams();
    const location = useLocation();

    const password = location.state;

    // const [otp, setOtp] = useState();
    const [err, setError] = useState(false);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [couter, setCouter] = useState(59);

    useEffect(() => {
        const timer =
            couter > 0 && setInterval(() => setCouter(couter - 1), 1000);
        return () => clearInterval(timer);
    }, [couter]);
    const navigate = useNavigate();
    const inputRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ];
    const [Otp, setOtp] = useState(["", "", "", "", "", ""]);

    const focusNextInput = (index) => {
        if (index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.key === "Backspace" && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleOtpChange = (text, index) => {
        setInvalidOtp(false);
        const newOtp = [...Otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text) {
            focusNextInput(index);
        }
    };

    console.log(typeof otp);

    const handleSubmit = async () => {
        if (!Otp) {
            setError(true);
            return false;
        }
        setDisableButton(true);
        const otp = Number(Otp.join(""));
        try {
            const response = await axiosClient.post("/v2/varifyotp", {
                email,
                password,
                otp,
            });
            setDisableButton(false);
            if (response.status === "ok") {
                toast.success("Signed up successfully");
                console.log(response);
                // window.localStorage.setItem("hospital_Data", response.data.data.authToken)
                navigate("/master/signin");
            }
        } catch (error) {
            console.log(error);
            if (error.status === "error" && error.statusCode === 403) {
                setDisableButton(false);
                setError(true);
                setInvalidOtp(error.message);
                return false;
            } else if (error.status === "error" && error.statusCode === 400) {
                setDisableButton(false);
                toast.error("something went wrong please try again");
                window.location.replace("/");
                return false;
            }
        }
    };

    const resendOtp = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("something went wrong please try again");
            window.location.replace("/");
            return false;
        }
        setDisableButton(true);

        try {
            const response = await axiosClient.post("/v2/sendotp", {
                email,
                password,
            });
            console.log(response);
            setDisableButton(false);
            if (response.status === "ok") {
                toast.success("Otp has been sent ");
                setDisableButton(false);
            }
        } catch (error) {
            toast.error("something went wrong");
            setDisableButton(false);
        }
    };

    return (
        <Box
            sx={{
                // width: {xs:"100%", sm:"100%", md:"80%"},
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "column", md: "row" },

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
                width={"370px"}
                sx={{
                    bgcolor: "#DCE3F6",
                    height: "70%",
                    mx: 5,
                    position: "relative",
                    borderRadius: "9px",
                    display: { xs: "none", sm: "none", md: "block" },
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
                sx={{
                    // bgcolor: "yellow",
                    // height: "70%",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    position: "relative",
                    mx: 5,
                    width: { xs: "100%", sm: "100%", md: "461px" },
                }}
            >
                <Card
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "461px" },
                        mx: "auto",
                        p: "5px",
                        // height: "80%",
                        border: " 1px solid #706D6D61",
                        borderRadius: "13px",
                        boxShadow: "none",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "300px",
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
                        <Box component={"div"} sx={{ color: "#1F51C6" }}>
                            {email}
                        </Box>
                    </Typography>
                    {/* <TextField/> */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box>
                            {inputRefs.map((ref, index) => (
                                <TextFiledStyle
                                    type="number"
                                    key={index}
                                    inputRef={ref}
                                    sx={{
                                        width: {
                                            xs: "41px",
                                            sm: "41px",
                                            md: "45px",
                                        },
                                        mx: { xs: "3px", md: "4px", md: "5px" },
                                        background: "#ffffff",
                                        borderRadius: "4px",
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            maxLength: 1,
                                            pattern: "[0-9]*",
                                        },
                                    }}
                                    value={Otp[index]}
                                    onChange={(e) =>
                                        handleOtpChange(e.target.value, index)
                                    }
                                    onKeyUp={(e) => handleKeyPress(e, index)}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        {/* <TextField
                            name="otp"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                            onChange={(e) => setOtp(Number(e.target.value))}
                            error={
                                err && !otp
                                    ? true
                                    : false || (err && invalidOtp)
                                    ? true
                                    : false
                            }
                            helperText={
                                err && !otp
                                    ? "Otp is required"
                                    : "" || err && invalidOtp
                                    ? invalidOtp
                                    : ""
                            }
                        /> */}
                    </Box>
                    <Box component="span" sx={{ color: "red" }}>
                        {invalidOtp && invalidOtp}
                    </Box>
                    <Typography
                        sx={{ mt: 2, color: invalidOtp ? "red" : "#706D6D" }}
                    >
                        {(couter === 0 && (
                            <Button onClick={resendOtp}>Resend Otp</Button>
                        )) ||
                            `Resend OTP in ${couter} seconds`}
                    </Typography>
                    <LoadingButton
                        onClick={handleSubmit}
                        fullWidth
                        loading={disableButton}
                        variant="contained"
                        sx={{
                            mt: 2,
                            borderRadius: 40,
                            textTransform: "none",
                            my: 2,
                            width: "80%",
                        }}
                    >
                        <span>Sign Up</span>
                    </LoadingButton>
                    {/* <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            borderRadius: 40,
                            textTransform: "none",
                            my: 2,
                        }}
                    >
                        Next <EastIcon />
                        Sign Up
                    </Button> */}
                </Card>
            </Box>
        </Box>
    );
};

export default OtpScreen;
