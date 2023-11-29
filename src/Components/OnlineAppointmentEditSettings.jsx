import React, { useState } from "react";
import moment from "moment";
import {
    Box,
    Button,
    Card,
    IconButton,
    InputLabel,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import EditSlotSetting from "./Doctor/EditSlotSetting";
import { useSelector } from "react-redux";

const OnlineAppointmentEditSettings = ({
    dates,
    selectedDay,
    setSelectedDay,
    currentDate,
    onlineSlotData,
    editSlottSetting,
    setEditSlottSetting,
    getOnlineSlotDetailForDoctorForPerticularDate,
    setHolidayDialog,
}) => {
    const { doctor } = useSelector((state) => state.doctor);

    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(true);
    const [markAsHoliday, setMarkAsHoliday] = useState(false);

    // const [selectedDay, setSelectedDay] = useState(0);
    // const currentDate = moment().format("ddd");

    const handleSelectedDate = async (userDate, i) => {
        const { date, month, year, day } = userDate;

        const a = year + "-" + month + "-" + date;

        var formattedDate = moment(a, "yyyy-MMM-DD").format("yyyy-MM-DD"); // Output: "2023-11-13"
        // const formattedDate = moment.format(date)
        await setEditSlottSetting(false);
        setSelectedDay({ currentDate: formattedDate, i });
    };

    return (
        <>
            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    my: "15px",
                }}
            >
                <Switch checked disabled />
                <Box
                    component="span"
                    sx={{
                        fontFamily: "Lato",
                        fontWeight: "600",
                        fontSize: "0.938rem",
                        color: "#1F51C6",
                    }}
                >
                    {onlineAppointmentEnabled ? "Enable" : "Disabled"}
                </Box>
            </Box> */}
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
                                doctor.acceptAppointments !== "bySlot"
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
                                    doctor.acceptAppointments === "bySlot"
                                        ? "#1F51C6"
                                        : doctor.acceptAppointments === "bySlot"
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
                                        : doctor.acceptAppointments === "bySlot"
                                        ? "#706D6D"
                                        : "#ffffff",
                                cursor:
                                    doctor.acceptAppointments === "bySlot"
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
                {!editSlottSetting ? (
                    <Stack
                        spacing="25px"
                        sx={{
                            mt: "37px",
                        }}
                    >
                        {onlineSlotData?.isholiday === false ? (
                            <>
                                <Stack spacing="12px">
                                    <Typography
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "500",
                                            fontSize: {
                                                xs: "0.938rem",
                                                sm: "0.938rem",
                                                md: "1.125rem",
                                            },
                                            lineHeight: "18px",
                                        }}
                                    >
                                        Slot Duration:
                                    </Typography>
                                    <Stack direction="row">
                                        <Box
                                            component="span"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "500",
                                                padding: "12px 23px",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: "5px",
                                                lineHeight: "18px",
                                                background:
                                                    doctor?.acceptAppointments ===
                                                    "byToken"
                                                        ? "#D9D9D9"
                                                        : "#ffffff",
                                            }}
                                        >
                                            {onlineSlotData?.slotduration} Mins
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/* This is main parent of slot 1, slot 2, slot 3 */}
                                <Stack
                                    direction="row"
                                    sx={{
                                        flexWrap: "wrap",
                                        gap: "25px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            border: "1px solid #D9D9D9",
                                            borderRadius: "6px",
                                            p: "16px",
                                            background:
                                                doctor?.acceptAppointments ===
                                                "byToken"
                                                    ? "#D9D9D9"
                                                    : "#ffffff",
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                position: "absolute",
                                                top: "-15px",
                                                backgroundColor: "#ffffff",
                                                color: "#383838",
                                                padding: "5px",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: {
                                                    xs: "0.938rem",
                                                    sm: "0.938rem",
                                                    md: "15px",
                                                },
                                                lineHeight: "18px",
                                            }}
                                        >
                                            Slot 1
                                        </Box>
                                        <Stack direction="row" spacing="20px">
                                            <Stack spacing="12px">
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: {
                                                            xs: "0.938rem",
                                                            sm: "0.938rem",
                                                            md: "1.125rem",
                                                        },
                                                        lineHeight: "18px",
                                                    }}
                                                >
                                                    Start Time :
                                                </Typography>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        padding: "12px 23px",
                                                        border: "1px solid #D9D9D9",
                                                        borderRadius: "5px",
                                                        lineHeight: "18px",
                                                    }}
                                                >
                                                    {onlineSlotData?.Starttime1}
                                                </Box>
                                            </Stack>
                                            <Stack spacing="12px">
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: {
                                                            xs: "0.938rem",
                                                            sm: "0.938rem",
                                                            md: "1.125rem",
                                                        },
                                                        lineHeight: "18px",
                                                    }}
                                                >
                                                    End Time :
                                                </Typography>

                                                <Box
                                                    component="span"
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        padding: "12px 23px",
                                                        border: "1px solid #D9D9D9",
                                                        borderRadius: "5px",
                                                        lineHeight: "18px",
                                                    }}
                                                >
                                                    {onlineSlotData?.Endtime1}
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                    {onlineSlotData.Starttime2 != "" && (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: "6px",
                                                p: "16px",
                                                background:
                                                    doctor?.acceptAppointments ===
                                                    "byToken"
                                                        ? "#D9D9D9"
                                                        : "#ffffff",
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    position: "absolute",
                                                    top: "-15px",
                                                    backgroundColor: "#ffffff",
                                                    color: "#383838",
                                                    padding: "5px",
                                                    fontFamily: "Lato",
                                                    fontWeight: "600",
                                                    fontSize: {
                                                        xs: "0.938rem",
                                                        sm: "0.938rem",
                                                        md: "15px",
                                                    },
                                                    lineHeight: "18px",
                                                }}
                                            >
                                                Slot 2
                                            </Box>
                                            <Stack
                                                direction="row"
                                                spacing="20px"
                                            >
                                                <Stack spacing="12px">
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            fontSize: {
                                                                xs: "0.938rem",
                                                                sm: "0.938rem",
                                                                md: "1.125rem",
                                                            },
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        Start Time :
                                                    </Typography>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            padding:
                                                                "12px 23px",
                                                            border: "1px solid #D9D9D9",
                                                            borderRadius: "5px",
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        {
                                                            onlineSlotData?.Starttime2
                                                        }
                                                    </Box>
                                                </Stack>
                                                <Stack spacing="12px">
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            fontSize: {
                                                                xs: "0.938rem",
                                                                sm: "0.938rem",
                                                                md: "1.125rem",
                                                            },
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        End Time :
                                                    </Typography>

                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            padding:
                                                                "12px 23px",
                                                            border: "1px solid #D9D9D9",
                                                            borderRadius: "5px",
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        {
                                                            onlineSlotData?.Endtime2
                                                        }
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    )}
                                    {onlineSlotData.Starttime3 != "" && (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: "6px",
                                                p: "16px",
                                                background:
                                                    doctor?.acceptAppointments ===
                                                    "byToken"
                                                        ? "#D9D9D9"
                                                        : "#ffffff",
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    position: "absolute",
                                                    top: "-15px",
                                                    backgroundColor: "#ffffff",
                                                    color: "#383838",
                                                    padding: "5px",
                                                    fontFamily: "Lato",
                                                    fontWeight: "600",
                                                    fontSize: {
                                                        xs: "0.938rem",
                                                        sm: "0.938rem",
                                                        md: "15px",
                                                    },
                                                    lineHeight: "18px",
                                                }}
                                            >
                                                Slot 3
                                            </Box>
                                            <Stack
                                                direction="row"
                                                spacing="20px"
                                            >
                                                <Stack spacing="12px">
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            fontSize: {
                                                                xs: "0.938rem",
                                                                sm: "0.938rem",
                                                                md: "1.125rem",
                                                            },
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        Start Time :
                                                    </Typography>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            padding:
                                                                "12px 23px",
                                                            border: "1px solid #D9D9D9",
                                                            borderRadius: "5px",
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        {
                                                            onlineSlotData?.Starttime3
                                                        }
                                                    </Box>
                                                </Stack>
                                                <Stack spacing="12px">
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            fontSize: {
                                                                xs: "0.938rem",
                                                                sm: "0.938rem",
                                                                md: "1.125rem",
                                                            },
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        End Time :
                                                    </Typography>

                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            padding:
                                                                "12px 23px",
                                                            border: "1px solid #D9D9D9",
                                                            borderRadius: "5px",
                                                            lineHeight: "18px",
                                                        }}
                                                    >
                                                        {
                                                            onlineSlotData?.Endtime3
                                                        }
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    )}
                                </Stack>{" "}
                            </>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: {
                                        xs: "0.938rem",
                                        sm: "0.938rem",
                                        md: "1.125rem",
                                    },
                                    textAlign: "center",
                                }}
                            >
                                This is your holiday
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            onClick={() => setEditSlottSetting(true)}
                            disabled={
                                doctor?.acceptAppointments === "byToken"
                                    ? true
                                    : false
                            }
                            sx={{
                                width: "100%",
                                boxShadow: "none",
                                borderRadius: "29px",
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "1.063rem",
                                // mt: "24px",
                            }}
                        >
                            Edit Settings
                        </Button>
                    </Stack>
                ) : (
                    <EditSlotSetting
                        dates={dates}
                        markAsHoliday={markAsHoliday}
                        setMarkAsHoliday={setMarkAsHoliday}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        currentDate={currentDate}
                        onlineSlotData={onlineSlotData}
                        getOnlineSlotDetailForDoctorForPerticularDate={
                            getOnlineSlotDetailForDoctorForPerticularDate
                        }
                        setEditSlottSetting={setEditSlottSetting}
                        setHolidayDialog={setHolidayDialog}
                    />
                )}
            </Card>
        </>
    );
};

export default OnlineAppointmentEditSettings;
