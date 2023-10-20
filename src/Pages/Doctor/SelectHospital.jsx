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
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient, baseURL } from "../../Utils/axiosClient";

const SelectHospital = () => {
    const navigate = useNavigate();
    const { hospital_id, doctor_id } = useParams();
    const { user } = useSelector((state) => state.auth);
    // const [appointments, setAppointments] = useState([]);
    const numberOfHospitals = user;
    console.log(user?.role);
    // const doctordAndHospitalDetails = numberOfHospitals.map(hospital => hospital)
    // console.log(doctordAndHospitalDetails);
    // ${hospital.hospitalId._id}/${hospital._id}
    // const getUpcomingAppointmentsData = async () => {
    //     const response = await axiosClient.get(
    //         `/v2/getAppoinmentForDoctorInHospital/${hospital_id}/${doctor_id}`
    //     );
    //     setAppointments(response.result);
    //     console.log(response);
    // };

    // useEffect(() => {
    //     getUpcomingAppointmentsData();
    // }, []);

    // const doctorName = [...new Set(numberOfHospitals)];

    // const hospitalList = numberOfHospitals.map((hospital) => hospital.hospitalId);
    // console.log(hospitalList)

    // console.log(numberOfHospitals);

    return (
       <>
                <img
                    src="/m-logonew.png"
                    alt="img"
                    width="136.66px"
                    height="44px"
                />
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
                            // src={
                            //     numberOfHospitals[0]?.doctorImg
                            //         ? `${baseURL}/Uploads/Hospital/DoctorImage/${numberOfHospitals[0]?.doctorImg}`
                            //         : "/default.png"
                            // }
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
                            Welcome, Dr.
                            {/* Welcome, Dr. {numberOfHospitals[0]?.nameOfTheDoctor} */}
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
                            {/* {numberOfHospitals.map((hospital, i) => ( */}
                                <Stack
                                    // key={i}
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
                                            // src={
                                            //     hospital?.hospitalId.img
                                            //         ? `${baseURL}/uploads/Hospital/HospitalImage/${hospital?.hospitalId.img}`
                                            //         : "/default.png"
                                            // }
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
                                                Hospital Name
                                                {/* {
                                                    hospital.hospitalId
                                                        .nameOfhospitalOrClinic
                                                } */}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    lineHeight: "19.2px",
                                                    fontFamily: "Lato",
                                                    color: "#706D6D",
                                                }}
                                            >
                                                Location
                                                {/* {hospital.hospitalId.location} */}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                `/doctor/dashboard/${user._id}/${user._id}`
                                            )
                                        }
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
                            {/* ))} */}
                            {/* <Stack direction="row" sx={{justifyContent:'space-between', borderBottom:'1px solid #D9D9D9', p:'5px'}}>
                            <Stack direction="row" alignItems="center" spacing='10px'>
                                <Avatar src="/doctor.png" sx={{width:'58px', height:'58px'}}/>
                                <Stack>
                                    <Typography sx={{lineHeight:'21.6px', fontFamily:'Lato', fontSize:'18px', fontWeight:'600'}}>Wokhardt Hospital</Typography>
                                    <Typography sx={{lineHeight:'19.2px', fontFamily:'Lato', color:'#706D6D'}}>Nagpur</Typography>
                                </Stack>
                            </Stack>
                            <Button variant="text" sx={{textTransform:'none', fontSize:'16px', fontFamily:'Lato', fontWeight:'600'}}>Enter <EastIcon/></Button>
                        </Stack> */}
                        </Card>
                    </Stack>
                </Box>
            
       </>
    );
};

export default SelectHospital;
