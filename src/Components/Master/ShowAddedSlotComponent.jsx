import React from "react";
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

const ShowAddedSlotComponent = ({
    onlineSlotData,
    setEditSlotSetting,
    doctorDetails,
}) => {
    console.log(onlineSlotData);
    console.log(doctorDetails);
    return (
        <>
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
                                            doctorDetails?.acceptAppointments ===
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
                                        doctorDetails?.acceptAppointments ===
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
                                            doctorDetails?.acceptAppointments ===
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
                                                {onlineSlotData?.Starttime2}
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
                                                {onlineSlotData?.Endtime2}
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
                                            doctorDetails?.acceptAppointments ===
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
                                                {onlineSlotData?.Starttime3}
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
                                                {onlineSlotData?.Endtime3}
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
                    onClick={() => setEditSlotSetting(true)}
                    disabled={
                        doctorDetails?.acceptAppointments === "byToken"
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
        </>
    );
};

export default ShowAddedSlotComponent;
