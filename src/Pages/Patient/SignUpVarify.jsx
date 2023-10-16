import React, { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { toast } from "react-toastify";

const SignUpVarify = () => {
    // const [otp, setOtp] = useState();
    const { email } = useParams();
    const [disableButton, setDisableButton] = useState(false);
    const [err, setError] = useState(false);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [couter, setCouter] = useState(59);
    const navigate = useNavigate();
    const { phone, password } = useLocation().state;

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
        const newOtp = [...Otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text) {
            focusNextInput(index);
        }
    };

    console.log(phone, password);
    const handleClick = async () => {
        setDisableButton(true);
        console.log(Otp.join(''))
        const otp = Number(Otp.join(''))
        console.log(otp)
        try {
            const response = await axiosClient.post("/v2/userVarify", {
                phone,
                email,
                password,
                otp,
            });
            console.log(response);
            if (response.status === "ok") {
                setDisableButton(false);
                navigate("/user/signin");
            }
            if (response.status === "error") {
                return setDisableButton(false);
            }
        } catch (error) {
            setDisableButton(false);
            toast.error(error.message)
            console.log(error.message);
        }
    };


    useEffect(() => {
        const timer =
            couter > 0 && setInterval(() => setCouter(couter - 1), 1000);
        return () => clearInterval(timer);
    }, [couter]);


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
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 100px)",
                    },
                    m: "0px auto",
                    p: 1,
                }}
            >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <img src="/hand image.png" alt="" />
            </Box>

            <Card
                sx={{
                    py: { xs: "10px", sm: "35px", md: "52px" },
                    px: { xs: "20px", sm: "30px", md: "68px" },
                    width: { xs: "100%", sm: "100%", md: "586px" },
                    height: { xs: "267px", sm: "450px", md: "586px" },
                    background: "#1F51C6",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent:'center',
                    gap:'5px',
                }}
            >
                <Box>
                    {inputRefs.map((ref, index) => (
                        <TextField
                            key={index}
                            inputRef={ref}
                            sx={{
                                width: {xs:"41px", sm:"41px", md:"46px"},
                                mx: {xs:"4px", md:"8px"},
                                background: "#ffffff",
                                borderRadius:'4px'
                            }}
                            type="text"
                            inputProps={{ maxLength: 1 }}
                            value={Otp[index]}
                            onChange={(e) =>
                                handleOtpChange(e.target.value, index)
                            }
                            onKeyUp={(e) => handleKeyPress(e, index)}
                            variant="outlined"
                        />
                    ))}
                </Box>
                <Box component="span" sx={{ color: "red" }}>
                        {invalidOtp && invalidOtp}
                    </Box>
                    <Typography
                        sx={{ mt: 2, color: invalidOtp ? "red" : "#ffffff" }}
                    >
                        {(couter === 0 && (
                            <Button onClick={resendOtp} sx={{color:'#ffffff'}}>Resend Otp</Button>
                        )) ||
                            `Resend OTP in ${couter} seconds`}
                    </Typography>
                {/* <Box component='span' sx={{color:'#ffffff', mt:'10px'}}>Resend OTP in {couter} seconds</Box> */}
                <LoadingButton
                    size="small"
                    fullWidth
                    onClick={handleClick}
                    loading={disableButton}
                    // loadingPosition="end"
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
                    <span>Verify</span>
                </LoadingButton>
            </Card>
        </Box>
        </Box>
    );
};

export default SignUpVarify;

// import React, { useRef, useState } from 'react';
// import {
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Box,
//   makeStyles,
//   Paper,
// } from '@mui/material';
// // import { useRecoilState, useRecoilValue } from 'recoil';
// // import { UserDataForCreateAccount, Userdata } from '../../Recoil/Atom';
// import { axiosClient } from '../../Utils/axiosClient';
// import Alert from '@mui/material/Alert';
// import styled from '@emotion/styled';

// const useStyles = styled((theme) => ({
//   root: {
//     flexGrow: 1,
//     height: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: theme.spacing(2),
//   },
//   paper: {
//     backgroundColor: '#1F51C6',
//     alignItems: 'center',
//     padding: theme.spacing(2),
//     borderRadius: theme.spacing(1),
//     gap: theme.spacing(2),
//   },
//   input: {
//     backgroundColor: 'white',
//     flex: 1,
//     color: 'black',
//     borderRadius: theme.spacing(1),
//     textAlign: 'center',
//   },
//   continueButton: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     padding: theme.spacing(1.5),
//     borderRadius: theme.spacing(2),
//     alignItems: 'center',
//     '&:hover': {
//       backgroundColor: '#CCCCCC',
//     },
//   },
// }));

// const SignUpVarify = (props) => {
//   const classes = useStyles();
// //   const DataForCreateAccount = useRecoilValue(UserDataForCreateAccount);
// //   const [userdata, setUserData] = useRecoilState(Userdata);
//   const inputRefs = [
//     useRef(),
//     useRef(),
//     useRef(),
//     useRef(),
//     useRef(),
//     useRef(),
//   ];
//   const [Otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [verificationResult, setVerificationResult] = useState(null);

//   const focusNextInput = (index) => {
//     if (index < inputRefs.length - 1) {
//       inputRefs[index + 1].current.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.key === 'Backspace' && index > 0) {
//       inputRefs[index - 1].current.focus();
//     }
//   };

//   const handleOtpChange = (text, index) => {
//     const newOtp = [...Otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text) {
//       focusNextInput(index);
//     }
//   };

//   const VerifyOtp = async () => {
//     const result = await axiosClient.post('/userVarify', {
//       ...DataForCreateAccount[0],
//       otp: Number(Otp.join('')),
//     });

//     if (result.data.statusCode === 201) {
//       setVerificationResult('Verification done. Now login with your email.');
//       // You can navigate to another screen here if needed.
//     } else {
//       setVerificationResult('Invalid OTP');
//     }
//   };

//   return (
//     <Grid container className={classes.root} >

//           <Box display="flex" flexDirection="row" justifyContent="center">
//             {inputRefs.map((ref, index) => (
//               <TextField
//                 key={index}
//                 inputRef={ref}
//                 className={classes.input}
//                 type="text"
//                 inputProps={{ maxLength: 1 }}
//                 value={Otp[index]}
//                 onChange={(e) => handleOtpChange(e.target.value, index)}
//                 onKeyUp={(e) => handleKeyPress(e, index)}
//                 variant="outlined"
//               />
//             ))}
//           </Box>
//           <Button
//             className={classes.continueButton}
//             variant="contained"
//             color="primary"
//             onClick={VerifyOtp}
//           >
//             Continue
//           </Button>
//           {verificationResult && (
//             <Alert severity="error">{verificationResult}</Alert>
//           )}

//     </Grid>
//   );
// };

// export default SignUpVarify;
