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
    Skeleton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styled from "@emotion/styled";

import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsFillCalendarFill } from "react-icons/bs";
import { MdDashboard, MdLogout } from "react-icons/md";
import { ImPencil } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import { logout } from "../../Store/authSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GroupIcon from "@mui/icons-material/Group";
import CoursesSkeleton from "../../Components/Doctor/Skeleton/CoursesSkeleton";
import { BiSolidBook } from "react-icons/bi";
import { BsFillCalendarPlusFill } from "react-icons/bs";
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
    font-family: Lato;
    font-weight: 500;
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

const DoctorCourses = () => {
    const { doctorid } = useParams();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(3);
    const [allCourse, setallCourse] = useState([]);

    const [menu, setMenu] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctor);
    const [loading, setLoading] = useState(true);
    const numberOfHospitals = user;

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
    const [search, setSearch] = useState("");

    const getCourses = async () => {
        try {
            const result = await axiosClient.get(
                `/v2/getCourse?search=${search}`
            );
            setLoading(false);
            setallCourse(result.result);
        } catch (error) {}
    };

    useEffect(() => {
        getCourses();
    }, [search]);

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const sizing = {
        margin: { right: 5 },
        width: 308,
        height: 237,
        legend: { hidden: true },
    };

    const logOutUser = async () => {
        await axiosClient.post("/v2/logout");
        dispatch(logout());
        dispatch(logOutDoctor());
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
                    src={doctor?.imgurl ? doctor.imgurl : "/default.png"}
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
                            navigate(`/doctor/dashboard/${doctorid}`) &
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
                            navigate(`/doctor/appointments/${doctorid}`) &
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
                                `/doctor/appointment-settings/${doctorid}`
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
                                        navigate(
                                            `/doctor/dashboard/${doctorid}`
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
                                            `/doctor/appointments/${doctorid}`
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
                                        navigate(`/doctor/courses/${user?._id}`)
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
                                flexDirection: {
                                    xs: "column-reverse",
                                    sm: "column-reverse",
                                    md: "row",
                                },
                                gap: "10px",
                                justifyContent: "space-between",
                                alignItems: "center",
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
                        </Box>
                        <>
                            {allCourse.map((val, i) => (
                                <Card
                                    onClick={() =>
                                        navigate(
                                            `/doctor/course/details/${user._id}/${val._id}`,
                                            { state: allCourse }
                                        )
                                    }
                                    key={i}
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        // p: {xs:0, sm:0, md:2},
                                        boxShadow: "none",
                                        borderBottom: "1px solid #D9D9D9",
                                        flexDirection: "row",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Stack direction="row" sx={{ flex: 1 }}>
                                        <CourseImageStyle
                                            src="/course.png"
                                            alt="img"
                                            // width="100%"
                                            // height="100%"
                                        />

                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontFamily: "Lato",
                                                    fontSize: {
                                                        xs: "13px",
                                                        sm: "15px",
                                                        md: "22px",
                                                    },
                                                    lineHeight: {
                                                        xs: "15px",
                                                        sm: "15px",
                                                        md: "25.83px",
                                                    },
                                                }}
                                            >
                                                {val.courseName}
                                            </Typography>
                                            <CourseDiscriptionTypography
                                                component="span"
                                                sx={{
                                                    color: "#706D6D",
                                                    width: "70%",
                                                    display: {
                                                        xs: "none",
                                                        sm: "none",
                                                        md: "-webkit-box",
                                                    },
                                                }}
                                            >
                                                {val.courseDiscription}
                                            </CourseDiscriptionTypography>

                                            <Box
                                                component="span"
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "none",
                                                        md: "block",
                                                    },
                                                }}
                                            >
                                                <Link
                                                    style={{
                                                        color: "#1F51C6",
                                                        textDecoration: "none",
                                                        display: "inline",
                                                        zIndex: "999",
                                                        fontFamily: "Lato",
                                                        fontSize: "15px",
                                                        fontWeight: "600",
                                                    }}
                                                    to={`/doctor/course/details/${user._id}/${val._id}`}
                                                >
                                                    Read More
                                                </Link>
                                            </Box>
                                            <Stack
                                                direction={"row"}
                                                sx={{
                                                    my: 1,
                                                    display: {
                                                        xs: "none",
                                                        sm: "none",
                                                        md: "flex",
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        mr: 1,
                                                    }}
                                                >
                                                    <WatchLaterIcon
                                                        sx={{
                                                            color: "#1F51C6",
                                                            mr: 1,
                                                        }}
                                                    />
                                                    <Box
                                                        component={"span"}
                                                        sx={{
                                                            color: "#383838",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {val.courseDuration}
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        mr: 1,
                                                    }}
                                                >
                                                    <GroupIcon
                                                        sx={{
                                                            color: "#1F51C6",
                                                            mr: 1,
                                                        }}
                                                    />
                                                    <Box
                                                        component={"span"}
                                                        sx={{
                                                            color: "#383838",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        NA students
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        mr: 1,
                                                    }}
                                                >
                                                    <BsFillCalendarFill color="#1F51C6" />
                                                    <Box
                                                        component={"span"}
                                                        sx={{
                                                            color: "#383838",
                                                            fontWeight: "bold",
                                                            ml: 1,
                                                        }}
                                                    >
                                                        Starts on --
                                                    </Box>
                                                </Box>
                                            </Stack>
                                            <Stack
                                                direction={"row"}
                                                flexWrap="wrap-reverse"
                                                spacing={{
                                                    xs: 0,
                                                    sm: 0,
                                                    md: 1,
                                                }}
                                                alignItems="center"
                                                sx={{
                                                    my: {
                                                        xs: 0,
                                                        sm: 0,
                                                        md: 1,
                                                    },
                                                }}
                                                gap="5px"
                                            >
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        navigate(
                                                            `/doctor/course/details/${user._id}/${val._id}`
                                                        )
                                                    }
                                                    sx={{
                                                        borderRadius: "25px",
                                                        textTransform: "none",
                                                        display: "block",
                                                        width: {
                                                            xs: "100px",
                                                            sm: "100px",
                                                            md: "175px",
                                                        },
                                                        height: {
                                                            xs: "30px",
                                                            sm: "30px",
                                                            md: "41px",
                                                        },
                                                        fontSize: {
                                                            xs: "12px",
                                                            sm: "12px",
                                                            md: "18px",
                                                            fontFamily:
                                                                "Raleway",
                                                            fontWeight: "600",
                                                        },
                                                        boxShadow: "none",
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                                <Rating
                                                    size="small"
                                                    name="read-only"
                                                    value={4}
                                                    readOnly
                                                />
                                                <Box
                                                    component={"span"}
                                                    sx={{
                                                        color: "#706D6D",
                                                        fontSize: {
                                                            xs: "12px",
                                                            sm: "12px",
                                                            md: "13px",
                                                        },
                                                    }}
                                                >
                                                    (223 ratings)
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            lineHeight: "14px",
                                            display: "block",
                                            px: 5,
                                            py: 1,
                                            display: {
                                                xs: "none",
                                                sm: "none",
                                                md: "flex",
                                            },
                                            boxShadow: "none",
                                        }}
                                    >
                                        {val.courseFee}
                                        <br />
                                        <Box
                                            component={"span"}
                                            sx={{ fontSize: "0.6rem" }}
                                        >
                                            +₹2,700 Gst
                                        </Box>
                                    </Button>
                                </Card>
                            ))}
                        </>
                        {loading && (
                            <>
                                {" "}
                                <CoursesSkeleton />
                                <CoursesSkeleton />
                                <CoursesSkeleton />
                                <CoursesSkeleton />
                                <CoursesSkeleton />
                            </>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DoctorCourses;
