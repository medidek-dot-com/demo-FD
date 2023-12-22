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
import { useDispatch, useSelector } from "react-redux";
import { tab } from "../../Store/tabSlice";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import BookAppointmentDialogForPatient from "../../Components/Patient/BookAppointmentDialogForPatient";
import EditAppointmentDialog from "../../Components/Patient/EditAppointmentDialog";
import moment from "moment";
import ViewSlotAppointment from "../../Components/Patient/ViewSlotAppointment";
import ViewTokenAppointment from "../../Components/Patient/ViewTokenAppointment";

const ViewPetiantAppointment = () => {
    const { appointmentId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updatedStatus, setUpdatedStatus] = useState("pending");
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [areYouSureDialog, setAreYouSureDialog] = useState(false);
    const [areYouSureDialogForToken, setAreYouSureDialogForToken] =
        useState(false);
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

    const cancelAppointmentForToken = async () => {
        setDisableButton(true);
        try {
            const response = await axiosClient.put(
                `/v2//updateAppointmentByTokenUserAppointmentStatus/${appointmentId}`,
                { status: "cancelled", remark: "by patient" }
            );
            if (response.status === "ok") {
                navigate("/tracking");
                getPendingAppointmentsData();
            }
            setAreYouSureDialogForToken(false);
            return setDisableButton(false);
        } catch (error) {
            console.log(error);
        }
        // setUpdatedStatus("cancled");
    };
    const cancelAppointment = async () => {
        setDisableButton(true);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${appointmentId}`,
                { status: "cancelled", remark: "by patient" }
            );
            if (response.status === "ok") {
                navigate("/tracking");
                getPendingAppointmentsData();
            }
            setAreYouSureDialog(false);
            return setDisableButton(false);
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
                {appointmentDetails?.tokenid ? (
                    <ViewTokenAppointment
                        appointmentDetails={appointmentDetails}
                        setAreYouSureDialogForToken={
                            setAreYouSureDialogForToken
                        }
                    />
                ) : (
                    <ViewSlotAppointment
                        appointmentDetails={appointmentDetails}
                        setAreYouSureDialog={setAreYouSureDialog}
                        setEditAppointmentDialog={setEditAppointmentDialog}
                    />
                )}
            </Box>
            <Dialog
                sx={{ borderRadius: "14px" }}
                onClose={() => setAreYouSureDialogForToken(false)}
                aria-labelledby="customized-dialog-title"
                open={areYouSureDialogForToken}
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
                {areYouSureDialogForToken ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => setAreYouSureDialogForToken(false)}
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
                            onClick={cancelAppointmentForToken}
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
                    </Stack>
                </DialogContent>
            </Dialog>
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
        </>
    );
};

export default ViewPetiantAppointment;
