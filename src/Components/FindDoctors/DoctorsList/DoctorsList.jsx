import React, { useEffect, useRef, useState } from "react";
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
    Autocomplete as Auto,
    Avatar,
    Tooltip,
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
import { useDispatch, useSelector } from "react-redux";
import { NoBackpackSharp } from "@mui/icons-material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import dayjs from "dayjs";
import AppointmentConfirmDIalog from "./AppointmentConfirmDIalog";
import { tab } from "../../../Store/tabSlice";
import HospitalListDialog from "../../Patient/HospitalListDialog";
import BookAppointmentDialogForPatient from "../../Patient/BookAppointmentDialogForPatient";
import ConfirmAppointmentDialog from "../../Patient/ConfirmAppointmentDialog";
import BookAppointmnetDetailsDialog from "../../Patient/BookAppointmnetDetailsDialog";
import FindDoctorsSkeleton from "../../Skeleton/FindDoctorsSkeleton";
import "ldrs/dotPulse";
import { toast } from "react-toastify";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { IoLogoWhatsapp } from "react-icons/io";

import axios from "axios";
import { TiLocationArrow } from "react-icons/ti";

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

const AutocompleteStyle = styled(Auto)({
    "& input::placeholder": {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "16px",
        color: "#706D6D",
        opacity: 1,
    },
    "& input": {
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
});

let datedumb;
const libraries = ["places"];
const DoctorsList = () => {
    const {
        setValue,
        suggestions: { data },
    } = usePlacesAutocomplete({
        debounce: 300,
        initOnMount: true,
        // callbackName: "YOUR_CALLBACK_NAME",
    });
    let latitude;
    let longitude;
    // const [nearsby, setnearby] = useState({
    //     latitude: "",
    //     longitude: "",
    // });
    console.log(data);
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const urlLocation = useLocation();
    const [dates, setDates] = useState([]);
    const currentDate = moment().format("YYYY-MM-DD");
    const [doctorsData, setDoctorsData] = useState([]);
    const [speciality, setSpeciality] = useState("");
    const [location, setLocation] = useState("");
    const [userLocation, setUserLocation] = useState("");
    // const locationName = doctorsData.map((location) => location?.location);
    // const uniqueLocationName = [...new Set(locationName)];
    const specilityName = doctorsData?.map((location) => location.speciality);
    const [activeCard, setActiveCard] = useState();
    const uniquespecilityName = [...new Set(specilityName)];
    const [hospitalListDialog, setHospitalListDialog] = useState(false);
    const [appointmentAlreadyExistDialog, setAppointmentAlreadyExistDialog] =
        useState(false);
    const [activeButton, setActiveButton] = useState("1");
    const [confirmedAppointmentData, setConfirmedAppointmentData] = useState(
        {}
    );
    const [appointmentCofirmedDialog, setAppointmentCofirmedDialog] =
        useState(false);

    const [acceptAppointments, setAcceptAppointments] = useState("");

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
    const [doctor_id, setDoctor_id] = useState("");

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

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");

    const [selectedTime, setSelectedTime] = useState();

    const [dateErr, setDateErr] = useState(false);
    const [bookingAppointmentDialog, setBookAppointmentDialog] =
        useState(false);

    const [bookingAppointmentDetailsDialog, setBookAppointmentDetailsDialog] =
        useState(false);
    const [confirmBookAppointmentDialog, setConfirmBookAppointmentDialog] =
        useState(false);
    const [open, setOpen] = useState(false);

    const [slotData, setSlotData] = useState([]);
    const [tokenData, setTokensData] = useState([]);

    const [slotsLoading, setSlotsLoading] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    // const [bookAppointmentButtonLoading, setBookAppointmentButtonLoading] =
    //     useState(false);

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef();

    async function calculateRoute() {
        if (userLocation === "" || userLocation === "") {
            return;
        }

        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: userLocation,
            destination: location,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(1));
    }, []);

    const getDoctorsList = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get("/v2/getusergetalldoctors");
            if (response.status === "ok") {
                setIsLoading(false);
                return setDoctorsData(response.result);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    };
    const searchApi = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/searchdoctor/${latitude}/${longitude}`
            );
            setIsLoading(false);
            console.log("search result", response.result.data);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    };
    const doctorsByLocation = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/doctorsByLocation/?location=${location}`
            );
            console.log("search result", response.result.data);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    };
    const getAvailableSlots = async () => {
        try {
            datedumb = false;

            if (bookingAppointmentDetails.appointmentDate) {
                setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAvailbleSlotsForAnUser/${doctor_id}/${bookingAppointmentDetails.appointmentDate}`
                );
                if (response.status === "ok") {
                    setSlotsLoading(false);
                    datedumb = true;
                    return setSlotData(response.result);
                }
            }
        } catch (error) {
            setSlotsLoading(false);
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAvailableSlots();
    }, [bookingAppointmentDetails.appointmentDate]);

    const getAvailableTokenTime = async () => {
        if (doctor_id) {
            try {
                setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctor_id}/${currentDate}`
                );
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

    // useEffect(() => {
    //     getDoctorsList();
    // }, [location, speciality]);

    const handleClick = async (
        nameOfTheDoctor,
        doctorId,
        consultingTime,
        hospitalId,
        duid
    ) => {
        if (!isLoggedIn) {
            navigate("/user/signin", {
                state: { prevUrl: urlLocation.pathname },
            });
            return false;
        }
        // setBookAppointmentButtonLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/multipleloginprofile/${duid}`
            );
            if (response.status === "ok") {
                setHospitalList(response.result);
                setHospitalListDialog(true);
                // setBookAppointmentButtonLoading(false);
            }

            return;
        } catch (error) {
            // setBookAppointmentButtonLoading(false);
            console.log(error);
        }

        // setBookingAppointmentDetails({
        //     ...bookingAppointmentDetails,
        //     nameOfTheDoctor,
        //     doctorsId,
        //     consultingTime,
        //     hospitalId,
        //     doctorid
        // });

        setHospitalListDialog(true);
    };

    // Define a function to handle button clicks
    const handleButtonClick = (buttonId) => {
        // Set the active button when it's clicked
        setActiveButton(buttonId);
    };

    const bookAppointment = async () => {
        try {
            const response = await axiosClient.post(
                "/v2/createAppoinment",
                bookingAppointmentDetails
            );

            if (response.status === "ok") {
                setConfirmedAppointmentData(response.result);
                setAppointmentCofirmedDialog(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [hospitalList, setHospitalList] = useState([]);

    const success = (result) => {
        (latitude = result.coords.latitude),
            (longitude = result.coords.longitude),
            searchApi();
    };
    const error = (result) => {
        console.log(result);
    };

    const nearby = () => {
        navigator.geolocation.getCurrentPosition(success, error);
    };

    useEffect(() => {
        // nearby();
        getDoctorsList();
    }, []);

    const handleSelectedLocation = async (val, speciality) => {
        if (speciality) setSpeciality(speciality);
        if (val !== null) setLocation(val);

        // console.log();
        // const locationValue = val.terms;
        try {
            const response = await axiosClient.post(`/v2/doctorsByLocation`, {
                location: val ? val : location,
                speciality,
            });
            console.log(response);
            setDoctorsData(response.result.data);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
        // setLocation(val?.description);
        // console.log(val.description);
        // if (location) {
        //     doctorsByLocation();
        // }
    };

    return (
        <>
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
                        position: "relative",
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
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                        justifyContent="center"
                        spacing={"10px"}
                        width={{ xs: "100%", sm: "100%", md: "70%" }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                display: {
                                    xs: "block",
                                    sm: "block",
                                    md: "none",
                                },
                                textAlign: "center",
                                fontWeight: "700",
                                color: "#ffffff",
                            }}
                        >
                            Find Doctors & Book Appointments
                        </Typography>
                        {/* {nearsby ? (
                                <Typography variant="block">
                                    {nearsby.latitude}
                                    {nearsby.longitude}
                                </Typography>
                            ) : (
                                <Tooltip title="Near By">
                                    <IconButton onClick={nearby}>
                                        <TiLocationArrow color="#1F51C6" />
                                    </IconButton>
                                </Tooltip>
                            )} */}

                        <Stack>
                            {/* <GoogleMap onLoad={(map) => setMap(map)} /> */}
                            {/* <Autocomplete>
                                    <input
                                        type="text"
                                        placeholder="Origin"
                                        ref={originRef}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                    />
                                </Autocomplete> */}
                            <AutocompleteStyle
                                size="small"
                                disablePortal
                                noOptionsText="Search locations"
                                popupIcon={
                                    <img
                                        src="/location.svg"
                                        alt="img"
                                        width={"20.42px"}
                                        height={"29.17px"}
                                    />
                                }
                                id="combo-box-demo"
                                onChange={(e, val) =>
                                    handleSelectedLocation(val)
                                }
                                options={data}
                                getOptionLabel={(option) =>
                                    typeof option === "string"
                                        ? option
                                        : option.description
                                }
                                filterOptions={(x) => x}
                                renderOption={(props, options) => (
                                    <li {...props}>
                                        <img
                                            src="/location.svg"
                                            alt="location"
                                            width="10px"
                                            style={{ marginRight: "5px" }}
                                        />{" "}
                                        {options.description}
                                    </li>
                                )}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "290px",
                                    },
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        // onSelect={(e) =>
                                        //     setLocation(e.target.value)
                                        // }
                                        {...params}
                                        placeholder="Enter Location"
                                        sx={{ background: "#ffffff" }}
                                    />
                                )}
                                onInputChange={(event, newValue) =>
                                    setValue(newValue)
                                }
                            />
                        </Stack>
                        <Stack>
                            <AutocompleteStyle
                                onChange={(e, v) =>
                                    handleSelectedLocation(null, v)
                                }
                                size="small"
                                disablePortal
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
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "491px",
                                    },
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        // onSelect={(e) =>
                                        //     setSpeciality(e.target.value)
                                        // }
                                        placeholder="Search doctors, clinics, etc."
                                        {...params}
                                        sx={{
                                            background: "#ffffff",
                                        }}
                                    />
                                )}
                            />
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
                            fontSize={{
                                xs: "1rem",
                                sx: "1rem",
                                md: "1.6rem",
                            }}
                        >
                            {doctorsData ===
                            "no doctor available at your location"
                                ? doctorsData
                                : doctorsData && location && speciality
                                ? doctorsData.length +
                                  " " +
                                  " " +
                                  `${speciality} near you`
                                : doctorsData && location
                                ? `${doctorsData.length} Doctors near you`
                                : "Search for a doctor"}
                        </Typography>
                    </Box>
                    <Stack
                        spacing={2}
                        width={{ xs: "100%", sm: "100%", md: "80%" }}
                        m="15px auto"
                    >
                        {isloading && <FindDoctorsSkeleton />}
                        {doctorsData?.map((doctor, i) => (
                            <Card
                                key={i}
                                sx={{
                                    boxShadow: "none",
                                    // height: "170px",
                                    border: "1px solid #D9D9D9",
                                    p: {
                                        xs: "16px",
                                        sm: "16px",
                                        md: "25px",
                                    },
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
                                    gap: "10px",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    onClick={() =>
                                        navigate(
                                            `/doctor/details/${doctor._id}`
                                        )
                                    }
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box>
                                        <Avatar
                                            src={
                                                doctor?.imgurl
                                                    ? doctor.imgurl
                                                    : "/default.png"
                                            }
                                            alt="img"
                                            sx={{
                                                width: {
                                                    xs: "62px",
                                                    sm: "62px",
                                                    md: "118px",
                                                },
                                                height: {
                                                    xs: "62px",
                                                    sm: "62px",
                                                    md: "118px",
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Stack sx={{ mx: 1 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="600"
                                            sx={{
                                                fontFamily: "Raleway",
                                                lineHeight: "25.83px",
                                                // mb: "8px",
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
                                                // mb: "8px",
                                            }}
                                        >
                                            <Rating
                                                size="medium"
                                                name="simple-controlled"
                                                value={5}
                                                readOnly
                                            />
                                            {/* &nbsp;
                                        <Box
                                            component={"span"}
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "500",
                                                fontSize: "13px",
                                            }}
                                        >
                                            114 Rating
                                        </Box> */}
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
                                                lineHeight: "18px",
                                                color: "#706D6D",
                                            }}
                                        >
                                            ₹{doctor.connsultationFee}{" "}
                                            Consultation fee
                                        </Typography>
                                    </Stack>
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
                                                doctor.doctorid
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
                                            boxShadow: "none",
                                        }}
                                    >
                                        Book Appointment
                                        {/* {bookAppointmentButtonLoading ? (
                                        <l-dot-pulse
                                            size="43"
                                            speed="1.3"
                                            color="#1F51C6"
                                        ></l-dot-pulse>
                                    ) : (
                                        "Book Appointment"
                                    )} */}
                                    </Button>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                    <IconButton
                        sx={{
                            position: "fixed",
                            zIndex: 10,
                            right: { xs: 40, sm: 20, md: 100 },
                            bottom: { xs: 70, sm: 20, md: 100 },
                        }}
                    >
                        <a
                            href="https://api.whatsapp.com/send/?phone=%2B918120763387&text=Chat with medidek&type=phone_number&app_absent=0"
                            target="_blank"
                        >
                            <IoLogoWhatsapp size="60px" color="#25D366" />
                        </a>
                    </IconButton>
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
                        setBookingAppointmentDetails={
                            setBookingAppointmentDetails
                        }
                        acceptAppointments={acceptAppointments}
                        setAcceptAppointments={setAcceptAppointments}
                    />
                    <BookAppointmentDialogForPatient
                        bookingAppointmentDetails={bookingAppointmentDetails}
                        bookingAppointmentDialog={bookingAppointmentDialog}
                        datedumb={datedumb}
                        setBookAppointmentDialog={setBookAppointmentDialog}
                        setBookingAppointmentDetails={
                            setBookingAppointmentDetails
                        }
                        confirmBookAppointmentDialog={
                            confirmBookAppointmentDialog
                        }
                        setConfirmBookAppointmentDialog={
                            setConfirmBookAppointmentDialog
                        }
                        setBookAppointmentDetailsDialog={
                            setBookAppointmentDetailsDialog
                        }
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        slotData={slotData}
                        setSlotData={setSlotData}
                        slotsLoading={slotsLoading}
                        activeCard={activeCard}
                        setActiveCard={setActiveCard}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        acceptAppointments={acceptAppointments}
                        setAcceptAppointments={setAcceptAppointments}
                        tokenData={tokenData}
                    />
                    <ConfirmAppointmentDialog
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        setActiveCard={setActiveCard}
                        setSelectedTime={setSelectedTime}
                        confirmBookAppointmentDialog={
                            confirmBookAppointmentDialog
                        }
                        setConfirmBookAppointmentDialog={
                            setConfirmBookAppointmentDialog
                        }
                        bookingAppointmentDetails={bookingAppointmentDetails}
                        setBookingAppointmentDetails={
                            setBookingAppointmentDetails
                        }
                        bookingAppointmentDialog={bookingAppointmentDialog}
                        setBookAppointmentDialog={setBookAppointmentDialog}
                        hospitalListDialog={hospitalListDialog}
                        setHospitalListDialog={setHospitalListDialog}
                        setBookAppointmentDetailsDialog={
                            setBookAppointmentDetailsDialog
                        }
                        setAppointmentCofirmedDialog={
                            setAppointmentCofirmedDialog
                        }
                        confirmedAppointmentData={confirmedAppointmentData}
                        setConfirmedAppointmentData={
                            setConfirmedAppointmentData
                        }
                        acceptAppointments={acceptAppointments}
                        setAcceptAppointments={setAcceptAppointments}
                        setSlotData={setSlotData}
                    />
                    <HospitalListDialog
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        hospitalList={hospitalList}
                        openBookingAppointmentDialog={bookingAppointmentDialog}
                        setOpenBookingAppointmentDialog={
                            setBookAppointmentDialog
                        }
                        hospitalListDialog={hospitalListDialog}
                        setHospitalListDialog={setHospitalListDialog}
                        setBookingAppointmentDetails={
                            setBookingAppointmentDetails
                        }
                        bookingAppointmentDetails={bookingAppointmentDetails}
                        setDoctor_id={setDoctor_id}
                        acceptAppointments={acceptAppointments}
                        setAcceptAppointments={setAcceptAppointments}
                    />
                    {/* <AppointmentConfirmDIalog
                    confirmedAppointmentData={confirmedAppointmentData}
                    setAppointmentCofirmedDialog={setAppointmentCofirmedDialog}
                    appointmentCofirmedDialog={appointmentCofirmedDialog}
                    openBookingAppointmentDialog={bookingAppointmentDialog}
                    setOpenBookingAppointmentDialog={setBookAppointmentDialog}
                    hospitalListDialog={hospitalListDialog}
                    setHospitalListDialog={setHospitalListDialog}
                    bookingAppointmentDetails={bookingAppointmentDetails}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                /> */}
                </Box>
                <Footer />
            </>
        </>
    );
};

export default DoctorsList;
