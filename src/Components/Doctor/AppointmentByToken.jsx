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

const AppointmentByToken = ({
    dates,
    setHolidayDialog,
    view,
    markAsHoliday,
    setMarkAsHoliday,
    currentDate,
}) => {
    const { doctorid } = useParams();
    const { user } = useSelector((state) => state.auth);
    // const currentDate = moment().format("yyyy-MM-DD");

    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(false);
    const [selectedDay, setSelectedDay] = useState({ currentDate, i: 0 });
    const [startTime, setStartTime] = useState("");

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

        setSelectedDay({ currentDate: formattedDate, i });
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
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
                                acceptAppointmentByToken === true ? true : false
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
                            {acceptAppointmentByToken ? "Enable" : "Disabled"}
                        </Box>
                    </>
                )}
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
                <Stack direction="row" spacing="12.61px" sx={{}}>
                    {dates.map((date, i) => (
                        <Box
                            key={i + 1}
                            component="button"
                            disabled={
                                acceptAppointmentByToken === false
                                    ? true
                                    : false
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
                                    acceptAppointmentByToken === true
                                        ? "#1F51C6"
                                        : acceptAppointmentByToken === true
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
                                        : acceptAppointmentByToken === true
                                        ? "#706D6D"
                                        : "#ffffff",
                                cursor:
                                    acceptAppointmentByToken === false
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
                                        acceptAppointmentByToken === false
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
                                            acceptAppointmentByToken === false
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
                                        acceptAppointmentByToken === false
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
                                            acceptAppointmentByToken === false
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
                                        acceptAppointmentByToken === false ||
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
                                                acceptAppointmentByToken ===
                                                    false ||
                                                numOfStartTimes >= 2
                                                    ? "#D9D9D9"
                                                    : "#1F51C6",
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
                    <Button
                        variant="contained"
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
                    </Button>
                </Stack>
            </Card>
        </>
    );
};

export default AppointmentByToken;
