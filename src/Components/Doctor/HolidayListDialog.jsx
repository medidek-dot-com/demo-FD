import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import moment from "moment";

const StackStyle = styled(Stack)({
    overflowX: "auto",
    maxWidth: "400px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
        width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
    },
    WebkitOverflowScrolling: ["touch", "scroll"],
    touchAction: "pan-x",
    WebkitOverflowScrolling: ["touch", "scroll"],
    cursor: "grab",
    whiteSpace: "nowrap",
    userSelect: "none",
});

const HolidayListDialog = ({ holidayDialog, setHolidayDialog }) => {
    const currentDay = moment().format("DD MMM");


    const [dates, setDates] = useState([]);
    // console.log(dates.map(date => date.date + " " + date.month));
    const [currentMonth, setCurrentMonth] = useState(moment());

    // console.log(currentMonth.date())
    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, "month"));
    };

    // Function to navigate to the next month
    const goToNextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, "month"));
    };

    // const [currentMonth, setCurrentMonth] = useState(moment());

    const getMonthDates = () => {
        const daysInMonth = currentMonth.daysInMonth();
        const monthStart = currentMonth.startOf("month");
        const monthsDates = [];

        for (let i = 0; i < daysInMonth; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push({
                day: date.format("ddd"),
                date: date.format("DD"),
                month: date.format("MMM"),
            });
        }
        setDates(monthsDates);
    };

    // onClick={(e) => {
    //     setActiveCard(i);
    //     setDateErr(false);
    //     const dateString = e.target.innerText;
    //     console.log();
    //     const dateObject = dayjs(
    //         dateString + dayjs().year()
    //     );

    //     const formattedDate =
    //         dateObject.format("DD-MM-YYYY");
    //     console.log(formattedDate);

    //     setBookingAppointmentDetails({
    //         ...bookingAppointmentDetails,
    //         appointmentDate: formattedDate,
    //     });
    // }}

    useEffect(() => {
        getMonthDates();
    }, [currentMonth]);

    return (
        <>
            <Dialog
                open={holidayDialog}
                onClose={() => setHolidayDialog(false)}
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
                    Holiday list
                    {holidayDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setHolidayDialog(false)}
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
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <Box>
                        <IconButton onClick={goToPreviousMonth}>
                            <ArrowBackIosNewIcon sx={{ color: "#383838" }} />
                        </IconButton>
                        <Button
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "1.125rem",
                                textTransform: "none",
                                color: "#383838",
                            }}
                        >
                            {currentMonth.format("MMMM YYYY")}
                        </Button>
                        <IconButton onClick={goToNextMonth}>
                            <ArrowForwardIosIcon sx={{ color: "#383838" }} />
                        </IconButton>
                    </Box>
                    <StackStyle
                        spacing="5px"
                        direction="row"
                        sx={{ width: "100%", overflow: "auto" }}
                    >
                        {dates.map((date, i) => (
                            <Box
                            id = {currentDay === date.date + " " + date.month ? "activeDate" : "NormalDate"}
                                key={i}
                                sx={{
                                    width: {
                                        xs: "41px",
                                        sm: "41px",
                                        md: "50px",
                                    },
                                    height: "50px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "30px",
                                    background:
                                        currentDay === date.date + " " + date.month
                                            ? "#1F51C6"
                                            : "#FFFFFF",
                                    border:
                                        currentDay === date.date + " " + date.month
                                            ? "none"
                                            : "1px solid #706D6D8F",
                                    color:
                                        currentDay === date.date + " " + date.month
                                            ? "#FFFFFF"
                                            : "#706D6D",
                                    borderRadius: "50%",
                                    lineHeight: "20.2px",
                                    gap: "1px",
                                }}
                            >
                                <Box component="span">{date.day}</Box>
                                <Box component="span">{date.date}</Box>
                            </Box>
                        ))}
                    </StackStyle>
                    <Stack spacing="10px" width="100%">
                        <Box
                            sx={{
                                py: { xs: "8px", sm: "8px", md: "16px" },
                                px: "16px",
                                background: "#407BFF",
                                borderRadius: "5px",
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "1.125rem",
                                width: { xs: "100%", sm: "100%", md: "389px" },
                                color: "#FFFFFF",
                            }}
                        >
                            2st Oct- Tuesday
                        </Box>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HolidayListDialog;
