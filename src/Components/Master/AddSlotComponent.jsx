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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import { axiosClient } from "../../Utils/axiosClient";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const AddSlotComponent = ({
    doctorDetails,
    selectedSlotDate,
    getOnlineSlotDetailForDoctorForPerticularDate,
}) => {
    const [markAsHoliday, setMarkAsHoliday] = useState(false);
    let c;
    let d;
    const { doctor_id } = useParams();
    console.log(doctor_id);
    const { user } = useSelector((state) => state.auth);
    // const { doctor } = useSelector((state) => state.doctor);
    const [slotDurationTime, setSlotDurationTime] = useState("15 min");

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
    const [disableButton, setDisableButton] = useState(false);

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

        // Generate end times based on the selected start time and slot duration
        const generatedEndTimes3 = [];
        let currentTime = new Date(`01/01/2023 ${startTime3}`);
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
                    hour12: false,
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
                    hour12: false,
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
        console.log(currentTime);
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
    }, [endTime, numOfStartTimes === 1]);

    const handleSlotDurationChange = (event) => {
        setSlotDuration(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    //To here

    const saveData = async () => {
        console.log(markAsHoliday);
        setDisableButton(true);
        if (markAsHoliday === true) {
            setStartTime("");
            setStartTime2("");
            setStartTime3("");
            setEndTime("");
            setEndTime2("");
            setEndTime3("");
            console.log("tru haii", markAsHoliday);
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
                        date: selectedSlotDate.currentDate,
                        doctorid: doctor_id,
                    }
                );
                await getOnlineSlotDetailForDoctorForPerticularDate();
                setDisableButton(false);
                console.log(response.result);
            } catch (error) {
                toast.error("Something went wrong");
                setDisableButton(false);
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
                        date: selectedSlotDate.currentDate,
                        doctorid: doctor_id,
                    }
                );
                await getOnlineSlotDetailForDoctorForPerticularDate();
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
        }
    };

    const handleSelectedDate = async (userDate, i) => {
        const { date, month, year, day } = userDate;
        const a = year + "-" + month + "-" + date;

        var formattedDate = moment(a, "yyyy-MMM-DD").format("yyyy-MM-DD");
        console.log(a);
        await setEditSlottSetting(false);
        setSelectedDay({ currentDate: formattedDate, i });
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
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
                                            ? ""
                                            : "#D9D9D9",
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
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
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
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
                                            ? ""
                                            : "#D9D9D9",
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
                            {/* <Button
                                    disabled={
                                        markAsHoliday || numOfStartTimes === 2
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
                                                numOfStartTimes >= 2
                                                    ? "#D9D9D9"
                                                    : "#1F51C6",
                                            // color: "#1F51C6",
                                        }}
                                    />
                                </Button> */}

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
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime2}
                                onChange={(e) => setStartTime2(e.target.value)}
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
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime2}
                                onChange={(e) => setEndTime2(e.target.value)}
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
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={startTime3}
                                onChange={(e) => setStartTime3(e.target.value)}
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
                                disabled={
                                    markAsHoliday ||
                                    doctorDetails?.acceptAppointments ===
                                        "bySlot"
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
                                        doctorDetails?.acceptAppointments ===
                                            "bySlot"
                                            ? ""
                                            : "#D9D9D9",
                                }}
                                placeholder="Choose Slot Duration"
                                value={endTime3}
                                onChange={(e) => setEndTime3(e.target.value)}
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
                {/* )} */}

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
                                doctorDetails?.acceptAppointments === "byToken"
                                    ? true
                                    : false
                            }
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            onClick={() => {
                                console.log(!markAsHoliday);
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
                                        color: "#1F51C6",
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
                <LoadingButton
                    // size="small"
                    fullWidth
                    onClick={saveData}
                    loading={disableButton}
                    // loadingPosition="end"
                    variant="contained"
                    disabled={
                        doctorDetails.acceptAppointments === "byToken"
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
                        doctorDetails?.acceptAppointments === "byToken"
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
        </>
    );
};

export default AddSlotComponent;
