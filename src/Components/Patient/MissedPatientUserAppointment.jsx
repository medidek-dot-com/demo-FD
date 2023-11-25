import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import BookAppointmentDialogForPatient from "./BookAppointmentDialogForPatient";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import BookAppointmnetDetailsDialog from "./BookAppointmnetDetailsDialog";
import ConfirmRescheduleDialog from "./ConfirmRescheduleDialog";

const MissedPatientUserAppointment = ({
    missedAppointmentsData,
    getPendingAppointmentsData,
    getMissedAppointmentsData,
    isLoading,
    setIsLoading,
}) => {
    const { user } = useSelector((state) => state.auth);
    const currentDate = moment().format("YYYY-MM-DD");

    const [bookingAppointmentDetails, setBookingAppointmentDetails] = useState({
        nameOfTheDoctor: "",
        doctorsId: "",
        appointmentDate: currentDate,
        consultingTime: "",
        hospitalId: "",
        userid: user?._id,
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

    const [appointmentDetails, setAppointmentDetails] = useState({});

    let [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        AppointmentNotes: "",
        appointmentDate: "",
        AppointmentTime: "",
        doctorid: "",
        userid: user?._id,
        status: "pending",
    });
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingAppointmentDialog, setBookAppointmentDialog] =
        useState(false);
    const [slotData, setSlotData] = useState([]);
    const [activeCard, setActiveCard] = useState();
    const [confirmBookAppointmentDialog, setConfirmBookAppointmentDialog] =
        useState(false);
    const [bookingAppointmentDetailsDialog, setBookAppointmentDetailsDialog] =
        useState(false);

    const handleReschedule = (appointment) => {
        console.log(appointment);
        setAppointmentDetails(appointment);
        setBookingAppointmentDetails({
            ...bookingAppointmentDetails,
            nameOfTheDoctor: appointment.doctorid.nameOfTheDoctor,
            imgurl: appointment.doctorid.imgurl,
            doctorid: appointment.doctorid._id,
            appointmentId: appointment._id,
        });
        setInputValue({
            ...inputValue,
            name: appointment.name,
            age: appointment.age,
            gender: appointment.gender,
            phone: appointment.phone,
            AppointmentNotes: appointment.AppointmentNotes,
            doctorid: appointment.doctorid._id,
        });
        setBookAppointmentDialog(true);
    };

    const getAvailableSlots = async () => {
        try {
            // setSlotsLoading(true);
            if (!appointmentDetails?.doctorid?._id) {
                return false;
            }
            if (!bookingAppointmentDetails.appointmentDate) {
                return false;
            }
            const response = await axiosClient.get(
                `/v2/getAvailbleSlotsForAnUser/${appointmentDetails?.doctorid?._id}/${bookingAppointmentDetails.appointmentDate}`
            );
            if (response.status === "ok") {
                // setSlotsLoading(false);
                return setSlotData(response.result);
            }
        } catch (error) {
            // setSlotsLoading(false);
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAvailableSlots();
    }, [bookingAppointmentDetails.appointmentDate]);

    return (
        <>
            {missedAppointmentsData.length > 0 ? (
                missedAppointmentsData.map((appointment, i) => {
                    return (
                        <Card
                            key={i}
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "column",
                                    md: "row",
                                },
                                gap: "19px",
                                // flexWrap:'wrap',
                                justifyContent: "space-between",
                                p: "20px",
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing="14px"
                                alignItems="center"
                            >
                                <Avatar
                                    src={appointment?.doctorid?.imgurl}
                                    sx={{
                                        width: {
                                            xs: "57px",
                                            sm: "57px",
                                            md: "74px",
                                        },
                                        height: {
                                            xs: "57px",
                                            sm: "57px",
                                            md: "74px",
                                        },
                                    }}
                                />
                                <Stack>
                                    <Typography
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                            color: "#383838",
                                        }}
                                    >
                                        Appointment with Dr.{" "}
                                        {appointment?.doctorid?.nameOfTheDoctor}
                                    </Typography>
                                    <Box
                                        component="span"
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            color: "#706D6D",
                                        }}
                                    >
                                        Date:{" "}
                                        {moment(
                                            appointment?.appointmentDate
                                        ).format("DD-MM-YYYY")}
                                    </Box>
                                </Stack>
                            </Stack>
                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "auto",
                                    },
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handleReschedule(appointment)
                                    }
                                    size="small"
                                    sx={{
                                        borderRadius: "25px",
                                        height: "40px",
                                        fontSize: "16px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        textTransform: "none",
                                        px: "16px",
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "210px",
                                        },
                                        boxShadow: "none",
                                    }}
                                >
                                    Reschedule
                                </Button>
                            </Box>
                        </Card>
                    );
                })
            ) : (
                <Typography
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#383838",
                        textAlign: "center",
                    }}
                >
                    No Missed Appointments Found
                </Typography>
            )}
            <BookAppointmentDialogForPatient
                missedAppointmentsData={missedAppointmentsData}
                bookingAppointmentDetails={bookingAppointmentDetails}
                bookingAppointmentDialog={bookingAppointmentDialog}
                setBookAppointmentDialog={setBookAppointmentDialog}
                setBookingAppointmentDetails={setBookingAppointmentDetails}
                confirmBookAppointmentDialog={confirmBookAppointmentDialog}
                setConfirmBookAppointmentDialog={
                    setConfirmBookAppointmentDialog
                }
                setBookAppointmentDetailsDialog={
                    setBookAppointmentDetailsDialog
                }
                inputValue={inputValue}
                setInputValue={setInputValue}
                slotData={slotData}
                setSlotData={setSlotData}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                // slotsLoading={slotsLoading}
            />

            <BookAppointmnetDetailsDialog
                inputValue={inputValue}
                setInputValue={setInputValue}
                setConfirmBookAppointmentDialog={
                    setConfirmBookAppointmentDialog
                }
                bookingAppointmentDetailsDialog={
                    bookingAppointmentDetailsDialog
                }
                setBookAppointmentDetailsDialog={
                    setBookAppointmentDetailsDialog
                }
                bookingAppointmentDetails={bookingAppointmentDetails}
                setBookingAppointmentDetails={setBookingAppointmentDetails}
            />
            <ConfirmRescheduleDialog
                inputValue={inputValue}
                setInputValue={setInputValue}
                confirmBookAppointmentDialog={confirmBookAppointmentDialog}
                setConfirmBookAppointmentDialog={
                    setConfirmBookAppointmentDialog
                }
                bookingAppointmentDetails={bookingAppointmentDetails}
                setBookingAppointmentDetails={setBookingAppointmentDetails}
                bookingAppointmentDialog={bookingAppointmentDialog}
                setBookAppointmentDialog={setBookAppointmentDialog}
                // hospitalListDialog={hospitalListDialog}
                // setHospitalListDialog={setHospitalListDialog}
                setBookAppointmentDetailsDialog={
                    setBookAppointmentDetailsDialog
                }
                appointmentDetails={appointmentDetails}
                getPendingAppointmentsData={getPendingAppointmentsData}
                getMissedAppointmentsData={getMissedAppointmentsData}
                setSelectedTime={setSelectedTime}
                setSlotData={setSlotData}
                setActiveCard={setActiveCard}
                // setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
            />
        </>
    );
};

export default MissedPatientUserAppointment;
