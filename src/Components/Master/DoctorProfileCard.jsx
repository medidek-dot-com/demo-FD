import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BookAppointmentDialog from "./BookAppointmentDialog";
import { axiosClient } from "../../Utils/axiosClient";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { baseURL } from "../../Utils/axiosClient";

const DoctorProfileCard = ({getUpcomingAppointmentsData, doctorDetails}) => {
    const [bookAppointmentDialog, setBookAppointmentDialog] = useState(false);
    // const [doctorDetails, setDoctorsDetails] = useState({});

    // const getDoctorDetails = async () => {
    //     const response = await axiosClient.get(
    //         `/v2/getSingleDoctor/${doctor_id}`
    //     );
    //     setDoctorsDetails(response.result);
    // };

    // useEffect(() => {
    //     getDoctorDetails();
    // }, []);

    // const getDoctorData = async () => {
    //     const response = await axiosClient.get(
    //         `/hospital/doctor/${doctor_id}`
    //     );
    //     if (response.status === 200) {
    //         console.log(response.data);
    //         setDoctorData(response.data.data);
    //     }
    // };

    // useEffect(() => {
    //     getDoctorData();
    // }, []);

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    background: { xs: "#DCE3F6", sm: "#DCE3F6", md: "none" },
                    justifyContent: "space-between",
                    width: "100%",
                    p: 3,
                    alignItems: { xs: "start", sm: "start", md: "center" },
                    border: "1px solid #D9D9D9",
                    boxShadow: "none",
                    borderRadius: "7px",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    mt: 5,
                }}
            >
                <Stack direction="row">
                    <Avatar
                        src={
                            doctorDetails?.doctorImg
                                ? `${baseURL}/Uploads/Hospital/DoctorImage/${doctorDetails.doctorImg}`
                                : "/default.png"
                        }
                       
                        alt="User Image"
                        sx={{
                            width: { xs: 70, sm: 60, md: 140 },
                            height: { xs: 70, sm: 60, md: 140 },
                        }}
                    />
                    <Box ml={2}>
                        <Typography
                            variant="h6"
                            sx={{ display: "flex", alignItems: "center", fontFamily:'Raleway', fontWeight:'600', color:'#383838', fontSize:'1.375rem', lineHeight:'25.83px' }}
                        >
                            {doctorDetails?.nameOfTheDoctor} &nbsp;
                            <CheckCircleIcon color="success" />
                        </Typography>
                        <Typography
                            sx={{ color: "#706D6D", fontSize: "0.9rem", fontFamily:'Lato', fontWeight:'600', lineHeight:'18px' }}
                        >
                            {doctorDetails?.yearOfExprience} Years Experience
                        </Typography>
                        <Rating value={5} readOnly />
                    </Box>
                </Stack>
                <Box sx={{ width: { xs: "100%", sm: "100%", md: "193.71px" } }}>
                    <Button
                        onClick={() => setBookAppointmentDialog(true)}
                        variant="contained"
                        sx={{
                            m: 1,
                            background: "#15B912",
                            textTransform: "none",
                            width: { xs: "100%", sm: "100%", md: "200px" },
                            borderRadius: "35px",
                            "&:hover": {
                                background: "#148512",
                            },
                            fontFamily:'Raleway',
                            fontWeight:'600',
                            fontSize:'1.125rem',
                            boxShadow:'none',
                            display:{xs:'none', sm:'none', md:'block'}
                        }}
                    >
                        Book Appointment
                    </Button>
                </Box>
            </Card>
            <BookAppointmentDialog
                bookAppointmentDialog={bookAppointmentDialog}
                setBookAppointmentDialog={setBookAppointmentDialog}
                getUpcomingAppointmentsData={getUpcomingAppointmentsData}
            />
        </>
    );
};

export default DoctorProfileCard;
