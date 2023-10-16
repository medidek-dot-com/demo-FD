import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Container,
    Typography,
    TextField,
    Stack,
    Button,
} from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import UpcomingPetientUserAppointment from "./UpcomingPetientUserAppointment";
import { axiosClient } from "../../Utils/axiosClient";

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
        borderRadius: "54px",
    },

    [`& button`]: {
        transform: "none",
    },
});

const Tracking = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState(1);
    const urlLocation = useLocation();
    const [pendingAppointmentsData, setPendingAppointmentsData] = useState([]);
    const [completeAppointmentsData, setCompleteAppointmentsData] = useState(
        []
    );
    const [missedAppointmentsData, setMissedAppointmentsData] = useState([]);

    const checkUser = () => {
        if (!isLoggedIn) {
            navigate("/user/signin", {
                state: { prevUrl: urlLocation.pathname },
            });
            return false;
        }
    };

    useEffect(() => {
        checkUser();
    }, []);



    const getPendingAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getPendingAppointmentForPatient/${user?._id}`
        );
        setPendingAppointmentsData(response.result);
        console.log(response.result);
    };
    const getCompleteAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getCompleteAppointmentsForHospital/${user._id}`
        );
        setCompleteAppointmentsData(response.result);
        console.log(response);
    };
    const getMissedAppointmentsData = async () => {
        const response = await axiosClient.get(
            `/v2/getMissedAppointmentsForHospital/${user._id}`
        );
        setMissedAppointmentsData(response.result);
        console.log(response);
    };


    useEffect(() => {
        getPendingAppointmentsData();
        // getCompleteAppointmentsData();
        // getMissedAppointmentsData();
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 30px)",
                    },
                    m: "0px auto",
                    p: 1,
                    minHeight: "100vh",
                }}
            >
                <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
                    <AutocompleteStyle
                        size="small"
                        disablePortal
                        popupIcon={<img src="/search.svg" alt="img" />}
                        id="combo-box-demo"
                        options={[1, 2, 3, 4, 5]}
                        // onChange={(e, val) =>handleChange(val)}
                        // getOptionLabel={(doctor) =>
                        //     doctor.nameOfTheDoctor || ""
                        // }
                        sx={{ width: "491px" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search doctors"
                            />
                        )}
                    />
                    {/* <SearchFeildStyle
                    size="small"
                    placeholder="Search Doctors"
                    sx={{
                        width: "491px",
                        // borderRadius:'30px'
                    }}
                    InputLabelProps={{ color: "red" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <img src="/search.svg" alt="img" />
                            </InputAdornment>
                        ),
                    }}
                    // onChange={(e) => setSearch(e.target.value)}
                /> */}
                </Box>
                <Stack direction={"row"} gap={1} sx={{ my: "20px" }}>
                    <Button
                        onClick={() => setActiveTab(1)}
                        variant={activeTab === 1 ? "contained" : "outlined"}
                        sx={{
                            textTransform: "none",
                            width: "119px",
                            height: "41px",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "16px",
                            borderRadius: "35px",
                            color: activeTab === 1 ? "#ffffff" : "#383838",
                        }}
                    >
                        Upcoming
                    </Button>
                    <Button
                        onClick={() => setActiveTab(2)}
                        variant={activeTab === 2 ? "contained" : "outlined"}
                        sx={{
                            textTransform: "none",
                            width: "119px",
                            height: "41px",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "16px",
                            borderRadius: "35px",
                            color: activeTab === 2 ? "#ffffff" : "#383838",
                        }}
                    >
                        Completed
                    </Button>
                    <Button
                        onClick={() => setActiveTab(3)}
                        variant={activeTab === 3 ? "contained" : "outlined"}
                        sx={{
                            textTransform: "none",
                            width: "119px",
                            height: "41px",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "16px",
                            borderRadius: "35px",
                            color: activeTab === 3 ? "#ffffff" : "#383838",
                        }}
                    >
                        Missed
                    </Button>
                </Stack>
                {activeTab === 1 && <UpcomingPetientUserAppointment pendingAppointmentsData={pendingAppointmentsData} />}
            </Box>
            <Footer />
        </>
    );
};

export default Tracking;
