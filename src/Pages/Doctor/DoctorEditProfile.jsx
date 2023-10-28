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
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { BiSolidBook } from "react-icons/bi";
import ChangePasswordDialog from "../../Components/Doctor/ChangePasswordDialog";

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

const DoctorEditProfile = () => {
    const { hospital_id, doctor_id } = useParams();
    const dispatch = useDispatch();
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [activeTab, setActiveTab] = useState(4);
    const [completedAppointments, setCompletedAppointments] = useState(false);
    const [menu, setMenu] = useState(false);
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);
    const [categoryValue, setCategory1Value] = useState("");

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

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    // const {hospital_id} = useParams();
    const navigate = useNavigate();

    const [err, setError] = useState(false);
    // const propLocation = hospitalLocation

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: user?.nameOfTheDoctor,
        qulification: user?.qulification,
        speciality: user?.speciality,
        yearOfExprience: user?.yearOfExprience,
        email: user?.email,
        phone: user?.phone,
        connsultationFee: user?.connsultationFee,
        consultingTime: user?.consultingTime,
        location: user?.location,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !inputValue.nameOfTheDoctor ||
            !inputValue.qulification ||
            !inputValue.speciality ||
            !inputValue.yearOfExprience ||
            !inputValue.email ||
            // !inputImage ||
            !inputValue.phone ||
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
        data.append("enterEmailId", inputValue.email);
        data.append("enterPhoneNo", inputValue.phone);
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
                        numberOfHospitals[0]?.doctorImg
                            ? `${baseURL}/Uploads/Hospital/DoctorImage/${numberOfHospitals[0]?.doctorImg}`
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
                            background: "#ffffff",
                            color: "#1F51C6",
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
                                    numberOfHospitals[0]?.doctorImg
                                        ? `${baseURL}/Uploads/Hospital/DoctorImage/${numberOfHospitals[0]?.doctorImg}`
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
                                    background: "#ffffff",
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
                                        color: "#1F51C6",
                                        background: "#ffffff",
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
                            mx: "100px",
                            mt: "32px",
                            // height: "90vh",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                mb: { xs: "0", sm: "0", md: "41px" },
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
                            {activeTab === 4 ? null : (
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
                                                <img
                                                    src="/search.svg"
                                                    alt="img"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        </Box>

                        {activeTab === 4 && (
                            <Card
                                sx={{
                                    py: { xs: "20px", sm: "20px", md: "25px" },
                                    px: { xs: "16px", sm: "16px", md: "25px" },
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: "space-between" }}
                                    >
                                        <Stack direction={"row"} spacing={{xs:0.8, sm:1, md:3}} sx={{}}>
                                            <img
                                                src={
                                                    preview
                                                        ? preview
                                                        : "/default.png"
                                                }
                                                alt="user"
                                                width="60"
                                                height="60"
                                                style={{ borderRadius: "50%" }}
                                            />

                                            <Box sx={{display:'flex', flexDirection:'column'}}>
                                                <Typography
                                                    my={1}
                                                    color={
                                                        err && !inputImage
                                                            ? "red"
                                                            : "#706D6D"
                                                    }
                                                    lineHeight="20px"
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "600",
                                                        fontSize: "15px",
                                                        width: "120.73px",
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
                                                        lineHeight: "14.4px",
                                                        fontSize:{xs:"0.75rem", sm:"0.75rem", md:"0.875rem"}
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
                                        <Stack justifyContent="center" sx={{}}>
                                            <Button
                                                sx={{
                                                    fontSize: {
                                                        xs: "0.75rem",
                                                        sm: "0.75rem",
                                                        md: "0.875rem",
                                                    },
                                                    fontFamily: "Lato",
                                                    fontWeight: "600",
                                                    color: "#1F51C6",
                                                    cursor: "pointer",
                                                    textTransform: "none",
                                                    lineHeight: "14.4px",
                                                    width: {
                                                        xs: "114px",
                                                        sm: "114px",
                                                        md: "250px",
                                                    },
                                                    // backgroundColor:'blue',
                                                    p:0,
                                                    ":hover": {
                                                        background: "none",
                                                    },
                                                }}
                                            >
                                                Change Appointment settings
                                            </Button>
                                        </Stack>
                                    </Stack>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            gap: "17px",
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
                                                value={
                                                    inputValue.nameOfTheDoctor
                                                }
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
                                                value={
                                                    inputValue.yearOfExprience
                                                }
                                                onChange={handleChange}
                                            />
                                        </StackStyle>
                                        <StackStyle>
                                            <LabelStyle htmlFor="mailId">
                                                Enter Email Id
                                            </LabelStyle>
                                            <TextFieldStyle
                                                id="mailId"
                                                name="email"
                                                fullWidth
                                                placeholder="doctor@gmail.com"
                                                error={
                                                    err &&
                                                    !inputValue.email &&
                                                    true
                                                }
                                                helperText={
                                                    err &&
                                                    !inputValue.email &&
                                                    "Please enter your email"
                                                }
                                                value={inputValue.email}
                                                onChange={handleChange}
                                            />
                                        </StackStyle>
                                        <StackStyle>
                                            <LabelStyle htmlFor="phoneNo">
                                                Enter Phone No
                                            </LabelStyle>
                                            <TextFieldStyle
                                                id="phoneNo"
                                                name="phone"
                                                fullWidth
                                                placeholder="Ex 99112240477"
                                                error={
                                                    err &&
                                                    !inputValue.phone &&
                                                    true
                                                }
                                                helperText={
                                                    err &&
                                                    !inputValue.phone &&
                                                    "Please enter your phone number"
                                                }
                                                value={inputValue.phone}
                                                onChange={handleChange}
                                            />
                                        </StackStyle>

                                        <StackStyle>
                                            <LabelStyle htmlFor="connsultationFee">
                                                Connsultation Fee
                                            </LabelStyle>
                                            <TextFieldStyle
                                                type="number"
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
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            sx={{
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    fontFamily:
                                                                        "Lato",
                                                                    fontWeight:
                                                                        "500",
                                                                    fontSize:
                                                                        "1.2rem",
                                                                    color: "#000000",
                                                                }}
                                                            >
                                                                ₹
                                                            </span>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={
                                                    inputValue.connsultationFee
                                                }
                                                onChange={handleChange}
                                            />
                                        </StackStyle>

                                        <StackStyle>
                                            <LabelStyle htmlFor="category1">
                                                Category 1
                                            </LabelStyle>
                                            <select
                                                placeholder="Enter Category"
                                                value={categoryValue}
                                                onChange={(e) =>
                                                    setCategory1Value(
                                                        e.target.value
                                                    )
                                                }
                                                name="category1"
                                                id="category1"
                                                style={{
                                                    height: "38px",
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "5px",
                                                    fontFamily: "Lato",
                                                    fontWeight: "500",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {/* <option value=""></option> */}
                                                <option value="1">
                                                    Enter Category
                                                </option>
                                                <option value="2">
                                                    Category 1
                                                </option>
                                                <option value="3">
                                                    Category 2
                                                </option>
                                                <option value="4">
                                                    Category 3
                                                </option>
                                                <option value="4">
                                                    Category 4
                                                </option>
                                            </select>
                                        </StackStyle>
                                        <StackStyle>
                                            <LabelStyle htmlFor="category2">
                                                Category 2
                                            </LabelStyle>
                                            <select
                                                placeholder="Enter Category"
                                                value={categoryValue}
                                                onChange={(e) =>
                                                    setCategory1Value(
                                                        e.target.value
                                                    )
                                                }
                                                name="category2"
                                                id="category2"
                                                style={{
                                                    height: "38px",
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "5px",
                                                    fontFamily: "Lato",
                                                    fontWeight: "500",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {/* <option value=""></option> */}
                                                <option value="1">
                                                    Enter Category
                                                </option>
                                                <option value="2">
                                                    Category 1
                                                </option>
                                                <option value="3">
                                                    Category 2
                                                </option>
                                                <option value="4">
                                                    Category 3
                                                </option>
                                                <option value="4">
                                                    Category 4
                                                </option>
                                            </select>
                                        </StackStyle>
                                        <StackStyle>
                                            <LabelStyle htmlFor="category3">
                                                Category 3
                                            </LabelStyle>
                                            <select
                                                placeholder="Enter Category"
                                                value={categoryValue}
                                                onChange={(e) =>
                                                    setCategory1Value(
                                                        e.target.value
                                                    )
                                                }
                                                name="category3"
                                                id="category1"
                                                style={{
                                                    height: "38px",
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "5px",
                                                    fontFamily: "Lato",
                                                    fontWeight: "500",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {/* <option value=""></option> */}
                                                <option value="1">
                                                    Enter Category
                                                </option>
                                                <option value="2">
                                                    Category 1
                                                </option>
                                                <option value="3">
                                                    Category 2
                                                </option>
                                                <option value="4">
                                                    Category 3
                                                </option>
                                                <option value="4">
                                                    Category 4
                                                </option>
                                            </select>
                                        </StackStyle>
                                        <StackStyle>
                                            <LabelStyle htmlFor="category4">
                                                Category 4
                                            </LabelStyle>
                                            <select
                                                placeholder="Enter Category"
                                                value={categoryValue}
                                                onChange={(e) =>
                                                    setCategory1Value(
                                                        e.target.value
                                                    )
                                                }
                                                name="category4"
                                                id="category1"
                                                style={{
                                                    height: "38px",
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "5px",
                                                    fontFamily: "Lato",
                                                    fontWeight: "500",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {/* <option value=""></option> */}
                                                <option value="1">
                                                    Enter Category
                                                </option>
                                                <option value="2">
                                                    Category 1
                                                </option>
                                                <option value="3">
                                                    Category 2
                                                </option>
                                                <option value="4">
                                                    Category 3
                                                </option>
                                                <option value="4">
                                                    Category 4
                                                </option>
                                            </select>
                                        </StackStyle>
                                        <StackStyle>
                                            <LabelStyle htmlFor="discreption">
                                                Enter Description
                                            </LabelStyle>
                                            <TextFieldStyle
                                                id="discreption"
                                                name="discreption"
                                                fullWidth
                                                placeholder="Enter Doctor’s Description"
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
                                                value={
                                                    inputValue.consultingTime
                                                }
                                                onChange={handleChange}
                                            />
                                        </StackStyle>
                                        {/* <StackStyle>
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
                                        </StackStyle> */}
                                    </Box>
                                    <Stack spacing={{xs:'8px', sm:'8px', md:'10px'}} sx={{ mt: 2 }}>
                                        <LoadingButton
                                            size="small"
                                            fullWidth
                                            type="submit"
                                            loading={disableButton}
                                            // loadingPosition="end"
                                            variant="contained"
                                            sx={{
                                                marginY: "10px",
                                                textTransform: "none",
                                                display: "block",
                                                width: "100%",
                                                boxShadow: "none",
                                                borderRadius:'53px',
                                                ":hover": {
                                                    boxShadow: "none",
                                                },
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: "Lato",
                                                    fontWeight: "700",
                                                    fontSize: "1.125rem",
                                                }}
                                            >
                                                Save Changes
                                            </span>
                                        </LoadingButton>
                                        <Button
                                            onClick={() =>
                                                setChangePasswordDialog(true)
                                            }
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                borderColor: "#D9D9D9",
                                                color: "#383838",
                                                marginY: "10px",
                                                textTransform: "none",
                                                display: "block",
                                                width: "100%",
                                                boxShadow: "none",
                                                fontFamily: "Lato",
                                                fontWeight: "700",
                                                fontSize: "1.125rem",
                                                borderRadius:'53px',
                                                ":hover": {
                                                    boxShadow: "none",
                                                    borderColor: "#D9D9D8",
                                                },
                                            }}
                                        >
                                            Change Password
                                        </Button>
                                    </Stack>
                                </form>
                            </Card>
                        )}
                    </Box>
                </Box>
            )}
            <ChangePasswordDialog
                changePasswordDialog={changePasswordDialog}
                setChangePasswordDialog={setChangePasswordDialog}
            />
        </Box>
    );
};

export default DoctorEditProfile;
