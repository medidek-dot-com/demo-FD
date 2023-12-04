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
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";

const DialogStyle = styled(Dialog)({
    ".MuiDialog-paper": {
        margin: "10px",
    },
    // ["& div:first-child"]:{
    //     // marginInline:"8px"
    // },
    // ["& .MuiDialog-container:nth-of-type(1)"]: {
    //     marginInline: "16px",
    // },
    // ["& .abhay  div:nth-child(2)"]:{
    //     marginInline:"16px"
    // }
});

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

const AppointmentAreadyExistDialogComponent = ({
    appointmentAlreadyExistDialog,
    setAppointmentAlreadyExistDialog,
    setAppointmentCofirmedDialog,
    bookingAppointmentDetails,
    setBookingAppointmentDetails,
    inputValue,
    setInputValue,
    setActiveCard,
    setSelectedTime,
    setSlotData,
}) => {
    // const [err, setError] = useState(false);

    return (
        <DialogStyle
            open={appointmentAlreadyExistDialog}
            // onClose={() => {
            //     setAppointmentAlreadyExistDialog(false);
            //     // setInputValue({
            //     //     patientName: "",
            //     //     age: "",
            //     //     phoneNumber: "",
            //     //     gender: "",
            //     //     appointmentDate: "",
            //     //     appointmentTime: "",
            //     // });
            //     // setError(false)
            // }}
            maxWidth={"sm"}
            sx={{ margin: " 0 auto", borderRadius: "10px" }}
        >
            <DialogTitle
                sx={{
                    fontFamily: "Raleway",
                    fontWeight: "600",
                    fontSize: "1.375rem",
                    lineHeight: "14.4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                Booking Status
                {appointmentAlreadyExistDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setAppointmentAlreadyExistDialog(false);
                            setAppointmentCofirmedDialog(false);
                            setInputValue({
                                ...inputValue,
                                name: "",
                                age: "",
                                gender: "",
                                phone: "",
                                email: "",
                                AppointmentNotes: "",
                                appointmentDate: "",
                                AppointmentTime: "",
                            });
                            setActiveCard();
                            setSelectedTime();
                            setBookingAppointmentDetails({
                                ...bookingAppointmentDetails,
                                nameOfTheDoctor: "",
                                doctorsId: "",
                                appointmentDate: "",
                                consultingTime: "",
                                hospitalId: "",
                                doctorid: "",
                                name: "",
                                Age: "",
                                Gender: "",
                                phone: "",
                                AppointmentNotes: "",
                                AppointmentTime: "",
                                imgurl: "",
                            });
                            setSlotData([]);
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
                <Stack direction="row" spacing={1}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: {
                                xs: "1.2rem",
                                sm: "1.4rem",
                                md: "1.6rem",
                            },
                        }}
                    >
                        Appointment Already Exists
                    </Typography>
                    <CancelIcon
                        sx={{
                            color: "#B92612",
                            fontSize: {
                                xs: "2rem",
                                sm: "1rem",
                                md: "2rem",
                            },
                        }}
                    />
                </Stack>
                <Typography
                    sx={{
                        fontFamily: "Lato",
                        fontWeight: "500",
                        fontSize: {
                            xs: "0.813rem",
                            sm: "0.813rem",
                            md: "1rem",
                        },
                        lineHeight: "14px",
                        mt: "10px",
                    }}
                >
                    click on My Appointments to get your appointment details{" "}
                    <Link
                        to="/tracking"
                        style={{
                            fontFamily: "Lato",
                            fontWeight: "500",
                            textDecoration: "none",
                            color: "#1F51C6",
                        }}
                    >
                        My Appointments
                    </Link>
                </Typography>
            </DialogContent>
        </DialogStyle>
    );
};

export default AppointmentAreadyExistDialogComponent;
