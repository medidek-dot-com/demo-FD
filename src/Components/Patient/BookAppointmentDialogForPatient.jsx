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
    Divider,
} from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import "ldrs/dotPulse";

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
    selectedTime,
    setSelectedTime,
    activeCard,
    setActiveCard,
    datedumb,
}) => {
    const [dateErr, setDateErr] = useState(false);
    const [dates, setDates] = useState([]);
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
    const [appointmentByToken, setAppointmentByToken] = useState(false);

    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 7; i++) {
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
            <DialogStyle
                open={bookingAppointmentDialog}
                onClose={() => {
                    return setBookAppointmentDialog(false) & setDateErr(false);
                }}
                maxWidth={"md"}
                // sx={{ margin: " 0 auto" }}
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
                <Divider />
                <DialogContent
                    sx={{
                        marginTop: "10px",
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                        // alignItems: "center",
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            border: "1px solid #D9D9D9",
                            borderRadius: "6px",
                        }}
                    >
                        <Button
                            variant={!appointmentByToken ? "contained" : "text"}
                            onClick={() => setAppointmentByToken(false)}
                            sx={{
                                boxShadow: "none",
                                textTransform: "none",
                                py: "10px",
                                px: {
                                    xs: "16px",
                                    sm: "26px",
                                    md: "47px",
                                },
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1.15rem",
                                },
                                // width: "100%",
                                lineHeight: "24px",
                                // height: {
                                //     xs: "40px",
                                //     sm: "40px",
                                //     md: "50px",
                                // },
                                background: !appointmentByToken
                                    ? "#1F51C6"
                                    : "#FFFFFF",
                                color: !appointmentByToken
                                    ? "#ffffff"
                                    : "#706D6D",
                                borderRadius: "0",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px",
                            }}
                        >
                            Online Appointments
                        </Button>
                        <Button
                            variant={appointmentByToken ? "contained" : "text"}
                            onClick={() => setAppointmentByToken(true)}
                            sx={{
                                boxShadow: "none",
                                textTransform: "none",
                                py: "10px",
                                px: {
                                    xs: "16px",
                                    sm: "26px",
                                    md: "57px",
                                },
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1.25rem",
                                },
                                lineHeight: "24px",
                                // width: "100%",
                                // height: {
                                //     xs: "40px",
                                //     sm: "40px",
                                //     md: "50px",
                                // },
                                color: appointmentByToken
                                    ? "#FFFFFF"
                                    : "#706D6D",
                                background: appointmentByToken
                                    ? "#1F51C6"
                                    : "#FFFFFF",
                            }}
                        >
                            Appointments by token
                        </Button>
                    </Stack>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            // marginTop: "10px",
                            gap: "10px",
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
                                    // marginInline: "5px",
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
                                textAlign: "center",
                            }}
                        >
                            Please choose Date And Time!
                        </Box>
                    )}

                    {appointmentByToken ? (
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "0.938rem",
                                    lineHeight: "18px",
                                    color: "#383838",
                                }}
                            >
                                Availability:
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "0.938rem",
                                    lineHeight: "18px",
                                    color: "#1F51C6",
                                }}
                            >
                                9:00AM- 4:00PM
                            </Typography>
                        </Box>
                    ) : (
                        <List
                            sx={{
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

                            {slotData[0] ===
                                "doctor not available for this date" &&
                            slotsLoading === false ? (
                                // Default values shown

                                <Typography
                                    sx={{
                                        color: "#B92612",
                                        fontFamily: "Lato",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginInline: "auto",
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
                    )}

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
                            marginBottom: "10px",
                            // width: "100%",
                            borderRadius: "40px",
                            boxShadow: "none",
                            fontFamily: "Lato",
                            fontWeight: "700",
                            fontSize: "1.063rem",
                            textTransform: "none",
                            height: "40px",
                        }}
                        onClick={() => {
                            if (
                                !bookingAppointmentDetails.appointmentDate ||
                                !bookingAppointmentDetails.AppointmentTime ||
                                !datedumb
                            ) {
                                return setDateErr(true);
                            }
                            setBookAppointmentDetailsDialog(true);
                        }}
                    >
                        Next
                    </Button>
                </DialogContent>
            </DialogStyle>
        </>
    );
};

export default BookAppointmentDialogForPatient;
