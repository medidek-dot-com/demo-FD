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
} from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import "ldrs/dotPulse";

const ListItemsStyling = styled(ListItem)`
    border: 2px solid #706d6d57;
    border-radius: 5px;
    padding: 5px 20px;
`;

const ListBoxStyle = styled(Box)`
    margin: 10px 10px;
    text-align: center;
    cursor: pointer;
`;

const BookAppointmentDialogForPatient = ({
    bookingAppointmentDialog,
    setBookAppointmentDialog,
    bookingAppointmentDetails,
    setBookingAppointmentDetails,
    confirmBookAppointmentDialog,
    setConfirmBookAppointmentDialog,
    setBookAppointmentDetailsDialog,
    slotData,
    setSlotData,
    inputValue,
    setInputValue,
    slotsLoading,
}) => {
    const [activeCard, setActiveCard] = useState();
    const [dateErr, setDateErr] = useState(false);
    const [dates, setDates] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const handleButtonClick = (slot, i) => {
        setBookingAppointmentDetails({
            ...bookingAppointmentDetails,
            AppointmentTime: `${slot.startTime} - ${slot.endTime}`,
        });
        setInputValue({
            ...inputValue,
            AppointmentTime: `${slot.startTime} - ${slot.endTime}`,
        });
        setSelectedTime(i);
    };

    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 8; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push({
                day: date.format("ddd").toUpperCase(),
                date: date.format("DD").toUpperCase(),
                month: date.format("MMM").toUpperCase(),
            });
        }

        setDates(monthsDates);
    };

    useEffect(() => {
        getWeekDates();
    }, []);

    return (
        <>
            <Dialog
                open={bookingAppointmentDialog}
                onClose={() => {
                    return setBookAppointmentDialog(false) & setDateErr(false);
                }}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
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
                    Book Appointment
                    {bookingAppointmentDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setBookAppointmentDialog(false)}
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
                <DialogContent
                    dividers
                    sx={{
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "20px",
                            userSelect: "none",
                        }}
                    >
                        {dates.map((date, i) => (
                            <Card
                                onClick={(e) => {
                                    setActiveCard(i);
                                    setDateErr(false);
                                    const dateString = e.target.innerText;
                                    const dateObject = dayjs(
                                        dateString + dayjs().year()
                                    );

                                    const formattedDate =
                                        dateObject.format("YYYY-MM-DD");
                                    setInputValue({
                                        ...inputValue,
                                        appointmentDate: formattedDate,
                                    });
                                    setBookingAppointmentDetails({
                                        ...bookingAppointmentDetails,
                                        appointmentDate: formattedDate,
                                    });
                                }}
                                sx={{
                                    width: "50px",
                                    textAlign: "center",
                                    margin: "5px 8px",
                                    padding: "5px",
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    cursor: "pointer",
                                    background:
                                        activeCard === i
                                            ? "#1F51C6"
                                            : "#ffffff",
                                    color:
                                        activeCard === i
                                            ? "#ffffff"
                                            : " #000000",
                                }}
                                key={i}
                            >
                                {date.day}
                                <br />
                                {date.date}
                                <br />
                                {date.month}
                            </Card>
                        ))}
                    </Box>
                    {dateErr && (
                        <Box
                            component="span"
                            sx={{
                                color: "red",
                                fontFamily: "Lato",
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            Please choose date!
                        </Box>
                    )}

                    <List
                        style={{
                            display: "flex",
                            marginTop: "20px",
                            flexWrap: "wrap",
                            maxWidth: "589px",
                            // gap:'35px'
                        }}
                    >
                        {slotsLoading && (
                            <l-dot-pulse
                                size="43"
                                speed="1.3"
                                color="#1F51C6"
                            ></l-dot-pulse>
                        )}

                        {slotData[0] === "doctor not available for this date" &&
                        slotsLoading === false ? (
                            // Default values shown

                            <Typography
                                sx={{
                                    color: "#B92612",
                                    fontFamily: "Lato",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                            >
                                Doctor not available for this date
                            </Typography>
                        ) : (
                            slotData?.map((slot, i) => (
                                <ListBoxStyle key={i}>
                                    <Button
                                        onClick={() =>
                                            handleButtonClick(slot, i)
                                        }
                                        variant={
                                            selectedTime == i
                                                ? "contained"
                                                : "outlined"
                                        }
                                        sx={{
                                            borderRadius: "3px",
                                            color:
                                                selectedTime == i
                                                    ? "#ffffff"
                                                    : "#706D6D",
                                            border: "1px solid #706D6D8F",
                                            fontWeight: "600",
                                            fontSize: "15px",
                                            fontFamily: "Lato",
                                            display: "block",
                                            boxShadow: "none",
                                            cursor: "pointer",
                                            " :hover": {
                                                background: "#none",
                                                boxShadow: "none",
                                            },
                                        }}
                                    >
                                        {slot.startTime} - {slot.endTime}
                                        {/* {
                                              bookingAppointmentDetails.consultingTime
                                          } */}
                                    </Button>
                                </ListBoxStyle>
                            ))
                        )}
                    </List>

                    {/* <ListBoxStyle>
                        <Button
                            onClick={() => handleButtonClick(2)}
                            variant={
                                selectedTime == 2 ? "contained" : "outlined"
                            }
                            sx={{
                                borderRadius: "3px",
                                color:
                                    selectedTime == 2 ? "#ffffff" : "#706D6D",
                                border: "1px solid #706D6D8F",
                                fontWeight: "600",
                                fontSize: "15px",
                                fontFamily: "Lato",
                                display: "block",
                                boxShadow: "none",
                                cursor: "pointer",
                                " :hover": {
                                    background: "#none",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            12:30 - 1:00
                            {bookingAppointmentDetails.consultingTime}
                        </Button>
                        <Box
                            component="span"
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                color: "#B92612",
                                m: 0,
                            }}
                        >
                            Booked
                        </Box>
                    </ListBoxStyle> */}
                    <Button
                        variant="contained"
                        sx={{
                            background: "#1F51C6",
                            margin: "20px 10px",
                            width: "90%",
                            borderRadius: "40px",
                            boxShadow: "none",
                            fontFamily: "Lato",
                            fontWeight: "700",
                            textTransform: "none",
                        }}
                        onClick={() => {
                            if (!bookingAppointmentDetails.appointmentDate) {
                                return setDateErr(true);
                            }

                            setBookAppointmentDetailsDialog(true);
                        }}
                    >
                        Next
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookAppointmentDialogForPatient;
