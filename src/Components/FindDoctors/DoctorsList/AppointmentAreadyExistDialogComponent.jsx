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

const AppointmentAreadyExistDialogComponent = ({confirmedAppointmentData, appointmentCofirmedDialog, setAppointmentCofirmedDialog}) => {
    // const [err, setError] = useState(false);

    return (
        <Dialog
            open={false}
            onClose={() => {
                setAppointmentCofirmedDialog(false)
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
            <DialogTitle>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "600", color: "#15B912" }}
                >
                    Booking Confirmation
                </Typography>
                {appointmentCofirmedDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setAppointmentCofirmedDialog(false)
                            setInputValue({
                                patientName: "",
                                age: "",
                                phoneNumber: "",
                                gender: "",
                                appointmentDate: "",
                                appointmentTime: "",
                            });
                            setError(false)
                        }}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
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
                        sx={{ fontWeight: "600", fontSize: {xs:"1.2rem", sm:"1.4rem", md:"1.6rem"} }}
                    >
                        Appointment Confirmed for {confirmedAppointmentData.patientName}!
                    </Typography>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={1}
                    >
                        <Typography sx={{ lineHeight: "20px" }}>
                            Name :-{" "}
                            <Box component="span" sx={{ color: "#1F51C6" }}>
                            {/* {inputValue.patientName} */}
                            </Box>
                        </Typography>
                        <Typography sx={{ lineHeight: "20px" }}>
                            Age :- {""}
                            <Box component="span" sx={{ color: "#1F51C6" }}>
                            {/* {inputValue.age} */}
                            </Box>
                        </Typography>
                        <Typography sx={{ lineHeight: "20px" }}>
                            Token no:
                            <Box component="span" sx={{ color: "#1F51C6" }}>
                                5
                            </Box>
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={1}
                    >
                        <Typography sx={{ lineHeight: "20px" }}>
                            Gender :- {" "}
                            <Box component="span" sx={{ color: "#1F51C6" }}>
                            {/* {inputValue.gender} */}
                            </Box>
                        </Typography>
                        <Typography sx={{ lineHeight: "20px" }}>
                            Phone No.{" "}
                            <Box component="span" sx={{ color: "#1F51C6" }}>
                            {/* {inputValue.phoneNumber} */}
                            </Box>
                        </Typography>
                    </Stack>
                </Stack>
                <CheckCircleIcon sx={{ color: "#15B912", fontSize: {xs:"3rem", sm:"4rem", md:"6rem"} }} />
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentAreadyExistDialogComponent; 
