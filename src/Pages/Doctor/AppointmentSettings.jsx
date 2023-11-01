import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Drawer,
    Fab,
    InputAdornment,
    LinearProgress,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Typography,
    FormLabel,
    IconButton,
    Select,
    InputLabel,
    MenuItem,
    Radio,
    Dialog,
    DialogContent,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styled from "@emotion/styled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillCalendarFill } from "react-icons/bs";
import { MdDashboard, MdLogout } from "react-icons/md";
import { ImPencil } from "react-icons/im";
import PendingAppointmentsTable from "../../Components/Master/PendingAppointmentsTable";
import CompleteAppointmentsTable from "../../Components/Master/CompleteAppointmentsTable";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PieChart } from "@mui/x-charts/PieChart";
import { logout } from "../../Store/authSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { BiSolidBook } from "react-icons/bi";
import ChangePasswordDialog from "../../Components/Doctor/ChangePasswordDialog";
import { IoRadioButtonOn } from "react-icons/io5";
import moment from "moment";
import HolidayListDialog from "../../Components/Doctor/HolidayListDialog";
import dayjs from "dayjs";

// const TextFieldStyle = styled(TextField)({
//     // marginBottom: "20px",

// });

const TextFieldStyle = styled(TextField)({
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
        fontSize: "15px",
        height: "28px",
    },
    [`& input`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    [`& input[type = "number"]::-webkit-inner-spin-button`]: {
        display: "none",
    },
    borderColor: "#DCE3F6",
    "& ::placeholder": {
        color: "#706D6D",
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "15px",
    },
    "& :focused": {
        borderColor: "red",
    },
});

const StackStyle = styled(Stack)(({ theme }) => ({
    width: "48%",
    marginInline: "5px",
    // marginBottom: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "100%",
    },
}));

const LabelStyle = styled("label")({
    marginBottom: "5px",
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: "15px",
    color: "#383838",
});

const OptionStyle = styled("option")({
    background: "#ffffff",
    color: "#000000",
    display: "inline-block",
    margin: "10px",
    padding: "10px",

    ":hover": {
        background: "green",
    },
});

const AppointmentSettings = () => {
    const { hospital_id, doctor_id } = useParams();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(4);
    const [menu, setMenu] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const numberOfHospitals = user;
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(1);
    const [view, setView] = useState("Weekly view");
    const [holidayDialog, setHolidayDialog] = useState(false);
    const [appointmentByToken, setAppointmentByToken] = useState(false);
    const [activeCard, setActiveCard] = useState();


    // const {hospital_id} = useParams();
    const navigate = useNavigate();
const today = moment().startOf('week');

// Create an array to store the 7 days
const daysOfWeek = [];

// Use a loop to add the next 7 days to the array
for (let i = 0; i < 7; i++) {
  daysOfWeek.push(today.format('dddd'));
  today.add(1, 'day'); // Move to the next day
}

const currentDay = moment().format("ddd");

    const getWeekDates = () => {
        const monthStart = moment().startOf("week");
        const monthsDates = [];

        for (let i = 0; i < 7; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push({
                day: date.format("ddd"),
                date: date.format("DD"),
                month: date.format("MMM"),
                year: date.format("YYYY"),
            });
        }
        setDates(monthsDates, currentDay );
    };

    useEffect(() => {
        getWeekDates();
    }, []);

    const getDate = (usersDate) =>{
        const {date, month, year} = usersDate;
        // console.log(day, date, month, year);
        const a = date + " " + month + " " + year
        // console.log(a)
        const newDate = new Date(a);
        console.log(newDate)
        // const formattedDate = moment.format(date)
        
    }

    const logOutUser = async () => {
        await axiosClient.post("/v2/logout");
        dispatch(logout());
        removeItem(KEY_ACCESS_TOKEN);
        // navigate('/')
        // window.location.href = '/master/signin'
        window.location.replace("/");
    };

    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "calc(100% - 100px)",
                },
                m: "0px auto",
                p: 1,
            }}
        >
            <Stack
                direction="row"
                sx={{
                    display: { xs: "flex", sm: "flex", md: "none" },
                    mb: "24px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: "0",
                    background: "#ffffff",
                    zIndex: 2,
                }}
            >
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <IconButton onClick={() => setMenu(!menu)}>
                        {!menu ? (
                            <AiOutlineMenu
                                style={{
                                    width: "32px",
                                    height: "19px",
                                    color: "#1F51C6",
                                }}
                            />
                        ) : (
                            <RxCross1
                                style={{
                                    width: "32px",
                                    height: "19px",
                                    color: "#1F51C6",
                                }}
                            />
                        )}
                    </IconButton>
                    <img
                        src="/m-logonew.png"
                        alt="logo"
                        style={{ width: "121px", height: "28px" }}
                    />
                </Stack>
                <Avatar
                    src={
                        user?.imgurl ? user.imgurl
                        : "/default.png"
                    }
                    sx={{ width: "32px", height: "32px" }}
                />
            </Stack>

            {menu && (
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#1F51C6",
                        borderRadius: "6px",
                    }}
                >
                    <Button
                        onClick={() =>
                            navigate(
                                `/doctor/dashboard/${hospital_id}/${doctor_id}`
                            ) & setMenu(false)
                        }
                        sx={{
                            color: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(
                                `/doctor/appointments/${hospital_id}/${doctor_id}`
                            ) & setMenu(false)
                        }
                        sx={{
                            color: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                        }}
                    >
                        Appointments
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(`/doctor/courses/${user._id}`) &
                            setMenu(false)
                        }
                        sx={{
                            color: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                        }}
                    >
                        Medical Courses
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(`/doctor/edit-profile/${user._id}`) &
                            setMenu(false)
                        }
                        sx={{
                            color: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                        }}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(`/doctor/edit-profile/${user._id}`) &
                            setMenu(false)
                        }
                        sx={{
                            color: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                        }}
                    >
                        Appointment Settings
                    </Button>
                    <Button
                        onClick={logOutUser}
                        sx={{
                            color: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            )}

            {!menu && (
                <Box
                    sx={{
                        // width: "calc(100% - 100px)",
                        mr: { xs: 0, sm: 0, md: "-55px" },
                        ml: { xs: 0, sm: 0, md: "-60px" },
                        display: "flex",
                        justifyContent: "center",
                        mt: -1,
                        // position: "fixed"
                    }}
                >
                    <Box
                        sx={{
                            width: "240px",
                            background: "#1F51C6",
                            display: { xs: "none", sm: "none", md: "flex" },
                            flexDirection: "column",
                            // alignItems: "center",
                            height: "100vh",
                            position: "sticky",
                            top: "0px",
                            bottom: "-100px",
                        }}
                    >
                        <Stack alignItems={"center"} mt={4}>
                            <Avatar
                                src={
                                    user?.imgurl ? user.imgurl
                                    : "/default.png"
                                }
                                sx={{ width: "71px", height: "71px" }}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    m: 1,
                                    color: "#ffffff",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    fontSize: "22px",
                                }}
                            >
                                Dr. {user.nameOfTheDoctor}
                            </Typography>
                        </Stack>
                        <Stack
                            alignItems={"start"}
                            spacing={2}
                            mt={4}
                            flex={1}
                            width={"100%"}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/doctor/dashboard/${hospital_id}/${doctor_id}`
                                        )
                                    }
                                    variant="text"
                                    sx={{
                                        ml: "30px",
                                        color: "#1F51C6",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        color: "#ffffff",
                                    }}
                                >
                                    <MdDashboard
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            marginRight: "6px",
                                        }}
                                    />
                                    &nbsp;Dashboard
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/doctor/appointments/${hospital_id}/${doctor_id}`
                                        )
                                    }
                                    variant="text"
                                    sx={{
                                        ml: "30px",
                                        color: "#ffffff",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                    }}
                                >
                                    <BsFillCalendarFill
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            marginRight: "6px",
                                        }}
                                    />
                                    &nbsp; Appointments
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(`/doctor/courses/${doctor_id}`)
                                    }
                                    variant="text"
                                    sx={{
                                        ml: "30px",
                                        color: "#ffffff",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                    }}
                                >
                                    <BiSolidBook
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            marginRight: "10px",
                                        }}
                                    />
                                    Medical Courses
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/doctor/edit-profile/${user._id}`
                                        )
                                    }
                                    variant="text"
                                    sx={{
                                        ml: "30px",
                                        color: "#ffffff",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                    }}
                                >
                                    <ImPencil
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            marginRight: "6px",
                                        }}
                                    />
                                    Edit Profile
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    background: "#ffffff",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/doctor/appointment-settings/${user._id}`
                                        )
                                    }
                                    variant="text"
                                    sx={{
                                        ml: "30px",
                                        lineHeight: "21.13px",
                                        color: "##1F51C6",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        textAlign: "start",
                                    }}
                                >
                                    <BsFillCalendarPlusFill
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            marginRight: "6px",
                                        }}
                                    />
                                    Appointment Settings
                                </Button>
                            </Box>
                        </Stack>
                        <Button
                            onClick={logOutUser}
                            sx={{
                                color: "#ffffff",
                                width: "100%",
                                my: 1,
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                textTransform: "none",
                            }}
                        >
                            <MdLogout
                                style={{ width: "25px", height: "25px" }}
                            />
                            Log Out
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            flex: 4,
                            // display: "flex",
                            // justifyContent: "space-between",
                            // alignItems: "center",
                            width: "100%",
                            mx: { xs: 0, sm: 0, md: "100px" },
                            mt: { xs: 0, sm: 0, md: "32px" },
                            // height: "90vh",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                mb: "41px",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontFamily: "Raleway",
                                        fontWeight: "700",
                                        fontSize: {
                                            xs: "1.125rem",
                                            sm: "1.14rem",
                                            md: "2.188rem",
                                        },
                                        color: "#383838",
                                    }}
                                >
                                    Appointment Settings
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "674px",
                                    },
                                }}
                            >
                                <Stack
                                    direction="row"
                                    sx={{
                                        border: "1px solid #D9D9D9",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <Button
                                        variant={
                                            !appointmentByToken
                                                ? "contained"
                                                : "text"
                                        }
                                        onClick={() =>
                                            setAppointmentByToken(false)
                                        }
                                        sx={{
                                            boxShadow: "none",
                                            textTransform: "none",
                                            py: "14px",
                                            px: {
                                                xs: "16px",
                                                sm: "26px",
                                                md: "47px",
                                            },
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: {
                                                xs: "0.813rem",
                                                sm: "0.813rem",
                                                md: "1.25rem",
                                            },
                                            width: "100%",
                                            height: {
                                                xs: "40px",
                                                sm: "40px",
                                                md: "50px",
                                            },
                                            background: !appointmentByToken
                                                ? "#1F51C6"
                                                : "#FFFFFF",
                                            color: !appointmentByToken
                                                ? "#ffffff"
                                                : "#706D6D",
                                            borderRadius: "0",
                                            borderTopLeftRadius: "5px",
                                            borderBottomLeftRadius: "5px",
                                        }}
                                    >
                                        <IoRadioButtonOn
                                            style={{ marginRight: "4px" }}
                                        />
                                        Online Appointments
                                    </Button>
                                    <Button
                                        variant={
                                            appointmentByToken
                                                ? "contained"
                                                : "text"
                                        }
                                        onClick={() =>
                                            setAppointmentByToken(true)
                                        }
                                        sx={{
                                            boxShadow: "none",
                                            textTransform: "none",
                                            py: "14px",
                                            px: {
                                                xs: "16px",
                                                sm: "26px",
                                                md: "57px",
                                            },
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: {
                                                xs: "0.813rem",
                                                sm: "0.813rem",
                                                md: "1.25rem",
                                            },
                                            width: "100%",
                                            height: {
                                                xs: "40px",
                                                sm: "40px",
                                                md: "50px",
                                            },
                                            color: appointmentByToken
                                                ? "#FFFFFF"
                                                : "#706D6D",
                                            background: appointmentByToken
                                                ? "#1F51C6"
                                                : "#FFFFFF",
                                        }}
                                    >
                                        Appointments by token
                                    </Button>
                                </Stack>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end",
                                        my: "15px",
                                    }}
                                >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        sx={{
                                            color: "#ffffff",
                                            background: "#1F51C6",
                                            width: "147px",
                                            height: "40px",
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                        }}
                                        value={view}
                                        onChange={(e) =>
                                            setView(e.target.value)
                                        }
                                    >
                                        <MenuItem
                                            value="Weekly view"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Weekly view
                                        </MenuItem>
                                        <MenuItem
                                            value="Calandar View"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "semibold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Calandar View
                                        </MenuItem>
                                    </Select>
                                    {/* <select
                                        style={{
                                            color: "#ffffff",
                                            background: "#1F51C6",
                                            padding: "10px",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                            marginLeft: "auto"
                                        }}
                                    >
                                        <OptionStyle value="Weekly view">
                                            Weekly view
                                        </OptionStyle>
                                        <OptionStyle value="Calandar View">
                                            Calandar View
                                        </OptionStyle>
                                    </select> */}
                                </Box>

                                <Card
                                    sx={{
                                        px: {
                                            xs: "16px",
                                            sm: "16px",
                                            md: "30px",
                                        },
                                        py: {
                                            xs: "25px",
                                            sm: "25px",
                                            md: "30px",
                                        },
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing="12.61px"
                                        sx={{}}
                                    >
                                        {dates.map((date, i) => (
                                            <Box
                                                key={i + 1}
                                                component="button"
                                                onClick={()=>getDate(date)}
                                                sx={{
                                                    width: {
                                                        xs: "43.18px",
                                                        sm: "43.18px",
                                                        md: "57.39px",
                                                    },
                                                    height: {
                                                        xs: "43.18px",
                                                        sm: "43.18px",
                                                        md: "57.39px",
                                                    },
                                                    background:
                                                    currentDay === date.day ? "#1F51C6" : "#FFFFFF",
                                                    border:
                                                    currentDay === date.day
                                                            ? "none"
                                                            : "1px solid #706D6D8F",
                                                    borderRadius: "3px",
                                                    color:
                                                    currentDay === date.day
                                                            ? "#FFFFFF"
                                                            : "#706D6D",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "semibold",
                                                        fontSize: {
                                                            xs: "0.938rem",
                                                            sm: "0.938rem",
                                                            md: "1.125rem",
                                                        },
                                                        lineHeight: "21.6px",
                                                    }}
                                                >
                                                    {date.day}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "semibold",
                                                        fontSize: {
                                                            xs: "0.938rem",
                                                            sm: "0.938rem",
                                                            md: "1.125rem",
                                                        },
                                                        lineHeight: "21.6px",
                                                    }}
                                                >
                                                    {date.date}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                    <Stack
                                        spacing="20px"
                                        sx={{ mt: "16.61px" }}
                                    >
                                        <Stack
                                            direction={{
                                                xs: "column",
                                                sm: "column",
                                                md: "row",
                                            }}
                                        >
                                            <Stack spacing="10.48px">
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: "0.938rem",
                                                        color: "#383838",
                                                    }}
                                                >
                                                    Choose Slot Duration
                                                </InputLabel>
                                                <Stack
                                                    direction="row"
                                                    spacing="20.02px"
                                                    sx={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: "100%",
                                                                md: "262.93px",
                                                            },
                                                            height: "40px",
                                                            fontFamily: "Lato",
                                                            fontWeight:
                                                                "semibold",
                                                            fontSize: "1rem",
                                                            borderRadius: "5px",
                                                        }}
                                                        placeholder="Choose Slot Duration"
                                                        value={view}
                                                        onChange={(e) =>
                                                            setView(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <MenuItem
                                                            value="Weekly view"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Choose Slot Duration
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="Calandar View"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Calandar View
                                                        </MenuItem>
                                                    </Select>
                                                    <Button
                                                        onClick={() =>
                                                            setHolidayDialog(
                                                                true
                                                            )
                                                        }
                                                        sx={{
                                                            lineHeight:
                                                                "21.13px",
                                                            // color: "#ffffff",
                                                            borderRadius: "0",
                                                            textTransform:
                                                                "none",
                                                            padding: 0,
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            fontSize:
                                                                "1.125rem",
                                                            display: {
                                                                xs: "none",
                                                                sm: "none",
                                                                md: "block",
                                                            },
                                                        }}
                                                    >
                                                        View Holiday List
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            spacing="20.02px"
                                            direction={{
                                                xs: "column",
                                                sm: "column",
                                                md: "row",
                                            }}
                                        >
                                            <Stack spacing="10.48px">
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: "0.938rem",
                                                        color: "#383838",
                                                    }}
                                                >
                                                    Start Time
                                                </InputLabel>
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: "100%",
                                                                md: "262.93px",
                                                            },
                                                            height: "40px",
                                                            fontFamily: "Lato",
                                                            fontWeight:
                                                                "semibold",
                                                            fontSize: "1rem",
                                                            borderRadius: "5px",
                                                        }}
                                                        placeholder="Choose Slot Duration"
                                                        value={view}
                                                        onChange={(e) =>
                                                            setView(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <MenuItem
                                                            value="Weekly view"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Enter Start Time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="Calandar View"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Calandar View
                                                        </MenuItem>
                                                    </Select>
                                                </Stack>
                                            </Stack>
                                            <Stack spacing="10.48px">
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: "0.938rem",
                                                        color: "#383838",
                                                    }}
                                                >
                                                    End Time
                                                </InputLabel>
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: "100%",
                                                                md: "262.93px",
                                                            },
                                                            height: "40px",
                                                            fontFamily: "Lato",
                                                            fontWeight:
                                                                "semibold",
                                                            fontSize: "1rem",
                                                            borderRadius: "5px",
                                                        }}
                                                        placeholder="Choose Slot Duration"
                                                        value={view}
                                                        onChange={(e) =>
                                                            setView(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <MenuItem
                                                            value="Weekly view"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Enter End Time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="Calandar View"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Calandar View
                                                        </MenuItem>
                                                    </Select>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            spacing="20.02px"
                                            direction={{
                                                xs: "column",
                                                sm: "column",
                                                md: "row",
                                            }}
                                        >
                                            <Stack spacing="10.48px">
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: "0.938rem",
                                                        color: "#383838",
                                                    }}
                                                >
                                                    Start Break Time
                                                </InputLabel>
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: "100%",
                                                                md: "262.93px",
                                                            },
                                                            height: "40px",
                                                            fontFamily: "Lato",
                                                            fontWeight:
                                                                "semibold",
                                                            fontSize: "1rem",
                                                            borderRadius: "5px",
                                                        }}
                                                        placeholder="Choose Slot Duration"
                                                        value={view}
                                                        onChange={(e) =>
                                                            setView(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <MenuItem
                                                            value="Weekly view"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Enter Start Time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="Calandar View"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Calandar View
                                                        </MenuItem>
                                                    </Select>
                                                </Stack>
                                            </Stack>
                                            <Stack spacing="10.48px">
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "500",
                                                        fontSize: "0.938rem",
                                                        color: "#383838",
                                                    }}
                                                >
                                                    End Break Time
                                                </InputLabel>
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: "100%",
                                                                md: "262.93px",
                                                            },
                                                            height: "40px",
                                                            fontFamily: "Lato",
                                                            fontWeight:
                                                                "semibold",
                                                            fontSize: "1rem",
                                                            borderRadius: "5px",
                                                        }}
                                                        placeholder="Choose Slot Duration"
                                                        value={view}
                                                        onChange={(e) =>
                                                            setView(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <MenuItem
                                                            value="Weekly view"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Enter Start Time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="Calandar View"
                                                            sx={{
                                                                fontFamily:
                                                                    "Lato",
                                                                fontWeight:
                                                                    "semibold",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            Calandar View
                                                        </MenuItem>
                                                    </Select>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{ alignItems: "center" }}
                                            >
                                                <Radio
                                                    // checked={selectedValue === 'a'}
                                                    // onChange={handleChange}
                                                    value="a"
                                                    id="markAsHoliday"
                                                    name="radio-buttons"
                                                    inputProps={{
                                                        "aria-label": "A",
                                                    }}
                                                />
                                                <InputLabel
                                                    htmlFor="markAsHoliday"
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "semibold",
                                                        fontSize: "0.938rem",
                                                        color: "#706D6D",
                                                    }}
                                                >
                                                    Mark as Holiday
                                                </InputLabel>
                                            </Stack>
                                            <Button
                                                onClick={() =>
                                                    setHolidayDialog(true)
                                                }
                                                sx={{
                                                    lineHeight: "21.13px",
                                                    // color: "#ffffff",
                                                    borderRadius: "0",
                                                    textTransform: "none",
                                                    padding: 0,
                                                    fontFamily: "Lato",
                                                    fontWeight: "500",
                                                    fontSize: "0.75rem",
                                                    display: {
                                                        xs: "block",
                                                        sm: "block",
                                                        md: "none",
                                                    },
                                                }}
                                            >
                                                View Holiday List
                                            </Button>
                                        </Stack>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                boxShadow: "none",
                                                borderRadius: "29px",
                                                textTransform: "none",
                                                fontFamily: "Lato",
                                                fontWeight: "700",
                                                fontSize: "1.063rem",
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Stack>
                                </Card>
                            </Box>
                            <HolidayListDialog
                                holidayDialog={holidayDialog}
                                setHolidayDialog={setHolidayDialog}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AppointmentSettings;
