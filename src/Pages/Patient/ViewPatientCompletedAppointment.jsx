import React, { useEffect } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadRecordsDialog from "../../Components/Patient/UploadRecordsDialog";
import ReviewComponet from "../../Components/Patient/ReviewComponet";

const ViewPatientCompletedAppointment = () => {
    const dispatch = useDispatch();

    const [uploadPrescriptionDialog, setUploadPrescriptionDialog] =
        useState(false);

    const navigate = useNavigate();

    const [reviewDialog, setReviewDialog] = useState(false);

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
                                    #02484746
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

                        <Stack alignSelf="start">
                            <Box
                                component="span"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "2px",
                                }}
                            >
                                <Box component="span" sx={{ display: "flex" }}>
                                    <CheckCircleIcon color="success" sx={{}} />{" "}
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        // alignSelf:'start',
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                            </Box>
                            <Box
                                component="span"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "2px",
                                }}
                            >
                                <Box component="span" sx={{ display: "flex" }}>
                                    <CheckCircleIcon color="success" sx={{}} />{" "}
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        // alignSelf:'start',
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "2px",
                                        height: "6px",
                                        background: "#1F51C6",
                                        alignSelf: "center",
                                    }}
                                ></Box>
                            </Box>
                            <Box
                                component="span"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "2px",
                                }}
                            >
                                <Box component="span" sx={{ display: "flex" }}>
                                    <CheckCircleIcon color="success" sx={{}} />{" "}
                                </Box>
                            </Box>
                        </Stack>
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
            />
            <UploadRecordsDialog
                uploadPrescriptionDialog={uploadPrescriptionDialog}
                setUploadPrescriptionDialog={setUploadPrescriptionDialog}
            />
        </>
    );
};

export default ViewPatientCompletedAppointment;
