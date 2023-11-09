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

const OnlineAppointmentEditSettings = ({
    dates,
    markAsHoliday,
    setMarkAsHoliday,
    selectedDay,
    setSelectedDay,
    currentDate,
    onlineSlotData,
}) => {
    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(false);
    // const [selectedDay, setSelectedDay] = useState(0);
    // const currentDate = moment().format("ddd");

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
                    {onlineAppointmentEnabled ? "Enable" : "Disabled"}
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
                                    selectedDay.i === i ? "#1F51C6" : "#FFFFFF",
                                border:
                                    currentDate === date.day
                                        ? "2px solid #1F51C6"
                                        : "1px solid #706D6D8F",
                                borderRadius: "3px",
                                color:
                                    selectedDay.i === i ? "#FFFFFF" : "#706D6D",
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
                <Stack spacing="25px">
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
                                }}
                            >
                                {onlineSlotData?.slotduration} Mins
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                        <Stack spacing="25px" direction="row">
                            <Stack
                                spacing="20px"
                                direction="row"
                                sx={{
                                    border: "1px solid #D9D9D9",
                                    padding: "16px",
                                    borderRadius: "5px",
                                    position: "relative",
                                }}
                            >
                                <Typography
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
                                </Typography>
                                <Stack spacing="12px" sx={{ mt: "37px" }}>
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
                                            }}
                                        >
                                            {onlineSlotData?.Starttime1}
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack spacing="12px" sx={{ mt: "37px" }}>
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
                                            }}
                                        >
                                            {onlineSlotData?.Endtime1}
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                spacing="20px"
                                direction="row"
                                sx={{
                                    border: "1px solid #D9D9D9",
                                    padding: "16px",
                                    borderRadius: "5px",
                                    position: "relative",
                                }}
                            >
                                <Typography
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
                                </Typography>
                                <Stack spacing="12px" sx={{}}>
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
                                            }}
                                        >
                                            {onlineSlotData?.Starttime2}
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack spacing="12px" sx={{}}>
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
                                            }}
                                        >
                                            {onlineSlotData?.Endtime2}
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                spacing="20px"
                                direction="row"
                                sx={{
                                    border: "1px solid #D9D9D9",
                                    padding: "16px",
                                    borderRadius: "5px",
                                    position: "relative",
                                }}
                            >
                                <Typography
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
                                </Typography>
                                <Stack spacing="12px" sx={{}}>
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
                                            }}
                                        >
                                            {onlineSlotData?.Starttime3}
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack spacing="12px" sx={{}}>
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
                                            }}
                                        >
                                            {onlineSlotData?.Endtime3}
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
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
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            // onClick={() => setMarkAsHoliday(!markAsHoliday)}
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

export default OnlineAppointmentEditSettings;
