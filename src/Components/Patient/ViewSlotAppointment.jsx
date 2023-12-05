import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const ViewSlotAppointment = ({ appointmentDetails }) => {
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "391px" },
                        background: "#DCE3F6",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        py: "29px",
                        px: { xs: "24px", sm: "24px", md: "26px" },
                    }}
                >
                    SLottttttttttttttttttttttttt
                    <Stack
                        alignItems={{
                            xs: "space-between",
                            sm: "space-between",
                            md: "center",
                        }}
                        sx={{
                            mb: "30px",
                            flexDirection: {
                                xs: "row-reverse",
                                sm: "row-reverse",
                                md: "column",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="/check tick.png"
                            sx={{ width: { xs: "72px" }, height: "72px" }}
                        />
                        <Stack
                            alignItems={{
                                xs: "start",
                                sm: "start",
                                md: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Raleway",
                                    fontWeight: "700",
                                    fontSize: "1.563rem",
                                }}
                            >
                                Thank You!
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: {
                                        xs: "0.813rem",
                                        sm: "0.813rem",
                                        md: "1.125rem",
                                    },
                                    color: "#706D6D",
                                }}
                            >
                                Your Appointment has been Booked!
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        alignItems={{
                            xs: "flex-start",
                            sm: "flex-start",
                            md: "center",
                        }}
                        sx={{ gap: "12px" }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "700",
                                fontSize: {
                                    xs: "1.125rem",
                                    sm: "1.125rem",
                                    md: "1.125rem",
                                },
                                color: "#383838",
                                lineHeight: "21.13px",
                            }}
                        >
                            Track Appointment
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "0.813rem",
                                color: "#1F51C6",
                                lineHeight: "15.6px",
                            }}
                        >
                            Appointment Id:{" "}
                            <span
                                style={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "0.813rem",
                                    color: "#383838",
                                    lineHeight: "15.6px",
                                }}
                            >
                                {appointmentDetails?._id}
                            </span>
                        </Box>
                    </Stack>
                    <Box sx={{ mt: "35px" }}>
                        <Stack direction="row" sx={{ gap: "5px" }}>
                            <Stack sx={{ gap: "2px" }}>
                                <CheckCircleIcon color="success" />
                                {[...Array(5)].map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "2px",
                                            height: "6px",
                                            background: "#1F51C6",
                                            alignSelf: "center",
                                        }}
                                    ></Box>
                                ))}
                            </Stack>
                            <Stack>
                                <Box
                                    component="p"
                                    sx={{
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Appoitment Confirm with Dr.{" "}
                                    {
                                        appointmentDetails?.doctorid
                                            ?.nameOfTheDoctor
                                    }
                                </Box>
                                <Box
                                    component="p"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "0.813rem",
                                        color: "#706D6D",
                                    }}
                                >
                                    @{appointmentDetails?.AppointmentTime}{" "}
                                    {moment(
                                        appointmentDetails.appointmentDate
                                    ).format("MMM DD YYYY")}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack direction="row" sx={{ gap: "5px" }}>
                            <Stack sx={{ gap: "2px" }}>
                                <RadioButtonCheckedIcon color="primary" />
                                {[...Array(5)].map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "2px",
                                            height: "6px",
                                            background: "#1F51C6",
                                            alignSelf: "center",
                                        }}
                                    ></Box>
                                ))}
                            </Stack>
                            <Stack>
                                <Box
                                    component="p"
                                    sx={{
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Dr{" "}
                                    {
                                        appointmentDetails?.doctorid
                                            ?.nameOfTheDoctor
                                    }{" "}
                                    will start appointments
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack direction="row" sx={{ gap: "5px" }}>
                            <Stack sx={{ gap: "2px" }}>
                                <RadioButtonCheckedIcon color="primary" />
                            </Stack>
                            <Stack>
                                <Box
                                    component="p"
                                    sx={{
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Appointment Completed
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    spacing="7px"
                    justifyContent="space-between"
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "min-content",
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => setAreYouSureDialog(true)}
                        sx={{
                            background: "#B92612",
                            borderRadius: "38px",
                            boxShadow: "none",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "1rem",
                            textTransform: "none",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "191.55px",
                            },
                        }}
                    >
                        Cancel Appointment
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setEditAppointmentDialog(true)}
                        sx={{
                            background: "#1F51C6",
                            borderRadius: "38px",
                            boxShadow: "none",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "1rem",
                            textTransform: "none",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "191.55px",
                            },
                        }}
                    >
                        Edit Appointment
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default ViewSlotAppointment;
