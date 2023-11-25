import React, { useState, useEffect } from "react";
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
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import { BiSolidPlusSquare } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditSlotComponent from "./EditSlotSettingComponent";
import AddSlotComponent from "./AddSlotComponent";
import AddedSlotComponent from "./AddedSlotComponent";
import moment from "moment";

const OnlineAppointmentComponet = ({
    markAsHoliday,
    setMarkAsHoliday,
    slotData,
    doctorDetails,
    onlineSlotData,
    selectedSlotDate,
    setSelectedSlotDate,
    getOnlineSlotDetailForDoctorForPerticularDate,
}) => {
    const [slotDuration, setSlotDuration] = useState(15);
    const slotDurations = [15, 30, 45, 60];
    let count = 1;
    const [numOfStartTimes, setNumOfStartTimes] = useState(0);
    const [dates, setDates] = useState([]);

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endTimes, setEndTimes] = useState([]);

    const [startTime2, setStartTime2] = useState("");
    const [startTimes2, setStartTimes2] = useState([]);
    const [endTime2, setEndTime2] = useState("");
    const [endTimes2, setEndTimes2] = useState([]);

    const [startTime3, setStartTime3] = useState("");
    const [startTimes3, setStartTimes3] = useState([]);
    const [endTime3, setEndTime3] = useState("");
    const [endTimes3, setEndTimes3] = useState([]);

    const handleSlotDurationChange = (event) => {
        setSlotDuration(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const currentDay = moment().format("ddd");
    const [currentMonth, setCurrentMonth] = useState(moment());
    const currentDate = moment().format("yyyy-MM-DD");
    // const [selectedDay, setSelectedDay] = useState({ currentDate, i: 0 });

    // const [selectedTokenDay, setSelecteTokendDay] = useState({
    //     currentDate,
    //     i: 0,
    // });
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
        // setEndTime(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );
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

        // const generatedEndTimes2 = [];
        // let currentTime2 = new Date(`01/01/2023 ${endTime}`);
        // while (currentTime2 < new Date(`01/01/2023 11:59 PM`)) {
        //     currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
        //     generatedEndTimes2.push(
        //         currentTime2.toLocaleTimeString([], {
        //             hour: "2-digit",
        //             minute: "2-digit",
        //         })
        //     );
        // }
        // setEndTimes2(generatedEndTimes2);
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
    }, [startTime3, numOfStartTimes === 2]);

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

        // const generatedEndTimes2 = [];
        // let currentTime2 = new Date(`01/01/2023 ${endTime}`);
        // while (currentTime2 < new Date(`01/01/2023 11:59 PM`)) {
        //     currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
        //     generatedEndTimes2.push(
        //         currentTime2.toLocaleTimeString([], {
        //             hour: "2-digit",
        //             minute: "2-digit",
        //         })
        //     );
        // }
        // setEndTimes2(generatedEndTimes2);
    }, [startTime2, numOfStartTimes === 1]);

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
    }, [endTime2, numOfStartTimes === 2]);

    useEffect(() => {
        // Calculate the initial end time based on slot duration and start time
        const start = new Date(`01/01/2023 ${endTime}`);
        console.log(start);
        start.setMinutes(start.getMinutes() + slotDuration);
        // setStartTime2(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );
        console.log(start);

        // Generate end times based on the selected start time and slot duration
        const genratedStartTimes2 = [];
        let currentTime = new Date(`01/01/2023 ${endTime}`);
        console.log(currentTime);
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
    }, [endTime, numOfStartTimes === 1]);

    const saveData = async () => {
        try {
            const response = await axiosClient.post("/v2/creatSlotForDoctor", {
                slotduration: slotDuration,
                Starttime1: startTime,
                Endtime1: endTime,
                Starttime2: startTime2,
                Endtime2: endTime2,
                Starttime3: startTime3,
                Endtime3: endTime3,
                isholiday: markAsHoliday,
                date: selectedSlotDate.currentDate,
                doctorid: user._id,
            });
            getOnlineSlotDetailForDoctorForPerticularDate();
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
    const handleSelectedDate = async (userDate, i) => {
        const { date, month, year, day } = userDate;
        const a = year + "-" + month + "-" + date;

        var formattedDate = moment(a, "yyyy-MMM-DD").format("yyyy-MM-DD");
        console.log(a);
        // await setEditSlottSetting(false);
        setSelectedSlotDate({ currentDate: formattedDate, i });
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
                <Stack
                    direction="row"
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "100%" },
                        flexWrap: "wrap",
                        gap: { xs: "7px", sm: "7px", md: "12.61px" },
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
                                    selectedSlotDate.i === i &&
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
                                        ? "#1F51C6"
                                        : doctorDetails?.acceptAppointments ===
                                          "bySlot"
                                        ? "#FFFFFF"
                                        : "#D9D9D9",
                                border:
                                    currentDate === date.day
                                        ? "2px solid #1F51C6"
                                        : "1px solid #706D6D8F",
                                borderRadius: "3px",
                                color:
                                    selectedSlotDate.i === i
                                        ? "#FFFFFF"
                                        : doctorDetails?.acceptAppointments ===
                                          "bySlot"
                                        ? "#706D6D"
                                        : "#ffffff",
                                cursor:
                                    doctorDetails?.acceptAppointments ===
                                    "bySlot"
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
                {onlineSlotData !== null ? (
                    <AddedSlotComponent
                        doctorDetails={doctorDetails}
                        onlineSlotData={onlineSlotData}
                        getOnlineSlotDetailForDoctorForPerticularDate={
                            getOnlineSlotDetailForDoctorForPerticularDate
                        }
                        selectedSlotDate={selectedSlotDate}
                    />
                ) : (
                    <AddSlotComponent
                        doctorDetails={doctorDetails}
                        selectedSlotDate={selectedSlotDate}
                        getOnlineSlotDetailForDoctorForPerticularDate={
                            getOnlineSlotDetailForDoctorForPerticularDate
                        }
                    />
                )}
            </Card>
        </>
    );
};

export default OnlineAppointmentComponet;
