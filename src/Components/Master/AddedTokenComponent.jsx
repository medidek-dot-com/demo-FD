import React from "react";
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
import { useState } from "react";
import EditTokenSettingComponent from "./EditTokenSettingComponent";

const AddedTokenComponent = ({
    dates,
    selectedDay,
    setSelectedDay,
    currentDate,
    tokenSlotData,
    markAsHoliday,
    setMarkAsHoliday,
    getAppointmentByTokenSlotDetailForDoctorForPerticularDate,
    doctorDetails,
    selectedTokenDate,
}) => {
    const [onlineAppointmentEnabled, setOnlineAppointmentEnabled] =
        useState(false);
    const [editTokenSetting, setEditTokenSetting] = useState(false);
    // const [selectedDay, setSelectedDay] = useState(0);
    // const currentDate = moment().format("ddd");

    // const handleSelectedDate = (userDate, i) => {
    //     const { date, month, year, day } = userDate;
    //     // console.log(day, date, month, year);
    //     const a = year + "-" + month + "-" + date;
    //     console.log(a);

    //     var formattedDate = moment(a).format("yyyy-MM-DD");
    //     console.log(formattedDate); // Output: "2023-11-13"
    //     // const formattedDate = moment.format(date)

    //     setSelectedDay({ currentDate: formattedDate, i });
    // };

    return (
        <>
            {editTokenSetting ? (
                <EditTokenSettingComponent
                    selectedTokenDate={selectedTokenDate}
                    tokenSlotData={tokenSlotData}
                    doctorDetails={doctorDetails}
                    getAppointmentByTokenSlotDetailForDoctorForPerticularDate={
                        getAppointmentByTokenSlotDetailForDoctorForPerticularDate
                    }
                    setEditTokenSetting={setEditTokenSetting}
                />
            ) : (
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
                        {tokenSlotData?.Starttime2 !== "" && (
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
                        {tokenSlotData?.Starttime3 !== "" && (
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
                        onClick={() => setEditTokenSetting(true)}
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
            )}
        </>
    );
};

export default AddedTokenComponent;
