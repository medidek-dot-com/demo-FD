import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    styled,
    TextField,
    Divider,
    Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StackStyle = styled(Stack)(({ theme }) => ({
    width: "48%",
    margin: "5px",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "100%",
    },
}));

const TextFieldStyle = styled(TextField)({
    // marginBottom: "20px",
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
    },
});

const LabelStyle = styled("label")({
    marginBottom: "5px",
});

const AppointmentConfirmDIalog = ({
    confirmedAppointmentData,
    appointmentCofirmedDialog,
    setAppointmentCofirmedDialog,
    bookingAppointmentDetails,
    setInputValue,
    nameOfTheDoctor,
}) => {
    // const [err, setError] = useState(false);
    return (
        <Dialog
            open={appointmentCofirmedDialog}
            onClose={() => {
                // setAppointmentCofirmedDialog(false)
                // setInputValue({
                //     patientName: "",
                //     age: "",
                //     phoneNumber: "",
                //     gender: "",
                //     appointmentDate: "",
                //     appointmentTime: "",
                // });
                // setError(false)
            }}
            maxWidth={"md"}
            sx={{ margin: " 0 auto", borderRadius: "10px" }}
        >
            <DialogTitle
                sx={{
                    fontFamily: "Raleway",
                    fontWeight: "600",
                    fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.375rem" },
                    lineHeight: "25.4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                Booking Confirmation
                {appointmentCofirmedDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setAppointmentCofirmedDialog(false);
                            setInputValue({
                                name: "",
                                age: "",
                                phone: "",
                                gender: "",
                                appointmentDate: "",
                                appointmentTime: "",
                            });
                        }}
                        sx={{
                            // position: "absolute",
                            // right: 8,
                            // top: 8,
                            color: "#383838",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    margin: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    // width: "600px",
                    alignItems: "center",
                }}
            >
                <Stack spacing={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: {
                                xs: "0.938rem",
                                sm: "0.938rem",
                                md: "1.25rem",
                            },
                        }}
                    >
                        Appointment Confirmed With {nameOfTheDoctor}!
                    </Typography>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={1}
                    >
                        <Typography
                            sx={{
                                lineHeight: "20px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1rem",
                                },
                                color: "#1F51C6",
                            }}
                        >
                            Name :-{" "}
                            <Box
                                component="span"
                                sx={{
                                    color: "#383838",
                                    lineHeight: "20px",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    fontSize: {
                                        xs: "0.813rem",
                                        sm: "0.813rem",
                                        md: "1rem",
                                    },
                                }}
                            >
                                {confirmedAppointmentData?.name}
                            </Box>
                        </Typography>
                        <Typography
                            sx={{
                                color: "#1F51C6",
                                lineHeight: "20px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            Age :- {""}
                            <Box component="span" sx={{ color: "#383838" }}>
                                {confirmedAppointmentData?.age}
                            </Box>
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={1}
                    >
                        <Typography
                            sx={{
                                color: "#1F51C6",
                                lineHeight: "20px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            Gender :-{" "}
                            <Box component="span" sx={{ color: "#383838" }}>
                                {confirmedAppointmentData?.gender}
                            </Box>
                        </Typography>
                        <Typography
                            sx={{
                                color: "#1F51C6",
                                lineHeight: "20px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            Phone No :-{" "}
                            <Box component="span" sx={{ color: "#383838" }}>
                                {confirmedAppointmentData?.phone}
                            </Box>
                        </Typography>
                    </Stack>
                </Stack>
                <CheckCircleIcon
                    sx={{
                        color: "#15B912",
                        fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentConfirmDIalog;
