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
    Tooltip,
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
import { BiSolidBook } from "react-icons/bi";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import moment from "moment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { logOutDoctor, selectedDoctorsData } from "../../Store/doctorDataSlice";
import "../../Styles/drawerAnimation.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EastIcon from "@mui/icons-material/East";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
    const { doctorid } = useParams();
    const dispatch = useDispatch();
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [missedAppointmentsData, setMissedAppointmentsData] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [completedAppointments, setCompletedAppointments] = useState(false);
    const [menu, setMenu] = useState(false);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctor);
    const numberOfHospitals = user;
    const [piChartData, setPiChartData] = useState({});
    const [selectValue, setSelectValue] = useState(1);
    const [todaysAppointmentData, setTodaysAppointmentData] = useState({});
    const [futureAppointmentData, setFutureAppointmentsData] = useState();
    const [totalPatientData, setTotalPatientData] = useState();
    const [hospitalList, setHospitalList] = useState([]);

    const getPendingAppointmentsDataForPerticularDate = async () => {
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.get(
                    `/v2/getPendingAppoinmentForDoctor/${doctor?._id}/${date}`
                );
                console.log(response);
                return setPendingAppointmentsData(response.result);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.get(
                    `/v2/getPendingAppoinmentByTokenForDoctor/${doctor?._id}/${date}`
                );
                return setPendingAppointmentsData(response.result);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const getCompleteAppointmentsDataForPerticularDate = async () => {
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.get(
                    `/v2/getCompletedAppoinmentForDoctor/${doctor?._id}/${date}`
                );
                setCompleteAppointmentsData(response.result);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.get(
                    `/v2/getCompletedAppoinmentByTokenForDoctor/${doctor?._id}/${date}`
                );
                setCompleteAppointmentsData(response.result);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const getMissedAppointmentsDataForPerticularDate = async () => {
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.get(
                    `/v2/getMissedAppoinmentForDoctor/${doctor?._id}/${date}`
                );
                setMissedAppointmentsData(response.result);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.get(
                    `/v2/getMissedAppoinmentByTokenForDoctor/${doctor?._id}/${date}`
                );
                setMissedAppointmentsData(response.result);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const totalPatient = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/totalPatient/${doctor?._id}/${date}/totalPatient`
            );
            setTotalPatientData(response.result);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const todaysAppointement = async () => {
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.get(
                    `/v2/todaysAppointement/${doctor?._id}/${date}/todaysAppointment`
                );
                setTodaysAppointmentData(response.result);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.get(
                    `/v2/todaysAppointementByToken/${doctor?._id}/${date}/todaysAppointment`
                );
                setTodaysAppointmentData(response.result);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const futureAppointment = async () => {
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.get(
                    `/v2/futureAppointment/${doctor?._id}/futureAppointment`
                );
                if (response.status === "ok") {
                    return setFutureAppointmentsData(response.result);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.get(
                    `/v2/futureAppointmentForAppointmentByToken/${doctor?._id}/futureAppointment`
                );
                if (response.status === "ok") {
                    return setFutureAppointmentsData(response.result);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const getPiChartData = async () => {
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.get(
                    `/v2/getPiChartData/${doctor?._id}/${date}/piChart`
                );
                console.log(response.result);
                setPiChartData(response.result);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axiosClient.get(
                    `/v2/getPiChartDataForAppointmentByToken/${doctor?._id}/${date}/piChart`
                );
                console.log(response.result);
                setPiChartData(response.result);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getPendingAppointmentsDataForPerticularDate();
        getPiChartData();
        getCompleteAppointmentsDataForPerticularDate();
        getMissedAppointmentsDataForPerticularDate();
        todaysAppointement();
        totalPatient();
    }, [date, doctor?._id]);

    useEffect(() => {
        futureAppointment();
    }, [doctor?._id]);

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
    });

    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [disableButton, setDisableButton] = useState({
        loading: false,
        i: "",
    });

    const [expandedMore, setExpandedMore] = useState(false);

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
        dispatch(logOutDoctor());
        dispatch(logout());
        await axiosClient.post("/v2/logout");
        removeItem(KEY_ACCESS_TOKEN);
        // navigate('/')
        // window.location.href = '/master/signin'
    };

    const handleStatusChange = async (id, status, remark, i) => {
        // console.log(updatedStatus, "this is id", id);
        setDisableButton({ ...disableButton, loading: true, i: i });
        if (doctor?.acceptAppointments === "bySlot") {
            try {
                const response = await axiosClient.put(
                    `/v2/updateUserAppointmentStatus/${id}`,
                    { status, remark }
                );
                if (response.status === "ok") {
                    await todaysAppointement();
                    await getPiChartData();
                    await getPendingAppointmentsDataForPerticularDate();
                    await getCompleteAppointmentsDataForPerticularDate();
                    await getMissedAppointmentsDataForPerticularDate();
                    setDisableButton({
                        ...disableButton,
                        loading: false,
                        i: i,
                    });
                }
            } catch (error) {
                setDisableButton({ ...disableButton, loading: false, i: i });
                toast.error("Something went wrong");
            }
        } else {
            try {
                const response = await axiosClient.put(
                    `/v2/updateAppointmentByTokenUserAppointmentStatus/${id}`,
                    { status, remark }
                );
                if (response.status === "ok") {
                    await todaysAppointement();
                    await getPiChartData();
                    await getPendingAppointmentsDataForPerticularDate();
                    await getCompleteAppointmentsDataForPerticularDate();
                    await getMissedAppointmentsDataForPerticularDate();
                    setDisableButton({
                        ...disableButton,
                        loading: false,
                        i: i,
                    });
                }
            } catch (error) {
                setDisableButton({ ...disableButton, loading: false, i: i });
                toast.error("Something went wrong");
            }
        }
    };

    //Handle Switch account functionality here

    const multipleloginprofile = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/multipleloginprofile/${user?.doctorid}`
            );
            setHospitalList(response.result);
            return;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        multipleloginprofile();
    }, [doctor?._id]);

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
                        //     sm: "fixed",
                        //     md: "sticky",
                        // },
                        // top: "0px",
                        // left: "-240px",
                        zIndex: 1,
                        // bottom: "- 100px",
                    }}
                    // style={{

                    // }}
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
                                background: "#ffffff",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    navigate(`/doctor/dashboard/${doctor?._id}`)
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
                                        `/doctor/appointments/${doctor?._id}`
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
                        {/* <Box
                          sx={{
                              width: "100%",
                          }}
                      >
                          <Button
                              onClick={() =>
                                  navigate(`/doctor/courses/${user?.id}`)
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
                                        `/doctor/appointment-settings/${doctor?._id}`
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
                            mb: "20px",
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
                        // left: "0px",
                        bottom: "-100px",
                        // zIndex: 1,
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                                position: "relative",
                            }}
                        >
                            <Box
                                component="button"
                                onClick={() => setExpandedMore(!expandedMore)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: "none",
                                    color: "#ffffff",
                                    border: "none",
                                    lineHeight: "18px",
                                    fontFamily: "Lato",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                }}
                            >
                                {doctor?.hospitalId?.nameOfhospitalOrClinic
                                    ? doctor.hospitalId.nameOfhospitalOrClinic
                                    : doctor?.nameOfTheDoctor}
                                {expandedMore ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </Box>
                            {expandedMore && (
                                <Card
                                    sx={{
                                        p: "5px",
                                        width: "90%",
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        position: "absolute",
                                        top: "30px",
                                        zIndex: "2",
                                    }}
                                >
                                    {hospitalList.map((hospital, i) => (
                                        <Stack
                                            key={i}
                                            direction="row"
                                            sx={{
                                                justifyContent: "space-between",
                                                borderBottom:
                                                    "1px solid #D9D9D9",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing="10px"
                                            >
                                                {/* <Badge badgeContent={4} color="primary"> */}
                                                <Avatar
                                                    src={
                                                        hospital?.hospitalId ===
                                                        null
                                                            ? hospital?.imgurl
                                                            : hospital
                                                                  ?.hospitalId
                                                                  ?.imgurl ||
                                                              "/default.png"
                                                    }
                                                    sx={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                {/* </Badge> */}
                                                <Stack>
                                                    <Typography
                                                        sx={{
                                                            lineHeight:
                                                                "14.6px",
                                                            fontFamily:
                                                                "Raleway",
                                                            fontSize: "13px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {hospital?.hospitalId ===
                                                        null
                                                            ? hospital?.nameOfTheDoctor
                                                            : hospital
                                                                  ?.hospitalId
                                                                  ?.nameOfhospitalOrClinic}
                                                    </Typography>
                                                    {/* <Typography
                                                    sx={{
                                                        lineHeight: "19.2px",
                                                        fontFamily: "Lato",
                                                        color: "#706D6D",
                                                    }}
                                                >
                                                    {hospital?.hospitalId?.location}
                                                </Typography> */}
                                                </Stack>
                                            </Stack>
                                            <Button
                                                onClick={() => {
                                                    dispatch(
                                                        selectedDoctorsData(
                                                            hospital
                                                        )
                                                    );
                                                    navigate(
                                                        `/doctor/dashboard/${hospital._id}`
                                                    );
                                                    setExpandedMore(false);
                                                }}
                                                variant="text"
                                                sx={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <EastIcon fontSize="16px" />
                                            </Button>
                                        </Stack>
                                    ))}
                                </Card>
                            )}
                            {/* <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    background: "#ffffff",
                                    width: "75%",
                                    borderRadius: "5px",
                                    p: "5px",
                                }}
                            >
                                <Box component="span">
                                    djkfvvikfhv kjbkuhkhk
                                </Box>
                                <hr color="red" />
                                <Box component="span">
                                    dkjfjbdk dfhvijhvedfv oohrfoerijv e
                                </Box>
                                <Box component="span">kdhfvkdhvk</Box>
                            </Box> */}
                        </Box>
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
                                    navigate(`/doctor/dashboard/${doctor?._id}`)
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
                                        `/doctor/appointments/${doctor?._id}`
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
                        {/* <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(`/doctor/courses/${user?.id}`)
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
                                        `/doctor/appointment-settings/${doctor?._id}`
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
                                            {totalPatientData}
                                        </Typography>
                                        {/* <LinearProgress
                                                variant="determinate"
                                                value={totalPatientData}
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
                                            /> */}
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
                                            {
                                                todaysAppointmentData.completeAppointments
                                            }
                                            /
                                            {
                                                todaysAppointmentData.totalAppointments
                                            }
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={
                                                (todaysAppointmentData.completeAppointments *
                                                    100) /
                                                todaysAppointmentData.totalAppointments
                                            }
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
                                            Future
                                            <br />
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
                                            {futureAppointmentData}
                                        </Typography>
                                        {/* <LinearProgress
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
                                            /> */}
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
                                <Stack
                                    direction={"row"}
                                    spacing={1}
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "none",
                                            md: "flex",
                                        },
                                        m: "0 auto 15px auto",
                                    }}
                                >
                                    <Button
                                        onClick={() => setSelectValue(1)}
                                        variant={
                                            selectValue === 1
                                                ? "contained"
                                                : "outlined"
                                        }
                                        sx={{
                                            textTransform: "none",
                                            // width: "244px",
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
                                            // width: "244px",
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
                                            // width: "244px",
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
                                {/* <Typography
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
                                    </Typography> */}
                                {selectValue === 1 && (
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
                                                                    width: {
                                                                        xs: "29px",
                                                                        sm: "29px",
                                                                        md: "32px",
                                                                    },
                                                                    height: {
                                                                        xs: "29px",
                                                                        sm: "29px",
                                                                        md: "29px",
                                                                    },
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    background:
                                                                        "#1F51C6",
                                                                    color: "#ffffff",
                                                                    zIndex: 1,
                                                                    boxShadow:
                                                                        "none",
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </Fab>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#383838",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.name
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#706D6D",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.AppointmentTime
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="row">
                                                            <Tooltip
                                                                title="Cancel"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <IconButton
                                                                    disabled={
                                                                        disableButton.loading &&
                                                                        disableButton.i ==
                                                                            i
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            appointment._id,
                                                                            "cancelled",
                                                                            "by doctor",
                                                                            i
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        p: 0,
                                                                    }}
                                                                >
                                                                    <CancelIcon
                                                                        sx={{
                                                                            fontSize:
                                                                                {
                                                                                    xs: "20.84px",
                                                                                    sm: "20.84px",
                                                                                    md: "29.15px",
                                                                                },
                                                                            color:
                                                                                disableButton.loading &&
                                                                                disableButton.i ==
                                                                                    i
                                                                                    ? "#D9D9D9"
                                                                                    : "#B92612",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Complete"
                                                                placement="top"
                                                                arrow
                                                                sx={{
                                                                    color: "red !important",
                                                                    backgroundColor:
                                                                        "red",
                                                                }}
                                                            >
                                                                <IconButton
                                                                    disabled={
                                                                        disableButton.loading &&
                                                                        disableButton.i ==
                                                                            i
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            appointment._id,
                                                                            "completed",
                                                                            "by doctor",
                                                                            i
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        p: 0,
                                                                    }}
                                                                >
                                                                    <CheckCircleIcon
                                                                        sx={{
                                                                            fontSize:
                                                                                {
                                                                                    xs: "20.84px",
                                                                                    sm: "20.84px",
                                                                                    md: "29.15px",
                                                                                },
                                                                            color:
                                                                                disableButton.loading &&
                                                                                disableButton.i ==
                                                                                    i
                                                                                    ? "#D9D9D9"
                                                                                    : "#15B912",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
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
                                )}
                                {selectValue === 2 && (
                                    <Box
                                        sx={{
                                            overflow: "auto",
                                            height: "50vh",
                                        }}
                                    >
                                        {completeAppointmentsData.length > 0 ? (
                                            completeAppointmentsData.map(
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
                                                                    width: {
                                                                        xs: "29px",
                                                                        sm: "29px",
                                                                        md: "32px",
                                                                    },
                                                                    height: {
                                                                        xs: "29px",
                                                                        sm: "29px",
                                                                        md: "29px",
                                                                    },
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    background:
                                                                        "#1F51C6",
                                                                    color: "#ffffff",
                                                                    zIndex: 1,
                                                                    boxShadow:
                                                                        "none",
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </Fab>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#383838",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.name
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#706D6D",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.AppointmentTime
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="row">
                                                            <Tooltip
                                                                title="Complete"
                                                                placement="top"
                                                                arrow
                                                                sx={{
                                                                    color: "red !important",
                                                                    backgroundColor:
                                                                        "red",
                                                                }}
                                                            >
                                                                <IconButton
                                                                    disabled={
                                                                        true
                                                                    }
                                                                    sx={{
                                                                        p: 0,
                                                                    }}
                                                                >
                                                                    <CheckCircleIcon
                                                                        sx={{
                                                                            fontSize:
                                                                                {
                                                                                    xs: "20.84px",
                                                                                    sm: "20.84px",
                                                                                    md: "29.15px",
                                                                                },
                                                                            color: "#D9D9D9",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
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
                                )}
                                {selectValue === 3 && (
                                    <Box
                                        sx={{
                                            overflow: "auto",
                                            height: "50vh",
                                        }}
                                    >
                                        {missedAppointmentsData.length > 0 ? (
                                            missedAppointmentsData.map(
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
                                                                    width: {
                                                                        xs: "29px",
                                                                        sm: "29px",
                                                                        md: "32px",
                                                                    },
                                                                    height: {
                                                                        xs: "29px",
                                                                        sm: "29px",
                                                                        md: "29px",
                                                                    },
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    background:
                                                                        "#1F51C6",
                                                                    color: "#ffffff",
                                                                    zIndex: 1,
                                                                    boxShadow:
                                                                        "none",
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </Fab>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#383838",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.name
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        "Raleway",
                                                                    fontSize: {
                                                                        xs: "0.813rem",
                                                                        sm: "0.813rem",
                                                                        md: "1.125rem",
                                                                    },
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "21.13px",
                                                                    color: "#706D6D",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.AppointmentTime
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="row">
                                                            <Tooltip
                                                                title="Pending"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <IconButton
                                                                    disabled={
                                                                        disableButton.loading &&
                                                                        disableButton.i ==
                                                                            i
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            appointment._id,
                                                                            "pending",
                                                                            "by doctor",
                                                                            i
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        p: 0,
                                                                    }}
                                                                >
                                                                    <PendingActionsIcon
                                                                        sx={{
                                                                            fontSize:
                                                                                {
                                                                                    xs: "20.84px",
                                                                                    sm: "20.84px",
                                                                                    md: "29.15px",
                                                                                },
                                                                            color:
                                                                                disableButton.loading &&
                                                                                disableButton.i ==
                                                                                    i
                                                                                    ? "#D9D9D9"
                                                                                    : "#1F51C6",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Complete"
                                                                placement="top"
                                                                arrow
                                                                sx={{
                                                                    color: "red !important",
                                                                    backgroundColor:
                                                                        "red",
                                                                }}
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            appointment._id,
                                                                            "completed",
                                                                            "by doctor",
                                                                            i
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        disableButton.loading &&
                                                                        disableButton.i ==
                                                                            i
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    sx={{
                                                                        p: 0,
                                                                    }}
                                                                >
                                                                    <CheckCircleIcon
                                                                        sx={{
                                                                            fontSize:
                                                                                {
                                                                                    xs: "20.84px",
                                                                                    sm: "20.84px",
                                                                                    md: "29.15px",
                                                                                },
                                                                            color:
                                                                                disableButton.loading &&
                                                                                disableButton.i ==
                                                                                    i
                                                                                    ? "#D9D9D9"
                                                                                    : "#15B912",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
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
                                )}
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    onChange={(e) =>
                                        setDate(
                                            moment(e.$d).format("YYYY-MM-DD")
                                        )
                                    }
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
                                                    value: piChartData.completed,
                                                    label: `${piChartData.completed}% Completed`,
                                                    color: "#1F51C6",
                                                },
                                                {
                                                    id: 1,
                                                    value: piChartData.pending,
                                                    label: `${piChartData.pending}% Pending`,
                                                    // label: "20% Confirmed",
                                                    color: "#A1E18A",
                                                },
                                                {
                                                    id: 2,
                                                    value: piChartData.cancelled,
                                                    label: `${piChartData.cancelled}% Cancelled/Missed`,
                                                    // label: "5% Cancelled",
                                                    color: "#F45843",
                                                },
                                            ],
                                        },
                                    ]}
                                    {...sizing}
                                />
                            </Card>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            {/* )} */}
        </Box>
    );
};

export default MUDDashboard;
