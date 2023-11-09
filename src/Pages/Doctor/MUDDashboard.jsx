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
import { BiSolidBook } from "react-icons/bi";
import { BsFillCalendarPlusFill } from "react-icons/bs";

// const TextFieldStyle = styled(TextField)({
//     // marginBottom: "20px",

// });

const TextFieldStyle = styled(TextField)({
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
        fontSize: "15px",
        height: "38px",
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
    margin: "5px",
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

const MUDDashboard = () => {
    const { hospital_id, doctor_id } = useParams();
    const dispatch = useDispatch();
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [activeTab, setActiveTab] = useState(1);
    const [completedAppointments, setCompletedAppointments] = useState(false);
    const [menu, setMenu] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const numberOfHospitals = user;

    const getPendingAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getPendingAppointmentsForHospitalAndDoctors/${hospital_id}/${doctor_id}`
        );
        setPendingAppointmentsData(response.result);
    };
    const getCompleteAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getCompleteAppointmentsForHospitalAndDoctors/${hospital_id}/${doctor_id}`
        );
        setCompleteAppointmentsData(response.result);
    };

    useEffect(() => {
        getPendingAppointmentsData();
        getCompleteAppointmentsData();
    }, []);

    const handleTabClick = (tabId) => {
        // Set the active button when it's clicked
        setActiveTab(tabId);
        
    };

    // const {hospital_id} = useParams();
    const navigate = useNavigate();

    const [err, setError] = useState(false);
    // const propLocation = hospitalLocation

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: numberOfHospitals[0]?.nameOfTheDoctor,
        qulification: numberOfHospitals[0]?.qulification,
        speciality: numberOfHospitals[0]?.speciality,
        yearOfExprience: numberOfHospitals[0]?.yearOfExprience,
        enterEmailId: numberOfHospitals[0]?.enterEmailId,
        enterPhoneNo: numberOfHospitals[0]?.enterPhoneNo,
        connsultationFee: numberOfHospitals[0]?.connsultationFee,
        consultingTime: numberOfHospitals[0]?.consultingTime,
        location: numberOfHospitals[0]?.location,
        hospitalId: hospital_id,
    });

    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const getUserImage = (e) => {
        // console.log(e.target.files[0]);
        setInputImage(e.target.files[0]);
    };


    const sizing = {
        margin: { right: 5 },
        width: 308,
        height: 237,
        legend: { hidden: true },
    };

    const logOutUser = async () => {
        await axiosClient.post("/v2/logout");
        removeItem(KEY_ACCESS_TOKEN);
        dispatch(logout());
        // navigate('/')
        // window.location.href = '/master/signin'
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
                                style={{ width: "32px", height: "19px", color:'#1F51C6' }}
                            />
                        ) : (
                            <RxCross1
                                style={{ width: "32px", height: "19px", color:'#1F51C6' }}
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
           
               { menu && <Box
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
                            onClick={() => navigate(`/doctor/dashboard/${hospital_id}/${doctor_id}`) & setMenu(false)}
                        sx={{
                            background: "#ffffff",
                            fontFamily: "Lato",
                            fontSize: "1.5rem",
                            textTransform: "none",
                            lineHeight: "28.8px",
                            ':hover':{
                                background: "#ffffff",
                                }
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                            onClick={() => navigate(`/doctor/appointments/${hospital_id}/${doctor_id}`) & setMenu(false)}
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
                            onClick={() => navigate(`/doctor/courses/${user._id}`) & setMenu(false)}
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
                            onClick={() => navigate(`/doctor/edit-profile/${user._id}`) & setMenu(false)}
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
                            navigate(
                                `/doctor/appointment-settings/${user._id}`
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
                </Box>}
           
            {!menu && <Box
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
                            <Typography
                                variant="h5"
                                sx={{
                                    mx: 1,
                                    color: "#ffffff",
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                }}
                            >
                            DUID :- {user.doctorid}
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
                                    background: "#ffffff",
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
                                        color: "#1F51C6",
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
                                        color: "#ffffff",
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
                        mt: "32px",
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
                                {(activeTab === 1 && "Dashboard") ||
                                    (activeTab === 2 && "Appointment") ||
                                    (activeTab === 3 && "Edit Profile")}
                            </Typography>
                        </Box>
                        {activeTab === 3 ? null : (
                            <TextFieldStyle
                                placeholder="Search here"
                                sx={{
                                    width: "377px",
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "flex",
                                    },
                                }}
                                InputLabelProps={{ color: "red" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <img src="/search.svg" alt="img" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </Box>
                        <Stack
                            direction={{
                                xs: "column",
                                sm: "column",
                                md: "row",
                            }}
                            spacing="10px"
                        >
                            <Stack
                                spacing={{ xs: "10px", sm: "10px", md: "20px" }}
                                // mr="5px"
                            >
                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "column",
                                        md: "row",
                                    }}
                                    spacing={{
                                        xs: "10px",
                                        sm: "10px",
                                        md: "20px",
                                    }}
                                    sx={{ position: "relative" }}
                                >
                                    <Card
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "242.19px",
                                            },
                                            height: {
                                                xs: "96px",
                                                sm: "96px",
                                                md: "149px",
                                            },
                                            background: "#DCE3F6",
                                            p: "15px",
                                            display: "flex",
                                            flexDirection: {
                                                xs: "row",
                                                sm: "row",
                                                md: "column",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "center",
                                                md: "start",
                                            },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing="5px"
                                            alignItems="center"
                                        >
                                            <img
                                                src="/total-paitent-icon.svg"
                                                alt="icon"
                                                style={{
                                                    background: "#1F51C6",
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "6px",
                                                    padding: "5px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                Total <br />
                                                Patients
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            spacing="5px"
                                            sx={{
                                                marginTop: {
                                                    xs: 0,
                                                    sm: 0,
                                                    md: "auto",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                {pendingAppointmentsData.length}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={20}
                                                sx={{
                                                    color: "#1F51C6",
                                                    background: "#ffffff",
                                                    width: {
                                                        xs: "164px",
                                                        sm: "185px",
                                                        md: "200px",
                                                    },
                                                    height: "10px",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                    <Card
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "242.19px",
                                            },
                                            height: {
                                                xs: "96px",
                                                sm: "96px",
                                                md: "149px",
                                            },
                                            background: "#DCE3F6",
                                            p: "15px",
                                            display: "flex",
                                            flexDirection: {
                                                xs: "row",
                                                sm: "row",
                                                md: "column",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "center",
                                                md: "start",
                                            },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing="5px"
                                            alignItems="center"
                                        >
                                            <img
                                                src="/appointment-icon.svg"
                                                alt="icon"
                                                style={{
                                                    background: "#1F51C6",
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "6px",
                                                    padding: "10px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                Today's <br />
                                                Appointments
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            spacing="5px"
                                            sx={{
                                                marginTop: {
                                                    xs: 0,
                                                    sm: 0,
                                                    md: "auto",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                {pendingAppointmentsData.length}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={20}
                                                sx={{
                                                    color: "#1F51C6",
                                                    background: "#ffffff",
                                                    width: {
                                                        xs: "164px",
                                                        sm: "185px",
                                                        md: "200px",
                                                    },
                                                    height: "10px",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                    <Card
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "242.19px",
                                            },
                                            height: {
                                                xs: "96px",
                                                sm: "96px",
                                                md: "149px",
                                            },
                                            background: "#DCE3F6",
                                            p: "15px",
                                            display: "flex",
                                            flexDirection: {
                                                xs: "row",
                                                sm: "row",
                                                md: "column",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "center",
                                                md: "start",
                                            },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing="5px"
                                            alignItems="center"
                                        >
                                            <img
                                                src="/nextAppointment.svg"
                                                alt="icon"
                                                style={{
                                                    background: "#1F51C6",
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "6px",
                                                    padding: "10px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                Next <br />
                                                Appointment
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            spacing="5px"
                                            sx={{
                                                marginTop: {
                                                    xs: 0,
                                                    sm: 0,
                                                    md: "auto",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                {pendingAppointmentsData.length}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={20}
                                                sx={{
                                                    color: "#1F51C6",
                                                    background: "#ffffff",
                                                    width: {
                                                        xs: "164px",
                                                        sm: "185px",
                                                        md: "200px",
                                                    },
                                                    height: "10px",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                </Stack>

                                <Card
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "764px",
                                        },
                                        minHeight: "55vh",
                                        background: "#DCE3F6",
                                        p: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        boxShadow: "none",
                                        // overflow:'auto'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            lineHeight: "21.13px",
                                            color: "#383838",
                                            mb: "15px",
                                        }}
                                    >
                                        Upcoming Appointments
                                    </Typography>
                                    <Box
                                        sx={{
                                            overflow: "auto",
                                            height: "50vh",
                                        }}
                                    >
                                        {pendingAppointmentsData.length > 0 ? (
                                            pendingAppointmentsData.map(
                                                (appointment, i) => (
                                                    <Paper
                                                        key={i}
                                                        sx={{
                                                            p: "5px",
                                                            mb: "10px",
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing="10px"
                                                            sx={{
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Fab
                                                                sx={{
                                                                    borderRadius:
                                                                        "5px",
                                                                    width: "32px",
                                                                    height: "29px",
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize:
                                                                        "22px",
                                                                    fontWeight:
                                                                        "600",
                                                                    background:
                                                                        "#1F51C6",
                                                                    color: "#ffffff",
                                                                    zIndex: 1,
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </Fab>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize:
                                                                        "18px",
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#383838",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.patientName
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize:
                                                                        "18px",
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#706D6D",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.appointmentTime
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="row">
                                                            <CancelIcon
                                                                fontSize="large"
                                                                sx={{
                                                                    color: "#B92612",
                                                                }}
                                                            />
                                                            <CheckCircleIcon
                                                                fontSize="large"
                                                                sx={{
                                                                    color: "#15B912",
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Paper>
                                                )
                                            )
                                        ) : (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    lineHeight: "21.13px",
                                                    color: "#383838",
                                                    textAlign: "center",
                                                }}
                                            >
                                                No Appointment Yet
                                            </Typography>
                                        )}
                                    </Box>
                                </Card>
                            </Stack>
                            <Stack
                                spacing="20px"
                                sx={{
                                    alignItems: {
                                        xs: "center",
                                        sm: "center",
                                        md: "start",
                                    },
                                }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateCalendar
                                        sx={{
                                            background: "#DCE3F6",
                                            borderRadius: "8px",
                                            width: "306px",
                                            height: "310px",
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            // position: "fixed",
                                        }}
                                    />
                                </LocalizationProvider>
                                <Card
                                    sx={{
                                        width: "308px",
                                        height: "237px",
                                        background: "#DCE3F6",
                                        p: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        boxShadow: "none",
                                        // position: "fixed",
                                        // bottom: "30px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            lineHeight: "21.13px",
                                            color: "#383838",
                                            mb: "15px",
                                        }}
                                    >
                                        Appointment Status
                                    </Typography>
                                    <PieChart
                                        sx={
                                            {
                                                // margin: "0 auto",
                                            }
                                        }
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        id: 0,
                                                        value: 75,
                                                        // label: "75% Completed",
                                                        color: "#1F51C6",
                                                    },
                                                    {
                                                        id: 1,
                                                        value: 20,
                                                        // label: "20% Confirmed",
                                                        color: "#A1E18A",
                                                    },
                                                    {
                                                        id: 2,
                                                        value: 5,
                                                        // label: "5% Cancelled",
                                                        color: "#F45843",
                                                    },
                                                ],
                                            },
                                        ]}
                                        // width={200}
                                        // height={200}
                                        {...sizing}
                                    />
                                </Card>
                            </Stack>
                        </Stack>
                    
                    {/* {activeTab === 1 && (
                        <Stack
                            direction={{
                                xs: "column",
                                sm: "column",
                                md: "row",
                            }}
                            spacing="20px"
                        >
                            <Stack
                                spacing={{ xs: "10px", sm: "10px", md: "20px" }}
                            >
                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "column",
                                        md: "row",
                                    }}
                                    spacing={{
                                        xs: "10px",
                                        sm: "10px",
                                        md: "20px",
                                    }}
                                    sx={{ position: "relative" }}
                                >
                                    <Card
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "242.19px",
                                            },
                                            height: {
                                                xs: "96px",
                                                sm: "96px",
                                                md: "149px",
                                            },
                                            background: "#DCE3F6",
                                            p: "15px",
                                            display: "flex",
                                            flexDirection: {
                                                xs: "row",
                                                sm: "row",
                                                md: "column",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "center",
                                                md: "start",
                                            },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing="5px"
                                            alignItems="center"
                                        >
                                            <img
                                                src="/total-paitent-icon.svg"
                                                alt="icon"
                                                style={{
                                                    background: "#1F51C6",
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "6px",
                                                    padding: "5px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                Total <br />
                                                Patients
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            spacing="5px"
                                            sx={{
                                                marginTop: {
                                                    xs: 0,
                                                    sm: 0,
                                                    md: "auto",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                {pendingAppointmentsData.length}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={20}
                                                sx={{
                                                    color: "#1F51C6",
                                                    background: "#ffffff",
                                                    width: {
                                                        xs: "164px",
                                                        sm: "185px",
                                                        md: "200px",
                                                    },
                                                    height: "10px",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                    <Card
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "242.19px",
                                            },
                                            height: {
                                                xs: "96px",
                                                sm: "96px",
                                                md: "149px",
                                            },
                                            background: "#DCE3F6",
                                            p: "15px",
                                            display: "flex",
                                            flexDirection: {
                                                xs: "row",
                                                sm: "row",
                                                md: "column",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "center",
                                                md: "start",
                                            },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing="5px"
                                            alignItems="center"
                                        >
                                            <img
                                                src="/appointment-icon.svg"
                                                alt="icon"
                                                style={{
                                                    background: "#1F51C6",
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "6px",
                                                    padding: "10px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                Today's <br />
                                                Appointments
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            spacing="5px"
                                            sx={{
                                                marginTop: {
                                                    xs: 0,
                                                    sm: 0,
                                                    md: "auto",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                {pendingAppointmentsData.length}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={20}
                                                sx={{
                                                    color: "#1F51C6",
                                                    background: "#ffffff",
                                                    width: {
                                                        xs: "164px",
                                                        sm: "185px",
                                                        md: "200px",
                                                    },
                                                    height: "10px",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                    <Card
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "242.19px",
                                            },
                                            height: {
                                                xs: "96px",
                                                sm: "96px",
                                                md: "149px",
                                            },
                                            background: "#DCE3F6",
                                            p: "15px",
                                            display: "flex",
                                            flexDirection: {
                                                xs: "row",
                                                sm: "row",
                                                md: "column",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "center",
                                                md: "start",
                                            },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "space-between",
                                                md: "start",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing="5px"
                                            alignItems="center"
                                        >
                                            <img
                                                src="/nextAppointment.svg"
                                                alt="icon"
                                                style={{
                                                    background: "#1F51C6",
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "6px",
                                                    padding: "10px",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                Next <br />
                                                Appointment
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            spacing="5px"
                                            sx={{
                                                marginTop: {
                                                    xs: 0,
                                                    sm: 0,
                                                    md: "auto",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: {
                                                        xs: "0.813rem",
                                                        sm: "0.9rem",
                                                        md: "1.125rem",
                                                    },
                                                    fontWeight: "600",
                                                    lineHeight: {
                                                        xs: "13px",
                                                        sm: "13px",
                                                        md: "21.13px",
                                                    },
                                                    color: "#383838",
                                                }}
                                            >
                                                {pendingAppointmentsData.length}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={20}
                                                sx={{
                                                    color: "#1F51C6",
                                                    background: "#ffffff",
                                                    width: {
                                                        xs: "164px",
                                                        sm: "185px",
                                                        md: "200px",
                                                    },
                                                    height: "10px",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                </Stack>

                                <Card
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "764px",
                                        },
                                        minHeight: "55vh",
                                        background: "#DCE3F6",
                                        p: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        boxShadow: "none",
                                        // overflow:'auto'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            lineHeight: "21.13px",
                                            color: "#383838",
                                            mb: "15px",
                                        }}
                                    >
                                        Upcoming Appointments
                                    </Typography>
                                    <Box
                                        sx={{
                                            overflow: "auto",
                                            height: "50vh",
                                        }}
                                    >
                                        {pendingAppointmentsData.length > 0 ? (
                                            pendingAppointmentsData.map(
                                                (appointment, i) => (
                                                    <Paper
                                                        key={i}
                                                        sx={{
                                                            p: "5px",
                                                            mb: "10px",
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing="10px"
                                                            sx={{
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Fab
                                                                sx={{
                                                                    borderRadius:
                                                                        "5px",
                                                                    width: "32px",
                                                                    height: "29px",
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize:
                                                                        "22px",
                                                                    fontWeight:
                                                                        "600",
                                                                    background:
                                                                        "#1F51C6",
                                                                    color: "#ffffff",
                                                                    zIndex: 1,
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </Fab>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize:
                                                                        "18px",
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#383838",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.patientName
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize:
                                                                        "18px",
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#706D6D",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.appointmentTime
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="row">
                                                            <CancelIcon
                                                                fontSize="large"
                                                                sx={{
                                                                    color: "#B92612",
                                                                }}
                                                            />
                                                            <CheckCircleIcon
                                                                fontSize="large"
                                                                sx={{
                                                                    color: "#15B912",
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Paper>
                                                )
                                            )
                                        ) : (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    lineHeight: "21.13px",
                                                    color: "#383838",
                                                    textAlign: "center",
                                                }}
                                            >
                                                No Appointment Yet
                                            </Typography>
                                        )}
                                    </Box>
                                </Card>
                            </Stack>
                            <Stack
                                spacing="20px"
                                sx={{
                                    alignItems: {
                                        xs: "center",
                                        sm: "center",
                                        md: "start",
                                    },
                                }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateCalendar
                                        sx={{
                                            background: "#DCE3F6",
                                            borderRadius: "8px",
                                            width: "306px",
                                            height: "310px",
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            // position: "fixed",
                                        }}
                                    />
                                </LocalizationProvider>
                                <Card
                                    sx={{
                                        width: "308px",
                                        height: "237px",
                                        background: "#DCE3F6",
                                        p: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        boxShadow: "none",
                                        // position: "fixed",
                                        // bottom: "30px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            lineHeight: "21.13px",
                                            color: "#383838",
                                            mb: "15px",
                                        }}
                                    >
                                        Appointment Status
                                    </Typography>
                                    <PieChart
                                        sx={
                                            {
                                                // margin: "0 auto",
                                            }
                                        }
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        id: 0,
                                                        value: 75,
                                                        // label: "75% Completed",
                                                        color: "#1F51C6",
                                                    },
                                                    {
                                                        id: 1,
                                                        value: 20,
                                                        // label: "20% Confirmed",
                                                        color: "#A1E18A",
                                                    },
                                                    {
                                                        id: 2,
                                                        value: 5,
                                                        // label: "5% Cancelled",
                                                        color: "#F45843",
                                                    },
                                                ],
                                            },
                                        ]}
                                        // width={200}
                                        // height={200}
                                        {...sizing}
                                    />
                                </Card>
                            </Stack>
                        </Stack>
                    )} */}
                    {/* {activeTab === 2 && (
                        <>
                            <Box sx={{ display: "flex", mt: 4 }}>
                                <Stack direction={"row"} gap={1}>
                                    <Button
                                        onClick={() =>
                                            setCompletedAppointments(false)
                                        }
                                        variant={
                                            !completedAppointments
                                                ? "contained"
                                                : "outlined"
                                        }
                                        sx={{
                                            textTransform: "none",
                                            width: "244px",
                                            height: "41px",
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            borderRadius: "35px",
                                            color: !completedAppointments
                                                ? "#ffffff"
                                                : "#383838",
                                        }}
                                    >
                                        Upcoming Appointments
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setCompletedAppointments(true)
                                        }
                                        variant={
                                            completedAppointments
                                                ? "contained"
                                                : "outlined"
                                        }
                                        sx={{
                                            textTransform: "none",
                                            width: "244px",
                                            height: "41px",
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            borderRadius: "35px",
                                            color: completedAppointments
                                                ? "#ffffff"
                                                : "#383838",
                                        }}
                                    >
                                        Completed Appointments
                                    </Button>
                                </Stack>
                            </Box>
                            {completedAppointments ? (
                                <CompleteAppointmentsTable
                                    completeAppointmentsData={
                                        completeAppointmentsData
                                    }
                                    getCompleteAppointmentsData={
                                        getCompleteAppointmentsData
                                    }
                                />
                            ) : (
                                <PendingAppointmentsTable
                                    pendingAppointmentsData={
                                        pendingAppointmentsData
                                    }
                                    getPendingAppointmentsData={
                                        getPendingAppointmentsData
                                    }
                                />
                            )}
                        </>
                    )} */}

                    {/* {activeTab === 3 && (
                        <Card sx={{ p: "25px" }}>
                            <form onSubmit={handleSubmit}>
                                <Stack direction={"row"} gap={3}>
                                    <img
                                        src={preview ? preview : "/default.png"}
                                        alt="user"
                                        width={60}
                                        height={60}
                                        style={{ borderRadius: "50%" }}
                                    />

                                    <Box>
                                        <Typography
                                            my={1}
                                            color={
                                                err && !inputImage
                                                    ? "red"
                                                    : "#706D6D"
                                            }
                                            width="200px"
                                            lineHeight="20px"
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: "15px",
                                            }}
                                        >
                                            {err && inputImage
                                                ? "Please Pick a photo from your computer"
                                                : "Pick a photo from your computer"}
                                        </Typography>

                                        <FormLabel
                                            htmlFor="hospitalImg"
                                            sx={{
                                                fontWeight: "600",
                                                color: "#1F51C6",
                                            }}
                                        >
                                            Change Profile photo
                                        </FormLabel>
                                        <input
                                            type="file"
                                            id="hospitalImg"
                                            name="photo"
                                            style={{ display: "none" }}
                                            onChange={getUserImage}
                                        />
                                    </Box>
                                </Stack>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",

                                        mt: 2,
                                    }}
                                >
                                    <StackStyle>
                                        <LabelStyle htmlFor="DoctorName">
                                            Name of the Doctor
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="DoctorName"
                                            name="nameOfTheDoctor"
                                            fullWidth
                                            placeholder="Ex. Dr. John Doe"
                                            error={
                                                err &&
                                                !inputValue.nameOfTheDoctor &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.nameOfTheDoctor &&
                                                "Please enter Doctor's name"
                                            }
                                            value={inputValue.nameOfTheDoctor}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="qualification">
                                            Qualification
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="qualification"
                                            name="qulification"
                                            fullWidth
                                            placeholder="Ex. MBBS. MD"
                                            error={
                                                err &&
                                                !inputValue.qulification &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.qulification &&
                                                "Please enter your qualification"
                                            }
                                            value={inputValue.qulification}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="speciality">
                                            Speciality
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="speciality"
                                            name="speciality"
                                            fullWidth
                                            placeholder="Ex. ENT"
                                            error={
                                                err &&
                                                !inputValue.speciality &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.speciality &&
                                                "Please enter specialty"
                                            }
                                            value={inputValue.speciality}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="experience">
                                            Years Of Experience
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="experience"
                                            name="yearOfExprience"
                                            fullWidth
                                            placeholder="Ex. 5 Years"
                                            error={
                                                err &&
                                                !inputValue.yearOfExprience &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.yearOfExprience &&
                                                "Please enter your experience"
                                            }
                                            value={inputValue.yearOfExprience}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="mailId">
                                            Enter Email Id
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="mailId"
                                            name="enterEmailId"
                                            fullWidth
                                            placeholder="doctor@gmail.com"
                                            error={
                                                err &&
                                                !inputValue.enterEmailId &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.enterEmailId &&
                                                "Please enter your email"
                                            }
                                            value={inputValue.enterEmailId}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="phoneNo">
                                            Enter Phone No
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="phoneNo"
                                            name="enterPhoneNo"
                                            fullWidth
                                            placeholder="Ex 99112240477"
                                            error={
                                                err &&
                                                !inputValue.enterPhoneNo &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.enterPhoneNo &&
                                                "Please enter your phone number"
                                            }
                                            value={inputValue.enterPhoneNo}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="password">
                                            Password(can be edited later)
                                        </LabelStyle>
                                        <Stack direction={"row"}>
                                            <TextFieldStyle
                                                id="password"
                                                name="password"
                                                fullWidth
                                                value="Medidek@123"
                                                sx={{ color: "green" }}
                                                placeholder="Auto generated Password"
                                            />
                                        </Stack>
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="connsultationFee">
                                            Connsultation Fee
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="connsultationFee"
                                            name="connsultationFee"
                                            fullWidth
                                            placeholder="Ex ₹500"
                                            error={
                                                err &&
                                                !inputValue.connsultationFee &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.connsultationFee &&
                                                "Please enter your fees"
                                            }
                                            value={inputValue.connsultationFee}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="consultingTime">
                                            Consulting Time
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="consultingTime"
                                            name="consultingTime"
                                            fullWidth
                                            placeholder="Ex 2PM to 5PM"
                                            error={
                                                err &&
                                                !inputValue.consultingTime &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.consultingTime &&
                                                "Please enter OPD Hrs"
                                            }
                                            value={inputValue.consultingTime}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                    <StackStyle>
                                        <LabelStyle htmlFor="location">
                                            Full Address
                                        </LabelStyle>
                                        <TextFieldStyle
                                            id="location"
                                            name="location"
                                            fullWidth
                                            placeholder="Enter Full Address"
                                            error={
                                                err &&
                                                !inputValue.enterFullAdress &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.enterFullAdress &&
                                                "Please enter Doctor's Full Address"
                                            }
                                            value={inputValue.location}
                                            onChange={handleChange}
                                        />
                                    </StackStyle>
                                </Box>
                                <LoadingButton
                                    size="small"
                                    fullWidth
                                    type="submit"
                                    loading={disableButton}
                                    // loadingPosition="end"
                                    variant="contained"
                                    sx={{
                                        margin: "10px auto",
                                        textTransform: "none",
                                        display: "block",
                                        width: "200px",
                                    }}
                                >
                                    <span>Add Doctor</span>
                                </LoadingButton>
                            </form>
                        </Card>
                    )} */}
                </Box>
            </Box>}
        </Box>
    );
};

export default MUDDashboard;
