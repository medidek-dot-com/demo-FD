import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Fab,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import BookAppointmentDialog from "../../Components/Master/BookAppointmentDialog";
import { useNavigate, useParams } from "react-router-dom";
import DoctorProfileCard from "../../Components/Master/DoctorProfileCard";
import { axiosClient } from "../../Utils/axiosClient";
import styled from "@emotion/styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";
import ChooseDateAndSlotTimeDialog from "../../Components/Master/ChooseDateAndSlotTimeDialog";
import AppointmentSettingDialog from "../../Components/Master/AppointmentSettingDialog";

const WrapperStyle = styled(Box)(({ theme }) => ({
    width: "calc(100% - 100px)",
    margin: "10px auto",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "calc(100% - 10px)",
    },
}));

const MasterUserDoctorDetails = () => {
    const { hospital_id, doctor_id } = useParams();
    console.log(hospital_id, doctor_id);
    const navigate = useNavigate();
    const [bookAppointmentDialog, setBookAppointmentDialog] = useState(false);
    const [aboutDropDown, setAboutDropDown] = useState(true);
    const [reviewDropDown, setReviewAboutDropDown] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [doctorDetails, setDoctorsDetails] = useState({});
    const [reviews, setReviews] = useState([]);
    const [appointmentSettingDialog, setAppointmentSettingDialog] =
        useState(false);
    const [chooseDateAndTimeDialog, setChooseDateAndTimeDialog] =
        useState(false);
    const [getDateAndTime, setGetDateAndTime] = useState({
        appointmentDate: "",
        AppointmentTime: "",
    });
    const [slotData, setSlotData] = useState([]);
    console.log(getDateAndTime);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(2));
    }, []);

    const getDoctorDetails = async () => {
        const response = await axiosClient.get(`/v2/singledoctor/${doctor_id}`);
        setDoctorsDetails(response.result);
        setReviews(response.result.reviews);
    };

    const getUpcomingAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getAppoinmentForDoctorInHospital/${hospital_id}/${doctor_id}`
        );
        setAppointments(response.result);
        console.log(response);
    };

    useEffect(() => {
        getUpcomingAppointmentsData();
        getDoctorDetails();
    }, []);

    const getAvailableSlots = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getAvailbleSlotsForAnUser/${doctor_id}/${getDateAndTime.appointmentDate}`
            );
            if (response.status === "ok") {
                return setSlotData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAvailableSlots();
    }, [getDateAndTime.appointmentDate]);

    return (
        <>
            <WrapperStyle>
                <DoctorProfileCard
                    setChooseDateAndTimeDialog={setChooseDateAndTimeDialog}
                    getUpcomingAppointmentsData={getUpcomingAppointmentsData}
                    doctorDetails={doctorDetails}
                    setAppointmentSettingDialog={setAppointmentSettingDialog}
                />

                <Typography
                    my={2}
                    sx={{
                        display: { xs: "none", sm: "none", md: "block" },
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "1.375rem",
                    }}
                >
                    Reviews
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        mt: 2,
                        flexWrap: {
                            xs: "wrap-reverse",
                            sm: "wrap-reverse",
                            md: "none",
                        },
                        alignItems: { xs: "center", sm: "center", md: "start" },
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "block",
                                },
                            }}
                        >
                            <Card
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    p: 3,
                                    alignItems: "center",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "none",
                                    borderRadius: "7px",
                                    // flexDirection: { xs: "column", sm: "row" },
                                    mb: 1,
                                }}
                            >
                                <Stack direction="row" alignItems={"c"}>
                                    <img
                                        src="/doctor.png"
                                        alt="img"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Box ml={2}>
                                        <Typography
                                            sx={{
                                                fontFamily: "Raleway",
                                                fontWeight: "500",
                                                fontSize: "1.191rem",
                                            }}
                                        >
                                            Ashwini Hingolikar
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#706D6D",
                                                fontFamily: "Lato",
                                                fontWeight: "500",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            Best Medical app! Easy to use.
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Box>
                                    <Rating value={5} readOnly />
                                </Box>
                            </Card>
                        </Box>
                        {/* For Mobile View */}
                        <Box
                            sx={{
                                display: {
                                    xs: "block",
                                    sm: "block",
                                    md: "none",
                                },
                            }}
                        >
                            <Card
                                onClick={() => setAboutDropDown(!aboutDropDown)}
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                    px: 2,
                                    py: 1,
                                    border: " 1px solid #D9D9D9",
                                    boxShadow: "none",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flex: 1,
                                        fontWeight: 700,
                                        fontFamily: "Raleway",
                                        fontSize: { md: "1rem" },
                                    }}
                                >
                                    About Doctor
                                </Typography>
                                {aboutDropDown ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </Card>
                            <Card
                                sx={{
                                    p: 2,
                                    mt: 2,
                                    border: " 1px solid #D9D9D9",
                                    boxShadow: "none",
                                    display: aboutDropDown ? "block" : "none",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#000000BD",
                                        maxHeight: "50vh",
                                        overflow: "auto",
                                        fontFamily: "Lato",
                                        fontWeight: "400",
                                        fontSize: "15px",
                                    }}
                                >
                                    {doctorDetails.description}
                                </Typography>
                            </Card>
                            <Card
                                onClick={() =>
                                    setReviewAboutDropDown(!reviewDropDown)
                                }
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                    px: 2,
                                    py: 1,
                                    border: " 1px solid #D9D9D9",
                                    boxShadow: "none",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flex: 1,
                                        fontWeight: 700,
                                        fontFamily: "Raleway",
                                    }}
                                >
                                    Reviews
                                </Typography>
                                {reviewDropDown ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </Card>
                            <Box
                                sx={{
                                    display: reviewDropDown ? "block" : "none",
                                    maxHeight: "50vh",
                                    overflow: "auto",
                                }}
                            >
                                {reviews?.length > 0 ? (
                                    reviews.map((review, i) => {
                                        return (
                                            <Card
                                                key={i}
                                                sx={{
                                                    width: "100%",
                                                    p: 1,
                                                    mt: 1,
                                                    border: " 1px solid #D9D9D9",
                                                    boxShadow: "none",
                                                    display: "flex",
                                                    gap: 1,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Avatar src="/doctor.png" />
                                                <Stack>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            fontWeight: 500,
                                                            fontFamily:
                                                                "Raleway",
                                                            fontSize:
                                                                "0.891rem",
                                                        }}
                                                    >
                                                        {review.name}{" "}
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                color: "#D9D9D978",
                                                            }}
                                                        >
                                                            {" "}
                                                            &nbsp;|&nbsp;
                                                        </Box>
                                                        <Rating
                                                            value={Number(
                                                                review.rating
                                                            )}
                                                            readOnly
                                                        />
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "0.8rem",
                                                            fontFamily:
                                                                "Raleway",
                                                            fontWeight: "500",
                                                            color: "#383838",
                                                        }}
                                                    >
                                                        {review.masseage}
                                                    </Typography>
                                                </Stack>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <Typography>hello</Typography>
                                )}
                            </Box>
                        </Box>
                        {/* Mobile View End  */}
                    </Box>
                    <Card
                        sx={{
                            width: "400px",
                            height: "450px",
                            ml: { xs: "none", sm: "none", md: 2 },
                            border: "1px solid #D9D9D9",
                            boxShadow: "none",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                        }}
                    >
                        <Typography
                            sx={{
                                p: {
                                    xs: "14px 16px",
                                    sm: "14px 16px",
                                    md: "20px 25px",
                                },
                                fontFamily: "Raleway",
                                fontWeight: "700",
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1.1rem",
                                    md: "1.375rem",
                                },
                                background: {
                                    xs: "#1F51C6",
                                    sm: "#1F51C6",
                                    md: "none",
                                },
                                color: {
                                    xs: "#ffffff",
                                    sm: "#ffffff",
                                    md: "#383838",
                                },
                            }}
                        >
                            Upcoming Appointments
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box sx={{ overflow: "auto", mb: "10px" }}>
                            {appointments.length > 0 ? (
                                appointments.map((appointment, i) => (
                                    <Card
                                        key={i}
                                        sx={{
                                            mx: 2,
                                            my: "3px",
                                            height: "64px",
                                            background: "#DCE3F6",
                                            border: "1px solid #D9D9D9",
                                            boxShadow: "none",
                                            borderRadius: "5px",
                                            mb:
                                                i === appointments.length - 1
                                                    ? "70px"
                                                    : "3px", // Apply margin-bottom only to the last element
                                        }}
                                    >
                                        <Stack
                                            direction={"row"}
                                            sx={{ m: 1, alignItems: "center" }}
                                        >
                                            <Fab
                                                size="small"
                                                color="primary"
                                                sx={{
                                                    zIndex: 1,
                                                    fontFamily: "Lato",
                                                    fontWeight: "700",
                                                    fontSize: "1rem",
                                                    boxShadow: "none",
                                                }}
                                            >
                                                {appointment.token}
                                            </Fab>
                                            <Box ml={1}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Raleway",
                                                        fontWeight: "600",
                                                        fontSize: "1rem",
                                                    }}
                                                >
                                                    {appointment.patientName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "0.875rem",
                                                        color: "#706D6D",
                                                        fontFamily: "Raleway",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Appointment at:{" "}
                                                    {
                                                        appointment.appointmentTime
                                                    }
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Card>
                                ))
                            ) : (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: 600,
                                        textAlign: "center",
                                    }}
                                >
                                    No Appointments
                                </Typography>
                            )}
                        </Box>

                        {appointments.length > 0 && (
                            <Box
                                sx={{
                                    width: "100%",
                                    background: "#ffffff",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    display: "flex",
                                    justifyContent: "center",
                                    zIndex: 2,
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/master/user/doctor/appointments/${hospital_id}/${doctor_id}`
                                        )
                                    }
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        width: {
                                            xs: "90%",
                                            sm: "90%",
                                            md: "175px",
                                        },
                                        margin: "15px auto",
                                        textTransform: "none",
                                        borderRadius: "35px",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: {
                                            xs: "0.9rem",
                                            sm: "1rem",
                                            md: "1.125rem",
                                        },
                                        boxShadow: "none",
                                    }}
                                >
                                    View All
                                </Button>
                            </Box>
                        )}
                    </Card>
                </Box>
            </WrapperStyle>
            <ChooseDateAndSlotTimeDialog
                chooseDateAndTimeDialog={chooseDateAndTimeDialog}
                setChooseDateAndTimeDialog={setChooseDateAndTimeDialog}
                getDateAndTime={getDateAndTime}
                setGetDateAndTime={setGetDateAndTime}
                slotData={slotData}
                setSlotData={setSlotData}
            />
            <BookAppointmentDialog
                bookAppointmentDialog={bookAppointmentDialog}
                setBookAppointmentDialog={setBookAppointmentDialog}
                getDateAndTime={getDateAndTime}
                getUpcomingAppointmentsData={getUpcomingAppointmentsData}
            />
            <AppointmentSettingDialog
                appointmentSettingDialog={appointmentSettingDialog}
                setAppointmentSettingDialog={setAppointmentSettingDialog}
            />
            <Footer />
        </>
    );
};

export default MasterUserDoctorDetails;
