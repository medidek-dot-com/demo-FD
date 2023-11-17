import React from "react";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import AppointmentByTokenComponent from "./AppointmentByTokenComponent";
import OnlineAppointmentComponet from "./OnlineAppointmentComponet";

const AppointmentSettingDialog = ({
    appointmentSettingDialog,
    setAppointmentSettingDialog,
}) => {
    const [appointmentByToken, setAppointmentByToken] = useState(false);
    const [dates, setDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(moment());
    const currentDate = moment().format("yyyy-MM-DD");
    const [selectedDay, setSelectedDay] = useState({ currentDate, i: 0 });
    const [markAsHoliday, setMarkAsHoliday] = useState(false);

    const currentDay = moment().format("ddd");

    const getWeekDates = () => {
        const daysInMonth = currentMonth.daysInMonth();
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 7; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push({
                day: date.format("ddd"),
                date: date.format("DD"),
                month: date.format("MMM"),
                year: date.format("YYYY"),
            });
        }
        setDates(monthsDates, currentDay);
    };

    useEffect(() => {
        getWeekDates();
    }, []);
    return (
        <>
            <Dialog
                open={appointmentSettingDialog}
                onClose={() => {
                    return setAppointmentSettingDialog(false);
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
                    Appointment Settings
                    {appointmentSettingDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setAppointmentSettingDialog(false)}
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
                <DialogContent>
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
                                py: "14px",
                                px: {
                                    xs: "16px",
                                    sm: "26px",
                                    md: "47px",
                                },
                                fontFamily: "Lato",
                                fontWeight: "semibold",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1.25rem",
                                },
                                width: "100%",
                                height: {
                                    xs: "40px",
                                    sm: "40px",
                                    md: "50px",
                                },
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
                                py: "14px",
                                px: {
                                    xs: "16px",
                                    sm: "26px",
                                    md: "57px",
                                },
                                fontFamily: "Lato",
                                fontWeight: "semibold",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1.25rem",
                                },
                                width: "100%",
                                height: {
                                    xs: "40px",
                                    sm: "40px",
                                    md: "50px",
                                },
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
                            justifyContent: "start",
                            alignItems: "center",
                            my: "15px",
                        }}
                    >
                        <Switch
                            // value={"enabled"}

                            onChange={(e) =>
                                setOnlineAppointmentEnabled(e.target.checked)
                            }
                        />
                        <Box
                            component="span"
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                color: "#1F51C6",
                            }}
                        >
                            {/* {onlineAppointmentEnabled ? "Enable" : "Disabled"} */}
                        </Box>
                    </Box>
                    <Card
                        sx={{
                            px: {
                                xs: "16px",
                                sm: "16px",
                                md: "30px",
                            },
                            py: {
                                xs: "25px",
                                sm: "25px",
                                md: "30px",
                            },
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={{ xs: "7px", sm: "7px", md: "12.61px" }}
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "100%" },
                                // background: "red",
                            }}
                        >
                            {dates.map((date, i) => (
                                <Box
                                    key={i + 1}
                                    component="button"
                                    onClick={() => handleSelectedDate(date, i)}
                                    sx={{
                                        width: {
                                            xs: "43.18px",
                                            sm: "43.18px",
                                            md: "57.39px",
                                        },
                                        height: {
                                            xs: "43.18px",
                                            sm: "43.18px",
                                            md: "57.39px",
                                        },
                                        background:
                                            selectedDay.i === i
                                                ? "#1F51C6"
                                                : "#FFFFFF",
                                        border:
                                            currentDate === date.day
                                                ? "2px solid #1F51C6"
                                                : "1px solid #706D6D8F",
                                        borderRadius: "3px",
                                        color:
                                            selectedDay.i === i
                                                ? "#FFFFFF"
                                                : "#706D6D",
                                        userSelect: "none",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: {
                                                xs: "0.938rem",
                                                sm: "0.938rem",
                                                md: "1.125rem",
                                            },
                                            lineHeight: "21.6px",
                                        }}
                                    >
                                        {date.day}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: {
                                                xs: "0.938rem",
                                                sm: "0.938rem",
                                                md: "1.125rem",
                                            },
                                            lineHeight: "21.6px",
                                        }}
                                    >
                                        {date.date}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                        {appointmentByToken ? (
                            <AppointmentByTokenComponent />
                        ) : (
                            <OnlineAppointmentComponet
                                markAsHoliday={markAsHoliday}
                                setMarkAsHoliday={setMarkAsHoliday}
                            />
                        )}
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AppointmentSettingDialog;
