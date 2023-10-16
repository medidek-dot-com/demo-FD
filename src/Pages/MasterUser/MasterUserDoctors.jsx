import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    InputAdornment,
    Pagination,
    Rating,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";

import Footer from "../../Components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient, baseURL } from "../../Utils/axiosClient";

const WrapperStyle = styled(Box)(({ theme }) => ({
    width: "calc(100% - 100px)",
    margin: "10px auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "calc(100% - 10px)",
    },
}));

const PaginationStyle = styled(Pagination)({
    "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#1F51C6",
        color: "#ffffff",
        ":hover": {
            backgroundColor: "#1640a0",
        },
    },
});

const SearchFeildStyle = styled(TextField)({
    "& .css-1pubn0x-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "55px",
        // background: "#DCE3F6",
        "& placeholder": {
            color: "blue",
        },
    },
});

const MasterUserDoctors = () => {
    const { hospital_id } = useParams();
    const [search, setSearch] = useState("");
    const [doctorsData, setDoctorsData] = useState([]);
    const navigate = useNavigate();

    const getDoctorsData = async () => {
        const response = await axiosClient.get(
            `/v2/getDoctorsforHospital/${hospital_id}?search=${search}`
        );

        if (response.status === "ok") {
            setDoctorsData(response.result);
            return;
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, [search]);

    console.log(doctorsData);

    return (
        <>
            {/* <MasterUserDoctors/> */}
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
                <Box
                    sx={{
                        width: "100%",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // background: "blue",
                        zIndex: 1,
                    }}
                >
                    <Box sx={{ my: 2 }}>
                        <SearchFeildStyle
                            size="small"
                            placeholder="Search Doctors"
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
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Box>
                </Box>
                {doctorsData &&
                    doctorsData.map((doctor, index) => {
                        return (
                            <Card
                                onClick={() =>
                                    navigate(
                                        `/master/user/doctor/details/${hospital_id}/${doctor._id}`
                                    )
                                }
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    p: 2,
                                    alignItems: "center",
                                    border: "1px solid #D9D9D9",
                                    boxShadow: "none",
                                    borderRadius: "7px",
                                    flexDirection: { xs: "column", sm: "row" },
                                    my: 1,
                                    cursor: "pointer",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    sx={{
                                        cursor: "pointer",
                                        flex: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        src={
                                            doctor.doctorImg
                                                ? `${baseURL}/Uploads/Hospital/DoctorImage/${doctor.doctorImg}`
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
                                                fontFamily: "Raleway",
                                                fontWeight: "600",
                                                color: "#383838",
                                                fontSize: "1.375rem",
                                                lineHeight: "25.83px",
                                            }}
                                        >
                                            {doctor.nameOfTheDoctor}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#706D6D",
                                                fontSize: "0.9rem",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                lineHeight: "18px",
                                            }}
                                        >
                                            {doctor.speciality}{" "}
                                            {doctor.yearOfExprience}&nbsp;Years
                                            of experience
                                        </Typography>

                                        <Rating value={5} readOnly />
                                    </Box>
                                </Stack>
                                <Box>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        sx={{
                                            mx: 1,
                                            textTransform: "none",
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "210.71px",
                                            },
                                            borderRadius: "35px",
                                            fontFamily:'Raleway',
                                            fontWeight:'600',
                                            fontSize:'1.125rem',
                                            boxShadow:'none',
                                        }}
                                    >
                                        View Appointments
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        sx={{
                                            m: 1,
                                            textTransform: "none",
                                            background: "#15B912",
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "200.71px",
                                            },
                                            borderRadius: "35px",
                                            "&:hover": {
                                                background: "#148512",
                                            },
                                            fontFamily:'Raleway',
                                            fontWeight:'600',
                                            fontSize:'1.125rem',
                                            boxShadow:'none',
                                        }}
                                    >
                                        Book Appointment
                                    </Button>
                                </Box>
                            </Card>
                        );
                    })}
                {/* <Card
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        p: 3,
                        alignItems: "center",
                        border: "1px solid #D9D9D9",
                        boxShadow: "none",
                        borderRadius: "7px",
                        flexDirection: { xs: "column", sm: "row" },
                        my: 1,
                    }}
                >
                    <Stack
                        onClick={() =>
                            navigate("/master/user/doctor/details/hjgjh")
                        }
                        direction={{ xs: "column", sm: "row" }}
                        sx={{ cursor: "pointer", flex: 1 }}
                    >
                        <img
                            src="/doctor.png"
                            alt="img"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                            }}
                        />
                        <Box ml={2}>
                            <Typography variant="h6">
                                Dr Shashwat Magarkar
                            </Typography>
                            <Typography
                                sx={{ color: "#706D6D", fontSize: "0.9rem" }}
                            >
                                5 Years Experience
                            </Typography>
                            <Typography
                                sx={{ color: "#706D6D", fontSize: "0.9rem" }}
                            >
                                16 Years Experience Overall (15 years as
                                specialist)
                            </Typography>
                            <Rating value={5} readOnly />
                        </Box>
                    </Stack>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{ m: 1, textTransform: "none" }}
                        >
                            View Appointments
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                m: 1,
                                background: "#15B912",
                                textTransform: "none",
                            }}
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </Card> */}
            </Box>
        </>
    );
};

export default MasterUserDoctors;
