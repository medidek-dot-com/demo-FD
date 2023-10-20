import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputLabel, Stack, TextField, Card, Button } from "@mui/material";
import { toast } from "react-toastify";
import { axiosClient } from "../Utils/axiosClient";
import { useNavigate } from "react-router-dom";

const ChangePasswordField = styled(TextField)({
    "& input::placeholder": {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        color: "#ffffff",
        opacity: 0.7,
    },
    "& .css-1jnszeg-MuiInputBase-root-MuiOutlinedInput-root": {
        height: "38px",
    },

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

const ForgotPasswordForm = ({ userData }) => {
    const navigate = useNavigate();
    const [err, setError] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);

    console.log(userData);
    const resetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            return setError(true);
        }
        if (newPassword !== confirmPassword) {
            setError(true);
            return setPasswordNotMatch(true);
        }
        try {
            const response = await axiosClient.post("/v2/userpasswordupdated", {
                phone: userData?.phone,
                password: newPassword,
                role: userData?.role,
            });
            console.log(response);

            if (response.status === "ok") {
                toast.success("Password updated successfully");
                if (userData.role === "MASTER") {
                    navigate("/master/signin");
                } else if (userData.role === "DOCTOR") {
                    navigate("/doctor/signin");
                } else {
                    navigate("/user/signin");
                }
            }
        } catch (error) {
            return toast.error(error.message);
        }
    };

    return (
        <>
            <Card
                sx={{
                    p: "20px",
                    borderRadius: "10px",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    background: "#1F51C6",
                    height: "230px",
                    justifyContent: "space-around",
                }}
            >
                <Stack spacing="5px">
                    {/* <InputLabel
                        htmlFor="oldPass"
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "15px",
                            color: "#ffffff",
                        }}
                    >
                        Enter New Password
                        <span style={{ color: "#EA4335" }}>*</span>
                    </InputLabel> */}
                    <ChangePasswordField
                        color="secondary"
                        variant="standard"
                        value={newPassword}
                        error={
                            err && !newPassword
                                ? true
                                : false || (err && passwordNotMatch)
                                ? true
                                : false
                        }
                        helperText={
                            err && !newPassword
                                ? "Please enter new password"
                                : null || (err && passwordNotMatch)
                                ? "Password did not match"
                                : null
                        }
                        id="oldPass"
                        sx={{ width: "344px" }}
                        placeholder="New Password"
                        onChange={(e) =>
                            setNewPassword(e.target.value) & setError(false)
                        }
                    />
                </Stack>
                <Stack spacing="10px">
                    {/* <InputLabel
                        htmlFor="oldPass"
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "15px",
                            color: "#ffffff",
                        }}
                    >
                        Confirm New Password
                        <span style={{ color: "#EA4335" }}>*</span>
                    </InputLabel> */}
                    <ChangePasswordField
                        color="secondary"
                        variant="standard"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        error={
                            err && !confirmPassword
                                ? true
                                : false || (err && passwordNotMatch)
                                ? true
                                : false
                        }
                        helperText={
                            err && !confirmPassword
                                ? "Please confirm new password"
                                : null || (err && passwordNotMatch)
                                ? "Password did not match"
                                : null
                        }
                        id="oldPass"
                        sx={{ width: "344px" }}
                        placeholder="Confirm New"
                    />
                </Stack>
                <Stack>
                    <Button
                        onClick={resetPassword}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontFamily: "Lato",
                            fontWeight: "700",
                            fontSize: "17px",
                            background: "#ffffff",
                            color: "#383838",
                            borderRadius: "63px",
                            borderColor: "#D9D9D9",
                            height: "40px",
                            boxShadow: "none",
                        }}
                    >
                        Change Password
                    </Button>
                </Stack>
            </Card>
        </>
    );
};

export default ForgotPasswordForm;
