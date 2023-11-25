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
// import AppointmentConfirmDialog from "../Master/AppointmentConfirmDialog";
import { toast } from "react-toastify";
import AppointmentConfirmDIalog from "../FindDoctors/DoctorsList/AppointmentConfirmDIalog";

const ListItemsStyling = styled(ListItem)`
    border: 2px solid #706d6d57;
    border-radius: 5px;
    padding: 5px 20px;
`;

const ConfirmAppointmentDialog = ({
    confirmBookAppointmentDialog,
    setConfirmBookAppointmentDialog,
    hospitalListDialog,
    bookingAppointmentDetails,
    bookingAppointmentDialog,
    setBookAppointmentDialog,
    setHospitalListDialog,
    inputValue,
    setInputValue,
    doctorinfo,
    setBookAppointmentDetailsDialog,
    setChooseDateAndTimeDialog,
    getPendingAppointmentsDataForPerticularDate,
}) => {
    const [appointmentAlreadyExistDialog, setAppointmentAlreadyExistDialog] =
        useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [confirmedAppointmentData, setConfirmedAppointmentData] = useState(
        {}
    );

    const [appointmentCofirmedDialog, setAppointmentCofirmedDialog] =
        useState(false);
    {
        console.log(inputValue);
    }
    const bookAppointment = async () => {
        setDisableButton(true);
        try {
            const response = await axiosClient.post(
                "/v2/bookAppointment",
                inputValue
            );
            console.log(response);
            if (response.status === "ok") {
                setConfirmedAppointmentData(response.result);
                setAppointmentCofirmedDialog(true);
                setDisableButton(false);
                setBookAppointmentDialog(false);
                setConfirmBookAppointmentDialog(false);
                setBookAppointmentDialog(false);
                setBookAppointmentDetailsDialog(false);
                setHospitalListDialog && setHospitalListDialog(false);
                setChooseDateAndTimeDialog && setChooseDateAndTimeDialog(false);
                // window.location.reload();
                (await getPendingAppointmentsDataForPerticularDate) &&
                    getPendingAppointmentsDataForPerticularDate();
            }
        } catch (error) {
            if (
                error.statusCode === 409 &&
                error.message === "Appointment is already exist"
            ) {
                console.log("idhr tk");

                setAppointmentAlreadyExistDialog(true);
                setDisableButton(false);
                setBookAppointmentDialog(false);
                setConfirmBookAppointmentDialog(false);
                setBookAppointmentDialog(false);
                setBookAppointmentDetailsDialog(false);

                setChooseDateAndTimeDialog && setChooseDateAndTimeDialog(false);
                setHospitalListDialog && setHospitalListDialog(false);
                return;
            }
            setDisableButton(false);
            toast.error("something is wrong");
            console.log(error);
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
                        Are you sure you want to book appointment with Dr
                        {bookingAppointmentDetails?.nameOfTheDoctor ||
                            doctorinfo?.nameOfTheDoctor}
                        &nbsp; ?
                    </Typography>
                    <Box
                        sx={{
                            fontSize: "18px",
                            my: "10px",
                        }}
                    >
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
                                color: "#ffffff",
                                background: "#1F51C6",
                                p: "8px",
                                borderRadius: "4px",
                                fontFamily: "Lato",
                                fontWeight: "semibold",
                                fontSize: "0.813rem",
                            }}
                        >
                            {bookingAppointmentDetails.appointmentDate},{" "}
                            {bookingAppointmentDetails.AppointmentTime}{" "}
                        </Box>
                    </Box>
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
            />
            {/* <AppointmentConfirmDIalog
                confirmedAppointmentData={confirmedAppointmentData}
                appointmentCofirmedDialog={appointmentCofirmedDialog}
                setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
                setInputValue={setInputValue}
                setHospitalListDialog={setHospitalListDialog}
            /> */}
        </>
    );
};

export default ConfirmAppointmentDialog;
