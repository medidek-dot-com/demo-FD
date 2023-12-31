import React, { useEffect, useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Stack,
    Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import styled from "@emotion/styled";
import { logOutDoctor, selectedDoctorsData } from "../../Store/doctorDataSlice";
import { logout } from "../../Store/authSlice";

const ImageStyle = styled("img")(({ theme }) => ({
    width: "136.66px",
    height: "44px",
    margin: "32px 50px",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "121px",
        height: "28px",
        margin: "16px 8px",
    },
}));

const SelectHospital = () => {
    const navigate = useNavigate();
    const { doctorid } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    // const {doctor} = useSelector((state) => state.doctor)
    const { doctor } = useSelector((state) => state.doctor);
    const [hospitalList, setHospitalList] = useState([]);
    const numberOfHospitals = user;
    // const doctordAndHospitalDetails = numberOfHospitals.map(hospital => hospital)
    // console.log(doctordAndHospitalDetails);
    // ${hospital.hospitalId._id}/${hospital._id}
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
    }, []);

    const logOutUser = async () => {
        dispatch(logOutDoctor());
        dispatch(logout());
        await axiosClient.post("/v2/logout");
        removeItem(KEY_ACCESS_TOKEN);
        // navigate('/')
        // window.location.href = '/master/signin'
    };

    // const doctorName = [...new Set(numberOfHospitals)];

    // const hospitalList = numberOfHospitals.map((hospital) => hospital.hospitalId);
    // console.log(hospitalList)

    // console.log(numberOfHospitals);

    return (
        <>
            <ImageStyle src="/m-logonew.png" alt="img" />
            <Box
                sx={{
                    display: "flex",
                    // height: "100vh",
                    // alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Stack
                    sx={{
                        width: "467px",
                        height: "469px",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        src={user?.imgurl ? user.imgurl : "/default.png"}
                        sx={{ width: "81px", height: "81px" }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "22px",
                        }}
                    >
                        Welcome, Dr. {user?.nameOfTheDoctor}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "400",
                            fontSize: "18px",
                            color: "#706D6D",
                            mb: "25px",
                        }}
                    >
                        Please Select a Hospital
                    </Typography>
                    <Card
                        sx={{
                            p: "10px",
                            width: { xs: "100%", sm: "100%", md: "467px" },
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                        }}
                    >
                        {hospitalList.map((hospital, i) => (
                            <Stack
                                key={i}
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
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
                                            {/* Hospital Name */}
                                            {hospital?.hospitalId === null
                                                ? hospital?.nameOfTheDoctor
                                                : hospital?.hospitalId
                                                      ?.nameOfhospitalOrClinic}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                lineHeight: "19.2px",
                                                fontFamily: "Lato",
                                                color: "#706D6D",
                                            }}
                                        >
                                            {hospital?.hospitalId?.location}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Button
                                    onClick={() => {
                                        dispatch(selectedDoctorsData(hospital));
                                        navigate(
                                            `/doctor/dashboard/${hospital._id}`
                                        );
                                    }}
                                    variant="text"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "16px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                    }}
                                >
                                    Enter <EastIcon />
                                </Button>
                            </Stack>
                        ))}
                    </Card>
                    <Button
                        variant="contained"
                        onClick={logOutUser}
                        sx={{
                            marginY: "10px",
                            textTransform: "none",
                            fontFamily: "Lato",
                            fontWeight: "700",
                            fontSize: "1.125rem",
                            width: "100%",
                            boxShadow: "none",
                            borderRadius: "53px",
                            ":hover": {
                                boxShadow: "none",
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default SelectHospital;
