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
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useDispatch, useSelector } from "react-redux";
import { tab } from "../../Store/tabSlice";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import BookAppointmentDialogForPatient from "../../Components/Patient/BookAppointmentDialogForPatient";
import EditAppointmentDialog from "../../Components/Patient/EditAppointmentDialog";
import moment from "moment";

const ViewPetiantAppointment = () => {
    const { appointmentId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updatedStatus, setUpdatedStatus] = useState("pending");
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [areYouSureDialog, setAreYouSureDialog] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [tempDate, setTempDate] = useState("");
    // const [bookingAppointmentDetails, setBookingAppointmentDetails] = useState({
    //     nameOfTheDoctor: "",
    //     doctorsId: "",
    //     appointmentDate: "",
    //     consultingTime: "",
    //     hospitalId: "",
    //     userid: user?._id,
    //     doctorid: "",
    //     name: "",
    //     Age: "",
    //     Gender: "",
    //     phone: "",
    //     AppointmentNotes: "",
    //     AppointmentTime: "",
    //     imgurl: "",
    // });

    const [slotData, setSlotData] = useState([]);
    const [editAppointmentDialog, setEditAppointmentDialog] = useState(false);
    const [bookingAppointmentDialog, setBookAppointmentDialog] =
        useState(false);
    const [confirmBookAppointmentDialog, setConfirmBookAppointmentDialog] =
        useState(false);
    const [bookingAppointmentDetailsDialog, setBookAppointmentDetailsDialog] =
        useState(false);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [tempDoctorId, setTempDoctorId] = useState("");

    const getPendingAppointmentsData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getsingleappointmentbyid/${appointmentId}/pending`
            );
            if (response.status === "ok") {
                // setTempDate(response.result.appointmentDate);
                setTempDate(
                    moment(response.result.appointmentDate).format("YYYY-MM-DD")
                );
                setTempDoctorId(response.result.doctorid._id);
                return setAppointmentDetails(response.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cancelAppointment = async () => {
        setDisableButton(true);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${appointmentId}`,
                { status: "cancelled" }
            );
            if (response.status === "ok") {
                navigate("/tracking");
                getPendingAppointmentsData();
            }
            setAreYouSureDialog(false);
            return setDisableButton(true);
        } catch (error) {
            console.log(error);
        }
        // setUpdatedStatus("cancled");
    };

    useEffect(() => {
        getPendingAppointmentsData();
    }, [updatedStatus]);

    useEffect(() => {
        dispatch(tab(2));
    }, []);
    useEffect(() => {
        getPendingAppointmentsData();
    }, [appointmentId]);

    // console.log(appointmentDetails);

    // const getAvailableSlots = async () => {
    //     try {
    //         setSlotsLoading(true);
    //         const response = await axiosClient.get(
    //             `/v2/getAvailbleSlotsForAnUser/${appointmentDetails?.doctorid?._id}/${bookingAppointmentDetails.appointmentDate}`
    //         );
    //         if (response.status === "ok") {
    //             setSlotsLoading(false);
    //             return setSlotData(response.result);
    //         }
    //     } catch (error) {
    //         setSlotsLoading(false);
    //         console.log(error.message);
    //     }
    // };

    // useEffect(() => {
    //     getAvailableSlots();
    // }, [bookingAppointmentDetails.appointmentDate]);

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
                            px: { xs: "24px", sm: "24px", md: "26px" },
                        }}
                    >
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
                            {/* <CheckCircleIcon
                                color="success"
                                sx={{ width: {"72px"}, height: "76px" }}
                            /> */}
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
                            {/* <Box
                                component="span"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "0.813rem",
                                    color: "#1F51C6",
                                    lineHeight: "15.6px",
                                }}
                            >
                                Estimated time:{" "}
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
                            </Box> */}
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
            </Box>
            <Dialog
                sx={{ borderRadius: "14px" }}
                onClose={() => setAreYouSureDialog(false)}
                aria-labelledby="customized-dialog-title"
                open={areYouSureDialog}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: { xs: "1rem", sm: "1rem", md: "22px" },
                    }}
                    id="customized-dialog-title"
                >
                    Confirm Cancel Appointment?
                </DialogTitle>
                {areYouSureDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => setAreYouSureDialog(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <DialogContent dividers>
                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#B92612",
                            my: "25px",
                            lineHeight: "21.6px",
                        }}
                    >
                        Are you sure you want to cancel this appointment?
                    </Typography>
                    <Stack direction="row" spacing="15px">
                        <Button
                            onClick={() => setAreYouSureDialog(false)}
                            variant="contained"
                            sx={{
                                width: "328px",
                                height: "41px",
                                background: "#D9D9D9",
                                color: "#383838",
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                borderRadius: "44px",
                                boxShadow: "none",
                                ":hover": { background: "#706D6D" },
                            }}
                        >
                            No{" "}
                        </Button>
                        <LoadingButton
                            size="small"
                            fullWidth
                            onClick={cancelAppointment}
                            loading={disableButton}
                            variant="contained"
                            sx={{
                                width: "328px",
                                height: "41px",
                                background: "#B92612",
                                color: "#ffffff",
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                borderRadius: "44px",
                                boxShadow: "none",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    textTransform: "none",
                                }}
                            >
                                Cancel
                            </span>
                        </LoadingButton>
                        {/* <Button
                                onClick={handleSubmit}
                                variant="contained"
                                sx={{
                                    width: "328px",
                                    height: "41px",
                                    background: "#1F51C6",
                                    color: "#ffffff",
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    borderRadius: "44px",
                                }}
                            >
                                Confirm{" "}
                            </Button> */}
                    </Stack>
                </DialogContent>
            </Dialog>
            <EditAppointmentDialog
                appointmentDetails={appointmentDetails && appointmentDetails}
                editAppointmentDialog={editAppointmentDialog}
                setEditAppointmentDialog={setEditAppointmentDialog}
                tempDate={tempDate}
                tempDoctorId={tempDoctorId}
                getPendingAppointmentsData={getPendingAppointmentsData}
            />
            {/* <BookAppointmentDialogForPatient
                bookingAppointmentDetails={bookingAppointmentDetails}
                bookingAppointmentDialog={bookingAppointmentDialog}
                setBookAppointmentDialog={setBookAppointmentDialog}
                setBookingAppointmentDetails={setBookingAppointmentDetails}
                confirmBookAppointmentDialog={confirmBookAppointmentDialog}
                setConfirmBookAppointmentDialog={
                    setConfirmBookAppointmentDialog
                }
                setBookAppointmentDetailsDialog={
                    setBookAppointmentDetailsDialog
                }
                inputValue={inputValue}
                setInputValue={setInputValue}
                slotData={slotData}
                setSlotData={setSlotData}
                slotsLoading={slotsLoading}
            /> */}
        </>
    );
};

export default ViewPetiantAppointment;
