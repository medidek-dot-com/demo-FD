import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    InputAdornment,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    tableCellClasses,
} from "@mui/material";
import moment from "moment";
import DoctorProfileCard from "../../Components/Master/DoctorProfileCard";
import Footer from "../../Components/Footer/Footer";
import CompleteAppointmentsTable from "../../Components/Master/CompleteAppointmentsTable";
import PendingAppointmentsTable from "../../Components/Master/PendingAppointmentsTable";
import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";

import { Key } from "@mui/icons-material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PendingAppointmentsTableForMobile from "./PendingAppointmentsTableForMobile";
import CompletedAppointmentsTableForMobile from "../../Components/Master/CompletedAppointmentsTableForMobile";
import MissedAppointmentsTableForMobile from "../../Components/Master/MissedAppointmentsTableForMobile";
import MissedAppointmentsTable from "../../Components/Master/MissedAppointmentsTable";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";

const PaginationStyle = styled(Pagination)({
    "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#1F51C6",
        color: "#ffffff",
        ":hover": {
            backgroundColor: "#1640a0",
        },
    },
});

const DatePickerStyle = styled(MobileDatePicker)({
    color: "red",
    [`& input`]: {
        color: "#ffffff",
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "14px",
        textAlign: "center",
    },
    [`& div`]: {
        height: "32px",
    },
    [`& fieldset`]: {
        borderRadius: "31px",
    },
});

const MasterUserDoctorAppointments = () => {
    const { hospital_id, doctor_id } = useParams();
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

    const [completedAppointments, setCompletedAppointments] = useState(1);
    const [appointments, setAppointments] = useState([]);
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [missedAppointmentsData, setMissedAppointmentsData] = useState([]);
    const [doctorDetails, setDoctorsDetails] = useState({});
    const [mobileActiveTab, setMobileActiveTab] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(2));
    }, []);

    const getDoctorDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctor_id}`
            );
            setDoctorsDetails(response.result);
        } catch (e) {
            console.log(e);
        }
    };

    const getPendingAppointmentsDataForPerticularDate = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getPendingAppoinmentForDoctor/${doctor_id}/${date}`
            );
            console.log(response);
            setPendingAppointmentsData(response.result);
            return;
        } catch (error) {
            F;
            console.log(error);
        }
    };

    // const getPendingAppointmentsData = async () => {
    //     const response = await axiosClient.get(
    //         `/v2/getPendingAppointmentsForHospitalAndDoctors/${hospital_id}/${doctor_id}`
    //     );
    //     setPendingAppointmentsData(response.result);
    //     console.log(response);
    // };

    const getCompleteAppointmentsDataForPerticularDate = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getCompletedAppoinmentForDoctor/${doctor_id}/${date}`
            );
            setCompleteAppointmentsData(response.result);
        } catch (error) {
            console.log(error);
        }
    };

    const getMissedAppointmentsDataForPerticularDate = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getMissedAppoinmentForDoctor/${doctor_id}/${date}`
            );
            setMissedAppointmentsData(response.result);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPendingAppointmentsDataForPerticularDate();
        // getPendingAppointmentsData();
        getCompleteAppointmentsDataForPerticularDate();
        getMissedAppointmentsDataForPerticularDate();
        getDoctorDetails();
    }, []);

    // useEffect(() => {
    // }, []);

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 100px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "80vh",
                }}
            >
                <Box
                // sx={{
                //     width: "calc(100% - 100px)",
                //     m: "0px auto",
                // }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 1,
                        }}
                    >
                        <TextField
                            size="small"
                            placeholder="Search doctors"
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                    ["& fieldset"]: { borderRadius: "38px" },
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src="/search.svg" alt="img" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    {/* <DoctorProfileCard
                        getUpcomingAppointmentsData={
                            getPendingAppointmentsDataForPerticularDate
                        }
                        doctorDetails={doctorDetails}
                    /> */}
                    <Box sx={{ display: "flex", mt: 4 }}>
                        <Stack direction={"row"} gap={1} width="100%">
                            <Button
                                onClick={() => setCompletedAppointments(1)}
                                variant={
                                    completedAppointments === 1
                                        ? "contained"
                                        : "outlined"
                                }
                                sx={{
                                    textTransform: "none",
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "block",
                                    },
                                    boxShadow: "none",
                                    borderRadius: "80px",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    borderColor: "#D9D9D9",
                                    color:
                                        completedAppointments === 1
                                            ? "#ffffff"
                                            : "#383838",
                                }}
                            >
                                Upcoming Appointments
                            </Button>
                            <Button
                                onClick={() => setCompletedAppointments(2)}
                                variant={
                                    completedAppointments === 2
                                        ? "contained"
                                        : "outlined"
                                }
                                sx={{
                                    textTransform: "none",
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "block",
                                    },
                                    boxShadow: "none",
                                    borderRadius: "80px",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    borderColor: "#D9D9D9",
                                    color:
                                        completedAppointments === 2
                                            ? "#ffffff"
                                            : "#383838",
                                }}
                            >
                                Completed Appointments
                            </Button>
                            <Button
                                onClick={() => setCompletedAppointments(3)}
                                variant={
                                    completedAppointments === 3
                                        ? "contained"
                                        : "outlined"
                                }
                                sx={{
                                    textTransform: "none",
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "block",
                                    },
                                    boxShadow: "none",
                                    borderRadius: "80px",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    borderColor: "#D9D9D9",
                                    color:
                                        completedAppointments === 3
                                            ? "#ffffff"
                                            : "#383838",
                                }}
                            >
                                Missed Appointments
                            </Button>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: {
                                        xs: "flex",
                                        sm: "flex",
                                        md: "none",
                                    },
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: "16px",
                                }}
                            >
                                <Select
                                    sx={{
                                        color: "#383838",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        background: "#1F51C6",
                                        // p:'5px 10px',
                                        borderRadius: "21px",
                                        height: "32px",
                                        color: "#FFFFFF",
                                    }}
                                    variant="outlined"
                                    value={
                                        (mobileActiveTab === 1 && "pending") ||
                                        (mobileActiveTab === 2 &&
                                            "completed") ||
                                        (mobileActiveTab === 3 && "missed")
                                    }
                                    // onChange={(e) => handleChange(e, i)}
                                >
                                    <MenuItem
                                        onClick={() => setMobileActiveTab(1)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#383838",
                                        }}
                                        value={"pending"}
                                    >
                                        Pending Appointments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setMobileActiveTab(2)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#15B912",
                                        }}
                                        value={"completed"}
                                    >
                                        Completed Appointments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setMobileActiveTab(3)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#B92612",
                                        }}
                                        value={"missed"}
                                    >
                                        Missed Appointments
                                    </MenuItem>
                                </Select>
                                <Box>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePickerStyle
                                            sx={{
                                                width: "120px",
                                                backgroundColor: "#1F51C6",
                                                color: "#ffffff",
                                                borderRadius: "50px",
                                            }}
                                            defaultValue={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>

                            {/* <select name="status" id="" style={{fontFamily:'Lato', fontWeight:'600', fontSize:'0.813 rem', borderRadius:'21px', height:'32px', padding:'5px 16px'  }}>

                            <option value="upcoming">Upcoming Appointments</option>
                            <option value="completed">Completed Appointments</option>
                            <option value="missed">Missed Appointments</option>
                            </select> */}
                        </Stack>
                    </Box>
                    {(mobileActiveTab === 1 && (
                        <PendingAppointmentsTableForMobile
                            pendingAppointmentsData={pendingAppointmentsData}
                            getPendingAppointmentsData={
                                getPendingAppointmentsDataForPerticularDate
                            }
                        />
                    )) ||
                        (mobileActiveTab === 2 && (
                            <CompletedAppointmentsTableForMobile
                                completeAppointmentsData={
                                    completeAppointmentsData
                                }
                                getCompleteAppointmentsData={
                                    getCompleteAppointmentsDataForPerticularDate
                                }
                            />
                        )) ||
                        (mobileActiveTab === 3 && (
                            <MissedAppointmentsTableForMobile
                                missedAppointmentsData={missedAppointmentsData}
                                getMissedAppointmentsData={
                                    getMissedAppointmentsDataForPerticularDate
                                }
                            />
                        ))}

                    <>
                        {(completedAppointments === 1 && (
                            <PendingAppointmentsTable
                                pendingAppointmentsData={
                                    pendingAppointmentsData
                                }
                                getPendingAppointmentsData={
                                    getPendingAppointmentsDataForPerticularDate
                                }
                            />
                        )) ||
                            (completedAppointments === 2 && (
                                <CompleteAppointmentsTable
                                    completeAppointmentsData={
                                        completeAppointmentsData
                                    }
                                    getCompleteAppointmentsData={
                                        getCompleteAppointmentsDataForPerticularDate
                                    }
                                />
                            )) ||
                            (completedAppointments === 3 && (
                                <MissedAppointmentsTable
                                    missedAppointmentsData={
                                        missedAppointmentsData
                                    }
                                    getMissedAppointmentsData={
                                        getMissedAppointmentsDataForPerticularDate
                                    }
                                />
                            ))}
                    </>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 4,
                        }}
                    ></Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default MasterUserDoctorAppointments;
