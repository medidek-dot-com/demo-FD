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

const AppointmentByTokenEditSettings = ({
    dates,
    markAsHoliday,
    setMarkAsHoliday,
    tokenSelectedDay,
    setTokenSelectedDay,
    currentDate,
    tokenSlotData,
}) => {
    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(false);
    // const [selectedDay, setSelectedDay] = useState(0);
    // const currentDate = moment().format("ddd");

    const handleSelectedDate = (userDate, i) => {
        const { date, month, year, day } = userDate;
        // console.log(day, date, month, year);
        const a = year + "-" + month + "-" + date;

        var formattedDate = moment(a).format("yyyy-MM-DD");
        // Output: "2023-11-13"
        // const formattedDate = moment.format(date)

        setTokenSelectedDay({ currentDate: formattedDate, i });
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
                                    tokenSelectedDay.i === i
                                        ? "#1F51C6"
                                        : "#FFFFFF",
                                border:
                                    currentDate === date.day
                                        ? "2px solid #1F51C6"
                                        : "1px solid #706D6D8F",
                                borderRadius: "3px",
                                color:
                                    tokenSelectedDay.i === i
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
                <Stack
                    spacing="25px"
                    sx={{
                        mt: "37px",
                    }}
                >
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
                                        {tokenSlotData?.Starttime1}
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
                                        {tokenSlotData?.Endtime1}
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
                        {tokenSlotData.Starttime2 !== "" && (
                            <Box
                                sx={{
                                    position: "relative",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "6px",
                                    p: "16px",
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
                                            {tokenSlotData?.Starttime2}
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
                                            {tokenSlotData?.Endtime2}
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>
                        )}
                        {tokenSlotData.Starttime3 !== "" && (
                            <Box
                                sx={{
                                    position: "relative",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "6px",
                                    p: "16px",
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
                                            {tokenSlotData?.Starttime3}
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
                                            {tokenSlotData?.Endtime3}
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                    <Button
                        variant="contained"
                        // onClick={saveData}
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
            </Card>
        </>
    );
};

export default AppointmentByTokenEditSettings;
