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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppointmentConfirmDialog from "./AppointmentConfirmDialog";
const successSound = "/confirm-sound.m4a"; // Import your audio file

const StackStyle = styled(Stack)(({ theme }) => ({
    width: "48%",
    margin: "5px",
    [theme.breakpoints.between("xs", "sm", "md")]: {
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

const BookAppointmentDialog = ({
    bookAppointmentDialog,
    setBookAppointmentDialog,
    getUpcomingAppointmentsData,
}) => {
    const [appointementConfirmDialog, setAppointmentConfirmDialog] =
        useState(false);
    const { hospital_id, doctor_id } = useParams();
    const [inputValue, setInputValue] = useState({
        patientName: "",
        age: "",
        phoneNumber: "",
        gender: "",
        appointmentDate: "",
        appointmentTime: "",
        doctorsId: doctor_id,
        hospitalId: hospital_id,
    });

    const [inputImage, setInputImage] = useState("");
    const [err, setError] = useState(false);
    const [preview, setPreview] = useState("");
    const [bookingAppoinmtmentData, setBookingAppoinmtmentData] = useState({});

    const bookAppointment = async (e) => {
        e.preventDefault();
        if (
            !inputValue.patientName ||
            !inputValue.age ||
            !inputValue.phoneNumber ||
            !inputValue.gender ||
            !inputValue.appointmentDate ||
            !inputValue.appointmentTime
        ) {
            setError(true);
            return false;
        }

        try {
            const response = await axiosClient.post(
                "/v2/createAppointmentByHospitals",
                inputValue
            );
            console.log("this is appointment booking responce",response);
            if (response.status === "ok") {
                toast.success(
                    `Appoinment booked successfully for ${inputValue.patientName}`
                );
                getUpcomingAppointmentsData();
                setBookingAppoinmtmentData(response.result);
                setBookAppointmentDialog(false);
                setAppointmentConfirmDialog(true);
                // navigate("/master/user/home");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const getUserImage = (e) => {
        // console.log(e.target.files[0]);
        setInputImage(e.target.files[0]);
    };
    return (
        <>
            <Dialog
                open={bookAppointmentDialog}
                onClose={() => setBookAppointmentDialog(false)}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle>
                    Book Appointment for Dr. Shashwat
                    {bookAppointmentDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setBookAppointmentDialog(false)}
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
                <DialogContent dividers sx={{ margin: "10px" }}>
                    <form onSubmit={bookAppointment}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "column",
                                    md: "row",
                                },
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <StackStyle>
                                <LabelStyle htmlFor="staffName">
                                    Name of the Paitent
                                </LabelStyle>
                                <TextFieldStyle
                                    id="staffName"
                                    name="patientName"
                                    fullWidth
                                    placeholder="Ex.  John Doe"
                                    error={
                                        err && !inputValue.patientName && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.patientName &&
                                        "Please enter patient's name"
                                    }
                                    value={inputValue.patientName}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="designation">
                                    Enter Age
                                </LabelStyle>
                                <TextFieldStyle
                                    id="designation"
                                    name="age"
                                    fullWidth
                                    placeholder="Ex. 25"
                                    error={err && !inputValue.age && true}
                                    helperText={
                                        err &&
                                        !inputValue.age &&
                                        "Please enter patient's age"
                                    }
                                    value={inputValue.age}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="email">
                                    Enter Phone Number
                                </LabelStyle>
                                <TextFieldStyle
                                    id="email"
                                    name="phoneNumber"
                                    fullWidth
                                    placeholder="Ex. 9911224455"
                                    error={
                                        err && !inputValue.phoneNumber && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.phoneNumber &&
                                        "Please enter patient's phone number"
                                    }
                                    value={inputValue.phoneNumber}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="phone">
                                    Enter Gender
                                </LabelStyle>
                                <TextFieldStyle
                                    id="phone"
                                    name="gender"
                                    fullWidth
                                    placeholder="Ex prefer not to say"
                                    error={err && !inputValue.gender && true}
                                    helperText={
                                        err &&
                                        !inputValue.gender &&
                                        "Please enter patient's gender"}
                                    value={inputValue.gender}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="phone">
                                    Enter Appointment Date
                                </LabelStyle>
                                <TextFieldStyle
                                    id="phone"
                                    name="appointmentDate"
                                    fullWidth
                                    placeholder="Ex 12/09/2023"
                                    error={
                                        err &&
                                        !inputValue.appointmentDate &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.appointmentDate &&
                                        "Please enter appointment date"
                                    }
                                    value={inputValue.appointmentDate}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="phone">
                                    Enter Appointment Time
                                </LabelStyle>
                                <TextFieldStyle
                                    id="phone"
                                    name="appointmentTime"
                                    fullWidth
                                    placeholder="Ex 12:00PM"
                                    error={
                                        err &&
                                        !inputValue.appointmentTime &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.appointmentTime &&
                                        "Please enter appointment time"
                                    }
                                    value={inputValue.appointmentTime}
                                    onChange={handleChange}
                                />
                            </StackStyle>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    flex: 0.3,
                                    mt: 2,
                                    textTransform: "none",
                                    background: "#15B912",
                                    borderRadius: "35px",
                                    "&:hover": {
                                        background: "#148512",
                                    },
                                }}
                            >
                                Book Appointment
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
            <AppointmentConfirmDialog
                appointementConfirmDialog={appointementConfirmDialog}
                setAppointmentConfirmDialog={setAppointmentConfirmDialog}
                bookingAppoinmtmentData={bookingAppoinmtmentData}
                setInputValue={setInputValue}
                setError={setError}
            />
        </>
    );
};

export default BookAppointmentDialog;
