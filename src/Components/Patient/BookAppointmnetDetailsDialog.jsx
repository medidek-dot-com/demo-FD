import React from "react";
import {
    Box,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Button,
    Divider,
    Stack,
    TextField,
    Avatar,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";

const LabelStyle = styled("label")({
    marginBottom: "5px",
    fontFamily: "Lato",
    fontWeight: "600",
    color: "#383838",
});

const TextFieldStyle = styled(TextField)({
    // marginBottom: "20px",
    ["& input:disabled"]: {
        color: "#706D6D",
        backgroundColor: "#D9D9D9",
        cursor: "no-drop",
    },
    ["& input"]: {
        // color: "white",
        width: "344px",
        fontFamily: "Lato",
        fontWeight: "600",
        color: "#383838",
        fontSize: "0.938rem",
        borderColor: "red",
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

const BookAppointmnetDetailsDialog = ({
    bookingAppointmentDetailsDialog,
    setBookAppointmentDetailsDialog,
    bookingAppointmentDetails,
    setBookingAppointmentDetails,
    doctorinfo,
    inputValue,
    setInputValue,
    setConfirmBookAppointmentDialog,
}) => {
    const [err, setError] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleBookAppointment = async () => {
        if (
            !inputValue.name ||
            !inputValue.age ||
            !inputValue.gender ||
            !inputValue.phone ||
            !inputValue.AppointmentNotes
        ) {
            return setError(true);
        }
        setConfirmBookAppointmentDialog(true);
        // const response = await axiosClient.post(
        //     `/v2/addDoctor/${user?._id}`,
        //     data
        // );
    };

    return (
        <>
            <DialogStyle
                className="abhay"
                open={bookingAppointmentDetailsDialog}
                onClose={() => {
                    return (
                        setBookAppointmentDetailsDialog(false) &
                        setDateErr(false)
                    );
                }}
                maxWidth={"lg"}
                sx={{ margin: "0 auto" }}
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
                    Book Appointment
                    {bookingAppointmentDetailsDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() =>
                                setBookAppointmentDetailsDialog(false)
                            }
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
                <Divider
                    sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                />

                <DialogContent
                    sx={{
                        margin: { xs: "0", sm: "0", md: "10px" },
                        width: { xs: "100%", sm: "100%", md: "900px" },
                    }}
                >
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        sx={{ justifyContent: "space-between" }}
                    >
                        <Stack
                            spacing="15px"
                            sx={{
                                flex: 1,
                                order: { xs: 3, sm: 3, md: 1 },
                                mt: { xs: "16px", sm: "16px", md: "0" },
                                border: {
                                    xs: "1px solid #D9D9D9",
                                    sm: "1px solid #D9D9D9",
                                    md: "none",
                                },
                                p: {
                                    xs: "24px 16px",
                                    sm: "24px 16px",
                                    md: "24px 16px",
                                },
                                borderRadius: "4px",
                            }}
                        >
                            <Stack>
                                <LabelStyle htmlFor="name">Name</LabelStyle>
                                <TextFieldStyle
                                    id="name"
                                    name="name"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="Ex. Dr. John Doe"
                                    error={err && !inputValue?.name && true}
                                    helperText={
                                        err &&
                                        !inputValue.name &&
                                        "Please enter patient's name"
                                    }
                                    value={inputValue?.name}
                                    onChange={(e) =>
                                        handleChange(e) & setError(false)
                                    }
                                />
                            </Stack>
                            <Stack>
                                <LabelStyle htmlFor="age">
                                    Age
                                    <span style={{ color: "#EA4335" }}>*</span>
                                </LabelStyle>
                                <TextFieldStyle
                                    id="age"
                                    name="age"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="52"
                                    error={err && !inputValue.age && true}
                                    helperText={
                                        err &&
                                        !inputValue.age &&
                                        "Please enter patient's age"
                                    }
                                    value={inputValue?.age}
                                    onChange={(e) =>
                                        handleChange(e) & setError(false)
                                    }
                                />
                            </Stack>
                            <Stack>
                                <LabelStyle htmlFor="gender">
                                    Gender
                                    <span style={{ color: "#EA4335" }}>*</span>
                                </LabelStyle>
                                <TextFieldStyle
                                    id="gender"
                                    name="gender"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="Male"
                                    error={err && !inputValue.gender && true}
                                    helperText={
                                        err &&
                                        !inputValue.gender &&
                                        "Please enter gender"
                                    }
                                    value={inputValue?.gender}
                                    onChange={(e) =>
                                        handleChange(e) & setError(false)
                                    }
                                />
                            </Stack>
                            <Stack>
                                <LabelStyle htmlFor="phone">
                                    Mobile
                                    <span style={{ color: "#EA4335" }}>*</span>
                                </LabelStyle>
                                <TextFieldStyle
                                    id="phone"
                                    name="phone"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="9123456778"
                                    error={err && !inputValue.phone && true}
                                    helperText={
                                        err &&
                                        !inputValue?.phone &&
                                        "Please enter Phone Number"
                                    }
                                    value={inputValue?.phone}
                                    onChange={(e) =>
                                        handleChange(e) & setError(false)
                                    }
                                />
                            </Stack>
                            <Stack>
                                <LabelStyle htmlFor="AppointmentNotes">
                                    Appointment Notes
                                </LabelStyle>
                                <TextFieldStyle
                                    id="AppointmentNotes"
                                    name="AppointmentNotes"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="Write Appointment Notes"
                                    error={
                                        err &&
                                        !inputValue.AppointmentNotes &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.AppointmentNotes &&
                                        "Please enter Appointment Notes"
                                    }
                                    value={inputValue?.AppointmentNotes}
                                    onChange={(e) =>
                                        handleChange(e) & setError(false)
                                    }
                                />
                            </Stack>
                        </Stack>
                        {/* <Divider orientation="vertical"  sx={{background:"red"}} /> */}
                        <Box
                            component="hr"
                            color="#D9D9D9"
                            sx={{
                                border: "0.4px solid #D9D9D9",
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "block",
                                },
                                mr: "30px",
                                ml: "76px",
                                order: { xs: 2, sm: 2, md: 2 },
                            }}
                        />
                        <Stack sx={{ flex: 1, order: { xs: 1, sm: 1, md: 3 } }}>
                            <Card
                                sx={{
                                    p: {
                                        xs: "16px",
                                        sm: "20px 16px",
                                        md: "15px",
                                    },
                                    // mx: {xs:"-20px", sm:"-20px", md:"0px"},
                                    // width: "390px",
                                    boxShadow: "none",
                                    // background: {
                                    //     xs: "#1F51C6",
                                    //     sm: "#1F51C6",
                                    //     md: "none",
                                    // },
                                    border: "1px solid #D9D9D9",
                                }}
                            >
                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "column",
                                        md: "row",
                                    }}
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing="10px"
                                        sx={{
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                doctorinfo?.imgurl ||
                                                bookingAppointmentDetails?.imgurl
                                            }
                                            sx={{
                                                width: "51px",
                                                height: "51px",
                                                order: { xs: 2, sm: 2, md: 1 },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                order: { xs: 1, sm: 1, md: 2 },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#383838",
                                                    fontFamily: "Lato",
                                                    fontWeight: "600",
                                                    fontSize: "0.938rem",
                                                    lineHeight: "18px",
                                                    color: "#383838",
                                                }}
                                            >
                                                Dr.{" "}
                                                {doctorinfo?.nameOfTheDoctor ||
                                                    bookingAppointmentDetails?.nameOfTheDoctor}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#706D6D",
                                                    fontFamily: "Lato",
                                                    fontWeight: "500",
                                                    fontSize: "0.938rem",
                                                    lineHeight: "18px",
                                                    color: "#706D6D",
                                                }}
                                            >
                                                Medidek Hospital
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Button
                                        variant="text"
                                        sx={{
                                            textTransform: "none",
                                            boxShadow: "none",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "0.938rem",
                                            lineHeight: "16.8px",
                                            display: {
                                                xs: "none",
                                                sm: "none",
                                                md: "flex",
                                            },
                                        }}
                                    >
                                        View Profile
                                    </Button>
                                </Stack>
                                <Divider
                                    sx={{
                                        mt: "25px",
                                        display: {
                                            xs: "none",
                                            sm: "none",
                                            md: "block",
                                        },
                                    }}
                                />
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: {
                                            xs: "start",
                                            sm: "start",
                                            md: "space-between",
                                        },
                                        mt: {
                                            xs: "5px",
                                            sm: "5px",
                                            md: "25px",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#383838",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: {
                                                xs: "0.813rem",
                                                sm: "0.813rem",
                                                md: "0.938rem",
                                            },
                                            lineHeight: "18px",
                                            color: "#383838",
                                        }}
                                    >
                                        Appointment Date:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#706D6D",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: {
                                                xs: "0.813rem",
                                                sm: "0.813rem",
                                                md: "0.938rem",
                                            },
                                            lineHeight: "18px",
                                            ml: {
                                                xs: "5px",
                                                sm: "5px",
                                                md: "0",
                                            },
                                            color: "#706D6D",
                                        }}
                                    >
                                        {moment(
                                            bookingAppointmentDetails.appointmentDate
                                        ).format("DD-MM-YYYY")}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: {
                                            xs: "start",
                                            sm: "start",
                                            md: "space-between",
                                        },
                                        mt: { xs: "0", sm: "0", md: "25px" },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#383838",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: {
                                                xs: "0.813rem",
                                                sm: "0.813rem",
                                                md: "0.938rem",
                                            },
                                            lineHeight: "18px",
                                            color: "#383838",
                                        }}
                                    >
                                        Appointment Time:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#706D6D",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: {
                                                xs: "0.813rem",
                                                sm: "0.813rem",
                                                md: "0.938rem",
                                            },
                                            lineHeight: "18px",
                                            ml: {
                                                xs: "5px",
                                                sm: "5px",
                                                md: "0",
                                            },
                                            color: "#706D6D",
                                        }}
                                    >
                                        {
                                            bookingAppointmentDetails.AppointmentTime
                                        }
                                    </Typography>
                                </Stack>
                            </Card>
                        </Stack>
                    </Stack>
                    <Box>
                        <Button
                            variant="contained"
                            // fullWidth="true"
                            sx={{
                                background: "#1F51C6",
                                // margin: "20px 10px",
                                width: "100%",
                                borderRadius: "40px",
                                boxShadow: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                mt: "25px",
                                display: "block",
                                textTransform: "none",
                            }}
                            onClick={handleBookAppointment}
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </DialogContent>
            </DialogStyle>
        </>
    );
};

export default BookAppointmnetDetailsDialog;
