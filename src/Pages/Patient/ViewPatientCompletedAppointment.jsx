import React, { useEffect } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import UploadRecordsDialog from "../../Components/Patient/UploadRecordsDialog";
import ReviewComponet from "../../Components/Patient/ReviewComponet";
import { axiosClient } from "../../Utils/axiosClient";
import moment from "moment";

const ViewPatientCompletedAppointment = () => {
    const dispatch = useDispatch();
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [uploadPrescriptionDialog, setUploadPrescriptionDialog] =
        useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({});

    const [reviewDialog, setReviewDialog] = useState(false);
    const [doctorid, setDoctorId] = useState("");

    const getPendingAppointmentsData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getsingleappointmentbyid/${appointmentId}/completed`
            );
            if (response.status === "ok") {
                console.log(response.result);
                setDoctorId(response.result.doctorid._id);
                return setAppointmentDetails(response.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPendingAppointmentsData();
    }, [appointmentId]);

    useEffect(() => {
        dispatch(tab(2));
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 30px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "80vh",
                }}
            >
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
                            px: "26px",
                        }}
                    >
                        <Stack
                            alignItems={{
                                xs: "space-between",
                                sm: "space-between",
                                md: "center",
                            }}
                            sx={{
                                mb: "40px",
                                flexDirection: {
                                    xs: "row-reverse",
                                    sm: "row-reverse",
                                    md: "column",
                                },
                            }}
                        >
                            <CheckCircleIcon
                                color="success"
                                sx={{ width: "72px", height: "76px" }}
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
                                        fontWeight: "600",
                                        fontSize: "1.563rem",
                                    }}
                                >
                                    Thank You!
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        color: "#706D6D",
                                    }}
                                >
                                    Your appointment is completed
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            alignItems={{
                                xs: "flex-start",
                                sm: "flex-start",
                                md: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    fontSize: "1.563rem",
                                    color: "#383838",
                                }}
                            >
                                Track Appointment
                            </Typography>
                            <Box
                                component="span"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    color: "#1F51C6",
                                }}
                            >
                                Appointment Id:{" "}
                                <span
                                    style={{
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        color: "#383838",
                                    }}
                                >
                                    {appointmentDetails?._id}
                                </span>
                            </Box>
                        </Stack>

                        {/* <Stack alignItems='center' justifyContent='center'>
                       <CheckCircleIcon/>
                       <Box
                                component="span"
                                sx={{
                                    width: "2px",
                                    height: "6px",
                                    background: "#1F51C6",
                                    alignSelf:'start',
                                }}
                            ></Box> 
                    </Stack> */}

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
                                        Appoitment Confirm with dr{" "}
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
                                        Dr{" "}
                                        {
                                            appointmentDetails?.doctorid
                                                ?.nameOfTheDoctor
                                        }{" "}
                                        will start appointments
                                    </Box>
                                    {/* <Box
                                        component="p"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "0.813rem",
                                            color: "#706D6D",
                                        }}
                                    >
                                        @12:00 PM, Sept 5, 2021
                                    </Box> */}
                                </Stack>
                            </Stack>
                            <Stack direction="row" sx={{ gap: "5px" }}>
                                <Stack sx={{ gap: "2px" }}>
                                    <CheckCircleIcon color="success" />
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
                            onClick={() => setUploadPrescriptionDialog(true)}
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
                            Upload prescription
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setReviewDialog(true)}
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
                            Write A Review
                        </Button>
                    </Stack>
                </Box>
            </Box>
            <ReviewComponet
                reviewDialog={reviewDialog}
                setReviewDialog={setReviewDialog}
                doctorid={doctorid}
            />
            <UploadRecordsDialog
                uploadPrescriptionDialog={uploadPrescriptionDialog}
                setUploadPrescriptionDialog={setUploadPrescriptionDialog}
            />
        </>
    );
};

export default ViewPatientCompletedAppointment;
