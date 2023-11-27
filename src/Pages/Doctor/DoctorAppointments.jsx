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
    MenuItem,
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
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MissedAppointmentsTable from "../../Components/Master/MissedAppointmentsTable";
import PendingAppointmentsTableForLoggedInDoctor from "../../Components/Doctor/PendingAppointmentsTableForLoggedInDoctor";
import CompletedAppointmentsTableForLoggedInDoctor from "../../Components/Doctor/CompletedAppointmentsTableForLoggedInDoctor";
import MissedAppointmentsTableForLoggedInDoctor from "../../Components/Doctor/MissedAppointmentsTableForLoggedInDoctor";
import { BiSolidBook } from "react-icons/bi";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import moment from "moment";
import { logOutDoctor } from "../../Store/doctorDataSlice";

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

const DatePickerStyle = styled(MobileDatePicker)({
    [`& input`]: {
        color: "#383838",
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "14px",
        textAlign: "center",
    },
    [`& div`]: {
        height: "41px",
    },
    [`& fieldset`]: {
        borderRadius: "31px",
    },
});

const DatePickerStyleForMobile = styled(MobileDatePicker)({
    color: "red",
    [`& input`]: {
        color: "#ffffff",
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "14px",
        textAlign: "center",
    },
    [`& div`]: {
        height: "32px",
    },
    [`& fieldset`]: {
        borderRadius: "31px",
    },
});

const DoctorAppointments = () => {
    const { doctorid } = useParams();
    const dispatch = useDispatch();
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [missedAppointmentsData, setMissedAppointmentsData] = useState([]);
    const [activeTab, setActiveTab] = useState(2);
    const [selectValue, setSelectValue] = useState(1);
    const [completedAppointments, setCompletedAppointments] = useState(false);
    const [menu, setMenu] = useState(false);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctor);
    const numberOfHospitals = user;
    const [slotAppointment, setSlotAppointment] = useState("slotAppointments");

    // const date = moment().format("YYYY-MM-DD");

    const getPendingAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getPendingAppoinmentForDoctor/${doctorid}/${date}`
        );
        setPendingAppointmentsData(response.result);
    };
    const getCompleteAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getCompletedAppoinmentForDoctor/${doctorid}/${date}`
        );
        setCompleteAppointmentsData(response.result);
    };
    const getMissedAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getMissedAppoinmentForDoctor/${doctorid}/${date}`
        );
        setMissedAppointmentsData(response.result);
        console.log(response);
    };

    useEffect(() => {
        getPendingAppointmentsData();
        getCompleteAppointmentsData();
        getMissedAppointmentsData();
    }, [date]);

    const handleTabClick = (tabId) => {
        // Set the active button when it's clicked
        setActiveTab(tabId);
    };

    // const {hospital_id} = useParams();
    const navigate = useNavigate();

    const [err, setError] = useState(false);
    // const propLocation = hospitalLocation

    const [inputValue, setInputValue] = useState({
        // nameOfTheDoctor: numberOfHospitals[0]?.nameOfTheDoctor,
        // qulification: numberOfHospitals[0]?.qulification,
        // speciality: numberOfHospitals[0]?.speciality,
        // yearOfExprience: numberOfHospitals[0]?.yearOfExprience,
        // enterEmailId: numberOfHospitals[0]?.enterEmailId,
        // enterPhoneNo: numberOfHospitals[0]?.enterPhoneNo,
        // connsultationFee: numberOfHospitals[0]?.connsultationFee,
        // consultingTime: numberOfHospitals[0]?.consultingTime,
        // location: numberOfHospitals[0]?.location,
        // hospitalId: hospital_id,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !inputValue.nameOfTheDoctor ||
            !inputValue.qulification ||
            !inputValue.speciality ||
            !inputValue.yearOfExprience ||
            !inputValue.enterEmailId ||
            // !inputImage ||
            !inputValue.enterPhoneNo ||
            !inputValue.connsultationFee ||
            !inputValue.consultingTime ||
            !inputValue.hospitalId
        ) {
            setError(true);
            return false;
        }

        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("speciality", inputValue.speciality);
        data.append("yearOfExprience", inputValue.yearOfExprience);
        data.append("enterEmailId", inputValue.enterEmailId);
        data.append("enterPhoneNo", inputValue.enterPhoneNo);
        data.append("connsultationFee", inputValue.connsultationFee);
        data.append("consultingTime", inputValue.consultingTime);
        data.append("hospitalId", inputValue.hospitalId);
        data.append("location", hospitalLocation);
        data.append("doctorImg", inputImage);

        // console.log(data);
        try {
            const response = await axiosClient.post("/v2/addDoctor", data);
            console.log(response);
            if (response.status === "ok") {
                // navigate(`/master/user/home/${uuid.id}`);
                setAddDoctorsDialog(false);
                getDoctorsData();
                toast.success("Doctor added successfully");
                return;
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    const sizing = {
        margin: { right: 5 },
        width: 308,
        height: 237,
        legend: { hidden: true },
    };

    const logOutUser = async () => {
        dispatch(logOutDoctor());
        dispatch(logout());
        await axiosClient.post("/v2/logout");
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
                    // background: "#ffffff",
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
                                    color: "#ffffff",
                                }}
                            />
                        )}
                    </IconButton>
                    {/* {!menu && (
                        <img
                            src="/m-logonew.png"
                            alt="logo"
                            style={{ width: "121px", height: "28px" }}
                        />
                    )} */}
                </Stack>
                {!menu && (
                    <Avatar
                        src={doctor?.imgurl ? doctor.imgurl : "/default.png"}
                        sx={{ width: "32px", height: "32px" }}
                    />
                )}
            </Stack>

            {/* {menu && ( */}
            <Box
                sx={{
                    // position: "absolute",
                    // top: "-10px",
                    transform: !menu
                        ? "translateX(-250px)"
                        : "translateX(-10px)",
                    transition: "transform 0.3s ease-in",
                    zIndex: 1,
                    position: {
                        xs: "fixed",
                        sm: "fixed",
                        md: "sticky",
                    },
                    top: "0px",
                }}
                // sx={{

                // }}
            >
                <Box
                    sx={{
                        width: "240px",
                        background: "#1F51C6",
                        display: { xs: "flex", sm: "flex", md: "none" },
                        flexDirection: "column",
                        // alignItems: "center",
                        height: "100vh",
                        // position: {
                        //     xs: "fixed",
                        //     sm: "static",
                        //     md: "sticky",
                        // },
                        // top: "0px",
                        // left: "0px",
                        zIndex: 1,
                        // bottom: "-100px",
                    }}
                >
                    <Stack alignItems={"center"} mt={4}>
                        <Avatar
                            src={
                                doctor?.imgurl ? doctor.imgurl : "/default.png"
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
                            Dr. {doctor.nameOfTheDoctor}
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
                            DUID :- {doctor.doctorid}
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
                                    navigate(`/doctor/dashboard/${doctorid}`)
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
                                background: "#ffffff",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    navigate(`/doctor/appointments/${doctorid}`)
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
                        {/* <Box
                       sx={{
                           width: "100%",
                       }}
                   >
                       <Button
                           onClick={() =>
                               navigate(`/doctor/courses/${user?._id}`)
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
                   </Box> */}
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    navigate(`/doctor/edit-profile/${user._id}`)
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
                                        `/doctor/appointment-settings/${doctorid}`
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
                        <MdLogout style={{ width: "25px", height: "25px" }} />
                        Log Out
                    </Button>
                </Box>
            </Box>
            {/* )} */}

            {/* {!menu && ( */}
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
                                doctor?.imgurl ? doctor.imgurl : "/default.png"
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
                            Dr. {doctor.nameOfTheDoctor}
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
                            DUID :- {doctor.doctorid}
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
                                    navigate(`/doctor/dashboard/${doctorid}`)
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
                                background: "#ffffff",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    navigate(`/doctor/appointments/${doctorid}`)
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
                        {/* <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(`/doctor/courses/${user?._id}`)
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
                            </Box> */}
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    navigate(`/doctor/edit-profile/${user._id}`)
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
                                        `/doctor/appointment-settings/${doctorid}`
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
                        <MdLogout style={{ width: "25px", height: "25px" }} />
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
                        mx: { xs: "1px", sm: "1px", md: "100px" },
                        mt: { xs: "0px", sm: "0px", md: "32px" },
                        // height: "90vh",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "41px",
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "flex",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "flex",
                                },
                            }}
                        >
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
                                Appointment
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
                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Stack
                                direction={"row"}
                                spacing={1}
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "flex",
                                    },
                                }}
                            >
                                <Select
                                    sx={{
                                        color: "#383838",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        background: "#1F51C6",
                                        // p:'5px 10px',
                                        borderRadius: "21px",
                                        height: "41px",
                                        color: "#FFFFFF",
                                    }}
                                    variant="outlined"
                                    value={slotAppointment}
                                    onChange={(e) =>
                                        setSlotAppointment(e.target.value)
                                    }
                                >
                                    <MenuItem
                                        onClick={() => setSelectValue(1)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#383838",
                                        }}
                                        value="tokenAppointments"
                                    >
                                        Token Appointments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setSelectValue(2)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#383838",
                                        }}
                                        value="slotAppointments"
                                    >
                                        Slot Appointments
                                    </MenuItem>
                                </Select>
                                <hr />
                                <Button
                                    onClick={() => setSelectValue(1)}
                                    variant={
                                        selectValue === 1
                                            ? "contained"
                                            : "outlined"
                                    }
                                    sx={{
                                        textTransform: "none",
                                        width: "119px",
                                        height: "41px",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        borderRadius: "35px",
                                        color:
                                            selectValue === 1
                                                ? "#ffffff"
                                                : "#383838",
                                        boxShadow: "none",
                                    }}
                                >
                                    Upcoming
                                </Button>
                                <Button
                                    onClick={() => setSelectValue(2)}
                                    variant={
                                        selectValue === 2
                                            ? "contained"
                                            : "outlined"
                                    }
                                    sx={{
                                        textTransform: "none",
                                        width: "119px",
                                        height: "41px",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        borderRadius: "35px",
                                        color:
                                            selectValue === 2
                                                ? "#ffffff"
                                                : "#383838",
                                        boxShadow: "none",
                                    }}
                                >
                                    Completed
                                </Button>
                                <Button
                                    onClick={() => setSelectValue(3)}
                                    variant={
                                        selectValue === 3
                                            ? "contained"
                                            : "outlined"
                                    }
                                    sx={{
                                        textTransform: "none",
                                        width: "119px",
                                        height: "41px",
                                        fontFamily: "Raleway",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        borderRadius: "35px",
                                        color:
                                            selectValue === 3
                                                ? "#ffffff"
                                                : "#383838",
                                        boxShadow: "none",
                                    }}
                                >
                                    Missed
                                </Button>
                            </Stack>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: {
                                        xs: "flex",
                                        sm: "flex",
                                        md: "none",
                                    },
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: "16px",
                                    mt: "16px",
                                }}
                            >
                                <Select
                                    sx={{
                                        color: "#383838",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        background: "#1F51C6",
                                        // p:'5px 10px',
                                        borderRadius: "21px",
                                        height: "32px",
                                        color: "#FFFFFF",
                                    }}
                                    variant="outlined"
                                    value={
                                        (selectValue === 1 && "pending") ||
                                        (selectValue === 2 && "completed") ||
                                        (selectValue === 3 && "missed")
                                    }
                                    // onChange={(e) => handleChange(e, i)}
                                >
                                    <MenuItem
                                        onClick={() => setSelectValue(1)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#383838",
                                        }}
                                        value={"pending"}
                                    >
                                        Pending Appointments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setSelectValue(2)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#15B912",
                                        }}
                                        value={"completed"}
                                    >
                                        Completed Appointments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setSelectValue(3)}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            color: "#B92612",
                                        }}
                                        value={"missed"}
                                    >
                                        Missed Appointments
                                    </MenuItem>
                                </Select>
                                <Box>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePickerStyleForMobile
                                            format="DD-MM-YYYY"
                                            onChange={(e) =>
                                                setDate(
                                                    moment(e.$d).format(
                                                        "YYYY-MM-DD"
                                                    )
                                                )
                                            }
                                            sx={{
                                                width: "120px",
                                                backgroundColor: "#1F51C6",
                                                color: "#ffffff",
                                                borderRadius: "50px",
                                            }}
                                            defaultValue={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "block",
                                    },
                                }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePickerStyle
                                        format="DD-MM-YYYY"
                                        onChange={(e) =>
                                            setDate(
                                                moment(e.$d).format(
                                                    "YYYY-MM-DD"
                                                )
                                            )
                                        }
                                        sx={
                                            {
                                                // width: "120px",
                                                // // height: "41px",
                                                // backgroundColor: "#1F51C6",
                                                // color: "#ffffff",
                                                // borderRadius: "50px",
                                            }
                                        }
                                        defaultValue={dayjs()}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        {(selectValue === 1 && (
                            <PendingAppointmentsTableForLoggedInDoctor
                                pendingAppointmentsData={
                                    pendingAppointmentsData
                                }
                                getPendingAppointmentsData={
                                    getPendingAppointmentsData
                                }
                                slotAppointment={slotAppointment}
                                setSlotAppointment={setSlotAppointment}
                            />
                        )) ||
                            (selectValue === 2 && (
                                <CompletedAppointmentsTableForLoggedInDoctor
                                    completeAppointmentsData={
                                        completeAppointmentsData
                                    }
                                    getCompleteAppointmentsData={
                                        getCompleteAppointmentsData
                                    }
                                />
                            )) ||
                            (selectValue === 3 && (
                                <MissedAppointmentsTableForLoggedInDoctor
                                    missedAppointmentsData={
                                        missedAppointmentsData
                                    }
                                    getMissedAppointmentsData={
                                        getMissedAppointmentsData
                                    }
                                />
                            ))}
                    </Box>
                </Box>
            </Box>
            {/* )} */}
        </Box>
    );
};

export default DoctorAppointments;
