import React from "react";
import {
    Box,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Button,
    Typography,
    Stack,
} from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { axiosClient } from "../../Utils/axiosClient";
import AppointmentAreadyExistDialogComponent from "../FindDoctors/DoctorsList/AppointmentAreadyExistDialogComponent";
import { LoadingButton } from "@mui/lab";
import AppointmentConfirmDIalog from "../FindDoctors/DoctorsList/AppointmentConfirmDIalog";
// import AppointmentConfirmDialog from "../Master/AppointmentConfirmDialog";

const ListItemsStyling = styled(ListItem)`
    border: 2px solid #706d6d57;
    border-radius: 5px;
    padding: 5px 20px;
`;

const ConfirmRescheduleDialog = ({
    confirmBookAppointmentDialog,
    setConfirmBookAppointmentDialog,
    hospitalListDialog,
    setBookingAppointmentDetails,
    bookingAppointmentDetails,
    bookingAppointmentDialog,
    setBookAppointmentDialog,
    setHospitalListDialog,
    inputValue,
    setInputValue,
    setBookAppointmentDetailsDialog,
    getPendingAppointmentsData,
    getMissedAppointmentsData,
    setSelectedTime,
    setSlotData,
    setActiveCard,
    acceptAppointments,
}) => {
    const [appointmentAlreadyExistDialog, setAppointmentAlreadyExistDialog] =
        useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [confirmedAppointmentData, setConfirmedAppointmentData] = useState(
        {}
    );

    const currentDate = moment().format("YYYY-MM-DD");

    const [appointmentCofirmedDialog, setAppointmentCofirmedDialog] =
        useState(false);
    console.log(acceptAppointments);

    const bookAppointment = async () => {
        setDisableButton(true);
        if (acceptAppointments === "byToken") {
            try {
                const response = await axiosClient.put(
                    `/v2/editAppointmentForAppointmentByToken/${bookingAppointmentDetails?.appointmentId}`,
                    { ...inputValue, appointmentDate: currentDate }
                );
                console.log(response);
                if (response.status === "ok") {
                    console.log("yaaha tk");
                    setSelectedTime(null);
                    getPendingAppointmentsData();
                    getMissedAppointmentsData();
                    setConfirmedAppointmentData(response.result);
                    setAppointmentCofirmedDialog(true);
                    setActiveCard();
                    setInputValue({
                        ...inputValue,
                        name: "",
                        age: "",
                        gender: "",
                        phone: "",
                        AppointmentNotes: "",
                        appointmentDate: "",
                        AppointmentTime: "",
                        doctorid: "",
                    });
                    setBookingAppointmentDetails({
                        ...bookingAppointmentDetails,
                        nameOfTheDoctor: "",
                        doctorsId: "",
                        appointmentDate: "",
                        consultingTime: "",
                        hospitalId: "",
                        userid: "",
                        doctorid: "",
                        name: "",
                        Age: "",
                        Gender: "",
                        phone: "",
                        AppointmentNotes: "",
                        AppointmentTime: "",
                        imgurl: "",
                        appointmentId: "",
                    });
                    setDisableButton(false);
                    setBookAppointmentDialog(false);
                    setConfirmBookAppointmentDialog(false);
                    setBookAppointmentDialog(false);
                    setBookAppointmentDetailsDialog(false);
                    setSlotData([]);
                }
            } catch (error) {
                if (
                    error.statusCode === 409 &&
                    error.message === "Appointment is already exist"
                ) {
                    console.log("idhr tk");
                    setSelectedTime(null);
                    setAppointmentAlreadyExistDialog(true);
                    setDisableButton(false);
                    setBookAppointmentDialog(false);
                    setConfirmBookAppointmentDialog(false);
                    setBookAppointmentDialog(false);
                    setHospitalListDialog(false);
                    return setBookAppointmentDetailsDialog(false);
                }
                setDisableButton(false);
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.put(
                    `/v2/editAppointment/${bookingAppointmentDetails.appointmentId}`,
                    inputValue
                );
                console.log(response);
                if (response.status === "ok") {
                    console.log("yaaha tk");
                    setSelectedTime(null);
                    getPendingAppointmentsData();
                    getMissedAppointmentsData();
                    setConfirmedAppointmentData(response.result);
                    setAppointmentCofirmedDialog(true);
                    setActiveCard();
                    setInputValue({
                        ...inputValue,
                        name: "",
                        age: "",
                        gender: "",
                        phone: "",
                        AppointmentNotes: "",
                        appointmentDate: "",
                        AppointmentTime: "",
                        doctorid: "",
                    });
                    setBookingAppointmentDetails({
                        ...bookingAppointmentDetails,
                        nameOfTheDoctor: "",
                        doctorsId: "",
                        appointmentDate: "",
                        consultingTime: "",
                        hospitalId: "",
                        userid: "",
                        doctorid: "",
                        name: "",
                        Age: "",
                        Gender: "",
                        phone: "",
                        AppointmentNotes: "",
                        AppointmentTime: "",
                        imgurl: "",
                        appointmentId: "",
                    });
                    setDisableButton(false);
                    setBookAppointmentDialog(false);
                    setConfirmBookAppointmentDialog(false);
                    setBookAppointmentDialog(false);
                    setBookAppointmentDetailsDialog(false);
                    setSlotData([]);
                }
            } catch (error) {
                if (
                    error.statusCode === 409 &&
                    error.message === "Appointment is already exist"
                ) {
                    console.log("idhr tk");
                    setSelectedTime(null);
                    setAppointmentAlreadyExistDialog(true);
                    setDisableButton(false);
                    setBookAppointmentDialog(false);
                    setConfirmBookAppointmentDialog(false);
                    setBookAppointmentDialog(false);
                    setHospitalListDialog(false);
                    return setBookAppointmentDetailsDialog(false);
                }
                setDisableButton(false);
                console.log(error);
            }
        }
    };

    return (
        <>
            <Dialog
                sx={{ borderRadius: "14px" }}
                onClose={() => setConfirmBookAppointmentDialog(false)}
                aria-labelledby="customized-dialog-title"
                open={confirmBookAppointmentDialog}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: {
                            xs: "1rem",
                            sm: "1rem",
                            md: "1.375rem",
                        },
                        lineHeight: { xs: "20px", sm: "25px", md: "14.4px" },
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    id="customized-dialog-title"
                >
                    Confirm Appointment With Dr.{" "}
                    {bookingAppointmentDetails.nameOfTheDoctor}
                </DialogTitle>
                {confirmBookAppointmentDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => setConfirmBookAppointmentDialog(false)}
                        sx={{
                            position: "absolute",
                            right: 6,
                            top: 6,
                            color: "#383838",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <DialogContent dividers>
                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "500",
                            fontSize: "18px",
                            color: "#706D6D",
                            my: "10px",
                            lineHeight: "21.6px",
                        }}
                    >
                        Are you sure you want to book appointment with Dr.{" "}
                        {bookingAppointmentDetails.nameOfTheDoctor}?
                    </Typography>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        sx={{
                            fontSize: "18px",
                            my: "10px",
                            gap: "10px",
                        }}
                    >
                        <Box>
                            <Box
                                component="span"
                                sx={{
                                    color: "#383838",
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "1.125rem",
                                }}
                            >
                                Date:{" "}
                            </Box>{" "}
                            <Box
                                component="span"
                                sx={{
                                    color: "#1F51C6",
                                    // background: "#1F51C6",
                                    p: "8px",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                }}
                            >
                                {/* {doctorinfo?.acceptAppointments !==
                                        "byToken"
                                            ? moment(
                                                  bookingAppointmentDetails.appointmentDate
                                              ).format("DD-MM-YYYY")
                                            : currentDate} */}
                                {acceptAppointments !== "byToken"
                                    ? moment(
                                          bookingAppointmentDetails.appointmentDate,
                                          "YYYY-MM-DD"
                                      ).format("DD-MM-YYYY")
                                    : bookingAppointmentDetails?.appointmentDate}{" "}
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                component="span"
                                sx={{
                                    color: "#383838",
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                }}
                            >
                                Time:{" "}
                            </Box>{" "}
                            <Box
                                component="span"
                                sx={{
                                    color: "#1F51C6",
                                    // background: "#1F51C6",
                                    p: "8px",
                                    borderRadius: "4px",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                }}
                            >
                                {bookingAppointmentDetails.AppointmentTime}{" "}
                            </Box>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing="15px">
                        <Button
                            onClick={() =>
                                setConfirmBookAppointmentDialog(false)
                            }
                            variant="contained"
                            sx={{
                                width: "328px",
                                height: "40px",
                                background: "#D9D9D9",
                                color: "#383838",
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                borderRadius: "44px",
                                boxShadow: "none",
                                ":hover": { background: "#706D6D" },
                            }}
                        >
                            Cancel{" "}
                        </Button>
                        <LoadingButton
                            size="small"
                            fullWidth
                            onClick={bookAppointment}
                            loading={disableButton}
                            variant="contained"
                            sx={{
                                width: "328px",
                                height: "41px",
                                background: "#1F51C6",
                                color: "#ffffff",
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                borderRadius: "44px",
                                boxShadow: "none",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    textTransform: "none",
                                }}
                            >
                                Confirm
                            </span>
                        </LoadingButton>
                        {/* <Button
                            onClick={bookAppointment}
                            variant="contained"
                            sx={{
                                width: "328px",
                                height: "40px",
                                background: "#1F51C6",
                                color: "#ffffff",
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                borderRadius: "44px",
                                boxShadow: "none",
                            }}
                        >
                            Confirm{" "}
                        </Button> */}
                    </Stack>
                </DialogContent>
            </Dialog>
            <AppointmentAreadyExistDialogComponent
                appointmentAlreadyExistDialog={appointmentAlreadyExistDialog}
                setAppointmentAlreadyExistDialog={
                    setAppointmentAlreadyExistDialog
                }
            />
            <AppointmentConfirmDIalog
                confirmedAppointmentData={confirmedAppointmentData}
                appointmentCofirmedDialog={appointmentCofirmedDialog}
                setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
                setInputValue={setInputValue}
                setHospitalListDialog={setHospitalListDialog}
                nameOfTheDoctor={bookingAppointmentDetails.nameOfTheDoctor}
            />
        </>
    );
};

export default ConfirmRescheduleDialog;
