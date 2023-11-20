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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import UpcomingPetientUserAppointment from "./UpcomingPetientUserAppointment";
import { axiosClient } from "../../Utils/axiosClient";
import { tab } from "../../Store/tabSlice";
import CompletedPatientUserAppointment from "../../Components/Patient/CompletedPatientUserAppointment";
import MissedPatientUserAppointment from "../../Components/Patient/MissedPatientUserAppointment";
import ReviewComponet from "../../Components/Patient/ReviewComponet";

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
    const [isLoading, setIsLoading] = useState(false);

    const checkUser = () => {
        if (!isLoggedIn) {
            navigate("/user/signin", {
                state: { prevUrl: urlLocation.pathname },
            });
            return false;
        } else {
            getPendingAppointmentsData();
            getCompleteAppointmentsData();
            getMissedAppointmentsData();
        }
    };
    useEffect(() => {
        checkUser();
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(2));
    }, []);

    const getPendingAppointmentsData = async () => {
        setIsLoading(true);
        const response = await axiosClient.get(
            `/v2/getPendingAppointmentForPatient/${user?._id}`
        );
        setIsLoading(false);
        return setPendingAppointmentsData(response.result);
    };
    const getCompleteAppointmentsData = async () => {
        setIsLoading(true);
        const response = await axiosClient.get(
            `/v2/getCompletedAppointment/${user._id}`
        );
        setIsLoading(false);
        setCompleteAppointmentsData(response.result);
        return;
    };
    const getMissedAppointmentsData = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/getMissedAppointment/${user._id}`
            );
            setIsLoading(false);
            setMissedAppointmentsData(response.result);
        } catch (error) {
            console.log(error.message);
        }
    };

    // useEffect(() => {
    //     getPendingAppointmentsData();
    //     // getCompleteAppointmentsData();
    //     // getMissedAppointmentsData();
    // }, []);

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
                            boxShadow: "none",
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
                            boxShadow: "none",
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
                            boxShadow: "none",
                        }}
                    >
                        Missed
                    </Button>
                </Stack>
                {activeTab === 1 && (
                    <UpcomingPetientUserAppointment
                        pendingAppointmentsData={pendingAppointmentsData}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                )}
                {activeTab === 2 && (
                    <CompletedPatientUserAppointment
                        completeAppointmentsData={completeAppointmentsData}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                )}
                {activeTab === 3 && (
                    <MissedPatientUserAppointment
                        missedAppointmentsData={missedAppointmentsData}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        getPendingAppointmentsData={getPendingAppointmentsData}
                        getMissedAppointmentsData={getMissedAppointmentsData}
                    />
                )}
            </Box>
            {/* <ReviewComponet
                reviewDialog={reviewDialog}
                completeAppointmentsData={completeAppointmentsData}
                setReviewDialog={setReviewDialog}
            /> */}
            <Footer />
        </>
    );
};

export default Tracking;
