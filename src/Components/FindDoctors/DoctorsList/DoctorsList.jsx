import React, { useEffect, useState } from "react";
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
    Stack,
    Rating,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    Autocomplete,
    Avatar,
} from "@mui/material";
import DoctorListII from "./DoctorListII";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FaSort } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Footer from "../../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorsCard from "./DoctorsCard";
import CloseIcon from "@mui/icons-material/Close";
import DateSlider from "./DateSlider";
import { axiosClient, baseURL } from "../../../Utils/axiosClient";
import { useSelector } from "react-redux";
import { NoBackpackSharp } from "@mui/icons-material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import dayjs from "dayjs";
import AppointmentConfirmDIalog from "./AppointmentConfirmDIalog";

const ListItemsStyling = styled(ListItem)`
    border: 2px solid #706d6d57;
    border-radius: 5px;
    padding: 5px 20px;
`;

const ListBoxStyle = styled(Box)`
    margin: 0 10px;
    text-align: center;
    cursor: pointer;
`;

// const SlotTimeButtonStyle = styled(Button)`
//     width: 110px;
//     height: 33px;
//     border-radius: 3px;
//     font-weight: 600;
//     font-size: 15px;
//     font-family: Lato;
//     display: block;
// `;

const SpanTypograophyStyle = styled(Typography)`
    font-size: 10px;
    color: #15b912;
    text-align: center;
`;

const PaginationStyle = styled(Pagination)({
    "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#1F51C6",
        color: "#ffffff",
        ":hover": {
            backgroundColor: "#1640a0",
        },
    },
});

const DatePickerStyle = styled(MobileDatePicker)({
    "& .css-1jnszeg-MuiInputBase-root-MuiOutlinedInput-root": {
        height: "41px",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
        textAlign: "center",
        fontFamily: "Raleway",
        fontWeight: "600",
        fontSize: "16px",
        color: "#383838",
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
        border: "1px solid #1F51C6",
        borderRadius: "31px",
        ":hover": {
            border: "1px solid #1F51C6",
        },
    },
});

const AutocompleteStyle = styled(Autocomplete)({
    "& input::placeholder": {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "16px",
        color: "#706D6D",
        opacity: 1,
    },
    [`& fieldset`]: {
        border: "1px solid #DCE3F6",
    },

    [`& button`]: {
        transform: "none",
    },

    // "& .css-113ntv0-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
    //     {
    //         transform: "none",
    //     },
    "& .css-3crhnd-MuiInputBase-root-MuiOutlinedInput-root": {
        // borderRadius: "62px",
        // border:'1px solid red'
    },
});

const DoctorsList = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const urlLocation = useLocation();
    const [dates, setDates] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);
    const [speciality, setSpeciality] = useState("");
    const [location, setLocation] = useState("");
    const locationName = doctorsData.map((location) => location.location);
    const uniqueLocationName = [...new Set(locationName)];
    const specilityName = doctorsData.map((location) => location.speciality);
    const [activeCard, setActiveCard] = useState();
    const uniquespecilityName = [...new Set(specilityName)];
    const [appointmentAlreadyExistDialog, setAppointmentAlreadyExistDialog] = useState(false);
    const [activeButton, setActiveButton] = useState("1");
    const [confirmedAppointmentData, setConfirmedAppointmentData] = useState(
        {}
    );
    const [appointmentCofirmedDialog, setAppointmentCofirmedDialog] =
        useState(false);
    const [bookingAppointmentDetails, setBookingAppointmentDetails] = useState({
        nameOfTheDoctor: "",
        doctorsId: "",
        appointmentDate: "",
        consultingTime: "",
        hospitalId: "",
        userId: user?._id,
    });
    const [dateErr, setDateErr] = useState(false);
    // const [bookingAppointmentDetails, setBookingAppointmentDetails] = useState({})

    const [confirmBookAppointmentDialog, setConfirmBookAppointmentDialog] =
        useState(false);
    console.log(location);
    const [open, setOpen] = useState(false);
    const getDoctorsList = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getDoctorforSpecialties/abhay?location=${location}&speciality=${speciality}`
            );
            console.log(response.result);
            if (response.status === "ok") {
                console.log(response);
                return setDoctorsData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 8; i++) {
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

    useEffect(() => {
        getDoctorsList();
    }, [location, speciality]);

    const handleClick = (nameOfTheDoctor, doctorsId, consultingTime, hospitalId) => {
        if (!isLoggedIn) {
            navigate("/user/signin", {
                state: { prevUrl: urlLocation.pathname },
            });
            return false;
        }

        setBookingAppointmentDetails({
            ...bookingAppointmentDetails,
            nameOfTheDoctor,
            doctorsId,
            consultingTime,
            hospitalId
        });

        setOpen(true);
    };

    // Define a function to handle button clicks
    const handleButtonClick = (buttonId) => {
        // Set the active button when it's clicked
        setActiveButton(buttonId);
    };

    console.log(bookingAppointmentDetails);

    const bookAppointment = async () => {
        try {
            const response = await axiosClient.post(
                "/v2/createAppoinment",
                bookingAppointmentDetails
            );
            console.log(response);
            if (response.status === "ok") {
                setConfirmedAppointmentData(response.result);
                setAppointmentCofirmedDialog(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 100px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "80vh",
                }}
            >
                {/* <Container sx={{display:"flex", justifyContent:"center", mt:5}}> */}
                <Stack
                    sx={{
                        background: {
                            xs: "#1F51C6",
                            sm: "#1F51C6",
                            md: "none",
                        },
                        m: "0 auto",
                        borderRadius: "5px",
                        p: 2,
                    }}
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    justifyContent="center"
                    spacing={"10px"}
                    width={{ xs: "100%", sm: "100%", md: "70%" }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            display: { xs: "block", sm: "block", md: "none" },
                            textAlign: "center",
                            fontWeight: "700",
                            color: "#ffffff",
                        }}
                    >
                        Find Doctors & Book Appointments
                    </Typography>
                    <Stack>
                        <AutocompleteStyle
                            size="small"
                            disablePortal
                            popupIcon={
                                <img
                                    src="/location.svg"
                                    alt="img"
                                    width={"20.42px"}
                                    height={"29.17px"}
                                />
                            }
                            id="combo-box-demo"
                            // onChange={(e, val) => setLocation(val)}
                            options={uniqueLocationName}
                            // getOptionLabel={(location)=>location.location}
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "290px" },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    onSelect={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    {...params}
                                    placeholder="Enter Location"
                                    sx={{ background: "#ffffff" }}
                                    // InputProps={{
                                    //     endAdornment: (
                                    //         <InputAdornment position="end">
                                    //             <img src="/location.svg" alt="" />
                                    //         </InputAdornment>
                                    //     ),
                                    // }}
                                />
                            )}
                        />

                        {/* <TextField
                        size="small"
                        placeholder="Enter Location"
                        sx={{ flex: 0.5, background: "#ffffff", position:'relative' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img src="/location.svg" alt="" />
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                    </Stack>
                    <Stack>
                        <AutocompleteStyle
                            disablePortal
                            // onChange={(e, v) => setSpeciality(v)}
                            size="small"
                            popupIcon={
                                <img
                                    src="/doctor.svg"
                                    alt="img"
                                    width={"30px"}
                                    height={"30px"}
                                />
                            }
                            id="combo-box-demo"
                            options={uniquespecilityName}
                            // getOptionLabel={(location)=>location.speciality}
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "491px" },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    onSelect={(e) =>
                                        setSpeciality(e.target.value)
                                    }
                                    placeholder="Search doctors, clinics, etc."
                                    {...params}
                                    sx={{
                                        background: "#ffffff",
                                    }}
                                />
                            )}
                        />
                        {/* <TextField
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
                    /> */}
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "80%" },
                        display: "flex",
                        justifyContent: "space-between",
                        m: "10px auto",
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        fontSize={{ xs: "1rem", sx: "1rem", md: "1.6rem" }}
                    >
                        {doctorsData && location && speciality
                            ? doctorsData.length +
                              " " +
                              speciality +
                              " " +
                              "near you"
                            : "Search for a doctor"}
                        {/* {doctorsData.length} {speciality} near you */}
                    </Typography>
                    {/* <Box sx={{ display: "flex" }}>
                        <Box
                            component="span"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                mx: 1,
                            }}
                        >
                            <FaSort color="#706D6D" />
                            Sort By: Nearest
                        </Box>
                        <Box
                            component="span"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: { xs: "0.8rem", sm: "1rem" },
                            }}
                        >
                            <FaFilter color="#706D6D" />
                            Filters
                        </Box>
                    </Box> */}
                </Box>
                <Stack
                    spacing={2}
                    width={{ xs: "100%", sm: "100%", md: "80%" }}
                    m="15px auto"
                >
                    {doctorsData.map((doctor, i) => (
                        <Card
                            key={i}
                            sx={{
                                boxShadow: "none",
                                // height: "170px",
                                border: "1px solid #D9D9D9",
                                p: "25px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: {
                                    xs: "start",
                                    sm: "start",
                                    md: "center",
                                },
                                flexDirection: {
                                    xs: "column",
                                    sm: "column",
                                    md: "row",
                                },
                            }}
                        >
                            <Stack
                                direction="row"
                                onClick={() =>
                                    navigate(`/doctor/details/${doctor._id}`)
                                }
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <Box>
                                    <Avatar
                                        src={
                                            doctor.doctorImg
                                                ? `${baseURL}/Uploads/Hospital/DoctorImage/${doctor.doctorImg}`
                                                : "/default.png"
                                        }
                                        alt="img"
                                        sx={{ width: "118px", height: "118px" }}
                                    />
                                </Box>
                                <Box sx={{ mx: 1 }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="600"
                                        sx={{
                                            fontFamily: "Raleway",
                                            lineHeight: "25.83px",
                                            mb: "8px",
                                        }}
                                        fontSize={{
                                            xs: "1rem",
                                            sm: "1.4",
                                            md: "22px",
                                        }}
                                    >
                                        {doctor.nameOfTheDoctor}
                                    </Typography>
                                    <Typography
                                        fontSize={{
                                            xs: "0.8rem",
                                            sm: "1.4rem",
                                            md: "15px",
                                        }}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "400",
                                            fontSize: "15px",
                                            color: "#706D6D",
                                            lineHeight: "18px",
                                            mb: "8px",
                                        }}
                                    >
                                        <Box component={"span"}>
                                            {doctor.speciality}
                                        </Box>
                                        &nbsp;
                                        {doctor.yearOfExprience} Years
                                        Experience
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            fontSize: {
                                                xs: "0.8rem",
                                                sm: "1.4rem",
                                                md: "1.1rem",
                                            },
                                            mb: "8px",
                                        }}
                                    >
                                        <Rating
                                            size="medium"
                                            name="simple-controlled"
                                            value={5}
                                            readOnly
                                        />
                                        &nbsp;
                                        <Box
                                            component={"span"}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "500",
                                                fontSize: "13px",
                                            }}
                                        >
                                            114 Rating
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src="/location.svg"
                                            width="15px"
                                            height="17px"
                                            alt="img"
                                        />
                                        &nbsp;
                                        <Typography
                                            fontSize={{
                                                xs: "0.8rem",
                                                sm: "1rem",
                                            }}
                                            sx={{
                                                // mb: "8px",
                                                fontSize: "15px",
                                                fontWeight: "semi-bold",
                                                fontFamily: "Lato",
                                                lineHeight: "18px",
                                                color: "#706D6D",
                                            }}
                                        >
                                            {doctor.location}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        fontSize={{
                                            xs: "0.8rem",
                                            sm: "1rem",
                                        }}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontSize: "15px",
                                            fontWeight: "semi-bold",
                                            color: "#706D6D",
                                        }}
                                    >
                                        ₹{doctor.connsultationFee} Consultation
                                        fee
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "auto",
                                    },
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        handleClick(
                                            doctor.nameOfTheDoctor,
                                            doctor._id,
                                            doctor.consultingTime,
                                            doctor.hospitalId,
                                        )
                                    }
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        borderRadius: "25px",
                                        background: "#15B912",
                                        fontSize: "16px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        textTransform: "none",
                                        ":hover": {
                                            background: "#148512",
                                        },
                                        px: "15px",
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "210px",
                                        },
                                    }}
                                >
                                    Book Appointment
                                </Button>
                            </Box>
                        </Card>
                    ))}
                    {/* <Card
                    sx={{
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: { xs: "start", sm: "start", md: "center" },
                        flexDirection: {
                            xs: "column",
                            sm: "column",
                            md: "row",
                        },
                    }}
                >
                    <Stack direction="row">
                        <Box>
                            <img
                                src="/doctor.png"
                                alt="img"
                                width="100px"
                                height="100px"
                            />
                        </Box>
                        <Box sx={{ mx: 1 }}>
                            <Typography
                                variant="h6"
                                fontWeight="600"
                                fontSize={{
                                    xs: "1rem",
                                    sm: "1.4",
                                    md: "1.4rem",
                                }}
                            >
                                Dr Shashwat Magarkar
                            </Typography>
                            <Typography
                                fontSize={{
                                    xs: "0.8rem",
                                    sm: "1.4rem",
                                    md: "1.1rem",
                                }}
                            >
                                <Box component={"span"}>Dentist</Box>&nbsp; 5
                                Years Experience
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: {
                                        xs: "0.8rem",
                                        sm: "1.4rem",
                                        md: "1.1rem",
                                    },
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={5}
                                    readOnly
                                />
                                &nbsp;<Box component={"span"}>114 Rating</Box>
                            </Box>
                            <Stack direction="row" alignItems="center">
                                <img src="/location.svg" width={15} alt="img" />
                                &nbsp;
                                <Typography
                                    fontSize={{
                                        xs: "0.8rem",
                                        sm: "1rem",
                                        md: "1rem",
                                    }}
                                >
                                    Dharampeth
                                </Typography>
                            </Stack>
                            <Typography
                                fontSize={{
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    md: "1rem",
                                }}
                            >
                                ₹500 Consultation fee
                            </Typography>
                        </Box>
                    </Stack>
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                borderRadius: "25px",
                                background: "#15B912",
                                px: "15px",
                                width: { xs: "100%", sm: "100%", md: "200px" },
                            }}
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </Card> */}
                </Stack>
                {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <PaginationStyle
                    count={10}
                    variant="outlined"
                    shape="rounded"
                />
            </Box> */}
                <Dialog
                    open={open}
                    onClose={() => {
                       return setOpen(false) &  setDateErr(false)}}
                    maxWidth={"md"}
                    sx={{ margin: " 0 auto" }}
                >
                    <DialogTitle
                        sx={{
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "22px",
                        }}
                    >
                        Book Appointment
                        {open ? (
                            <IconButton
                                aria-label="close"
                                onClick={() => setOpen(false)}
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
                    </DialogTitle>
                    <DialogContent
                        dividers
                        sx={{
                            margin: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                marginTop: "20px",
                                userSelect: "none",
                            }}
                        >
                            {/* <CarouselStyle
                                    responsive={responsive}
                                    swipeable={true}
                                    slidesToSlide={4}
                                    arrows={false}
                                > */}
                            {dates.map((date, i) => (
                                <Card
                                    onClick={(e) => {
                                        setActiveCard(i);
                                        setDateErr(false);
                                        const dateString = e.target.innerText;
                                        console.log();
                                        const dateObject = dayjs(dateString+dayjs().year());

                                        const formattedDate =
                                            dateObject.format("DD-MM-YYYY");
                                        console.log(formattedDate);

                                        setBookingAppointmentDetails({
                                            ...bookingAppointmentDetails,
                                            appointmentDate: formattedDate,
                                        });
                                    }}
                                    sx={{
                                        width: "50px",
                                        // height: "60px",
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
                            {/* </CarouselStyle> */}
                        </Box>
                       { dateErr && <Box
                            component="span"
                            sx={{
                                color: "red",
                                fontFamily: "Lato",
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            Please choose date!
                        </Box>}
                        {/* <DateSlider /> */}
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerStyle
                                onChange={(e) => {
                                    setDateErr(false);
                                    const dateString = e?.$d;
                                    const dateObject = dayjs(dateString);
                                    const formattedDate =
                                        dateObject.format("DD-MM-YYYY");
                                    console.log(formattedDate);
                                    setBookingAppointmentDetails({
                                        ...bookingAppointmentDetails,
                                        appointmentDate: formattedDate,
                                    });
                                }}
                                sx={{ width: "100%" }}
                            />
                            <Typography
                                sx={{
                                    color: "red",
                                    display: dateErr ? "block" : "none",
                                }}
                            >
                                Please select date
                            </Typography>
                        </LocalizationProvider> */}
                        <List
                            style={{
                                display: "flex",
                                // width: "60%",
                                marginTop: "20px",
                                flexWrap: "wrap",
                            }}
                        >
                            <ListBoxStyle>
                                <Button
                                    variant="contained"
                                    sx={{
                                        // width: "110px",
                                        // height: "33px",
                                        borderRadius: "3px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        fontFamily: "Lato",
                                        display: "block",
                                        cursor: "text",
                                        " :hover": {
                                            background: "#1F51C6",
                                            boxShadow: "none",
                                        },
                                        // backgroundColor:
                                        //     activeButton === 1
                                        //         ? "#1F51C6"
                                        //         : "#ffffff",
                                        // color:
                                        //     activeButton === 1
                                        //         ? "#ffffff"
                                        //         : "#706D6D",
                                        // " :hover": {
                                        //     backgroundColor:
                                        //         activeButton === 1
                                        //             ? "#1F51C6"
                                        //             : "#e3dddd",
                                        //     color:
                                        //         activeButton === 1
                                        //             ? "#ffffff"
                                        //             : "#000000",
                                        // },
                                    }}
                                    onClick={() => handleButtonClick(1)}
                                >
                                    {bookingAppointmentDetails.consultingTime}
                                </Button>
                                {/* <ListItemsStyling
                                onClick={() => handleButtonClick(1)}
                            >
                                12:30
                            </ListItemsStyling> */}
                                {/* <SpanTypograophyStyle
                                    variant="caption"
                                    color="initial"
                                >
                                    2 Slots Available
                                </SpanTypograophyStyle> */}
                            </ListBoxStyle>
                            {/* <ListBoxStyle>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "110px",
                                        height: "33px",
                                        borderRadius: "3px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        fontFamily: "Lato",
                                        display: "block",
                                        backgroundColor:
                                            activeButton === 2
                                                ? "#1F51C6"
                                                : "#ffffff",
                                        color:
                                            activeButton === 2
                                                ? "#ffffff"
                                                : "#706D6D",
                                        " :hover": {
                                            backgroundColor:
                                                activeButton === 2
                                                    ? "#1F51C6"
                                                    : "#e3dddd",
                                            color:
                                                activeButton === 2
                                                    ? "#ffffff"
                                                    : "#000000",
                                        },
                                    }}
                                    onClick={() => handleButtonClick(2)}
                                >
                                    12:30
                                </Button>
                                <SpanTypograophyStyle
                                    variant="caption"
                                    color="initial"
                                >
                                    2 Slots Available
                                </SpanTypograophyStyle>
                            </ListBoxStyle>
                            <ListBoxStyle>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "110px",
                                        height: "33px",
                                        borderRadius: "3px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        fontFamily: "Lato",
                                        display: "block",
                                        backgroundColor:
                                            activeButton === 3
                                                ? "#1F51C6"
                                                : "#ffffff",
                                        color:
                                            activeButton === 3
                                                ? "#ffffff"
                                                : "#706D6D",
                                        " :hover": {
                                            backgroundColor:
                                                activeButton === 3
                                                    ? "#1F51C6"
                                                    : "#e3dddd",
                                            color:
                                                activeButton === 3
                                                    ? "#ffffff"
                                                    : "#000000",
                                        },
                                    }}
                                    onClick={() => handleButtonClick(3)}
                                >
                                    12:30
                                </Button>
                                <SpanTypograophyStyle
                                    variant="caption"
                                    color="initial"
                                >
                                    2 Slots Available
                                </SpanTypograophyStyle>
                            </ListBoxStyle>
                            <ListBoxStyle>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "110px",
                                        height: "33px",
                                        borderRadius: "3px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        fontFamily: "Lato",
                                        display: "block",
                                        backgroundColor:
                                            activeButton === 4
                                                ? "#1F51C6"
                                                : "#ffffff",
                                        color:
                                            activeButton === 4
                                                ? "#ffffff"
                                                : "#706D6D",
                                        " :hover": {
                                            backgroundColor:
                                                activeButton === 4
                                                    ? "#1F51C6"
                                                    : "#e3dddd",
                                            color:
                                                activeButton === 4
                                                    ? "#ffffff"
                                                    : "#000000",
                                        },
                                    }}
                                    onClick={() => handleButtonClick(4)}
                                >
                                    12:30
                                </Button>
                                <SpanTypograophyStyle
                                    variant="caption"
                                    color="initial"
                                >
                                    2 Slots Available
                                </SpanTypograophyStyle>
                            </ListBoxStyle> */}
                        </List>
                        <Button
                            variant="contained"
                            sx={{
                                background: "#15B912",
                                margin: "20px 10px",
                                width: "190px",
                                borderRadius: "40px",
                            }}
                            onClick={() => {
                                if (
                                    !bookingAppointmentDetails.appointmentDate
                                ) {
                                    return setDateErr(true);
                                }

                                setConfirmBookAppointmentDialog(true);
                            }}
                        >
                            Book Appointment
                        </Button>
                    </DialogContent>
                </Dialog>
                <Dialog
                    sx={{ borderRadius: "14px" }}
                    onClose={() => setConfirmBookAppointmentDialog(false)}
                    aria-labelledby="customized-dialog-title"
                    open={confirmBookAppointmentDialog}
                >
                    <DialogTitle
                        sx={{
                            m: 0,
                            p: 2,
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "22px",
                        }}
                        id="customized-dialog-title"
                    >
                        Confirm Appointment With Dr.{" "}
                        {bookingAppointmentDetails.nameOfTheDoctor}
                    </DialogTitle>
                    {confirmBookAppointmentDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() =>
                                setConfirmBookAppointmentDialog(false)
                            }   
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
                                fontSize: "18px",
                                color: "#706D6D",
                                my: "10px",
                                lineHeight: "21.6px",
                            }}
                        >
                            Are you sure you want to book appointment with Dr.{" "}
                            {bookingAppointmentDetails.nameOfTheDoctor}?
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "18px",
                                my: "10px",
                            }}
                        >
                            <span style={{ color: "#1F51C6" }}>Date : </span>{" "}
                            {bookingAppointmentDetails.appointmentDate},{" "}
                            <span style={{ color: "#1F51C6" }}>Time : </span>
                            {bookingAppointmentDetails.consultingTime}{" "}
                        </Typography>
                        <Stack direction="row" spacing="15px">
                            <Button
                                onClick={() =>
                                    setConfirmBookAppointmentDialog(false)
                                }
                                variant="contained"
                                sx={{
                                    width: "328px",
                                    height: "40px",
                                    background: "#D9D9D9",
                                    color: "#383838",
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    borderRadius: "44px",
                                    ":hover": { background: "#706D6D" },
                                }}
                            >
                                Cancel{" "}
                            </Button>
                            <Button
                                onClick={bookAppointment}
                                variant="contained"
                                sx={{
                                    width: "328px",
                                    height: "40px",
                                    background: "#1F51C6",
                                    color: "#ffffff",
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    borderRadius: "44px",
                                }}
                            >
                                Confirm{" "}
                            </Button>
                        </Stack>
                    </DialogContent>
                </Dialog>
                <AppointmentConfirmDIalog
                    confirmedAppointmentData={confirmedAppointmentData}
                    setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
                    appointmentCofirmedDialog={appointmentCofirmedDialog}
                />
            </Box>
            <Footer />
        </>
    );
};

export default DoctorsList;
