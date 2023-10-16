import React, { useEffect, useState } from "react";
import { State } from "country-state-city";
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    Card,
    Autocomplete,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import { axiosClient } from "../../Utils/axiosClient";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const TypographyStyling = styled(ListItem)`
    cursor: pointer;
`;

const FindDoctorsComp = () => {
    // const [doctorType, setDoctorType] = useState("");
    // const [search, setSearch] = useState("");
    // const [nameOfTheDoctor, setNameOfTheDoctor] = useState("a");
    // const [searchValue, setSearchValue] = useState({
    //     location:"",
    //     speciality:"",
    // });
    const [location, setLocation] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [locationData, setLocationData] = useState([]);
    const navigate = useNavigate();
    console.log(speciality);
    const getDoctorsList = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getDoctorforSpecialties/abhay?location=${location}&speciality=${speciality}`
            );
            console.log(response.result.location);
            if (response.status === "ok") {
                return setLocationData(response.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getDoctorsList();
    }, []);
    const locationName = locationData.map((location) => location.location);
    const uniqueLocationName = [...new Set(locationName)];

    const specilityName = locationData.map((location) => location.speciality);
    const uniquespecilityName = [...new Set(specilityName)];

    // const statesList = State.getStatesOfCountry("IN");
    // const statesName = statesList.map((name) => name.name);
    // console.log(names);
    // console.log(statesName);
    const handleChange = (e, v) => {
        // setSearchValue({...searchValue, })
        setSpeciality(v);

        navigate("/doctors", { state: { speciality, location } });

        console.log(v);
    };

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
                <Container
                    sx={{
                        width: "100%",
                        height: { xs: "392px", sm: "392px", md: "292px" },
                        borderRadius: "10px",
                        background: "#1F51C6",
                        marginTop: "40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        // justifyContent: "center",
                        position: "relative",
                        mb: 2,
                    }}
                >
                    <Box sx={{ marginTop: "40px" }}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: "#ffffff",
                                fontSize: { xs: "2rem", sm: "2.4rem" },
                                fontWeight: 700,
                            }}
                            variant="h4"
                        >
                            Find Doctors
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: "#ffffff",
                                fontSize: { xs: "2rem", sm: "2.4rem" },
                                fontWeight: 700,
                            }}
                            variant="h4"
                        >
                            & Book Appointments
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            gap: 2,
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "row",
                            },
                            m: "10px",
                        }}
                    >
                        <Autocomplete
                            onChange={(e, val) => setLocation(val)}
                            id="combo-box-demo"
                            options={uniqueLocationName}
                            // getOptionLabel={(location)=>location.location}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Enter Location"
                                    sx={{ background: "#ffffff" }}
                                />
                            )}
                        />
                        <Autocomplete
                            onChange={handleChange}
                            disablePortal
                            id="combo-box-demo"
                            options={uniquespecilityName}
                            // getOptionLabel={(location)=>location.speciality}
                            placeholder="Movie uhuuih"
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ background: "#ffffff" }}
                                />
                            )}
                        />
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default FindDoctorsComp;
