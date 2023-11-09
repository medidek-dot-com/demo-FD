import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { tab } from "../../../Store/tabSlice";

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

const DoctorInfo = () => {
    const { doctorsId } = useParams();
    const [dates, setDates] = useState([]);
    const [activeDate, setActiveDate] = useState(false);
    const [slotTime, setSlotTime] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [doctorsData, setDoctorsData] = useState({});
    const navigate = useNavigate();

    const handleDateSelect = (e, i) => {
        setActiveDate(true);
        console.log(e.target.innerText);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(1));
    }, []);

    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];

        for (let i = 0; i < 5; i++) {
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
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorsId}`
            );
            console.log(response);

            if (response.status === "ok") {
                return setDoctorsData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorsId]);

    console.log(doctorsData?.reviews);
    const reviews = doctorsData?.reviews;
    console.log(reviews);
    // const getSingleDoctorDetails = async() =>{
    //     try {
    //         const response = await axiosClient.get(
    //             `/v2/getSingleDoctor/${doctorsId}`
    //         );
    //         console.log(response.result);
    //         if (response.status === "ok") {
    //             return setDoctorsData(response.result);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };
    // }

    // useEffect(()=>{
    //     getSingleDoctorDetails()
    // },[doctorsId])

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
                }}
            >
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
                </Stack>
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
                                        doctorsData.imgurl
                                            ? doctorsData.imgurl : "/default.png"
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
                                        Dr {doctorsData.nameOfTheDoctor}
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
                                    {doctorsData.speciality}
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
                                    {doctorsData.yearOfExprience} Years
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
                                    {doctorsData.description}
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
                        <Stack spacing={2}>
                            {reviews?.map((review, i) => {
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
                                                justifyContent: "space-between",
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
                                                    src="/client.png"
                                                    sx={{
                                                        width: "69.88px",
                                                        height: "69.88px",
                                                    }}
                                                />

                                                <Box
                                                    style={{
                                                        marginInline: "10px",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontFamily:
                                                                "Raleway",
                                                            fontSize: "19.06px",
                                                            fontWeight: "500",
                                                            color: "#000000",
                                                            lineHeight:
                                                                "22.38px",
                                                        }}
                                                    >
                                                        {review.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontFamily:
                                                                "Raleway",
                                                            fontSize: "19.06px",
                                                            fontWeight: "400",
                                                            color: "#000000",
                                                            lineHeight:
                                                                "24.78px",
                                                        }}
                                                    >
                                                        Best Medical app! Easy
                                                        to use.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Rating
                                                    name="read-only"
                                                    value={5}
                                                    readOnly
                                                    sx={{ fontSize: "2rem" }}
                                                />
                                            </Box>
                                        </Box>
                                    </Card>
                                );
                            })}
                        </Stack>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "30px",
                                my: "20px",
                            }}
                        >
                            Info
                        </Typography>
                        <Card
                            sx={{
                                p: "20px",
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={{ width: "35%" }}>
                                    <Typography
                                        component="h6"
                                        sx={{
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "22px",
                                            lineHeight: "25.83px",
                                        }}
                                    >
                                        Smilekraft Maxillofacial Surgery And
                                        Dental Hospital
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#706D6D",
                                            fontSize: "15px",
                                            fontFamily: "Lato",
                                            fontWeight: "400",
                                            lineHeight: "18px",
                                            my: "15px",
                                        }}
                                        component="p"
                                        color="initial"
                                    >
                                        66/1, Ashish Apartments, 2nd Floor,
                                        Abhyankar Marg Road., Landmark: Opposite
                                        Anand Ashram Hotel, Nagpur
                                    </Typography>
                                    <img
                                        src="/hospital-img1.png"
                                        alt=""
                                        style={{
                                            margin: "5px",
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <img
                                        src="/hospital-img2.png"
                                        alt=""
                                        style={{
                                            margin: "5px",
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <img
                                        src="/hospital-img3.png"
                                        alt=""
                                        style={{
                                            margin: "5px",
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <img
                                        src="/hospital-img4.png"
                                        alt=""
                                        style={{
                                            margin: "5px",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: "25px",
                                            background: "#15B912",
                                            textTransform: "none",
                                            px: "15px",
                                            my: 1,
                                            width: "190px",
                                            height: "41px",
                                            fontFamily: "Raleway",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        Book Appointment
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                    <Box
                        sx={{
                            background: "yellow",
                            flex: 0.8,
                            background: grey[300],
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
                                Book Appointment
                            </Typography>
                            <Divider
                                sx={{
                                    my: "23px",
                                    color: "#D9D9D9",
                                    mx: "-25px",
                                }}
                            />
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
                                        sx={{
                                            textAlign: "center",
                                            width: "50px",
                                            margin: "5px",
                                            padding: "5px",
                                            cursor: "pointer",
                                            border: "1px solid #D9D9D9",
                                        }}
                                        key={i}
                                    >
                                        <p>{date.day}</p>
                                        <p>{date.date}</p>
                                        <p>{date.month}</p>
                                    </Card>
                                ))}
                                {/* </CarouselStyle> */}
                            </Box>
                            <Box marginTop={"20px"}>
                                <Box sx={{ display: "flex" }}>
                                    <Box textAlign={"center"} margin={"5px"}>
                                        <Button
                                            className="active button-style"
                                            size="small"
                                            variant="contained"
                                            sx={{boxShadow:'none'}}
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
                                    <Box textAlign={"center"} margin={"5px"}>
                                        <Button
                                            className="button-style"
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
                                </Box>
                                <Box style={{ display: "flex" }}>
                                    <Box textAlign={"center"} margin={"5px"}>
                                        <Button
                                            className="button-style"
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
                                    <Box textAlign={"center"} margin={"5px"}>
                                        <Button
                                            className="button-style"
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
                                </Box>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    sx={{
                                        borderRadius: "25px",
                                        background: "#15B912",
                                        textTransform: "none",
                                        px: "15px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        my: 1,
                                        boxShadow: "none",
                                        // width: { xs: "100%", sm: "100%", md: "200px" },
                                    }}
                                    // onClick={() =>
                                    //     navigate("/doctor/appointment/payment")
                                    // }
                                >
                                    Book Appointment
                                </Button>
                            </Box>
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
                                doctorsData.doctorImg
                                    ? `${baseURL}/Uploads/Hospital/DoctorImage/${doctorsData.doctorImg}`
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
                            padding: "10px",
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
                                m: -2,
                                p: 2,
                            }}
                        >
                            Book Appointment
                        </Typography>
                        <Box sx={{ marginTop: "25px" }}>
                            <CarouselStyle
                                responsive={responsive}
                                swipeable={true}
                                slidesToSlide={4}
                            >
                                {dates.map((date, i) => (
                                    <Card
                                        onClick={() => handleDateSelect(e, i)}
                                        sx={{
                                            textAlign: "center",
                                            width: "50px",
                                            margin: "5px",
                                            p: "5px",
                                            cursor: "pointer",
                                            border: "1px solid #D9D9D9",
                                        }}
                                        key={i}
                                    >
                                        {date.day}
                                        <br />
                                        {date.date}
                                        <br />
                                        {date.month}
                                        <br />
                                    </Card>
                                ))}
                            </CarouselStyle>
                        </Box>
                        <Box sx={{ mt: 2 }}>
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
                        </Box>
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
                            Dr. Shashwat Magarkar is an Oral and Maxillofacial
                            Surgeon working at Smilekraft, Dhantoli. He has a
                            keen interest in Dental Implantology, Wisdom tooth
                            Extraction, Fixed and Removable dentures, Root canal
                            Treatment, Cosmetic Dentistry, Orthodontic
                            treatment. He has specialized in Orthognathic
                            Surgery, Cleft lip and palate surgery, Facial trauma
                            surgery. He has received a Gold Medal in Oral and
                            Maxillofacial Surgery. He has completed his
                            graduation from Government Dental College &
                            Hospital, Mumbai in 2007. Upon graduating from
                            dental school, he completed Post-graduation in Oral
                            & Maxillofacial Surgery in 2011. He also completed a
                            1 year super specialty fellowship in Cleft and
                            Craniofacial Surgery at Amrita Institute of Medical
                            Sciences, Kochi. With his intrinsic goal and vision
                            to provide a painless but comprehensive dental
                            experience to his patients, Dr. Shashwat is always
                            on the lookout for new and improved technology that
                            would aid him in achieving this vision. [shrink]
                        </Typography>
                    </Card>
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
                    <Stack spacing={1}>
                        {reviews
                            ? reviews.map((review) => {
                                  return (
                                      <Card
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
                                                  src="/client.png"
                                              />
                                              <Stack spacing={-0.6}>
                                                  <Typography
                                                      sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          fontWeight: 600,
                                                      }}
                                                  >
                                                      {review.name} &nbsp;{" "}
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
                                                      {review.masseage}
                                                  </Typography>
                                              </Stack>
                                          </Stack>
                                      </Card>
                                  );
                              })
                            : null}

                        <Card
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
                        </Card>
                    </Stack>
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
                            Info
                        </Typography>
                    </Card>
                    <Card
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
                    </Card>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default DoctorInfo;
