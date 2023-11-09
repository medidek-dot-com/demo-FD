import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputLabel,
    Stack,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

const ChangePasswordField = styled(TextField)({
    minWidth: "280px",
    [`& input`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    "& input::placeholder": {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        color: "#706D6D",
    },
    "& .css-1jnszeg-MuiInputBase-root-MuiOutlinedInput-root": {
        height: "38px",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
});

const ChangePasswordDialog = ({
    changePasswordDialog,
    setChangePasswordDialog,
}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const [err, setError] = useState(false);

    const changeDoctorPassword = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            return setError(true);
        }

        if (newPassword !== confirmPassword) {
            setError(true);
            return setPasswordNotMatch(true);
        }
        try {
            const response = await axiosClient.put(
                `/v2/changePasswordForDoctor/${inputValue._id}`,
                {
                    oldPassword,
                    newPassword,
                }
            );
            if (response.status === "ok") {
                setChangePasswordDialog(false);
                return toast.success("password Changed successfully");
            } else if (
                response.status === "error" &&
                response.statusCode === 403
            ) {
                setWrongPassword(true);
            }
        } catch (error) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError(true);
            setWrongPassword(error.message);
        }
    };

    return (
        <>
            <Dialog
                open={changePasswordDialog}
                onClose={() => setChangePasswordDialog(false)}
                maxWidth={"md"}
                sx={{ margin: " 0 auto", width: "100%" }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Change Password
                    {changePasswordDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setChangePasswordDialog(false)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: "#383838",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <Divider />
                <form onSubmit={changeDoctorPassword}>
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Stack spacing="10px">
                            <InputLabel
                                htmlFor="oldPass"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                    color: "#383838",
                                }}
                            >
                                Enter Old Password
                                <span style={{ color: "#EA4335" }}>*</span>
                            </InputLabel>
                            <ChangePasswordField
                                id="oldPass"
                                value={oldPassword}
                                error={
                                    err && !oldPassword
                                        ? true
                                        : false || (err && wrongPassword)
                                        ? true
                                        : false
                                }
                                helperText={
                                    err && !oldPassword
                                        ? "Please enter old password"
                                        : null || (err && wrongPassword)
                                        ? wrongPassword
                                        : null
                                }
                                placeholder="Old Password"
                                onChange={(e) =>
                                    setOldPassword(e.target.value) &
                                    setError(false)
                                }
                            />
                        </Stack>
                        <Stack spacing="10px">
                            <InputLabel
                                htmlFor="oldPass"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                    color: "#383838",
                                }}
                            >
                                Enter New Password
                                <span style={{ color: "#EA4335" }}>*</span>
                            </InputLabel>
                            <ChangePasswordField
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
                                placeholder="New Password"
                                onChange={(e) =>
                                    setNewPassword(e.target.value) &
                                    setError(false)
                                }
                            />
                        </Stack>
                        <Stack spacing="10px">
                            <InputLabel
                                htmlFor="oldPass"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                    color: "#383838",
                                }}
                            >
                                Confirm New Password
                                <span style={{ color: "#EA4335" }}>*</span>
                            </InputLabel>
                            <ChangePasswordField
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
                                        ? "Please enter new password"
                                        : null || (err && passwordNotMatch)
                                        ? "Password did not match"
                                        : null
                                }
                                id="oldPass"
                                placeholder="Confirm New"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value) &
                                    setError(false)
                                }
                            />
                        </Stack>
                        <Stack spacing="10px" sx={{width:'100%'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "17px",
                                    color: "#ffffff",
                                    borderRadius: "63px",
                                    borderColor: "#D9D9D9",
                                    height: "40px",
                                    boxShadow: "none",
                                    width: "100%",
                                    display: "block",
                                }}
                            >
                                Change Password
                            </Button>
                            <Button
                                onClick={() => setChangePasswordDialog(false)}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "17px",
                                    color: "#383838",
                                    borderRadius: "63px",
                                    borderColor: "#D9D9D9",
                                    height: "40px",
                                    boxShadow: "none",
                                    display: "block",
                                }}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default ChangePasswordDialog;
