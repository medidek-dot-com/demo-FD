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
    Rating,
    CardContent,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styled from "@emotion/styled";

import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { BsFillCalendarFill } from "react-icons/bs";
import { MdDashboard, MdLogout } from "react-icons/md";
import { ImPencil } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { PiCertificateFill } from "react-icons/pi";

import { logout } from "../../Store/authSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GroupIcon from "@mui/icons-material/Group";
import CourseDetailSkeleton from "../../Components/Doctor/Skeleton/CourseDetailSkeleton";
import { BiSolidBook } from "react-icons/bi";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import CourseEnrollFormDialog from "../../Components/Doctor/CourseEnrollFormDialog";
import { logOutDoctor } from "../../Store/doctorDataSlice";
// import { BsFillCalendarFill } from "react-icons/bs";

// const TextFieldStyle = styled(TextField)({
//     // marginBottom: "20px",

// });

const CourseDiscriptionTypography = styled(Box)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const CourseImageStyle = styled("img")(({ theme }) => ({
    width: "259px",
    height: "192px",
    margin: "10px auto",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "120px",
        height: "103px",
    },
}));

const SearchFeildStyle = styled(TextField)({
    "& .css-1kzw815-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "25px",
    },
});

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

const DoctorCourseDetails = () => {
    const { doctorid, course_id } = useParams();
    const [courseEnrollDialog, setCourseEnrollDialog] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctor);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(3);
    const [courseDetails, setCourseDetails] = useState({});
    const [allCourse, setallCourse] = useState([]);

    const [menu, setMenu] = useState(false);

    const numberOfHospitals = user;

    // const {hospital_id} = useParams();
    const navigate = useNavigate();

    const [err, setError] = useState(false);
    // const propLocation = hospitalLocation

    const [inputImage, setInputImage] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const getAllCourses = async () => {
        try {
            const result = await axiosClient.get(
                `/v2/getCourse?search=${search}`
            );
            setLoading(false);
            setallCourse(result.result);
        } catch (error) {}
    };

    // useEffect(() => {
    //     getAllCourses();
    // }, [search]);

    const getCourses = async () => {
        const result = await axiosClient.get(`/v2/getCourse`);
        setallCourse(result.result);
        setLoading(false);
    };

    useEffect(() => {
        getCourses();
        getAllCourses();
    }, []);

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const logOutUser = async () => {
        dispatch(logOutDoctor());
        dispatch(logout());
        await axiosClient.post("/v2/logout");
        removeItem(KEY_ACCESS_TOKEN);
        // navigate('/')
        // window.location.href = '/master/signin'
        window.location.replace("/");
    };

    const getsignleCourseDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getSingleCourse/${course_id}`
            );
            if (response.status === "ok") {
                setCourseDetails(response.result);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getsignleCourseDetails();
    }, [course_id]);

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
                        src={user?.imgurl ? user.imgurl : "/default.png"}
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
                                navigate(`/doctor/dashboard/${doctor?._id}`) &
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
                            Dashboard
                        </Button>
                        <Button
                            onClick={() =>
                                navigate(
                                    `/doctor/appointments/${doctor?._id}`
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
                                background: "#ffffff",
                                fontFamily: "Lato",
                                fontSize: "1.5rem",
                                textTransform: "none",
                                lineHeight: "28.8px",
                                ":hover": {
                                    background: "#ffffff",
                                },
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
                                navigate(
                                    `/doctor/appointment-settings/${doctor?._id}`
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
                                        doctor?.imgurl
                                            ? doctor.imgurl
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
                                    Dr. {doctor.nameOfTheDoctor}
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
                                                `/doctor/dashboard/${doctor?._id}`
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
                                <Box
                                    sx={{
                                        width: "100%",
                                        background: "#ffffff",
                                    }}
                                >
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                `/doctor/courses/${user?._id}`
                                            )
                                        }
                                        variant="text"
                                        sx={{
                                            ml: "30px",
                                            color: "##1F51C6",
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
                                // mt: "32px",
                                // height: "90vh",
                            }}
                        >
                            {/* <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: {
                                    xs: "column-reverse",
                                    sm: "column-reverse",
                                    md: "row",
                                },
                                gap: "10px",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb:{xs:"0", sm:"0", md:"41px"},
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
                                        (activeTab === 3 &&
                                            "Medical Courses") ||
                                        (activeTab === 4 && "Edit Profile")}
                                </Typography>
                            </Box>
                            {activeTab === 3 && (
                                <SearchFeildStyle
                                    // onChange={(e) => getCourses(e.target.value)}
                                    onChange={(e) => setSearch(e.target.value)}
                                    size="small"
                                    placeholder="Search Courses"
                                    sx={{
                                        width: "300px",
                                        borderRadius: "25px",
                                    }}
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
                                                <img
                                                    src="/search.svg"
                                                    alt="img"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        </Box> */}
                            <>
                                <Box
                                    sx={{ width: "100%", position: "relative" }}
                                >
                                    <Card
                                        sx={{
                                            background: {
                                                xs: "none",
                                                sm: "none",
                                                md: "#DCE3F6",
                                            },
                                            width: "100%",
                                            display: "flex",
                                            py: {
                                                xs: "0",
                                                sm: "0",
                                                md: "25px",
                                            },
                                            px: {
                                                xs: "4px",
                                                sm: "0",
                                                md: "37px",
                                            },
                                            my: { xs: 0, sm: 0, md: 4 },
                                            flexDirection: {
                                                xs: "column-reverse",
                                                sm: "column-reverse",
                                                md: "row",
                                            },
                                            justifyContent: "space-between",
                                            boxShadow: "none",
                                        }}
                                    >
                                        {!loading ? (
                                            <Stack
                                                spacing={2}
                                                sx={{
                                                    flex: 1.6,
                                                    // width: {
                                                    //     xs: "100%",
                                                    //     sm: "100%",
                                                    //     md: "600px",
                                                    // },
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: {
                                                            xs: "20px",
                                                            sm: "20px",
                                                            md: "35px",
                                                        },
                                                        fontFamily: "Raleway",
                                                        lineHeight: {
                                                            xs: "23.48px",
                                                            sm: "23.48px",
                                                            md: "40px",
                                                        },
                                                        color: "#383838",
                                                        textAlign: {
                                                            xs: "center",
                                                            sm: "center",
                                                            md: "left",
                                                        },
                                                    }}
                                                >
                                                    {courseDetails.courseName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: "#706D6D",
                                                        textAlign: {
                                                            xs: "center",
                                                            sm: "center",
                                                            md: "left",
                                                        },
                                                        fontFamily: "Lato",
                                                        fontWeight: "600",
                                                        fontSize: {
                                                            xs: "13px",
                                                            sm: "15px",
                                                        },
                                                    }}
                                                >
                                                    {
                                                        courseDetails.courseDiscription
                                                    }
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    justifyContent={{
                                                        xs: "center",
                                                        sm: "center",
                                                        md: "start",
                                                    }}
                                                >
                                                    <Rating
                                                        value={5}
                                                        readOnly
                                                    />
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            color: "#706D6D",
                                                        }}
                                                    >
                                                        (223,003 ratings)
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        ) : (
                                            <CourseDetailSkeleton />
                                        )}
                                        <Box sx={{ flex: 1 }}> </Box>
                                        <Card
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    sm: "100%",
                                                    md: "347px",
                                                },
                                                p: {
                                                    xs: "0",
                                                    sm: "0",
                                                    md: "16px",
                                                },
                                                position: {
                                                    xs: "static",
                                                    sm: "static",
                                                    md: "absolute",
                                                },
                                                right: "46px",
                                                boxShadow: {
                                                    xs: "none",
                                                    sm: "none",
                                                    md: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                                },
                                            }}
                                        >
                                            <CourseImageStyle
                                                src="/course.png"
                                                alt="img"
                                                style={{
                                                    width: "100%",
                                                    height: "252px",
                                                }}
                                            />
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                p={{
                                                    xs: "10px",
                                                    sm: "10px",
                                                    md: "0",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: 700,
                                                        fontSize: "25px",
                                                    }}
                                                >
                                                    ₹15,999{" "}
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        +₹2,700GST
                                                    </Box>
                                                </Typography>{" "}
                                                &nbsp;
                                                <img
                                                    src="/limited-seat.png"
                                                    alt="img"
                                                    width="141px"
                                                    height="26px"
                                                />
                                            </Stack>
                                            <Button
                                                onClick={() =>
                                                    setCourseEnrollDialog(true)
                                                }
                                                variant="contained"
                                                sx={{
                                                    fontFamily: "Lato",
                                                    fontWeight: 700,
                                                    width: "100%",
                                                    borderRadius: "36px",
                                                    my: 2,
                                                }}
                                            >
                                                Enroll Now
                                            </Button>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Raleway",
                                                    fontWeight: 700,

                                                    color: "#383838",
                                                    textAlign: {
                                                        xs: "center",
                                                        sm: "center",
                                                        md: "left",
                                                    },
                                                }}
                                            >
                                                This Course Includes:
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={{
                                                    xs: 0,
                                                    sm: 0,
                                                    md: 4,
                                                }}
                                                mb={{ xs: 1 }}
                                                justifyContent={{
                                                    xs: "center",
                                                    sm: "center",
                                                    md: "start",
                                                }}
                                            >
                                                <Stack
                                                    justifyContent="space-between"
                                                    sx={{ margin: "0 auto" }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            color: "#706D6D",
                                                            lineHeight:
                                                                "15.6px",
                                                            fontSize: {
                                                                xs: "13px",
                                                                sm: "15px",
                                                                md: "18px",
                                                            },
                                                        }}
                                                    >
                                                        <PiCertificateFill
                                                            color="#1F51C6"
                                                            size="1.6rem"
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        />
                                                        Certificate of
                                                        completion
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            color: "#706D6D",
                                                            fontSize: {
                                                                xs: "13px",
                                                                sm: "15px",
                                                                md: "18px",
                                                            },
                                                        }}
                                                    >
                                                        <GroupIcon
                                                            sx={{
                                                                color: "#1F51C6",
                                                                mr: 1,
                                                            }}
                                                            size="2rem"
                                                        />
                                                        50 students
                                                    </Typography>
                                                </Stack>
                                                <Stack justifyContent="space-between">
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            color: "#706D6D",
                                                            lineHeight:
                                                                "15.6px",
                                                            fontSize: {
                                                                xs: "13px",
                                                                sm: "15px",
                                                                md: "18px",
                                                            },
                                                        }}
                                                    >
                                                        <WatchLaterIcon
                                                            sx={{
                                                                color: "#1F51C6",
                                                                mr: 1,
                                                            }}
                                                        />
                                                        {
                                                            courseDetails.courseDuration
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            fontFamily: "Lato",
                                                            fontWeight: "500",
                                                            color: "#706D6D",
                                                            lineHeight:
                                                                "15.6px",
                                                            fontSize: {
                                                                xs: "13px",
                                                                sm: "15px",
                                                                md: "18px",
                                                            },
                                                        }}
                                                    >
                                                        <BsFillCalendarFill
                                                            color="#1F51C6"
                                                            size="1.2rem"
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        />
                                                        Starts on 21/08/23
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Card>
                                    </Card>
                                </Box>
                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "column",
                                        md: "row",
                                    }}
                                >
                                    <Card
                                        sx={{
                                            p: "20px",
                                            // width: {
                                            //     xs: "100%",
                                            //     sm: "100%",
                                            //     // md: "50%",
                                            // },
                                            flex: 1.4,
                                            // ml: { xs: "0", sm: "0", md: "35px" },
                                            // mr: { xs: "0", sm: "0", md: "auto" },
                                            boxShadow: {
                                                xs: "none",
                                                sm: "none",
                                                md: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Raleway",
                                                fontWeight: "700",
                                                color: "#383838",
                                                fontSize: "30px",
                                                textAlign: {
                                                    xs: "center",
                                                    sm: "center",
                                                    md: "left",
                                                },
                                            }}
                                        >
                                            What You’ll Learn
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: "Lato",
                                                fontWeight: "400",
                                                fontSize: "15px",
                                                color: "#706D6D",
                                                textAlign: {
                                                    xs: "center",
                                                    sm: "center",
                                                    md: "left",
                                                },
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet
                                            consectetur, adipisicing elit.
                                            Molestiae reprehenderit optio nemo a
                                            animi, itaque quidem quisquam
                                            repellendus minus, quasi reiciendis.
                                            Asperiores impedit optio distinctio
                                            explicabo quisquam libero et totam.
                                        </Typography>
                                        <Stack mt={2} spacing={2}>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Lato",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    color: "#706D6D",
                                                    textAlign: {
                                                        xs: "center",
                                                        sm: "center",
                                                        md: "left",
                                                    },
                                                }}
                                            >
                                                Lorem, ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Illum unde consequuntur rem
                                                voluptate quo nesciunt dolore
                                                adipisci incidunt, facere,
                                                deserunt animi accusamus totam
                                                quam veniam inventore fugiat
                                                reiciendis quod ipsa.
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Lato",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    color: "#706D6D",
                                                    textAlign: {
                                                        xs: "center",
                                                        sm: "center",
                                                        md: "left",
                                                    },
                                                }}
                                            >
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Voluptatum laborum eaque nam ea
                                                voluptate unde quae culpa hic
                                                officia, velit quas fugit sequi
                                                ipsum consequuntur corporis iste
                                                nemo distinctio facere!
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Lato",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    color: "#706D6D",
                                                    textAlign: {
                                                        xs: "center",
                                                        sm: "center",
                                                        md: "left",
                                                    },
                                                }}
                                            >
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Magnam, voluptatibus enim!
                                                Soluta, iure. Id, porro quos
                                                vero magni iusto, dolorum,
                                                ducimus debitis quaerat ipsum
                                                veritatis accusamus deserunt ab
                                                est. Unde!
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Lato",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    color: "#706D6D",
                                                    textAlign: {
                                                        xs: "center",
                                                        sm: "center",
                                                        md: "left",
                                                    },
                                                }}
                                            >
                                                Lorem ipsum dolor, sit amet
                                                consectetur adipisicing elit.
                                                Quod odio consectetur error quae
                                                sapiente illum harum iusto neque
                                                ipsam veritatis, voluptatem quis
                                                cupiditate eius officiis
                                                expedita asperiores eveniet nisi
                                                quisquam!
                                            </Typography>
                                        </Stack>
                                    </Card>
                                    <Box sx={{ flex: 1 }}></Box>
                                </Stack>
                            </>
                        </Box>
                    </Box>
                )}
            </Box>
            <CourseEnrollFormDialog
                courseEnrollDialog={courseEnrollDialog}
                setCourseEnrollDialog={setCourseEnrollDialog}
                courseList={allCourse}
            />
        </>
    );
};

export default DoctorCourseDetails;
