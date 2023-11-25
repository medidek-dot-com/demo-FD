import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import {
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddDoctorsDialog from "../../Components/Master/AddDoctorsDialog";
import AddStuffDialog from "../../Components/Master/AddStuffDialog";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import MasterNavBar from "../../Components/Master/MasterNavBar";
import NavBarWrapper from "../../Components/NavBarWrapper/NavBarWrapper";
import { tab } from "../../Store/tabSlice";
import { useDispatch, useSelector } from "react-redux";
import DuidDialog from "../../Components/Master/DuidDialog";

const WrapperStyle = styled(Box)(({ theme }) => ({
    width: "calc(100% - 100px)",
    margin: "10px auto",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "calc(100% - 10px)",
    },
}));

const SearchFeildStyle = styled(TextField)({
    "& .css-1pubn0x-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "55px",
        background: "#DCE3F6",
        "& placeholder": {
            color: "blue",
        },
    },
});

const HospitalDetailsStyle = styled(Box)`
    color: #706d6d;

    display: flex;
    align-items: center;
    width: 60%;
    margin-top: 5px;
`;

const DoctorCardStyle = styled(Card)(({ theme }) => ({
    width: "170px",
    height: "170px",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    border: "2px solid #faf5f5",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "130px",
        height: "130px",
    },
}));

const CarouseBox = styled(Stack)`
    width: 95%;
    padding-inline: 40px;
    display: flex;
    overflow: hidden;
    scroll-behavior: smooth;
`;

const MhomePage = () => {
    const { hospital_id } = useParams();
    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: "",
        qulification: "",
        speciality: "",
        yearOfExprience: "",
        email: "",
        phone: "",
        connsultationFee: "",
        doctorid: "",
        imgurl: "",
        acceptAppointments: "byToken",
    });
    const [hospitalData, setHospitalData] = useState({});
    const [doctorsData, setDoctorsData] = useState([]);
    const [staffsData, setStaffsData] = useState([]);
    const [duidDialog, setDuidDialog] = useState(false);
    const [addDoctorsDialog, setAddDoctorsDialog] = useState(false);
    const [addStaffDialog, setAddStaffDialog] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(tab(0));
    }, []);

    // const getHospitalData = async () => {
    //     const response = await axiosClient.get("/v2/masterData");
    //     if (response.status === "ok") {
    //         setHospitalData(response.result.user);
    //     }
    // };

    const getDoctorsData = async () => {
        const response = await axiosClient.get(
            `/v2/getAlldoctor/${hospital_id}`
        );
        if (response.status === "ok") {
            return setDoctorsData(response.result);
        }
    };
    const getStaffData = async () => {
        const response = await axiosClient.get(`/v2/getstaff/${hospital_id}`);
        console.log(response);
        if (response.status === "ok") {
            return setStaffsData(response.result);
        }
    };

    useEffect(() => {
        // getHospitalData();
        getDoctorsData();
        getStaffData();
        // getStaffData();DoctorsData();
    }, []);

    return (
        <>
            {/* <NavBarWrapper/> */}

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
                <WrapperStyle>
                    <Card
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "22px",
                            marginTop: "10px",
                            background: "#DCE3F6",
                            boxShadow: "none",
                            borderRadius: "10px",
                            height: "234px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <Box>
                                <img
                                    src={
                                        user?.imgurl
                                            ? user.imgurl
                                            : "/default.png"
                                    }
                                    alt="doctor-img"
                                    style={{
                                        borderRadius: "50%",
                                        border: "1px solid #1F51C6",
                                        width: "173px",
                                        height: "173px",
                                    }}
                                />
                            </Box>
                            <Box sx={{ marginLeft: "10px" }}>
                                <Typography
                                    variant={"h4"}
                                    sx={{
                                        fontFamily: "Raleway",
                                        fontSize: "35px",
                                        lineHeight: "41.09px",
                                        fontWeight: "700",
                                        color: "#383838",
                                    }}
                                >
                                    {user?.nameOfhospitalOrClinic}
                                    {/* Wokhardt Hospital, Nagpur. */}
                                </Typography>
                                <HospitalDetailsStyle>
                                    <img
                                        src="/location.svg"
                                        alt="img"
                                        style={{
                                            marginRight: "5px",
                                            width: "24px",
                                            height: "33px",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: 400,
                                            fontSize: "0.938rem",
                                        }}
                                    >
                                        {user?.enterFullAddress} &nbsp;
                                        {user?.location} &nbsp;
                                        {user?.landmark}
                                    </Typography>
                                </HospitalDetailsStyle>
                                <Rating
                                    name="read-only"
                                    sx={{ mt: 1 }}
                                    value={5}
                                    readOnly
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/master/user/profile/edit/${user?._id}`
                                    )
                                }
                                variant="contained"
                                startIcon={<CreateOutlinedIcon />}
                                sx={{
                                    zIndex: 1000,
                                    textTransform: "none",
                                    borderRadius: "22px",
                                    width: "175px",
                                    fontSize: "18px",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    boxShadow: "none",
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Box>
                    </Card>
                    <Box
                        sx={{
                            display: { xs: "flex", sm: "flex", md: "none" },
                            justifyContent: "center",
                        }}
                    >
                        <SearchFeildStyle
                            size="small"
                            placeholder="Search Doctors/Staff"
                            sx={{
                                width: "300px",
                            }}
                            InputLabelProps={{ color: "red" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src="/search.svg" alt="img" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Hospital name card end here*/}

                    {/* Add Doctor Card starts From Here */}
                    <Box sx={{ my: "10px" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontFamily: "Raleway",
                                fontSize: {
                                    xs: "1.125rem",
                                    sm: "1.125rem",
                                    md: "1.625rem",
                                },
                            }}
                        >
                            Our Doctors
                        </Typography>
                        <Box width={"100%"}>
                            <Stack
                                direction={"row"}
                                gap={2}
                                textAlign={"center"}
                                // alignItems={"center"}
                                overflow={"hidden"}
                            >
                                <Box>
                                    <DoctorCardStyle
                                        onClick={() => setDuidDialog(true)}
                                        sx={{ border: "1px solid #8d8989" }}
                                    >
                                        <AddOutlinedIcon
                                            color="primary"
                                            sx={{
                                                width: {
                                                    xs: "30.33px",
                                                    sm: "30.33px",
                                                    md: "54.83px",
                                                },
                                                height: {
                                                    xs: "30.33px",
                                                    sm: "30.33px",
                                                    md: "54.83px",
                                                },
                                            }}
                                        />
                                    </DoctorCardStyle>
                                    <Typography
                                        my={1}
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "Raleway",
                                            fontSize: {
                                                xs: "0.875rem",
                                                sm: "0.875rem",
                                                md: "1.375rem",
                                            },
                                        }}
                                    >
                                        Add Doctors
                                    </Typography>
                                </Box>

                                {doctorsData.length > 0 ? (
                                    doctorsData.map((doctor, index) => {
                                        return (
                                            <Box textAlign={"left"} key={index}>
                                                <DoctorCardStyle>
                                                    <img
                                                        src={
                                                            doctor.imgurl
                                                                ? doctor.imgurl
                                                                : "/default.png"
                                                        }
                                                        alt="img"
                                                        style={{
                                                            height: "100%",
                                                        }}
                                                    />
                                                </DoctorCardStyle>
                                                <Typography
                                                    mt={"5px"}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "Raleway",
                                                        fontSize: {
                                                            xs: "0.875rem",
                                                            sm: "0.875rem",
                                                            md: "1.375rem",
                                                        },
                                                    }}
                                                >
                                                    {doctor.nameOfTheDoctor}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "Lato",
                                                        fontSize: {
                                                            xs: "0.75rem",
                                                            sm: "0.75rem",
                                                            md: "0.938rem",
                                                        },
                                                        color: "#706D6D",
                                                    }}
                                                >
                                                    {doctor.speciality} &nbsp;{" "}
                                                    {doctor.yearOfExprience}
                                                    &nbsp;Years Experience
                                                </Typography>
                                            </Box>
                                        );
                                    })
                                ) : (
                                    <Typography
                                        variant="h6"
                                        mt={"50px"}
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "Raleway",
                                            fontSize: {
                                                xs: "0.875rem",
                                                sm: "0.875rem",
                                                md: "1.375rem",
                                            },
                                        }}
                                    >
                                        Nothing To Show{" "}
                                    </Typography>
                                )}

                                {/* <Box>
                                <DoctorCardStyle>
                                    <img
                                        src="/doctor-img.png"
                                        alt="img"
                                        style={{ height: "100%" }}
                                    />
                                </DoctorCardStyle>
                                <Typography mt={"5px"} component={"p"}>
                                    Dr Shashwat Magar
                                </Typography>
                                <Typography fontSize={"10px"}>
                                    Dentist 5 Years Experience
                                </Typography>
                            </Box> */}
                            </Stack>
                        </Box>

                        <Button
                            onClick={() =>
                                navigate(`/master/user/doctors/${hospital_id}`)
                            }
                            variant="contained"
                            size="small"
                            sx={{
                                margin: "10px auto 10px auto",
                                display: "block",
                                textTransform: "none",
                                width: { xs: "100%", sm: "100%", md: "200px" },
                                borderRadius: "55px",
                                fontWeight: 600,
                                fontFamily: "Raleway",
                                fontSize: {
                                    xs: "0.875rem",
                                    sm: "0.875rem",
                                    md: "1.375rem",
                                },
                                boxShadow: "none",
                            }}
                        >
                            View All
                        </Button>
                    </Box>
                    {/* Add Doctor Card end Here */}

                    {/* Add Staff Card starts From Here */}
                    <Box sx={{ my: "10px" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontFamily: "Raleway",
                                fontSize: {
                                    xs: "1.125rem",
                                    sm: "1.125rem",
                                    md: "1.625rem",
                                },
                            }}
                        >
                            Our Staff
                        </Typography>
                        <Box width={"100%"}>
                            <Stack
                                direction={"row"}
                                gap={2}
                                textAlign={"center"}
                                overflow={"hidden"}
                            >
                                <Box>
                                    <DoctorCardStyle
                                        onClick={() => setAddStaffDialog(true)}
                                        sx={{ border: "1px solid #8d8989" }}
                                    >
                                        <AddOutlinedIcon
                                            color="primary"
                                            sx={{
                                                width: {
                                                    xs: "30.33px",
                                                    sm: "30.33px",
                                                    md: "54.83px",
                                                },
                                                height: {
                                                    xs: "30.33px",
                                                    sm: "30.33px",
                                                    md: "54.83px",
                                                },
                                            }}
                                        />
                                    </DoctorCardStyle>
                                    <Typography
                                        my={1}
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "Lato",
                                            fontSize: {
                                                xs: "0.875rem",
                                                sm: "0.875rem",
                                                md: "1.375rem",
                                            },
                                        }}
                                    >
                                        Add Staff
                                    </Typography>
                                </Box>
                                {staffsData.length > 0 ? (
                                    staffsData.map((staff, index) => {
                                        return (
                                            <Box textAlign={"left"} key={index}>
                                                <DoctorCardStyle>
                                                    <img
                                                        src={
                                                            staff.img
                                                                ? `${baseURL}/Uploads/Hospital/StaffImage/${staff.img}`
                                                                : "/default.png"
                                                        }
                                                        alt="img"
                                                        style={{
                                                            height: "100%",
                                                        }}
                                                    />
                                                </DoctorCardStyle>
                                                <Typography
                                                    mt={"5px"}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "Raleway",
                                                        fontSize: {
                                                            xs: "0.875rem",
                                                            sm: "0.875rem",
                                                            md: "1.375rem",
                                                        },
                                                    }}
                                                >
                                                    {staff.nameOfStaff}
                                                </Typography>
                                                <Typography fontSize={"10px"}>
                                                    {staff.designation}
                                                </Typography>
                                            </Box>
                                        );
                                    })
                                ) : (
                                    <Typography
                                        variant="h6"
                                        mt={"50px"}
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "Raleway",
                                            fontSize: {
                                                xs: "0.875rem",
                                                sm: "0.875rem",
                                                md: "1.375rem",
                                            },
                                        }}
                                    >
                                        Nothing To Show{" "}
                                    </Typography>
                                )}

                                {/* <Box>
                                <DoctorCardStyle>
                                    <img
                                        src="/default.png"
                                        alt="img"
                                        style={{ height: "100%" }}
                                    />
                                </DoctorCardStyle>
                                <Typography mt={"5px"} component={"p"}>
                                    Dr Shashwat Magar
                                </Typography>
                                <Typography fontSize={"10px"}>
                                    Dentist 5 Years Experience
                                </Typography>
                            </Box> */}
                            </Stack>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    margin: "15px auto 15px auto",
                                    display: "block",
                                    textTransform: "none",
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "200px",
                                    },
                                    borderRadius: "55px",
                                    fontWeight: 600,
                                    fontFamily: "Raleway",
                                    fontSize: {
                                        xs: "0.875rem",
                                        sm: "0.875rem",
                                        md: "1.375rem",
                                    },
                                    boxShadow: "none",
                                }}
                            >
                                View All
                            </Button>
                        </Box>
                    </Box>
                    {/* Add Doctor Card End Here */}
                    <DuidDialog
                        duidDialog={duidDialog}
                        setInputValue={setInputValue}
                        setDuidDialog={setDuidDialog}
                        setAddDoctorsDialog={setAddDoctorsDialog}
                    />
                    <AddDoctorsDialog
                        getDoctorsData={getDoctorsData}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        addDoctorsDialog={addDoctorsDialog}
                        setAddDoctorsDialog={setAddDoctorsDialog}
                        hospitalLocation={hospitalData.enterFullAddress}
                    />
                    <AddStuffDialog
                        addStaffDialog={addStaffDialog}
                        setAddStaffDialog={setAddStaffDialog}
                        getStaffData={getStaffData}
                    />
                </WrapperStyle>
            </Box>
            <Footer />
        </>
    );
};

export default MhomePage;
