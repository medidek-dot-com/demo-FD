import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    Select,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import moment from "moment";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import { BiSolidPlusSquare } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";
import "ldrs/dotPulse";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import EditTokenSettingComponent from "./EditTokenSettingComponent";
import { LoadingButton } from "@mui/lab";

const AddTokenComponent = ({
    setSelecteTokendDate,
    setMarkAsHoliday,
    markAsHoliday,
    selectedTokenDate,
    doctorDetails,
    getAppointmentByTokenSlotDetailForDoctorForPerticularDate,
}) => {
    const { doctor_id } = useParams();
    const { user } = useSelector((state) => state.auth);

    // const currentDate = moment().format("yyyy-MM-DD");

    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(false);
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
    const [disableButton, setDisableButton] = useState(false);

    const [acceptAppointmentByToken, setAcceptAppointmentByToken] =
        useState(false);
    const [switchLoading, setSwitchLoading] = useState(false);
    const slotDurations = [15, 30, 45, 60];

    const generateStartTimes = () => {
        const timestamps = [];
        const totalMinutesInDay = 24 * 60;

        for (
            let minute = 0;
            minute < totalMinutesInDay;
            minute += slotDuration
        ) {
            const hour = Math.floor(minute / 60);
            const minutePart = minute % 60;

            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minutePart.toString().padStart(2, "0");

            const timestamp = `${formattedHour}:${formattedMinute}`;
            timestamps.push(timestamp);
        }

        return timestamps;
    };
    const startTimes = generateStartTimes();

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
                    hour12: false,
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
                    hour12: false,
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
                    hour12: false,
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
                    hour12: false,
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
                    hour12: false,
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

    // const handleSelectedDate = (userDate, i) => {
    //     const { date, month, year, day } = userDate;
    //     // console.log(day, date, month, year);
    //     const a = year + "-" + month + "-" + date;
    //     console.log(a);

    //     var formattedDate = moment(a).format("YYYY-MM-DD");
    //     console.log(formattedDate); // Output: "2023-11-13"
    //     // const formattedDate = moment.format(date)

    //     selectedTokenDate({ currentDate: formattedDate, i });
    // };

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
        setDisableButton(true);
        try {
            const response = await axiosClient.post("/v2/creatTokenForDoctor", {
                Starttime1: startTime,
                Endtime1: endTime,
                Starttime2: startTime2,
                Endtime2: endTime2,
                Starttime3: startTime3,
                Endtime3: endTime3,
                date: selectedTokenDate.currentDate,
                doctorid: doctor_id,
            });
            console.log(response.result);
            if (response.status === "ok") {
                setStartTime("");
                setStartTime2("");
                setStartTime3("");
                setEndTime("");
                setEndTime2("");
                setEndTime3("");
                await getAppointmentByTokenSlotDetailForDoctorForPerticularDate();
                setDisableButton(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error.message);
        }
    };

    return (
        <>
            <Stack spacing="20px" sx={{ mt: "16.61px" }}>
                <Stack
                    spacing="20.02px"
                    direction={{
                        xs: "column",
                        sm: "column",
                        md: "row",
                    }}
                >
                    <Stack spacing="10.48px">
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.938rem",
                                color: "#383838",
                            }}
                        >
                            Start Time
                        </InputLabel>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails.acceptAppointments ===
                                        "byToken"
                                        ? false
                                        : true
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    background:
                                        markAsHoliday ||
                                        doctorDetails.acceptAppointments ===
                                            "byToken"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime}
                                onChange={handleStartTimeChange}
                            >
                                <MenuItem
                                    value={""}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {startTimes.map((time, i) => (
                                    <MenuItem
                                        key={i}
                                        value={time}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {time}
                                    </MenuItem>
                                ))}
                                {/* {Array.from(
                                    { length: 1440 / slotDuration },
                                    (_, index) => {
                                        const minutes = index * slotDuration;
                                        const time = new Date(
                                            0,
                                            0,
                                            0,
                                            0,
                                            minutes
                                        );
                                        return (
                                            <MenuItem
                                                key={time.toTimeString()}
                                                value={time.toLocaleTimeString(
                                                    [],
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}
                                                sx={{
                                                    fontFamily: "Lato",
                                                    fontWeight: "semibold",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {time.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </MenuItem>
                                        );
                                    }
                                )} */}
                                {/* <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem> */}
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack spacing="10.48px">
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.938rem",
                                color: "#383838",
                            }}
                        >
                            End Time
                        </InputLabel>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails.acceptAppointments ===
                                        "byToken"
                                        ? false
                                        : true
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    background:
                                        markAsHoliday ||
                                        doctorDetails.acceptAppointments ===
                                            "byToken"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime}
                                onChange={(event) =>
                                    setEndTime(event.target.value)
                                }
                            >
                                <MenuItem
                                    value={""}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {endTimes.map((time) => (
                                    <MenuItem
                                        key={time}
                                        value={time}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {time}
                                    </MenuItem>
                                ))}

                                {/* <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem> */}
                            </Select>
                            {/* {numOfStartTimes === 0 && ( */}
                            {/* <Button
                                    disabled={markAsHoliday ? true : false}
                                    onClick={() =>
                                        setNumOfStartTimes(
                                            numOfStartTimes + count
                                        )
                                    }
                                    sx={{ minWidth: "0px" }}
                                >
                                    <BiSolidPlusSquare
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            color: markAsHoliday
                                                ? "#D9D9D9"
                                                : "#1F51C6",
                                        }}
                                    />
                                </Button> */}
                            {/* <IconButton
                                    disabled={numOfStartTimes === 0 ? true : false}
                                    onClick={() => setNumOfStartTimes(1)}
                                    sx={{
                                        ":hover": {
                                            background: "none",
                                        },
                                    }}
                                >
                                    <BiSolidPlusSquare
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            color: "#1F51C6",
                                        }}
                                    />

                                    
                                </IconButton> */}
                            {/* )} */}
                        </Stack>
                    </Stack>
                </Stack>
                {/* {numOfStartTimes >= 1 && ( */}
                <Stack
                    spacing="20.02px"
                    direction={{
                        xs: "column",
                        sm: "column",
                        md: "row",
                    }}
                >
                    <Stack spacing="10.48px">
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.938rem",
                                color: "#383838",
                            }}
                        >
                            Start Time 2
                        </InputLabel>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails.acceptAppointments ===
                                        "byToken"
                                        ? false
                                        : true
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    background:
                                        markAsHoliday ||
                                        doctorDetails.acceptAppointments ===
                                            "byToken"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime2}
                                onChange={(e) => setStartTime2(e.target.value)}
                            >
                                <MenuItem
                                    value={""}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {startTimes2.map((startTime, i) => (
                                    <MenuItem
                                        value={startTime}
                                        key={i}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {startTime}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem> */}
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack spacing="10.48px">
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.938rem",
                                color: "#383838",
                            }}
                        >
                            End Time
                        </InputLabel>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails.acceptAppointments ===
                                        "byToken"
                                        ? false
                                        : true
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    background:
                                        markAsHoliday ||
                                        doctorDetails.acceptAppointments ===
                                            "byToken"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime2}
                                onChange={(e) => setEndTime2(e.target.value)}
                            >
                                <MenuItem
                                    value={""}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {endTimes2.map((endTime, i) => (
                                    <MenuItem
                                        value={endTime}
                                        key={i}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {endTime}
                                    </MenuItem>
                                ))}

                                {/* <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem> */}
                            </Select>
                            {/* <Button
                                        sx={{
                                            minWidth: "0px",
                                            height: "29px",
                                        }}
                                        onClick={() =>
                                            setNumOfStartTimes(
                                                numOfStartTimes - 1
                                            )
                                        }
                                    >
                                        <MdDelete
                                            style={{
                                                color: "#ffffff",
                                                width: "27.55px",
                                                height: "29px",
                                                borderRadius: "3px",
                                                // padding: "7px",
                                                background: "#B92612",
                                            }}
                                        />
                                    </Button> */}
                            {/* <IconButton
                                        onClick={() => setNumOfStartTimes(0)}
                                        sx={{
                                            background: "#B92612",
                                            borderRadius: "3px",
                                            width: "28px",
                                            height: "29px",
                                            ml: "10px",
                                            ":hover": {
                                                background: "#B92612",
                                            },
                                        }}
                                    >
                                        <MdDelete
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                color: "#ffffff",
                                            }}
                                        />
                                        
                                    </IconButton> */}
                        </Stack>
                    </Stack>
                </Stack>
                {/* )} */}
                {/* {numOfStartTimes >= 2 && ( */}
                <Stack
                    spacing="20.02px"
                    direction={{
                        xs: "column",
                        sm: "column",
                        md: "row",
                    }}
                >
                    <Stack spacing="10.48px">
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.938rem",
                                color: "#383838",
                            }}
                        >
                            Start Time 3
                        </InputLabel>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails.acceptAppointments ===
                                        "byToken"
                                        ? false
                                        : true
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    background:
                                        markAsHoliday ||
                                        doctorDetails.acceptAppointments ===
                                            "byToken"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime3}
                                onChange={(e) => setStartTime3(e.target.value)}
                            >
                                <MenuItem
                                    value={""}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {startTimes3.map((time, i) => (
                                    <MenuItem
                                        value={time}
                                        key={i}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {time}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem> */}
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack spacing="10.48px">
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.938rem",
                                color: "#383838",
                            }}
                        >
                            End Time 3
                        </InputLabel>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails.acceptAppointments ===
                                        "byToken"
                                        ? false
                                        : true
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    background:
                                        markAsHoliday ||
                                        doctorDetails.acceptAppointments ===
                                            "byToken"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime3}
                                onChange={(e) => setEndTime3(e.target.value)}
                            >
                                <MenuItem
                                    value={""}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {endTimes3.map((endTime, i) => (
                                    <MenuItem
                                        value={endTime}
                                        key={i}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {endTime}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <Button
                                        sx={{
                                            minWidth: "0px",
                                            height: "29px",
                                        }}
                                        onClick={() =>
                                            setNumOfStartTimes(
                                                numOfStartTimes - 1
                                            )
                                        }
                                    >
                                        <MdDelete
                                            style={{
                                                color: "#ffffff",
                                                width: "27.55px",
                                                height: "29px",
                                                borderRadius: "3px",
                                                // padding: "7px",
                                                background: "#B92612",
                                            }}
                                        />
                                    </Button> */}
                        </Stack>
                    </Stack>
                </Stack>
                {/* )} */}
                {/* {numOfStartTimes >= 3 && ( */}
                {/* <Stack
                        spacing="20.02px"
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                    >
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                Start Time 3
                            </InputLabel>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disabled={markAsHoliday ? true : false}
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                        background: markAsHoliday
                                            ? "#D9D9D9"
                                            : "",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(e.target.value)
                                    }
                                >
                                    {startTimeOptions.map((startTime, i) => (
                                        <MenuItem
                                            value={startTime}
                                            key={i}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {startTime}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                End Time
                            </InputLabel>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disabled={markAsHoliday ? true : false}
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                        background: markAsHoliday
                                            ? "#D9D9D9"
                                            : "",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                >
                                    {endTimeOptions.map((endTime, i) => (
                                        <MenuItem
                                            value={endTime}
                                            key={i}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {endTime}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button
                                    sx={{
                                        width: "0px",
                                        height: "29px",
                                    }}
                                    onClick={() =>
                                        setNumOfStartTimes(numOfStartTimes - 1)
                                    }
                                >
                                    <MdDelete
                                        style={{
                                            color: "#ffffff",
                                            width: "27.55px",
                                            height: "29px",
                                            borderRadius: "3px",
                                            // padding: "7px",
                                            background: "#B92612",
                                        }}
                                    />
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack> */}
                {/* )} */}
                <LoadingButton
                    // size="small"
                    fullWidth
                    onClick={saveData}
                    loading={disableButton}
                    // loadingPosition="end"
                    variant="contained"
                    disabled={
                        doctorDetails.acceptAppointments === "bySlot"
                            ? true
                            : false
                    }
                    sx={{
                        boxShadow: "none",
                        borderRadius: "29px",
                        textTransform: "none",
                        fontFamily: "Lato",
                        fontWeight: "700",
                        fontSize: "1.063rem",
                        ":hover": {
                            boxShadow: "none",
                        },
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Lato",
                            fontWeight: "700",
                            fontSize: "1.063rem",
                        }}
                    >
                        Save
                    </span>
                </LoadingButton>
                {/* <Button
                    variant="contained"
                    disabled={
                        doctorDetails.acceptAppointments === "bySlot"
                            ? true
                            : false
                    }
                    onClick={saveData}
                    sx={{
                        boxShadow: "none",
                        borderRadius: "29px",
                        textTransform: "none",
                        fontFamily: "Lato",
                        fontWeight: "700",
                        fontSize: "1.063rem",
                    }}
                >
                    Save
                </Button> */}
            </Stack>

            {/* <EditTokenSettingComponent 
             markAsHoliday={markAsHoliday}
             selectedTokenDate={selectedTokenDate}
             doctorDetails={doctorDetails}
             getAppointmentByTokenSlotDetailForDoctorForPerticularDate={getAppointmentByTokenSlotDetailForDoctorForPerticularDate}
            /> */}
        </>
    );
};

export default AddTokenComponent;
