import React, { useEffect, useState } from "react";
import MasterUserDoctors from "./MasterUserDoctors";
import MasterNavBar from "../../Components/Master/MasterNavBar";
import { useNavigate, useParams } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    InputAdornment,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    tableCellClasses,
    Rating,
    Autocomplete,
} from "@mui/material";
import { GiPauseButton } from "react-icons/gi";
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import DoctorProfileCard from "../../Components/Master/DoctorProfileCard";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BookAppointmentDialog from "../../Components/Master/BookAppointmentDialog";
import AllPendingAppintmentsForAnHospital from "../../Components/Master/AllPendingAppintmentsForAnHospital";
import AllCompleteAppintmentsForAnHospital from "../../Components/Master/AllCompleteAppintmentsForAnHospital";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AllMissedAppintmentsForAnHospital from "../../Components/Master/AllMissedAppintmentsForAnHospital";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import Footer from "../../Components/Footer/Footer";
import { PlayArrow } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";
import moment from "moment";
import { toast } from "react-toastify";

const SearchFeildStyle = styled(TextField)({
    "& .css-1kzw815-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "31px",
        "& placeholder": {
            color: "blue",
        },
    },
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

const AutocompleteStyle = styled(Autocomplete)({
    "& .css-113ntv0-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
        {
            transform: "none",
        },
    "& .css-3crhnd-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "62px",
    },
});

const Appoinments = () => {
    const { hospital_id } = useParams();
    const [activeTab, setActiveTab] = useState(1);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [doctorData, setDoctorData] = useState({});
    const [showDoctorCard, setShowDoctorCard] = useState(false);
    const [search, setSearch] = useState("");
    const [slotAppointment, setSlotAppointment] = useState("slotAppointments");
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [missedAppointmentsData, setMissedAppointmentsData] = useState([]);

    const [pendingAppointmentsByTokenData, setPendingAppointmentsByTokenData] =
        useState([]);

    const [
        completeAppointmentsByTokenData,
        setCompleteAppointmentsByTokenData,
    ] = useState([]);

    const [missedAppointmentsByTokenData, setMissedAppointmentsByTokenData] =
        useState([]);

    const [bookAppointmentDialog, setBookAppointmentDialog] = useState(false);
    const [mobileActiveTab, setMobileActiveTab] = useState(1);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const farmattedDate = dayjs(date).format("DD-MM-YYYY");
    console.log(farmattedDate);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(3));
    }, []);

    // useEffect(() => {
    //     getDoctorsData();
    // }, []);

    // const doctorslist = pendingAppointmentsData.map(
    //     (doctorKaNaam) => doctorKaNaam.doctorsId?.nameOfTheDoctor
    // );

    // console.log("Ye hai doctors ki ids", doctorslist);
    // const getAllAppointments = async()=>{
    //     const response = await axiosClient.get(
    //         `/v2//getAllAppointmentsForPerticularHospital/${hospital_id}?status=${status}`
    //     );
    //         if(response.status === "ok"){
    //             setAppointmentsData(response.result)
    //         }
    //     console.log("this is all appointment data",response);
    // }

    // const getDoctorsData = async () => {
    //     const response = await axiosClient.get(
    //         `/v2/getDoctorsforHospital/${hospital_id}`
    //     );
    //     console.log(response);
    //     if (response.status === "ok") {
    //         return setDoctor(response.result);
    //     }
    // };

    // const handleChange = (val) => {
    //     console.log(val);
    //     setDoctorData(val);
    //     setSearch(val._id);
    //     setShowDoctorCard(true);
    // };

    // useEffect(() => {
    //     if (doctorData) {
    //         setDoctor([doctorData]);
    //     } else {
    //         getDoctorsData();
    //     }
    // }, [doctorData]);

    const getPendingAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getAllAppointmentsForPerticularHospital/${hospital_id}/${date}`
        );
        setPendingAppointmentsData(response.result);
        console.log(response.result);
    };

    const getCompleteAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getCompleteAppointmentsForHospital/${hospital_id}/${date}`
        );
        setCompleteAppointmentsData(response.result);
        console.log(response);
    };

    const getMissedAppointmentsData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getMissedAppointmentsForHospital/${hospital_id}/${date}`
            );
            setMissedAppointmentsData(response.result);
            console.log(response);
        } catch (error) {
            console.log(error.message);
            toast.error("something went wrong");
        }
    };

    const getPendingAppointmentsByTokenData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getAllAppointmentsForPerticularHospitalByToken/${hospital_id}/${date}/pendingByToken`
            );
            setPendingAppointmentsByTokenData(response.result);
            console.log(response.result);
        } catch (error) {
            console.log(error);
        }
    };

    const getCompleteAppointmentsByTokenData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getCompleteAppointmentsForHospitalByToken/${hospital_id}/${date}/completedByToken`
            );
            setCompleteAppointmentsByTokenData(response.result);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getMissedAppointmentsByTokenData = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getMissedAppointmentsByTokenForHospital/${hospital_id}/${date}/missedByToken`
            );
            setMissedAppointmentsByTokenData(response.result);
            console.log(response);
        } catch (error) {
            console.log(error.message);
            toast.error("something went wrong");
        }
    };

    useEffect(() => {
        getPendingAppointmentsData();
        getCompleteAppointmentsData();
        getMissedAppointmentsData();
    }, [date, slotAppointment === "slotAppointments"]);

    useEffect(() => {
        getPendingAppointmentsByTokenData();
        getCompleteAppointmentsByTokenData();
        getMissedAppointmentsByTokenData();
    }, [date, slotAppointment === "tokenAppointments"]);

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
                <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
                    <AutocompleteStyle
                        size="small"
                        disablePortal
                        popupIcon={<img src="/search.svg" alt="img" />}
                        id="combo-box-demo"
                        // options={doctor}
                        // onChange={(e, val) => handleChange(val)}
                        // getOptionLabel={(doctor) =>
                        //     doctor.nameOfTheDoctor || ""
                        // }
                        sx={{ width: "491px" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search doctors"
                            />
                        )}
                    />
                    {/* <SearchFeildStyle
                    size="small"
                    placeholder="Search Doctors"
                    sx={{
                        width: "491px",
                        // borderRadius:'30px'
                    }}
                    InputLabelProps={{ color: "red" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <img src="/search.svg" alt="img" />
                            </InputAdornment>
                        ),
                    }}
                    // onChange={(e) => setSearch(e.target.value)}
                /> */}
                </Box>
                {doctorData?._id && (
                    <Card
                        sx={{
                            display: "flex",
                            background: {
                                xs: "#DCE3F6",
                                sm: "#DCE3F6",
                                md: "none",
                            },
                            justifyContent: "space-between",
                            width: "100%",
                            p: 3,
                            alignItems: {
                                xs: "start",
                                sm: "start",
                                md: "center",
                            },
                            border: "1px solid #D9D9D9",
                            boxShadow: "none",
                            borderRadius: "7px",
                            flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "row",
                            },
                            mt: { xs: "16px", sm: "16px", md: 5 },
                        }}
                    >
                        <Stack direction="row">
                            <Avatar
                                src={
                                    doctorData?.doctorImg
                                        ? `${baseURL}/Uploads/Hospital/DoctorImage/${doctorData?.doctorImg}`
                                        : "/default.png"
                                }
                                alt="User Image"
                                sx={{
                                    width: { xs: 70, sm: 60, md: 140 },
                                    height: { xs: 70, sm: 60, md: 140 },
                                }}
                            />
                            <Box ml={2}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {doctorData?.nameOfTheDoctor} &nbsp;
                                    <CheckCircleIcon color="success" />
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#706D6D",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {doctorData?.yearOfExprience} Years
                                    Experience
                                </Typography>
                                <Rating value={5} readOnly />
                            </Box>
                        </Stack>
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "200px" },
                            }}
                        >
                            <Button
                                onClick={() => setBookAppointmentDialog(true)}
                                variant="contained"
                                sx={{
                                    m: 1,
                                    background: "#15B912",
                                    textTransform: "none",
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "200px",
                                    },
                                    borderRadius: "35px",
                                    "&:hover": {
                                        background: "#148512",
                                    },
                                }}
                            >
                                Book Appointment
                            </Button>
                        </Box>
                    </Card>
                )}

                {/* Web View Start */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                        mt: 4,
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
                            onChange={(e) => setSlotAppointment(e.target.value)}
                        >
                            <MenuItem
                                // onClick={() => setSelectValue(1)}
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
                                // onClick={() => setSelectValue(2)}
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
                        {/* <Button
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
                                </Button> */}
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            onClick={() => setActiveTab(1)}
                            variant={activeTab === 1 ? "contained" : "outlined"}
                            sx={{
                                textTransform: "none",
                                width: "119px",
                                height: "41px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                borderRadius: "35px",
                                color: activeTab === 1 ? "#ffffff" : "#383838",
                                boxShadow: "none",
                            }}
                        >
                            Upcoming
                        </Button>
                        <Button
                            onClick={() => setActiveTab(2)}
                            variant={activeTab === 2 ? "contained" : "outlined"}
                            sx={{
                                textTransform: "none",
                                width: "119px",
                                height: "41px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                borderRadius: "35px",
                                color: activeTab === 2 ? "#ffffff" : "#383838",
                                boxShadow: "none",
                            }}
                        >
                            Completed
                        </Button>
                        <Button
                            onClick={() => setActiveTab(3)}
                            variant={activeTab === 3 ? "contained" : "outlined"}
                            sx={{
                                textTransform: "none",
                                width: "119px",
                                height: "41px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                borderRadius: "35px",
                                color: activeTab === 3 ? "#ffffff" : "#383838",
                                boxShadow: "none",
                            }}
                        >
                            Missed
                        </Button>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        {/* <Button
                            onClick={() => setActiveTab(1)}
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                width: "231px",
                                height: "41px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                borderRadius: "35px",
                                color: "#383838",
                                boxShadow: "none",
                            }}
                        >
                            <GiPauseButton
                                style={{
                                    color: "#1F51C6",
                                    width: "25px",
                                    height: "35px",
                                    marginRight: "5px",
                                }}
                            />
                            Pause Appointments
                        </Button> */}
                        {/* <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                width: "226px",
                                height: "41px",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                borderRadius: "35px",
                                color: "#383838",
                                boxShadow: "none",
                            }}
                        >
                            <FaStop
                                style={{
                                    color: "#1F51C6",
                                    width: "21px",
                                    height: "21px",
                                    marginRight: "5px",
                                }}
                            />
                            Stop Appointments
                        </Button> */}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerStyle
                                format="DD-MM-YYYY"
                                onChange={(e) =>
                                    setDate(moment(e.$d).format("YYYY-MM-DD"))
                                }
                                defaultValue={dayjs()}
                            />
                        </LocalizationProvider>
                    </Stack>
                </Box>
                {/* Web View End */}

                {/* Mobile View Start */}
                <Stack spacing="8px" sx={{ mt: "16px" }}>
                    <Box
                        sx={{
                            display: {
                                xs: "block",
                                sm: "block",
                                md: "none",
                                background: "#1F51C6",
                                p: "14px",
                            },
                            borderRadius: "5px",
                        }}
                    >
                        {/* <Button
                            sx={{
                                height: "36px",
                                color: "#ffffff",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "13px",
                            }}
                        >
                            <PlayArrow sx={{ fontSize: "2rem", mr: "5px" }} />{" "}
                            Start Appointments
                        </Button> */}
                    </Box>
                    <Box
                        sx={{
                            display: {
                                xs: "block",
                                sm: "block",
                                md: "none",
                                background: "#1F51C6",
                                p: "14px",
                            },
                            borderRadius: "5px",
                        }}
                    >
                        {/* <Button
                            sx={{
                                height: "36px",
                                color: "#ffffff",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "13px",
                            }}
                        >
                            <FaStop
                                style={{
                                    width: "19px",
                                    height: "19px",
                                    marginRight: "5px",
                                }}
                            />{" "}
                            Stop Appointments
                        </Button> */}
                    </Box>
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
                            (activeTab === 1 && "pending") ||
                            (activeTab === 2 && "completed") ||
                            (activeTab === 3 && "missed")
                        }
                        // onChange={(e) => handleChange(e, i)}
                    >
                        <MenuItem
                            onClick={() => setActiveTab(1)}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#383838",
                            }}
                            value={"pending"}
                        >
                            Pending
                        </MenuItem>
                        <MenuItem
                            onClick={() => setActiveTab(2)}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#15B912",
                            }}
                            value={"completed"}
                        >
                            Completed
                        </MenuItem>
                        <MenuItem
                            onClick={() => setActiveTab(3)}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#B92612",
                            }}
                            value={"missed"}
                        >
                            Missed
                        </MenuItem>
                    </Select>
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
                        value={slotAppointment}
                        onChange={(e) => setSlotAppointment(e.target.value)}
                        // onChange={(e) => handleChange(e, i)}
                    >
                        <MenuItem
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#383838",
                            }}
                            value="tokenAppointments"
                        >
                            Token
                        </MenuItem>
                        <MenuItem
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#15B912",
                            }}
                            value={"slotAppointments"}
                        >
                            Slot
                        </MenuItem>
                    </Select>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerStyleForMobile
                                format="DD-MM-YYYY"
                                onChange={(e) =>
                                    setDate(moment(e.$d).format("YYYY-MM-DD"))
                                }
                                defaultValue={dayjs()}
                                sx={{
                                    width: "120px",
                                    backgroundColor: "#1F51C6",
                                    color: "#ffffff",
                                    borderRadius: "50px",
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                {(activeTab === 1 && (
                    <AllPendingAppintmentsForAnHospital
                        pendingAppointmentsData={pendingAppointmentsData}
                        getPendingAppointmentsData={getPendingAppointmentsData}
                        slotAppointment={slotAppointment}
                        pendingAppointmentsByTokenData={
                            pendingAppointmentsByTokenData
                        }
                        getPendingAppointmentsByTokenData={
                            getPendingAppointmentsByTokenData
                        }
                    />
                )) ||
                    (activeTab === 2 && (
                        <AllCompleteAppintmentsForAnHospital
                            completeAppointmentsData={completeAppointmentsData}
                            getCompleteAppointmentsData={
                                getCompleteAppointmentsData
                            }
                            getPendingAppointmentsByTokenData={
                                getPendingAppointmentsByTokenData
                            }
                            slotAppointment={slotAppointment}
                            completeAppointmentsByTokenData={
                                completeAppointmentsByTokenData
                            }
                            setCompleteAppointmentsByTokenData={
                                setCompleteAppointmentsByTokenData
                            }
                        />
                    )) ||
                    (activeTab === 3 && (
                        <AllMissedAppintmentsForAnHospital
                            missedAppointmentsData={missedAppointmentsData}
                            getMissedAppointmentsData={
                                getMissedAppointmentsData
                            }
                            getMissedAppointmentsByTokenData={
                                getMissedAppointmentsByTokenData
                            }
                            slotAppointment={slotAppointment}
                            missedAppointmentsByTokenData={
                                missedAppointmentsByTokenData
                            }
                            setMissedAppointmentsByTokenData={
                                setMissedAppointmentsByTokenData
                            }
                        />
                    ))}
                <BookAppointmentDialog
                    bookAppointmentDialog={bookAppointmentDialog}
                    setBookAppointmentDialog={setBookAppointmentDialog}
                    // getUpcomingAppointmentsData={getUpcomingAppointmentsData}
                />
            </Box>
            <Footer />
        </>
    );
};

export default Appoinments;
