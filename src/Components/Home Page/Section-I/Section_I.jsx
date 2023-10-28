import React from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    styled,
    Stack,
    Avatar,
} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import Section_IRight from "./Section_IRight";

const CardStyled = styled(Card)`
    padding: 20px;
    border: 1px solid #dce3f6;
    box-shadow: none;
`;

const ButtonStyle = styled(Button)`
    text-transform: none;
    font-family: Lato;
    font-weight:700;
`;

const Section_I = () => {

    const navigate = useNavigate();



    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    mt: "40px",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        mx: 1,
                        pb: "20px",
                        background: {
                            xs: "#DCE3F6",
                            sm: "#DCE3F6",
                            md: "none",
                        },
                        borderRadius: "10px",
                        height: "400px",
                        display: "flex",
                        textAlign: { xs: "center", sm: "left" },
                        flexDirection: "column",
                        alignItems: {
                            xs: "center",
                            sm: "center",
                            md: "flex-start",
                        },
                        justifyContent: {
                            xs: "center",
                            sm: "center",

                            md: "start",
                        },
                    }}
                >
                    <Typography
                        fontSize={{ xs: "1.3rem", sm: "1.5rem", md: "1.8rem" }}
                        variant={"h4"}
                        sx={{
                            fontWeight: 700,
                            mt: "40px",
                            fontFamily: "Raleway",
                            alignSelf: "start",
                        width:{xs:"100%",sm:"100%",md:"60%"},
                        }}
                    >
                        Quick Solution For Scheduling With Doctor
                    </Typography>
                    <Typography
                        sx={{
                            color: "#706D6D",
                            mt: "10px",
                            fontFamily: "Lato",
                            fontWeight: 500,
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem",
                                md: "1rem",
                            },
                        width:{xs:"100%",sm:"100%",md:"75%"},

                        }}
                    >
                        Welcome to Medidek, your ultimate destination for
                        comprehensive healthcare management. With our innovative
                        platform, you can easily book appointments with
                        top-notch doctors and specialists, ensuring you receive
                        the best possible care.
                    </Typography>
                    <ButtonStyle
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: "25px",
                            display: { xs: "none", sm: "none", md: "flex" },
                            px: 2,
                            mt:'16px',
                            width: "172px",
                            height: "44px",
                            fontWeight: "600",
                            fontFamily: "raleway",
                            boxShadow:"none"
                        }}
                    >
                        Book Now
                        <CallMadeIcon />
                    </ButtonStyle>
                </Box>
                <Stack
                    spacing={2}
                    flex={1}
                    sx={{
                        // background: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 2,
                        p: 2,
                    }}
                >
                    <Stack
                        spacing={2}
                        direction={{ xs: "column", sm: "column", md: "row" }}
                    >
                        <CardStyled sx={{ alignSelf: "flex-start" }}>
                            <Avatar
                                sx={{
                                    borderRadius: "5px",
                                    background: "#9877F6",
                                }}
                            >
                                <FaStethoscope />
                            </Avatar>
                            <Typography variant="h6" sx={{color:"#383838", fontWeight:"600", fontFamily:"Raleway"}}>Find Doctors</Typography>
                            <Typography sx={{color:"#706D6D", fontWeight:"500", fontFamily:"Lato"}}>
                                Find Top-notch Doctors near you with just one
                                Click!
                            </Typography>
                            <ButtonStyle onClick={()=>navigate('/doctors')}>
                                See more <CallMadeIcon />
                            </ButtonStyle>
                        </CardStyled>
                        <CardStyled sx={{ alignSelf: "flex-end" }}>
                            <Avatar
                                sx={{
                                    borderRadius: "5px",
                                    background: "#9DB3EE",
                                }}
                            >
                                <img src="/Vector.svg" alt="img" />
                            </Avatar>
                            <Typography variant="h6" sx={{color:"#383838", fontWeight:"600", fontFamily:"Raleway"}}>Medical Records</Typography>
                            <Typography sx={{color:"#706D6D", fontWeight:"500", fontFamily:"Lato"}}>
                                Find Top-notch Doctors near you with just one
                                Click!
                            </Typography>
                            <ButtonStyle>
                                See more <CallMadeIcon />
                            </ButtonStyle>
                        </CardStyled>
                    </Stack>
                    <Stack
                        spacing={2}
                        direction={{ xs: "column", sm: "column", md: "row" }}
                    >
                        <CardStyled>
                            <Avatar
                                sx={{
                                    borderRadius: "5px",
                                    background: "#A1E18A",
                                }}
                            >
                                <img src="/notebook.svg" alt="img" />
                            </Avatar>
                            <Typography variant="h6" sx={{color:"#383838", fontWeight:"600", fontFamily:"Raleway"}}>Schedule Appointment</Typography>
                            <Typography sx={{color:"#706D6D", fontWeight:"500", fontFamily:"Lato"}}>
                                Find Top-notch Doctors near you with just one
                                Click!
                            </Typography>
                            <ButtonStyle>
                                See more <CallMadeIcon />
                            </ButtonStyle>
                        </CardStyled>
                        <CardStyled>
                            <Avatar
                                sx={{
                                    borderRadius: "5px",
                                    background: "#ED908A",
                                }}
                            >
                                <img src="/iconoir_clock.svg" alt="img" />
                            </Avatar>
                            <Typography variant="h6" sx={{color:"#383838", fontWeight:"600", fontFamily:"Raleway"}}>Appointment Tracking</Typography>
                            <Typography sx={{color:"#706D6D", fontWeight:"500", fontFamily:"Lato"}}>
                                Find Top-notch Doctors near you with just one
                                Click!
                            </Typography>
                            <ButtonStyle>
                                See more <CallMadeIcon />
                            </ButtonStyle>
                        </CardStyled>
                    </Stack>
                </Stack>
                
            </Box>
        </>
    );
};

export default Section_I;
