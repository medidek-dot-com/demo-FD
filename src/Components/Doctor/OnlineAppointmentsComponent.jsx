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
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import moment from "moment";
import { blue } from "@mui/material/colors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { BiSolidPlusSquare } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Bs0Circle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "ldrs/dotPulse";

// Default values shown

// const [hour, minutes] = startTime.split(":");
// const parts = startTime.split(" ");
// const pmPart = parts[1];
let value;
let newvalue;
let parts;
let pmPart;

const OnlineAppointmentsComponent = ({
    dates,
    onlineSlotData,
    setHolidayDialog,
    view,
    markAsHoliday,
    setMarkAsHoliday,
    selectedDay,
    setSelectedDay,
    currentDate,
    getOnlineSlotDetailForDoctorForPerticularDate,
}) => {
    // const currentDate = moment().format("yyyy-MM-DD");
    console.log(currentDate);
    // const [selectedDay, setSelectedDay] = useState({ currentDate, i: 0 });
    console.log(selectedDay);
    let c;
    let d;
    const { doctorid } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [slotDurationTime, setSlotDurationTime] = useState("15 min");

    // const [startTime, setStartTime] = useState("10:00 AM");
    // let [endTime, setEndTime] = useState("");
    // console.log("endtime start", endTime);
    let count = 1;
    const [numOfStartTimes, setNumOfStartTimes] = useState(0);

    //From here
    const [slotDuration, setSlotDuration] = useState(15);
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

    const [acceptAppointmentBySlot, setAcceptAppointmentBySlot] = useState(
        onlineSlotData ? true : false
    );
    const [switchLoading, setSwitchLoading] = useState(false);
    const slotDurations = [15, 30, 45, 60];

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

    const handleSlotDurationChange = (event) => {
        setSlotDuration(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    //To here

    const handleSwtichChange = async (e) => {
        setSwitchLoading(true);
        try {
            const response = await axiosClient.put(
                `/v2/editAcceptAppointmentBySlot/${doctorid}`,
                { acceptAppointmentBySlot: !acceptAppointmentBySlot }
            );
            console.log(response);
            if (response.status === "ok") {
                console.log(e.target.checked);
                setSwitchLoading(false);
                return setAcceptAppointmentBySlot(
                    response.result.acceptAppointmentBySlot
                );
            }
        } catch (error) {
            setSwitchLoading(false);
            toast.error("Something went wrong");
        }
    };

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
                date: selectedDay.currentDate,
                doctorid: doctorid,
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

    var startTimeOptions = [];
    var hours = 0;
    let e = 1;

    while (hours <= 24) {
        if (hours > 12) {
            var time = e.toString().padStart(2, "0") + ":00";
            e++;
            startTimeOptions.push(time + " " + "PM");
            hours++;
        } else if (hours <= 12) {
            var time = hours.toString().padStart(2, "0") + ":00";
            if (time < "12:00") {
                startTimeOptions.push(time + " " + "AM");
                hours++;
            } else if (time == "12:00") {
                startTimeOptions.push(time + " " + "PM");
                hours++;
            }
        }

        // console.log(time);
    }

    var endTimeOptions = [];
    let f = 1;
    let temp = endTime;
    let changeTimeFormat = pmPart;
    for (let hours = 0; hours <= 24; hours++) {
        if (hours > 12) {
            if (f <= 12) {
                let time = f + ":" + slotDurationTime.toString();
                endTimeOptions.push(time + " " + "AM");
                f++;
            }
        }
        // time = hours.toString().padStart(2, "0") + `:${slotDurationTime}`;
        //  else if (hours <= 12) {
        //     const time = temp + ":" + slotDurationTime.toString();
        //     console.log(time);
        //     if (time < "12:00") {
        //         endTimeOptions.push(time + " " + "AM");
        //         temp++;
        //         // setEndTime(endTime++);
        //     } else if (time == "12:00") {
        //         endTimeOptions.push(time + " " + "PM");
        //         temp++;
        //     }
        // }
        else {
            if (temp < 12 && changeTimeFormat === "AM") {
                let time = temp + ":" + slotDurationTime.toString();
                // time = hours.toString().padStart(2, "0") + `:${slotDurationTime}`;
                const [hour, minutes] = time.split(":");

                endTimeOptions.push(time + " " + "AM");
                temp++;
            }
            if (temp >= 12 && changeTimeFormat === "AM" && hours <= 12) {
                let time = f + ":" + slotDurationTime.toString();
                const [hour, minutes] = time.split(":");
                console.log(hour, minutes.split(" ")[0]);

                if (minutes !== "") endTimeOptions.push(time + " " + "PM");
                f++;
            }
            if (temp < 12 && changeTimeFormat === "PM") {
                let time = temp + ":" + slotDurationTime.toString();
                // time = hours.toString().padStart(2, "0") + `:${slotDurationTime}`;
                const [hour, minutes] = time.split(":");
                console.log(hour, minutes.split(" ")[0]);

                endTimeOptions.push(time + " " + "PM");
                temp++;
            }
            // if (hours < 12) {
            //     let time = f + ":" + slotDurationTime.toString();
            //     const [hour, minutes] = time.split(":");
            //     // time = hours.toString().padStart(2, "0") + `:${slotDurationTime}`;
            //     endTimeOptions.push(time + " " + "PM");
            //     f++;
            // }
        }
    }

    const handleSelectedDate = (userDate, i) => {
        const { date, month, year, day } = userDate;
        // console.log(day, date, month, year);
        const a = year + "-" + month + "-" + date;
        console.log(a);

        var formattedDate = moment(a).format("yyyy-MM-DD");
        console.log(formattedDate); // Output: "2023-11-13"
        // const formattedDate = moment.format(date)

        setSelectedDay({ currentDate: formattedDate, i });
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "5px",
                    my: "15px",
                }}
            >
                {switchLoading ? (
                    <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="#1F51C6"
                    ></l-dot-pulse>
                ) : (
                    <>
                        <Switch
                            checked={
                                acceptAppointmentBySlot === true ? true : false
                            }
                            // value={acceptAppointmentBySlot}
                            onChange={handleSwtichChange}
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
                            {acceptAppointmentBySlot ? "Enable" : "Disabled"}
                        </Box>
                    </>
                )}

                {/* <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        sx={{
                                            color: "#ffffff",
                                            background: "#1F51C6",
                                            width: "147px",
                                            height: "40px",
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                        }}
                                        value={view}
                                        onChange={(e) =>
                                            setView(e.target.value)
                                        }
                                    >
                                        <MenuItem
                                            value="Weekly view"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Weekly view
                                        </MenuItem>
                                        <MenuItem
                                            value="Calandar View"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Calandar View
                                        </MenuItem>
                                    </Select> */}
                {/* <select
                                        style={{
                                            color: "#ffffff",
                                            background: "#1F51C6",
                                            padding: "10px",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                            marginLeft: "auto"
                                        }}
                                    >
                                        <OptionStyle value="Weekly view">
                                            Weekly view
                                        </OptionStyle>
                                        <OptionStyle value="Calandar View">
                                            Calandar View
                                        </OptionStyle>
                                    </select> */}
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
                            disabled={
                                acceptAppointmentBySlot === false ? true : false
                            }
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
                                    selectedDay.i === i &&
                                    acceptAppointmentBySlot === true
                                        ? "#1F51C6"
                                        : acceptAppointmentBySlot === true
                                        ? "#FFFFFF"
                                        : "#D9D9D9",
                                border:
                                    currentDate === date.day
                                        ? "2px solid #1F51C6"
                                        : "1px solid #706D6D8F",
                                borderRadius: "3px",
                                color:
                                    selectedDay.i === i
                                        ? "#FFFFFF"
                                        : acceptAppointmentBySlot === true
                                        ? "#706D6D"
                                        : "#ffffff",
                                cursor:
                                    acceptAppointmentBySlot === false
                                        ? "no-drop"
                                        : "pointer",
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
                <Stack spacing="20px" sx={{ mt: "16.61px" }}>
                    <Stack
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
                                Choose Slot Duration
                            </InputLabel>
                            <Stack
                                direction="row"
                                spacing="20.02px"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disabled={
                                        markAsHoliday ||
                                        acceptAppointmentBySlot === false
                                            ? true
                                            : false
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
                                            acceptAppointmentBySlot === false
                                                ? "#D9D9D9"
                                                : "",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={slotDuration}
                                    onChange={handleSlotDurationChange}
                                >
                                    {slotDurations.map((duration, i) => (
                                        <MenuItem
                                            key={i}
                                            value={duration}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {duration} min
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
                                <Button
                                    onClick={() => setHolidayDialog(true)}
                                    sx={{
                                        lineHeight: "21.13px",
                                        // color: "#ffffff",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        padding: 0,
                                        fontFamily: "Lato",
                                        fontWeight: "500",
                                        fontSize: "1.125rem",
                                        display: {
                                            xs: "none",
                                            sm: "none",
                                            md: "block",
                                        },
                                    }}
                                >
                                    View Holiday List
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
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
                                        acceptAppointmentBySlot === false
                                            ? true
                                            : false
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
                                            acceptAppointmentBySlot === false
                                                ? "#D9D9D9"
                                                : "",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                >
                                    {Array.from(
                                        { length: 1440 / slotDuration },
                                        (_, index) => {
                                            const minutes =
                                                index * slotDuration;
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
                                                    {time.toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </MenuItem>
                                            );
                                        }
                                    )}
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
                                        acceptAppointmentBySlot === false
                                            ? true
                                            : false
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
                                            acceptAppointmentBySlot === false
                                                ? "#D9D9D9"
                                                : "",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={endTime}
                                    onChange={(event) =>
                                        setEndTime(event.target.value)
                                    }
                                >
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
                                <Button
                                    disabled={
                                        markAsHoliday ||
                                        acceptAppointmentBySlot === false ||
                                        numOfStartTimes === 2
                                            ? true
                                            : false
                                    }
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
                                            color:
                                                markAsHoliday ||
                                                acceptAppointmentBySlot ===
                                                    false ||
                                                numOfStartTimes >= 2
                                                    ? "#D9D9D9"
                                                    : "#1F51C6",
                                            // color: "#1F51C6",
                                        }}
                                    />
                                </Button>
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
                    {numOfStartTimes >= 1 && (
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
                                        value={startTime2}
                                        onChange={(e) =>
                                            setStartTime2(e.target.value)
                                        }
                                    >
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
                                        value={endTime2}
                                        onChange={(e) =>
                                            setEndTime2(e.target.value)
                                        }
                                    >
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
                                    <Button
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
                                    </Button>
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
                    )}
                    {numOfStartTimes >= 2 && (
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
                                        value={startTime3}
                                        onChange={(e) =>
                                            setStartTime3(e.target.value)
                                        }
                                    >
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
                                        value={endTime3}
                                        onChange={(e) =>
                                            setEndTime3(e.target.value)
                                        }
                                    >
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
                                    <Button
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
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    )}
                    {numOfStartTimes >= 3 && (
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
                                        {startTimeOptions.map(
                                            (startTime, i) => (
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
                                            )
                                        )}
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
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
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
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    )}

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                            {/* <Radio
                                // checked={selectedValue === 'a'}
                                onChange={()=>console.log("Checked")}
                                value="a"
                                id="markAsHoliday"
                                name="radio-buttons"
                                inputProps={{
                                    "aria-label": "A",
                                }}
                            /> */}
                            <IconButton
                                id="markAsHoliday"
                                disabled={
                                    acceptAppointmentBySlot === false
                                        ? true
                                        : false
                                }
                                sx={{
                                    ":hover": {
                                        background: "none",
                                    },
                                }}
                                onClick={() => setMarkAsHoliday(!markAsHoliday)}
                            >
                                {markAsHoliday ? (
                                    <BiRadioCircleMarked
                                        style={{
                                            fontSize: "2rem",
                                            color: "#1F51C6",
                                        }}
                                    />
                                ) : (
                                    <BiRadioCircle
                                        style={{
                                            fontSize: "2rem",
                                            color:
                                                acceptAppointmentBySlot ===
                                                false
                                                    ? "#D9D9D9"
                                                    : "#1F51C6",
                                        }}
                                    />
                                )}
                            </IconButton>
                            <InputLabel
                                htmlFor="markAsHoliday"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "0.938rem",
                                    color: "#706D6D",
                                    userSelect: "none",
                                }}
                            >
                                Mark as Holiday
                            </InputLabel>
                        </Stack>
                        <Button
                            onClick={() => setHolidayDialog(true)}
                            disabled={
                                acceptAppointmentBySlot === false ? true : false
                            }
                            sx={{
                                lineHeight: "21.13px",
                                // color: "#ffffff",
                                borderRadius: "0",
                                textTransform: "none",
                                padding: 0,
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.75rem",
                                display: {
                                    xs: "block",
                                    sm: "block",
                                    md: "none",
                                },
                            }}
                        >
                            View Holiday List
                        </Button>
                    </Stack>
                    <Button
                        variant="contained"
                        onClick={saveData}
                        disabled={
                            acceptAppointmentBySlot === false ? true : false
                        }
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
                    </Button>
                </Stack>
            </Card>
        </>
    );
};

export default OnlineAppointmentsComponent;
