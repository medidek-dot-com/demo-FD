import React, { useState, useEffect } from "react";
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
import { Bs0Circle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BiSolidPlusSquare } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";

const EditSlotSetting = ({
    dates,
    selectedDay,
    setSelectedDay,
    currentDate,
    onlineSlotData,
    setEditSlottSetting,
    getOnlineSlotDetailForDoctorForPerticularDate,
    setHolidayDialog,
}) => {
    let c;
    let d;
    const { doctorid } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [slotDurationTime, setSlotDurationTime] = useState("15 min");
    const [markAsHoliday, setMarkAsHoliday] = useState(false);

    // const [startTime, setStartTime] = useState("10:00 AM");
    // let [endTime, setEndTime] = useState("");
    // console.log("endtime start", endTime);

    let count = 1;
    const [numOfStartTimes, setNumOfStartTimes] = useState(0);

    //From here
    const [slotDuration, setSlotDuration] = useState(15);
    const [startTime, setStartTime] = useState(onlineSlotData.Starttime1);
    const [endTime, setEndTime] = useState(onlineSlotData.Endtime1);
    const [endTimes, setEndTimes] = useState([]);

    const [startTime2, setStartTime2] = useState(onlineSlotData.Starttime2);
    const [startTimes2, setStartTimes2] = useState([]);
    const [endTime2, setEndTime2] = useState(onlineSlotData.Endtime2);
    const [endTimes2, setEndTimes2] = useState([]);

    const [startTime3, setStartTime3] = useState(onlineSlotData.Starttime3);
    const [startTimes3, setStartTimes3] = useState([]);
    const [endTime3, setEndTime3] = useState(onlineSlotData.Endtime3);
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

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes = [];
        let currentTime = new Date(`01/01/2023 ${startTime}`);
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

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${startTime3}`);
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

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes2 = [];
        let currentTime = new Date(`01/01/2023 ${startTime2}`);
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
        start.setMinutes(start.getMinutes() + slotDuration);
        // setStartTime3(
        //     start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        // );

        // Generate end times based on the selected start time and slot duration
        const genratedStartTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${endTime2}`);
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
    }, [endTime, numOfStartTimes === 1]);

    const handleSlotDurationChange = (event) => {
        setSlotDuration(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const saveData = async () => {
        if (markAsHoliday === true) {
            setStartTime("none");
            setStartTime2("none");
            setStartTime3("none");
            setEndTime("none");
            setEndTime2("none");
            setEndTime3("none");

            try {
                const response = await axiosClient.post(
                    "/v2/creatSlotForDoctor",
                    {
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
                    }
                );

                if (response.status === "ok") {
                    await getOnlineSlotDetailForDoctorForPerticularDate();
                    setEditSlottSetting(false);
                    setMarkAsHoliday(false);
                    return;
                }
            } catch (error) {
                toast.error("something went wrong");
                console.log(error.message);
            }
        } else {
            try {
                const response = await axiosClient.post(
                    "/v2/creatSlotForDoctor",
                    {
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
                    }
                );
                await getOnlineSlotDetailForDoctorForPerticularDate();
                setEditSlottSetting(false);
                setStartTime("");
                setStartTime2("");
                setStartTime3("");
                setEndTime("");
                setEndTime2("");
                setEndTime3("");
                setMarkAsHoliday(false);
            } catch (error) {
                toast.error("something went wrong");
                console.log(error.message);
            }
        }
    };

    return (
        <>
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
                                <MenuItem
                                    value={"none"}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    None
                                </MenuItem>
                                {Array.from(
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
                                <MenuItem
                                    value={"none"}
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
                                disabled={
                                    markAsHoliday ||
                                    acceptAppointmentBySlot === false ||
                                    numOfStartTimes === 2
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    setNumOfStartTimes(numOfStartTimes + count);
                                    console.log(numOfStartTimes);
                                }}
                                sx={{ minWidth: "0px" }}
                            >
                                <BiSolidPlusSquare
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color:
                                            markAsHoliday ||
                                            acceptAppointmentBySlot === false ||
                                            numOfStartTimes >= 2
                                                ? "#D9D9D9"
                                                : "#1F51C6",
                                        // color: "#1F51C6",
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
                {/* {numOfStartTimes >= 1 ||
                    (startTime2 != "" && ( */}
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
                                    background: markAsHoliday ? "#D9D9D9" : "",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime2 ? startTime2 : "none"}
                                onChange={(e) => setStartTime2(e.target.value)}
                            >
                                <MenuItem
                                    value={"none"}
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
                            End Time 2
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
                                    background: markAsHoliday ? "#D9D9D9" : "",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime2 ? endTime2 : "none"}
                                onChange={(e) => setEndTime2(e.target.value)}
                            >
                                <MenuItem
                                    value={"none"}
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
                {/* ))} */}

                {/* {numOfStartTimes >= 2 ||
                    (startTime3 != "" && ( */}
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
                                    background: markAsHoliday ? "#D9D9D9" : "",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime3 ? startTime3 : "none"}
                                onChange={(e) => setStartTime3(e.target.value)}
                            >
                                <MenuItem
                                    value={"none"}
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
                                    background: markAsHoliday ? "#D9D9D9" : "",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime3 ? endTime3 : "none"}
                                onChange={(e) => setEndTime3(e.target.value)}
                            >
                                <MenuItem
                                    value={"none"}
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
                            </Button> */}
                        </Stack>
                    </Stack>
                </Stack>
                {/* ))} */}

                {/* {numOfStartTimes >= 3 && (
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
                    </Stack>
                )} */}

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
                                acceptAppointmentBySlot === false ? true : false
                            }
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            onClick={() => {
                                if (!markAsHoliday) {
                                    setStartTime("none");
                                    setStartTime2("none");
                                    setStartTime3("none");
                                    setEndTime("none");
                                    setEndTime2("none");
                                    setEndTime3("none");
                                }
                                setMarkAsHoliday(!markAsHoliday);
                            }}
                        >
                            {markAsHoliday === true ? (
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
                                            acceptAppointmentBySlot === false
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
                    disabled={acceptAppointmentBySlot === false ? true : false}
                    sx={{
                        boxShadow: "none",
                        borderRadius: "29px",
                        textTransform: "none",
                        fontFamily: "Lato",
                        fontWeight: "700",
                        fontSize: "1.063rem",
                    }}
                >
                    Save Changes
                </Button>
            </Stack>
        </>
    );
};

export default EditSlotSetting;
