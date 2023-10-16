import React, { useState } from "react";
import MsignUp from "../../Pages/MasterUser/MsignIn";
import {MuiOtpInput } from 'mui-one-time-password-input'
import { Box } from "@mui/material";

const Verify = () => {
    const [otp, setOtp] = useState("");
const handleChange = (e)=>{
    setOtp(e.target.value)
}
    return (
        <>
            {/* <MsignUp /> */}
            <Box>
            <MuiOtpInput value={otp} onChange={handleChange}/>
            </Box>
        </>
    );
};

export default Verify;
