import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import ThankYouDialog from "./ThankYouDialog";
import moment from "moment";
import ReviewComponet from "./ReviewComponet";

const TextFieldStyle = styled(TextField)({
    // marginBottom: "20px",
    padding: "15px",
    ["& div"]: {
        padding: "5px",
    },
    ["& textarea"]: {
        // color: "white",
        fontFamily: "Lato",
        fontWeight: "600",
        color: "#383838",
        fontSize: "0.938rem",
        borderColor: "red",
        width: "490px",
        lineHeight: "18px",
    },
    "& textarea::placeholder": {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        color: "#706D6D",
    },
    ["& fieldset"]: {
        // color: "white",
        borderColor: "#D9D9D9",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
    },
});

const CompletedPatientUserAppointment = ({
    completeAppointmentsData,
    isLoading,
    setIsLoading,
}) => {
    const [thankYouDialog, setThankYouDialog] = useState(false);
    const [reviewDialog, setReviewDialog] = useState(false);
    // const [completeAppointment, setCompleteAppointmentDetails] = useState({});
    const [doctorid, setDoctorId] = useState("");
    const navigate = useNavigate();
    const handleReviewButtonClick = (appoientment) => {
        setDoctorId(appoientment?.doctorid._id);
        setReviewDialog(true);
    };
    return (
        <>
            <Stack spacing="15px">
                {completeAppointmentsData.length > 0 ? (
                    completeAppointmentsData.map((appointment, i) => {
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
                                        <Box
                                            component="span"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "700",
                                                fontSize: "13px",
                                                color: "#15B912",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {appointment?.status}{" "}
                                        </Box>
                                        <Typography
                                            sx={{
                                                fontFamily: "Raleway",
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                color: "#383838",
                                            }}
                                        >
                                            Appointment with Dr.{" "}
                                            {
                                                appointment?.doctorid
                                                    ?.nameOfTheDoctor
                                            }
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
                                        gap: "15px",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            navigate(
                                                `/tracking/view-completed-appointment/${appointment._id}`
                                            );
                                        }}
                                        size="small"
                                        sx={{
                                            borderRadius: "25px",
                                            height: "40px",
                                            fontSize: "16px",
                                            fontFamily: "Lato",
                                            fontWeight: {
                                                xs: "semibold",
                                                sm: "semibold",
                                                md: "700",
                                            },
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
                                        View Details
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleReviewButtonClick(appointment)
                                        }
                                        size="small"
                                        sx={{
                                            borderRadius: "25px",
                                            height: "40px",
                                            fontSize: "16px",
                                            fontFamily: "Lato",
                                            fontWeight: {
                                                xs: "semibold",
                                                sm: "600",
                                                md: "700",
                                            },
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
                                        Write A Review
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

                {/* <Card
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
                    <Stack direction="row" spacing="14px" alignItems="center">
                        <Avatar
                            sx={{
                                width: { xs: "57px", sm: "57px", md: "74px" },
                                height: { xs: "57px", sm: "57px", md: "74px" },
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
                                Appointment with Dr. Shashwat Magarkar
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
                                Date: 25/05/2023
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
                            Write A Review
                        </Button>
                    </Box>
                </Card> */}
            </Stack>
            <ReviewComponet
                doctorid={doctorid}
                completeAppointmentsData={completeAppointmentsData}
                reviewDialog={reviewDialog}
                setReviewDialog={setReviewDialog}
            />
            {/* <Dialog
                open={reviewDialog}
                onClose={() => setReviewDialog(false)}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "1.375rem",
                        lineHeight: "14.4px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Write A Review
                    {reviewDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setReviewDialog(false)}
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
                <Divider />
                <DialogContent>
                    <Stack spacing="8px">
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                lineHeight: "14.4px",
                            }}
                        >
                            Rate Appointment{" "}
                            <span style={{ color: "#EA4335" }}>*</span>
                        </Typography>
                        <Rating />
                    </Stack>
                    <Stack spacing="8px" sx={{ mt: "27.28px" }}>
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                lineHeight: "14.4px",
                            }}
                        >
                            Leave a Review
                        </Typography>
                        <TextFieldStyle
                            rows={4}
                            multiline
                            placeholder="Type your review here."
                            sx={{}}
                        />
                    </Stack>
                    <Button
                        fullWidth
                        sx={{
                            textTransform: "none",
                            borderRadius: "29px",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "1rem",
                            mt: "16px",
                            boxShadow: "none",
                        }}
                        variant="contained"
                    >
                        Post Review
                    </Button>
                </DialogContent>
            </Dialog> */}
            <ThankYouDialog
                thankYouDialog={thankYouDialog}
                setThankYouDialog={setThankYouDialog}
            />
        </>
    );
};

export default CompletedPatientUserAppointment;
