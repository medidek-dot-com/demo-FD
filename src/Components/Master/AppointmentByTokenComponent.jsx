import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    InputLabel,
    Select,
    Stack,
    MenuItem,
    Button,
    IconButton,
    Card,
    Box,
    Typography,
} from "@mui/material";
import AddedTokenComponent from "./AddedTokenComponent";
import AddTokenComponent from "./AddTokenComponent";

const AppointmentByTokenComponent = ({
    doctorDetails,
    slotData,
    tokenSlotData,
    selectedTokenDate,
    setSelecteTokendDate,
    getAppointmentByTokenSlotDetailForDoctorForPerticularDate,
}) => {
    const { doctorid } = useParams();
    const { user } = useSelector((state) => state.auth);
    console.log(doctorDetails);
    // const currentDate = moment().format("yyyy-MM-DD");

    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(false);
    const currentDay = moment().format("ddd");
    const [dates, setDates] = useState([]);
    const [holidayDialog, setHolidayDialog] = useState(false);
    const [markAsHoliday, setMarkAsHoliday] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(moment());
    const currentDate = moment().format("yyyy-MM-DD");
    // const [selectedDay, setSelectedDay] = useState({ currentDate, i: 0 });
    const [startTime, setStartTime] = useState("12:00 AM");

    const [startTime2, setStartTime2] = useState("");
    const [startTimes2, setStartTimes2] = useState([]);
    const [endTime2, setEndTime2] = useState("");
    const [endTimes2, setEndTimes2] = useState([]);

    const [startTime3, setStartTime3] = useState("");
    const [startTimes3, setStartTimes3] = useState([]);
    const [endTime3, setEndTime3] = useState("");
    const [endTimes3, setEndTimes3] = useState([]);

    //From here
    const [slotDuration, setSlotDuration] = useState(60);
    const [endTime, setEndTime] = useState("");
    const [endTimes, setEndTimes] = useState([]);
    let count = 1;
    const [numOfStartTimes, setNumOfStartTimes] = useState(0);

    const [acceptAppointmentByToken, setAcceptAppointmentByToken] =
        useState(false);
    const [switchLoading, setSwitchLoading] = useState(false);
    const slotDurations = [15, 30, 45, 60];

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

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${startTime}`);
        start.setMinutes(start.getMinutes() + slotDuration);
        setEndTime(
            start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
        console.log(start);

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes = [];
        let currentTime = new Date(`01/01/2023 ${startTime}`);
        console.log(currentTime);
        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
            generatedEndTimes.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }
        setEndTimes(generatedEndTimes);
    }, [slotDuration, startTime]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${startTime3}`);
        start.setMinutes(start.getMinutes() + slotDuration);
        // setEndTime3(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );
        console.log(start);

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${startTime3}`);
        console.log(currentTime);
        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
            generatedEndTimes3.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }
        setEndTimes3(generatedEndTimes3);
    }, [startTime3]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${startTime2}`);
        start.setMinutes(start.getMinutes() + slotDuration);
        // setEndTime2(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );
        console.log(start);

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes2 = [];
        let currentTime = new Date(`01/01/2023 ${startTime2}`);
        console.log(currentTime);
        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
            generatedEndTimes2.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }
        setEndTimes2(generatedEndTimes2);
    }, [startTime2]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${endTime2}`);
        console.log(start);
        start.setMinutes(start.getMinutes() + slotDuration);
        // setStartTime3(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );
        console.log(start);

        // Generate end times based on the selected start time and slot duration
        const genratedStartTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${endTime2}`);
        console.log(currentTime);
        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
            genratedStartTimes3.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }
        setStartTimes3(genratedStartTimes3);
    }, [endTime2]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${endTime}`);
        start.setMinutes(start.getMinutes() + slotDuration);
        // setStartTime2(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );

        // Generate end times based on the selected start time and slot duration
        const genratedStartTimes2 = [];
        let currentTime = new Date(`01/01/2023 ${endTime}`);
        while (currentTime < new Date(`01/01/2023 11:59 PM`)) {
            currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
            genratedStartTimes2.push(
                currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }
        setStartTimes2(genratedStartTimes2);
    }, [endTime]);

    const handleSlotDurationChange = (event) => {
        setSlotDuration(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };
    //To here

    const handleSelectedDate = (userDate, i) => {
        const { date, month, year, day } = userDate;
        // console.log(day, date, month, year);
        const a = year + "-" + month + "-" + date;
        console.log(a);

        var formattedDate = moment(a).format("YYYY-MM-DD");
        console.log(formattedDate); // Output: "2023-11-13"
        // const formattedDate = moment.format(date)

        setSelecteTokendDate({ currentDate: formattedDate, i });
    };

    const handleSwtichChange = async (e) => {
        setSwitchLoading(true);
        try {
            const response = await axiosClient.put(
                `/v2/editAcceptAppointmentByToken/${doctorid}`,
                { acceptAppointmentByToken: !acceptAppointmentByToken }
            );
            console.log(response);
            if (response.status === "ok") {
                console.log(e.target.checked);
                setSwitchLoading(false);
                return setAcceptAppointmentByToken(
                    response.result.acceptAppointmentByToken
                );
            }
        } catch (error) {
            setSwitchLoading(false);
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };

    const saveData = async () => {
        try {
            const response = await axiosClient.post("/v2/creatTokenForDoctor", {
                Starttime1: startTime,
                Endtime1: endTime,
                Starttime2: startTime2,
                Endtime2: endTime2,
                Starttime3: startTime3,
                Endtime3: endTime3,
                date: selectedDay.currentDate,
                doctorid: user._id,
            });
            console.log(response.result);
            setStartTime("");
            setStartTime2("");
            setStartTime3("");
            setEndTime("");
            setEndTime2("");
            setEndTime3("");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
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
                    mt: "40px",
                }}
            >
                <Stack direction="row" sx={{ flexWrap: "wrap", gap: "10px" }}>
                    {dates.map((date, i) => (
                        <Box
                            key={i + 1}
                            component="button"
                            onClick={() => handleSelectedDate(date, i)}
                            disabled={
                                doctorDetails?.acceptAppointments === "bySlot"
                                    ? true
                                    : false
                            }
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
                                    selectedTokenDate.i === i &&
                                    doctorDetails?.acceptAppointments ===
                                        "byToken"
                                        ? "#1F51C6"
                                        : doctorDetails?.acceptAppointments ===
                                          "byToken"
                                        ? "#FFFFFF"
                                        : "#D9D9D9",
                                border:
                                    currentDate === date.day
                                        ? "2px solid #1F51C6"
                                        : "1px solid #706D6D8F",
                                borderRadius: "3px",
                                color:
                                    selectedTokenDate.i === i
                                        ? "#FFFFFF"
                                        : doctorDetails?.acceptAppointments ===
                                          "byToken"
                                        ? "#706D6D"
                                        : "#ffffff",
                                cursor:
                                    doctorDetails?.acceptAppointments ===
                                    "byToken"
                                        ? "pointer"
                                        : "no-drop",
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
                {tokenSlotData !== null ? (
                    <AddedTokenComponent
                        doctorDetails={doctorDetails}
                        tokenSlotData={tokenSlotData}
                        selectedTokenDate={selectedTokenDate}
                        setSelecteTokendDate={setSelecteTokendDate}
                        holidayDialog={holidayDialog}
                        setHolidayDialog={setHolidayDialog}
                        markAsHoliday={markAsHoliday}
                        setMarkAsHoliday={setMarkAsHoliday}
                        getAppointmentByTokenSlotDetailForDoctorForPerticularDate={
                            getAppointmentByTokenSlotDetailForDoctorForPerticularDate
                        }
                    />
                ) : (
                    <AddTokenComponent
                        doctorDetails={doctorDetails}
                        selectedTokenDate={selectedTokenDate}
                        setSelecteTokendDate={setSelecteTokendDate}
                        holidayDialog={holidayDialog}
                        setHolidayDialog={setHolidayDialog}
                        markAsHoliday={markAsHoliday}
                        setMarkAsHoliday={setMarkAsHoliday}
                        getAppointmentByTokenSlotDetailForDoctorForPerticularDate={
                            getAppointmentByTokenSlotDetailForDoctorForPerticularDate
                        }
                    />
                )}
            </Card>
        </>
    );
};

export default AppointmentByTokenComponent;
