import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

const MissedPatientUserAppointment = ({ missedAppointmentsData, isLoading, setIsLoading }) => {
    return (
        <>
            {missedAppointmentsData.length > 0 ? (
                missedAppointmentsData.map((appointment, i) => {
                    return (
                        <Card
                            key={i}
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "column",
                                    md: "row",
                                },
                                gap: "19px",
                                // flexWrap:'wrap',
                                justifyContent: "space-between",
                                p: "20px",
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing="14px"
                                alignItems="center"
                            >
                                <Avatar
                                    src={appointment?.doctorid?.imgurl}
                                    sx={{
                                        width: {
                                            xs: "57px",
                                            sm: "57px",
                                            md: "74px",
                                        },
                                        height: {
                                            xs: "57px",
                                            sm: "57px",
                                            md: "74px",
                                        },
                                    }}
                                />
                                <Stack>
                                    <Typography
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                            color: "#383838",
                                        }}
                                    >
                                        Appointment with Dr.{" "}
                                        {appointment?.doctorid?.nameOfTheDoctor}
                                    </Typography>
                                    <Box
                                        component="span"
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            color: "#706D6D",
                                        }}
                                    >
                                        Date:{" "}
                                        {moment(
                                            appointment?.appointmentDate
                                        ).format("DD-MM-YYYY")}
                                    </Box>
                                </Stack>
                            </Stack>
                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "auto",
                                    },
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => setReviewDialog(true)}
                                    size="small"
                                    sx={{
                                        borderRadius: "25px",
                                        height: "40px",
                                        fontSize: "16px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        textTransform: "none",
                                        px: "16px",
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "210px",
                                        },
                                        boxShadow: "none",
                                    }}
                                >
                                    Reschedule
                                </Button>
                            </Box>
                        </Card>
                    );
                })
            ) : (
                <Typography
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#383838",
                        textAlign: "center",
                    }}
                >
                    No Upcoming Appointment Found
                </Typography>
            )}
        </>
    );
};

export default MissedPatientUserAppointment;
