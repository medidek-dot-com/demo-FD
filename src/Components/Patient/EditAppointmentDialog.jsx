import React, { useState } from "react";
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
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import { axiosClient } from "../../Utils/axiosClient";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
const SelectFieldStyle = styled(Select)({
    // marginBottom: "20px",
    fontFamily: "Lato",
    fontWeight: "600",
    color: "#383838",
    fontSize: "0.938rem",
    ["& select:disabled"]: {
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
    // ["& div:first-child"]:{
    //     // marginInline:"8px"
    // },
    ["& .MuiDialog-container:nth-of-type(1)"]: {
        marginInline: "16px",
    },
    // ["& .abhay  div:nth-child(2)"]:{
    //     marginInline:"16px"
    // }
});

const EditAppointmentDialog = ({
    editAppointmentDialog,
    setEditAppointmentDialog,
    appointmentDetails,
    tempDate,
    tempDoctorId,
    getPendingAppointmentsData,
}) => {
    const { appointmentId } = useParams();
    const [err, setError] = useState(false);
    const { user } = useSelector((state) => state.auth);
    let [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        AppointmentNotes: "",
        appointmentDate: tempDate,
        AppointmentTime: "",
        doctorid: "",
        userid: user?._id,
    });
    const [dates, setDates] = useState([]);
    const [slotData, setSlotData] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    useEffect(() => {
        inputValue.name = appointmentDetails.name;
        inputValue.age = appointmentDetails.age;
        inputValue.gender = appointmentDetails.gender;
        inputValue.phone = appointmentDetails.phone;
        inputValue.AppointmentNotes = appointmentDetails.AppointmentNotes;
        inputValue.appointmentDate = tempDate;
        inputValue.AppointmentTime = appointmentDetails.AppointmentTime;
        inputValue.doctorid = tempDoctorId;
    }, [appointmentDetails]);
    const d = inputValue.appointmentDate;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const getAvailableSlots = async () => {
        try {
            if (!appointmentDetails?.doctorid?._id) {
                return false;
            }
            const response = await axiosClient.get(
                `/v2/getAvailbleSlotsForAnUser/${appointmentDetails?.doctorid?._id}/${inputValue.appointmentDate}`
            );
            if (response.status === "ok") {
                // setSlotsLoading(false);
                return setSlotData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAvailableSlots();
    }, [inputValue.appointmentDate]);

    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 8; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push(date.format("DD-MM-YYYY").toUpperCase());
        }
        setDates(monthsDates);
    };

    useEffect(() => {
        getWeekDates();
    }, []);

    const bookAppointment = async () => {
        setDisableButton(true);
        try {
            const response = await axiosClient.put(
                `/v2/editAppointment/${appointmentId}`,
                inputValue
            );

            if (response.status === "ok") {
                getPendingAppointmentsData();
                setEditAppointmentDialog(false);
                setDisableButton(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
            setDisableButton(false);
        }
    };

    return (
        <>
            <Dialog
                open={editAppointmentDialog}
                onClose={() => {
                    return setEditAppointmentDialog(false);
                }}
                maxWidth={"lg"}
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
                    Edit Appointment
                    <IconButton
                        aria-label="close"
                        onClick={() => setEditAppointmentDialog(false)}
                        sx={{
                            // position: "absolute",
                            // right: 8,
                            // top: 8,
                            color: "#383838",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
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
                                <LabelStyle htmlFor="name">
                                    Appointment Date
                                </LabelStyle>
                                <SelectFieldStyle
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="Ex. Dr. John Doe"
                                    error={err && !inputValue?.name && true}
                                    // helperText={
                                    //     err &&
                                    //     !inputValue.name &&
                                    //     "Please enter patient's name"
                                    // }
                                    value={inputValue?.appointmentDate}
                                    onChange={(e) => {
                                        handleChange(e) & setError(false);
                                        // setInputValue({
                                        //     ...inputValue,
                                        //     appointmentDate: e.target.value,
                                        // });
                                    }}
                                >
                                    {dates.map((date, i) => (
                                        <MenuItem
                                            value={moment(
                                                date,
                                                "DD-MM-YYYY"
                                            ).format("YYYY-MM-DD")}
                                            key={i}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#383838",
                                                fontSize: "0.938rem",
                                            }}
                                        >
                                            {date}
                                        </MenuItem>
                                    ))}
                                </SelectFieldStyle>
                            </Stack>
                            <Stack>
                                <LabelStyle htmlFor="appointmentTime">
                                    Appointment Time
                                </LabelStyle>
                                <SelectFieldStyle
                                    id="appointmentTime"
                                    name="appointmentTime"
                                    fullWidth
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    value={
                                        slotData[0] ===
                                        "doctor not available for this date"
                                            ? 1
                                            : inputValue?.AppointmentTime
                                    }
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            AppointmentTime: e.target.value,
                                        }) & setError(false);
                                        // setInputValue({
                                        // ...inputValue,
                                        // appointmentDate: e.target.value,
                                        // });
                                    }}
                                >
                                    {slotData[0] ===
                                        "doctor not available for this date" && (
                                        <MenuItem
                                            value={1}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#B92612",
                                                fontSize: "0.938rem",
                                            }}
                                        >
                                            Doctor Not Available for this date
                                        </MenuItem>
                                    )}
                                    {slotData.map((slot, i) => (
                                        <MenuItem
                                            value={
                                                slot.startTime +
                                                " " +
                                                "-" +
                                                " " +
                                                slot.endTime
                                            }
                                            key={i}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#383838",
                                                fontSize: "0.938rem",
                                            }}
                                        >
                                            {slot.startTime} - {slot.endTime}
                                        </MenuItem>
                                    ))}
                                </SelectFieldStyle>
                            </Stack>
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
                                    //     sm: "#1F51C6"
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
                                                appointmentDetails?.doctorid
                                                    ?.imgurl
                                                    ? appointmentDetails
                                                          .doctorid.imgurl
                                                    : "/default.png"
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
                                                {
                                                    appointmentDetails?.doctorid
                                                        ?.nameOfTheDoctor
                                                }
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
                                        {inputValue.appointmentDate}
                                        {/* {moment(
                                            appointmentDetails?.appointmentDate
                                        ).format("DD-MM-YYYY")} */}
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
                                        {inputValue?.AppointmentTime}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Stack>
                    </Stack>
                    <Box>
                        {/* <Button
                            variant="contained"
                            disabled={
                                slotData[0] ===
                                "doctor not available for this date"
                                    ? true
                                    : false
                            }
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
                            onClick={bookAppointment}
                        >
                            Book Appointment
                        </Button> */}
                        <LoadingButton
                            disabled={
                                slotData[0] ===
                                "doctor not available for this date"
                                    ? true
                                    : false
                            }
                            fullWidth
                            onClick={bookAppointment}
                            loading={disableButton}
                            variant="contained"
                            sx={{
                                background: "#1F51C6",
                                // margin: "20px 10px",
                                // width: "100%",
                                borderRadius: "40px",
                                boxShadow: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                mt: "25px",
                                display: "block",
                                textTransform: "none",
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
                                Book Appointment
                            </span>
                        </LoadingButton>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditAppointmentDialog;
