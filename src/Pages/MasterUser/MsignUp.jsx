import React, { useState } from "react";
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
import SaveIcon from "@mui/icons-material/Save";

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
    const [inputData, setInputData] = useState({
        email: "",
        phone: "",
    });

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signUpActive, setSignUpActive] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [err, setError] = useState(false);

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
            const response = await axiosClient.post("/v2/sendotp", {
                email,
                password,
            });
            console.log(response);
            setDisableButton(false);
            if (response.status === "ok") {
                toast.success("Otp has been sent ");
                setDisableButton(false);
                navigate(`/master/login/verify/${email}`, { state: password });
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
                                fontSize: { xs: "1rem", lineHeight: "18.78px" },
                                color: signUpActive ?"#383838"  : "#ffffff",
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
                                    color: signUpActive ? "#ffffff" : "#383838",
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    {/* </ButtonGroup> */}
                    <form onSubmit={handleSignUp}>
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
                                    : false || (err && invalidEmail)
                                    ? true
                                    : false
                            }
                            helperText={
                                err && !email
                                    ? "Phone Number is required"
                                    : "" || (err && phoneExists)
                                    ? emailExists
                                    : "" || (err && invalidEmail)
                                    ? "Plase Enter a Valid Email Address"
                                    : ""
                            }
                            // helperText={
                            //     err && !email && "Please enter your email"
                            // }
                            onChange={(e) => setPhone(e.target.value) & setError(false)}
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
                                    ? emailExists
                                    : "" || (err && invalidEmail)
                                    ? "Plase Enter a Valid Email Address"
                                    : ""
                            }
                            // helperText={
                            //     err && !email && "Please enter your email"
                            // }
                            onChange={(e) => setEmail(e.target.value) & setError(false)}
                            onKeyUpCapture={(e)=>e.preventDefault()}
                            
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
                                    : false || (err && phoneExists)
                                    ? true
                                    : false
                            }
                            helperText={
                                err && !password
                                    ? "Password is required"
                                    : "" || (err && phoneExists)
                                    ? "Password is already exists"
                                    : ""
                            }
                            onChange={(e) => setPassword(e.target.value) & setError(false)}
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
                            >Sign Up</span>
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
            </Box>
        </Container>
    );
};

export default MsignUp;
