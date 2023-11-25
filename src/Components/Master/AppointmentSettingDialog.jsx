import React from "react";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import AppointmentByTokenComponent from "./AppointmentByTokenComponent";
import OnlineAppointmentComponet from "./OnlineAppointmentComponet";
import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

const DialogStyle = styled(Dialog)({
    ".MuiDialog-paper": {
        margin: "10px",
    },
    // ["& div:first-child"]:{
    //     // marginInline:"8px"
    // },
    // ["& .MuiDialog-container:nth-of-type(1)"]: {
    //     marginInline: "16px",
    // },
    // ["& .abhay  div:nth-child(2)"]:{
    //     marginInline:"16px"
    // }
});

const AppointmentSettingDialog = ({
    appointmentSettingDialog,
    setAppointmentSettingDialog,
    doctorDetails,
}) => {
    const { hospital_id, doctor_id } = useParams();

    console.log(doctorDetails);
    const [appointmentByToken, setAppointmentByToken] = useState(false);
    const [onlineSlotData, setOnlineSlotsData] = useState(null);
    console.log("online slot data", onlineSlotData);
    const [tokenSlotData, setTokenSlotsData] = useState(null);
    // const [dates, setDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(moment());
    const currentDate = moment().format("yyyy-MM-DD");

    const [selectedSlotDate, setSelectedSlotDate] = useState({
        currentDate,
        i: 0,
    });

    const [selectedTokenDate, setSelecteTokendDate] = useState({
        currentDate,
        i: 0,
    });
    // const [selectedDay, setSelectedDay] = useState({ currentDate, i: 0 });
    const [markAsHoliday, setMarkAsHoliday] = useState(false);

    const currentDay = moment().format("ddd");

    const getOnlineSlotDetailForDoctorForPerticularDate = async () => {
        const date = selectedSlotDate.currentDate;
        try {
            if (doctor_id) {
                const response = await axiosClient.get(
                    `/v2/getSlotDetailForDoctorForPerticularDate/${doctor_id}/${date}`
                );
                return setOnlineSlotsData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const getAppointmentByTokenSlotDetailForDoctorForPerticularDate =
        async () => {
            const date = selectedTokenDate.currentDate;
            try {
                const response = await axiosClient.get(
                    `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctor_id}/${date}`
                );
                setTokenSlotsData(response.result);
                return;
            } catch (error) {
                console.log(error.message);
            }
        };

    useEffect(() => {
        getOnlineSlotDetailForDoctorForPerticularDate();
    }, [selectedSlotDate, doctor_id]);

    console.log("jbj", selectedSlotDate);

    useEffect(() => {
        getAppointmentByTokenSlotDetailForDoctorForPerticularDate();
    }, [selectedTokenDate, doctor_id]);
    console.log("uydgcduichdi", selectedTokenDate);
    // const getWeekDates = () => {
    //     const daysInMonth = currentMonth.daysInMonth();
    //     const monthStart = moment().startOf("day");
    //     const monthsDates = [];

    //     for (let i = 0; i < 7; i++) {
    //         const date = monthStart.clone().add(i, "days");
    //         monthsDates.push({
    //             day: date.format("ddd"),
    //             date: date.format("DD"),
    //             month: date.format("MMM"),
    //             year: date.format("YYYY"),
    //         });
    //     }
    //     setDates(monthsDates, currentDay);
    // };

    // useEffect(() => {
    //     getWeekDates();
    // }, []);
    return (
        <>
            <DialogStyle
                open={appointmentSettingDialog}
                onClose={() => {
                    return setAppointmentSettingDialog(false);
                }}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: {
                            xs: "0.938rem",
                            sm: "0.938rem",
                            md: "1.375rem",
                        },
                        lineHeight: { xs: "25px", sm: "20px", md: "14.4px" },
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Appointment Settings
                    {appointmentSettingDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setAppointmentSettingDialog(false)}
                            sx={{
                                // position: "absolute",
                                // right: 8,
                                // top: 8,
                                color: "#383838",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction="row"
                        sx={{
                            border: "1px solid #D9D9D9",
                            borderRadius: "6px",
                        }}
                    >
                        <Button
                            variant={!appointmentByToken ? "contained" : "text"}
                            onClick={() => setAppointmentByToken(false)}
                            sx={{
                                boxShadow: "none",
                                textTransform: "none",
                                py: "14px",
                                px: {
                                    xs: "16px",
                                    sm: "26px",
                                    md: "47px",
                                },
                                fontFamily: "Lato",
                                fontWeight: "semibold",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1.25rem",
                                },
                                width: "100%",
                                height: {
                                    xs: "40px",
                                    sm: "40px",
                                    md: "50px",
                                },
                                background: !appointmentByToken
                                    ? "#1F51C6"
                                    : "#FFFFFF",
                                color: !appointmentByToken
                                    ? "#ffffff"
                                    : "#706D6D",
                                borderRadius: "0",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px",
                            }}
                        >
                            Online Appointments
                        </Button>
                        <Button
                            variant={appointmentByToken ? "contained" : "text"}
                            onClick={() => setAppointmentByToken(true)}
                            sx={{
                                boxShadow: "none",
                                textTransform: "none",
                                py: "14px",
                                px: {
                                    xs: "16px",
                                    sm: "26px",
                                    md: "57px",
                                },
                                fontFamily: "Lato",
                                fontWeight: "semibold",
                                fontSize: {
                                    xs: "0.813rem",
                                    sm: "0.813rem",
                                    md: "1.25rem",
                                },
                                width: "100%",
                                height: {
                                    xs: "40px",
                                    sm: "40px",
                                    md: "50px",
                                },
                                color: appointmentByToken
                                    ? "#FFFFFF"
                                    : "#706D6D",
                                background: appointmentByToken
                                    ? "#1F51C6"
                                    : "#FFFFFF",
                            }}
                        >
                            Appointments by token
                        </Button>
                    </Stack>
                    {appointmentByToken ? (
                        <AppointmentByTokenComponent
                            doctorDetails={doctorDetails}
                            tokenSlotData={tokenSlotData}
                            selectedTokenDate={selectedTokenDate}
                            setSelecteTokendDate={setSelecteTokendDate}
                            getAppointmentByTokenSlotDetailForDoctorForPerticularDate={
                                getAppointmentByTokenSlotDetailForDoctorForPerticularDate
                            }
                        />
                    ) : (
                        <OnlineAppointmentComponet
                            doctorDetails={doctorDetails}
                            onlineSlotData={onlineSlotData}
                            selectedSlotDate={selectedSlotDate}
                            setSelectedSlotDate={setSelectedSlotDate}
                            getOnlineSlotDetailForDoctorForPerticularDate={
                                getOnlineSlotDetailForDoctorForPerticularDate
                            }
                        />
                    )}
                </DialogContent>
            </DialogStyle>
        </>
    );
};

export default AppointmentSettingDialog;
