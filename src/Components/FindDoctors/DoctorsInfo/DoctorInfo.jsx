import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DoctorsInfoStyle/doctorsInfoStyle.css";
import {
    Box,
    Container,
    Typography,
    styled,
    Button,
    TextField,
    Paper,
    IconButton,
    InputBase,
    Divider,
    ListItemButton,
    ListItemText,
    InputAdornment,
    List,
    ListItem,
    Card,
    Rating,
    Stack,
    Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { blue, grey } from "@mui/material/colors";
import Carousel from "react-multi-carousel";
import moment from "moment";
import Footer from "../../Footer/Footer";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { axiosClient, baseURL } from "../../../Utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { tab } from "../../../Store/tabSlice";
import BookAppointmnetDetailsDialog from "../../Patient/BookAppointmnetDetailsDialog";
import BookAppointmentDialogForPatient from "../../Patient/BookAppointmentDialogForPatient";
import ConfirmAppointmentDialog from "../../Patient/ConfirmAppointmentDialog";
import AppointmentConfirmDIalog from "../DoctorsList/AppointmentConfirmDIalog";
import { toast } from "react-toastify";

const CarouselStyle = styled(Carousel)`
    width: 100%;
    // margin:10px;
`;

const SpanTypograophyStyle = styled(Typography)`
    font-size: 10px;
    color: #15b912;
    text-align: center;
`;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 5,
    },
};
let datedumb;

const DoctorInfo = () => {
    const { doctorsId } = useParams();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const urlLocation = useLocation();
    const [dates, setDates] = useState([]);
    const currentDate = moment().format("YYYY-MM-DD");
    const [activeDate, setActiveDate] = useState(false);
    const [slotTime, setSlotTime] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [doctorsData, setDoctorsData] = useState({});
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState();
    const [dateErr, setDateErr] = useState(false);
    const [hospitalList, setHospitalList] = useState([]);
    const [duid, setDuid] = useState("");
    const [selectedTime, setSelectedTime] = useState();

    const [bookingAppointmentDetails, setBookingAppointmentDetails] = useState({
        nameOfTheDoctor: "",
        doctorsId: "",
        appointmentDate: "",
        consultingTime: "",
        hospitalId: "",
        userid: user?._id,
        doctorid: "",
        name: "",
        Age: "",
        Gender: "",
        phone: "",
        AppointmentNotes: "",
        AppointmentTime: "",
        imgurl: "",
        connsultationFee: "",
        location: "",
        hospitalName: "",
    });

    const [inputValue, setInputValue] = useState({
        name: user?.name ? user.name : "",
        age: user?.age ? user.age : "",
        gender: user?.gender ? user.gender : "",
        phone: user?.phone ? user.phone : "",
        email: user?.email ? user.email : "",
        AppointmentNotes: "",
        appointmentDate: "",
        AppointmentTime: "",
        doctorid: bookingAppointmentDetails.doctorid,
        userid: user?._id,
        role: user?.role,
    });

    const [appointmentCofirmedDialog, setAppointmentCofirmedDialog] =
        useState(false);
    const [acceptAppointments, setAcceptAppointments] = useState("");

    const [bookingAppointmentDetailsDialog, setBookAppointmentDetailsDialog] =
        useState(false);

    const [slotData, setSlotData] = useState([]);
    const [tokenData, setTokensData] = useState([]);

    const [slotsLoading, setSlotsLoading] = useState(false);
    const [bookingAppointmentDialog, setBookAppointmentDialog] =
        useState(false);
    const [confirmBookAppointmentDialog, setConfirmBookAppointmentDialog] =
        useState(false);

    const selectDoctor = (data) => {
        setBookingAppointmentDetails({
            ...bookingAppointmentDetails,
            nameOfTheDoctor: data.nameOfTheDoctor,
            imgurl: data.imgurl,
            doctorid: data._id,
            connsultationFee: data.connsultationFee,
            location: data.location,
            hospitalName: data?.hospitalId?.nameOfhospitalOrClinic || null,
        });
        setInputValue({ ...inputValue, doctorid: data._id });
        setAcceptAppointments(data.acceptAppointments);
        setBookAppointmentDialog(true);
    };

    const getAvailableSlots = async () => {
        try {
            datedumb = false;
            if (bookingAppointmentDetails.appointmentDate) {
                setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAvailbleSlotsForAnUser/${bookingAppointmentDetails.doctorid}/${bookingAppointmentDetails.appointmentDate}`
                );
                if (response.status === "ok") {
                    datedumb = true;
                    setSlotsLoading(false);
                    return setSlotData(response.result);
                }
            }
        } catch (error) {
            setSlotsLoading(false);
            toast.error("something went wrong");
        }
    };

    useEffect(() => {
        getAvailableSlots();
    }, [bookingAppointmentDetails.appointmentDate]);

    const getAvailableTokenTime = async () => {
        if (doctorsId) {
            try {
                setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctorsId}/${currentDate}`
                );
                console.log(response);
                if (response.status === "ok") {
                    setSlotsLoading(false);
                    return setTokensData(response.result);
                }
            } catch (error) {
                setSlotsLoading(false);
                toast.error("something went wrong");
            }
        }
        return false;
    };

    useEffect(() => {
        getAvailableTokenTime();
    }, [acceptAppointments === "byToken"]);

    const handleDateSelect = (e, i) => {
        setActiveDate(true);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(1));
    }, []);

    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 7; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push({
                day: date.format("ddd").toUpperCase(),
                date: date.format("DD").toUpperCase(),
                month: date.format("MMM").toUpperCase(),
            });
        }

        setDates(monthsDates);
    };

    useEffect(() => {
        getWeekDates();
    }, []);

    const getSingleDoctorDetails = async () => {
        if (!isLoggedIn) {
            navigate("/user/signin", {
                state: { prevUrl: urlLocation.pathname },
            });
            return false;
        }
        console.log("hello hiiiiii");
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorsId}`
            );

            if (response.status === "ok") {
                setDuid(response.result.doctorid);
                setDoctorsData(response.result);
                try {
                    const hospitaList = await axiosClient.get(
                        `/v2/multipleloginprofile/${response?.result?.doctorid}`
                    );
                    if (hospitaList.status === "ok") {
                        setHospitalList(hospitaList.result);
                    }
                    return;
                } catch (error) {
                    // setBookAppointmentButtonLoading(false);
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorsId]);

    // console.log(
    //     doctorsData?.reviews.map((review) => review)
    // );

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 48px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "100vh",
                }}
            >
                {/* <Stack
                    sx={{
                        background: {
                            xs: "#1F51C6",
                            sm: "#1F51C6",
                            md: "none",
                        },
                        m: "0 auto",
                        borderRadius: "5px",
                        p: 2,
                        display: { xs: "none", sm: "none", md: "flex" },
                    }}
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    justifyContent="center"
                    spacing={2}
                    width={{ xs: "100%", sm: "100%", md: "70%" }}
                >
                    <TextField
                        size="small"
                        placeholder="Enter Location"
                        sx={{ flex: 0.5, background: "#ffffff" }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img src="/location.svg" alt="" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        size="small"
                        placeholder="Search doctors, clinics, etc."
                        sx={{ flex: 0.7, background: "#ffffff" }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img src="/doctor.svg" alt="" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack> */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                        marginTop: "30px",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ flex: 2 }}>
                        <Card
                            sx={{
                                display: "flex",
                                // alignItems: "center",
                                // px: "10px",
                                p: "25px",
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                            }}
                        >
                            <Box>
                                <img
                                    src={
                                        doctorsData?.imgurl
                                            ? doctorsData?.imgurl
                                            : "/default.png"
                                    }
                                    width={"118px"}
                                    height={"118px"}
                                    style={{ borderRadius: "50%" }}
                                    alt="img"
                                />
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="initial"
                                        margin={"0 10px"}
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontWeight: 600,
                                            fontSize: "22px",
                                            lineHeight: "25.83px",
                                        }}
                                    >
                                        Dr {doctorsData?.nameOfTheDoctor}
                                    </Typography>
                                    <CheckCircleIcon
                                        color="success"
                                        sx={{ width: "20px", height: "20px" }}
                                    />
                                </Box>
                                <Typography
                                    component={"span"}
                                    margin={"0 10px"}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#706D6D",
                                    }}
                                >
                                    {doctorsData?.speciality}
                                </Typography>
                                <Typography
                                    component={"span"}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#706D6D",
                                    }}
                                >
                                    {doctorsData?.yearOfExprience} Years
                                    Experience
                                </Typography>
                                <Typography
                                    component={"p"}
                                    fontSize={12}
                                    margin={"0 10px"}
                                    sx={{
                                        fontFamily: "Lato",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        color: "#000000BD",
                                    }}
                                >
                                    {doctorsData?.description}
                                </Typography>
                            </Box>
                        </Card>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            my={2}
                            sx={{
                                fontFamily: "Raleway",
                                fontSize: "30px",
                                fontWeight: "600",
                                color: "#000000",
                            }}
                        >
                            Reviews
                        </Typography>
                        {/* This is Web view */}
                        <Stack spacing={2}>
                            {doctorsData &&
                                doctorsData?.reviews?.map((review, i) => {
                                    return (
                                        <Card
                                            key={i}
                                            sx={{
                                                p: "15px",
                                                height: "104px",
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            review?.userid
                                                                ?.imgurl
                                                        }
                                                        sx={{
                                                            width: "69.88px",
                                                            height: "69.88px",
                                                        }}
                                                    />

                                                    <Box
                                                        style={{
                                                            marginInline:
                                                                "10px",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontFamily:
                                                                    "Raleway",
                                                                fontSize:
                                                                    "19.06px",
                                                                fontWeight:
                                                                    "500",
                                                                color: "#000000",
                                                                lineHeight:
                                                                    "22.38px",
                                                            }}
                                                        >
                                                            {
                                                                review?.userid
                                                                    ?.name
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontFamily:
                                                                    "Raleway",
                                                                fontSize:
                                                                    "19.06px",
                                                                fontWeight:
                                                                    "400",
                                                                color: "#000000",
                                                                lineHeight:
                                                                    "24.78px",
                                                            }}
                                                        >
                                                            {review.message}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Rating
                                                        name="read-only"
                                                        value={review.rating}
                                                        readOnly
                                                        sx={{
                                                            fontSize: "2rem",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Card>
                                    );
                                })}
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            // background: "yellow",
                            flex: 0.8,
                            // background: grey[300],
                            margin: "0 20px",
                            width: "394px",
                            height: "371px",
                        }}
                    >
                        <Card
                            sx={{
                                padding: "25px",
                                border: "1px solid #D9D9D9",
                                boxShadow: "none",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    fontSize: "22px",
                                }}
                            >
                                Hospitals List
                            </Typography>
                            <Divider
                                sx={{
                                    my: "23px",
                                    color: "#D9D9D9",
                                    mx: "-25px",
                                }}
                            />
                            {hospitalList?.map((hospital, i) => (
                                <Stack
                                    key={i}
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "center",

                                        borderBottom: "1px solid #D9D9D9",
                                        p: "5px",
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
                                                hospital?.hospitalId === null
                                                    ? hospital?.imgurl
                                                    : hospital?.hospitalId
                                                          ?.imgurl ||
                                                      "/default.png"
                                            }
                                            sx={{
                                                width: "58px",
                                                height: "58px",
                                            }}
                                        />
                                        {/* </Badge> */}
                                        <Stack>
                                            <Typography
                                                sx={{
                                                    lineHeight: "21.6px",
                                                    fontFamily: "Lato",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {hospital?.hospitalId === null
                                                    ? hospital?.nameOfTheDoctor
                                                    : hospital?.hospitalId
                                                          ?.nameOfhospitalOrClinic}
                                            </Typography>
                                            <Stack direction="row">
                                                {/* <Box
                                                    component="span"
                                                    sx={{
                                                        lineHeight: "19.2px",
                                                        fontFamily: "Lato",
                                                        color: "#706D6D",
                                                    }}
                                                >
                                                    {hospital?.hospitalId ===
                                                    null
                                                        ? hospital?.connsultationFee
                                                        : hospital?.hospitalId
                                                              ?.connsultationFee}
                                                </Box> */}
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        lineHeight: "19.2px",
                                                        fontFamily: "Lato",
                                                        color: "#706D6D",
                                                    }}
                                                >
                                                    {hospital?.hospitalId ===
                                                    null
                                                        ? hospital?.location
                                                        : hospital?.hospitalId
                                                              ?.location}
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Button
                                        onClick={() => selectDoctor(hospital)}
                                        variant="contained"
                                        sx={{
                                            textTransform: "none",
                                            p: "14px 42px",
                                            height: "40px",
                                            fontSize: "1rem",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            borderRadius: "20px",
                                            boxShadow: "none",
                                        }}
                                    >
                                        Book
                                    </Button>
                                </Stack>
                            ))}
                            {/* <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    marginTop: "20px",
                                    userSelect: "none",
                                }}
                            >
                                {dates.map((date, i) => (
                                    <Card
                                        onClick={(e) => {
                                            setActiveCard(i);
                                            setDateErr(false);
                                            const dateString =
                                                e.target.innerText;
                                            console.log();
                                            const dateObject = dayjs(
                                                dateString + dayjs().year()
                                            );

                                            const formattedDate =
                                                dateObject.format("YYYY-MM-DD");
                                            console.log(formattedDate);
                                            setInputValue({
                                                ...inputValue,
                                                appointmentDate: formattedDate,
                                            });
                                            setBookingAppointmentDetails({
                                                ...bookingAppointmentDetails,
                                                appointmentDate: formattedDate,
                                            });
                                        }}
                                        sx={{
                                            width: "50px",
                                            textAlign: "center",
                                            margin: "5px 8px",
                                            padding: "5px",
                                            textTransform: "none",
                                            fontFamily: "Lato",
                                            fontWeight: "700",
                                            fontSize: "12px",
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                            cursor: "pointer",
                                            background:
                                                activeCard === i
                                                    ? "#1F51C6"
                                                    : "#ffffff",
                                            color:
                                                activeCard === i
                                                    ? "#ffffff"
                                                    : " #000000",
                                        }}
                                        key={i}
                                    >
                                        {date.day}
                                        <br />
                                        {date.date}
                                        <br />
                                        {date.month}
                                    </Card>
                                ))}
                            </Box> */}
                        </Card>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: { xs: "block", sm: "block", md: "none" },
                        justifyContent: "space-between",
                    }}
                >
                    <Stack
                        spacing={1}
                        lineHeight={"1px"}
                        direction="row"
                        sx={{
                            background: "#1F51C6",
                            borderRadius: "5px",
                            p: 2,
                        }}
                    >
                        <Avatar
                            src={
                                doctorsData?.imgurl
                                    ? doctorsData.imgurl
                                    : "/default.png"
                            }
                            alt="img"
                            width={60}
                            height={60}
                        />
                        <Stack spacing={-0.3}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#ffffff",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {doctorsData?.nameOfTheDoctor}
                                <CheckCircleIcon color="success" />
                            </Typography>
                            <Typography sx={{ color: "#ffffff" }}>
                                {doctorsData.yearOfExprience} Years experience
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "0.8rem",
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={4}
                                    readOnly
                                />
                                &nbsp;
                                <Box
                                    component={"span"}
                                    sx={{ color: "#ffffff" }}
                                >
                                    114 Ratings
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                    <Card
                        sx={{
                            border: "1px solid #D9D9D9",
                            mt: 2,
                            borderRadius: "7px",
                            boxShadow: "none",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#ffffff",
                                background: "#1F51C6",
                                fontFamily: "Raleway",
                                fontSize: "15px",
                                // m: -2,
                                p: 2,
                            }}
                        >
                            Hospitals List
                        </Typography>
                        {hospitalList.map((hospital, i) => (
                            <Stack
                                key={i}
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                    borderBottom: "1px solid #D9D9D9",
                                    p: "5px",
                                    // width: {
                                    //     xs: "300px",
                                    //     sm: "300px",
                                    //     md: "603px",
                                    // },
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
                                            hospital?.hospitalId === null
                                                ? hospital?.imgurl
                                                : hospital?.hospitalId
                                                      ?.imgurl || "/default.png"
                                        }
                                        sx={{
                                            width: "58px",
                                            height: "58px",
                                        }}
                                    />
                                    {/* </Badge> */}
                                    <Stack>
                                        <Typography
                                            sx={{
                                                lineHeight: "21.6px",
                                                fontFamily: "Lato",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {hospital?.hospitalId === null
                                                ? hospital?.nameOfTheDoctor
                                                : hospital?.hospitalId
                                                      ?.nameOfhospitalOrClinic}
                                        </Typography>
                                        <Stack direction="row">
                                            <Box
                                                component="span"
                                                sx={{
                                                    lineHeight: "19.2px",
                                                    fontFamily: "Lato",
                                                    color: "#706D6D",
                                                }}
                                            >
                                                {hospital?.hospitalId === null
                                                    ? hospital?.connsultationFee
                                                    : hospital?.hospitalId
                                                          ?.connsultationFee}
                                            </Box>
                                            <Box
                                                component="span"
                                                sx={{
                                                    lineHeight: "19.2px",
                                                    fontFamily: "Lato",
                                                    color: "#706D6D",
                                                }}
                                            >
                                                {hospital?.hospitalId === null
                                                    ? hospital?.location
                                                    : hospital?.hospitalId
                                                          ?.location}
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Button
                                    onClick={() => selectDoctor(hospital)}
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        p: "14px 42px",
                                        height: "40px",
                                        fontSize: "1rem",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        borderRadius: "20px",
                                        boxShadow: "none",
                                    }}
                                >
                                    Book
                                </Button>
                            </Stack>
                        ))}
                        {/* <Box
                            sx={{
                                marginTop: "25px",
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                        >
                            {dates.map((date, i) => (
                                <Card
                                    onClick={(e) => {
                                        setActiveCard(i);
                                        setDateErr(false);
                                        const dateString = e.target.innerText;
                                        console.log();
                                        const dateObject = dayjs(
                                            dateString + dayjs().year()
                                        );

                                        const formattedDate =
                                            dateObject.format("YYYY-MM-DD");
                                        console.log(formattedDate);
                                        setInputValue({
                                            ...inputValue,
                                            appointmentDate: formattedDate,
                                        });
                                        setBookingAppointmentDetails({
                                            ...bookingAppointmentDetails,
                                            appointmentDate: formattedDate,
                                        });
                                    }}
                                    sx={{
                                        width: "50px",
                                        textAlign: "center",
                                        margin: "5px 8px",
                                        padding: "5px",
                                        textTransform: "none",
                                        fontFamily: "Lato",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        cursor: "pointer",
                                        background:
                                            activeCard === i
                                                ? "#1F51C6"
                                                : "#ffffff",
                                        color:
                                            activeCard === i
                                                ? "#ffffff"
                                                : " #000000",
                                    }}
                                    key={i}
                                >
                                    {date.day}
                                    <br />
                                    {date.date}
                                    <br />
                                    {date.month}
                                </Card>
                            ))}
                        </Box> */}
                        {/* <Box sx={{ mt: 2 }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                justifyContent="center"
                            >
                                <Box sx={{ textAlign: "center" }}>
                                    <Button
                                        className={
                                            slotTime
                                                ? "active button-style"
                                                : "button-style"
                                        }
                                        size="small"
                                        variant="contained"
                                    >
                                        12:30 PM
                                    </Button>
                                    <Typography
                                        component={"p"}
                                        fontSize={"10px"}
                                        className="slotAvailable"
                                    >
                                        2 slots available
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Button
                                        className={
                                            slotTime
                                                ? "active button-style"
                                                : "button-style"
                                        }
                                        size="small"
                                        variant="contained"
                                    >
                                        12:30 PM
                                    </Button>
                                    <Typography
                                        component={"p"}
                                        fontSize={"10px"}
                                        className="slotAvailable"
                                    >
                                        2 slots available
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Button
                                        className={
                                            slotTime
                                                ? "active button-style"
                                                : "button-style"
                                        }
                                        size="small"
                                        variant="contained"
                                    >
                                        12:30 PM
                                    </Button>
                                    <Typography
                                        component={"p"}
                                        fontSize={"10px"}
                                        className="slotAvailable"
                                    >
                                        2 slots available
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Button
                                        className={
                                            slotTime
                                                ? "active button-style"
                                                : "button-style"
                                        }
                                        size="small"
                                        variant="contained"
                                    >
                                        12:30 PM
                                    </Button>
                                    <Typography
                                        component={"p"}
                                        fontSize={"10px"}
                                        className="slotAvailable"
                                    >
                                        2 slots available
                                    </Typography>
                                </Box>
                            </Stack>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    borderRadius: "25px",
                                    background: "#15B912",
                                    textTransform: "none",
                                    px: "15px",
                                    my: 1,
                                    width: "100%",
                                }}
                                // onClick={() =>
                                //     navigate("/doctor/appointment/payment")
                                // }
                            >
                                Book Appointment
                            </Button>
                        </Box> */}
                    </Card>
                    <Card
                        onClick={() => setDropDown(!dropDown)}
                        sx={{
                            display: "flex",
                            mt: 2,
                            px: 2,
                            py: 1,
                            border: " 1px solid #D9D9D9",
                            boxShadow: "none",
                        }}
                    >
                        <Typography sx={{ flex: 1, fontWeight: 700 }}>
                            About Doctor
                        </Typography>
                        {dropDown ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </Card>
                    <Card
                        sx={{
                            p: 2,
                            mt: 2,
                            border: " 1px solid #D9D9D9",
                            boxShadow: "none",
                            display: dropDown ? "block" : "none",
                        }}
                    >
                        <Typography sx={{ color: "#706D6D" }}>
                            {doctorsData.description}
                        </Typography>
                    </Card>
                    {/* This is Mobile view */}
                    <Card
                        sx={{
                            display: "flex",
                            mt: 2,
                            px: 2,
                            py: 1,
                            border: " 1px solid #D9D9D9",
                            boxShadow: "none",
                        }}
                    >
                        <Typography sx={{ flex: 1, fontWeight: 700 }}>
                            Reviews
                        </Typography>
                    </Card>

                    <Stack spacing={1} sx={{ mt: 1 }}>
                        {doctorsData &&
                            doctorsData.reviews?.map((review, i) => {
                                return (
                                    <Card
                                        key={i}
                                        sx={{
                                            p: 2,
                                            mt: 2,
                                            border: " 1px solid #D9D9D9",
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={review.userid.imgurl}
                                            />
                                            <Stack spacing={-0.6}>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {review.userid.name} &nbsp;{" "}
                                                    <Rating
                                                        name="read-only"
                                                        value={review.rating}
                                                        readOnly
                                                    />
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        fontSize: "0.6rem",
                                                        fontWeight: 600,
                                                        color: "#383838",
                                                    }}
                                                >
                                                    {review.message}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Card>
                                );
                            })}

                        {/* <Card
                            sx={{
                                p: 2,
                                mt: 2,
                                border: " 1px solid #D9D9D9",
                                boxShadow: "none",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Avatar alt="Remy Sharp" src="/client.png" />
                                <Stack spacing={-0.6}>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Ashwini Hingolikar &nbsp;{" "}
                                        <Rating
                                            name="read-only"
                                            value={4}
                                            readOnly
                                        />
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            fontSize: "0.6rem",
                                            fontWeight: 600,
                                            color: "#383838",
                                        }}
                                    >
                                        Best Medical app! Easy to use.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Card> */}
                    </Stack>
                    {/* <Card
                        sx={{
                            display: "flex",
                            mt: 2,
                            px: 2,
                            py: 1,
                            border: " 1px solid #D9D9D9",
                            boxShadow: "none",
                        }}
                    >
                        <Typography sx={{ flex: 1, fontWeight: 700 }}>
                            Info
                        </Typography>
                    </Card> */}
                    {/* <Card
                        sx={{
                            p: 2,
                            mt: 2,
                            border: " 1px solid #D9D9D9",
                            boxShadow: "none",
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Stack>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: 600,
                                        width: "75%",
                                        lineHeight: "16px",
                                    }}
                                >
                                    Smilekraft Maxillofacial surgery & Dental
                                    Hospital
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "0.6rem",
                                        fontWeight: 600,
                                        color: "#706D6D",
                                    }}
                                >
                                    66/1, Ashish Apartments, 2nd Floor,
                                    Abhyankar Marg Road., Landmark: Opposite
                                    Anand Ashram Hotel, Nagpur
                                </Typography>
                                <Stack direction="row" spacing={1} my={1}>
                                    <img src="/hospital-img1.png" alt="img" />
                                    <img src="/hospital-img1.png" alt="img" />
                                    <img src="/hospital-img1.png" alt="img" />
                                    <img src="/hospital-img1.png" alt="img" />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card> */}
                </Box>
            </Box>
            <BookAppointmnetDetailsDialog
                inputValue={inputValue}
                setInputValue={setInputValue}
                setConfirmBookAppointmentDialog={
                    setConfirmBookAppointmentDialog
                }
                bookingAppointmentDetailsDialog={
                    bookingAppointmentDetailsDialog
                }
                setBookAppointmentDetailsDialog={
                    setBookAppointmentDetailsDialog
                }
                bookingAppointmentDetails={bookingAppointmentDetails}
                setBookingAppointmentDetails={setBookingAppointmentDetails}
                acceptAppointments={acceptAppointments}
                setAcceptAppointments={setAcceptAppointments}
            />
            <BookAppointmentDialogForPatient
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
                datedumb={datedumb}
                inputValue={inputValue}
                setInputValue={setInputValue}
                slotData={slotData}
                tokenData={tokenData}
                setSlotData={setSlotData}
                slotsLoading={slotsLoading}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                acceptAppointments={acceptAppointments}
                setAcceptAppointments={setAcceptAppointments}
            />
            <ConfirmAppointmentDialog
                inputValue={inputValue}
                setInputValue={setInputValue}
                setActiveCard={setActiveCard}
                setSelectedTime={setSelectedTime}
                setSlotData={setSlotData}
                confirmBookAppointmentDialog={confirmBookAppointmentDialog}
                setConfirmBookAppointmentDialog={
                    setConfirmBookAppointmentDialog
                }
                bookingAppointmentDetails={bookingAppointmentDetails}
                setBookingAppointmentDetails={setBookingAppointmentDetails}
                bookingAppointmentDialog={bookingAppointmentDialog}
                setBookAppointmentDialog={setBookAppointmentDialog}
                setBookAppointmentDetailsDialog={
                    setBookAppointmentDetailsDialog
                }
                acceptAppointments={acceptAppointments}
                setAcceptAppointments={setAcceptAppointments}
                setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
            />
            {/* <AppointmentConfirmDIalog
                setConfirmedAppointmentData={setConfirmedAppointmentData}
                setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
                appointmentCofirmedDialog={appointmentCofirmedDialog}
                openBookingAppointmentDialog={bookingAppointmentDialog}
                setOpenBookingAppointmentDialog={setBookAppointmentDialog}
                bookingAppointmentDetails={bookingAppointmentDetails}
                inputValue={inputValue}
                setInputValue={setInputValue}
            /> */}
            <Footer />
        </>
    );
};

export default DoctorInfo;
