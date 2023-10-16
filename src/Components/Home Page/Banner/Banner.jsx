import React from "react";
import {
    Box,
    Container,
    Typography,
    styled,
    Button,
    Stack,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EventNoteIcon from "@mui/icons-material/EventNote";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";

const HeadingStyle = styled(Typography)`
    font-size: 25px;
    font-weight: 700;
    color: #ffffff;
    // line-height: 31.09px;
    word-spacing: 4px;
`;
const ParagraphStyle = styled(Typography)`
    font-size: 15px;
    font-weight: 200;
    color: #ffffff;
    // line-height: 21px;
    word-spacing: 4px;
    margin-top: 10px;
`;

const DoctorImgStyle = styled("img")({
    height: 100,
});

const Banner = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                width: "100%",
                height: {xs:"none",sm:"none",md:"590px"},
                background: { xs: "none",sm:"none", md: "#1F51C6" },
                display: "flex",
                flexDirection: {
                    xs: "column-reverse",
                    sm: "row",
                },
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "100%", sm: "100%" },
                margin: "60px auto 0 auto",
                borderRadius: "10px",
                position: "relative",
                px:"16px"
            }}
        >
            <Box
                sx={{  flex: 1, display: "flex", flexDirection: "column", gap:'10px' }}
            >
                <Typography
                    variant="h4"
                    textAlign={{ xs: "center", sm: "left" }}
                    fontSize={{ xs: "1.4rem", sm: "2rem" }}
                    sx={{
      
                        fontWeight: "700",
                        color: { xs: "#000000", sm: "#000000", md: "#ffffff" },
                        wordWrap: "break-word",
                        fontFamily:'Raleway',
                        width:{xs:"100%",sm:"100%",md:"75%"},
                        mt:"20px"
                        
                    }}
                >
                    MediDek: Your Comprehensive Medical Companion for Seamless
                    Healthcare Management
                </Typography>
                <Typography
                    textAlign={{ xs: "center", sm: "center", md:"left" }}
                    fontSize={{ xs: "0.8rem", sm: "1rem" }}
                    sx={{
                       fontWeight:'500',
                       fontFamily: 'Lato',
                        color: {
                            xs: "#706D6D",
                            sm: "#706D6D",
                            md: "#FFFFFFAB",
                        },
                        // my: 1,
                        width: {xs:"100%", sm:"100%",md:"60%"},
                    }}
                >
                    Enhance Your Healthcare Experience with Medidek: Seamlessly
                    Book Appointments, Securely Manage Medical Records, and
                    Personalize Your Health Journey
                </Typography>
                <Button
                onClick={()=>navigate('/doctors')}
                    variant="contained"
                    // size="small"
                    sx={{
                        background: {
                            xs: "#1F51C6",
                            sm: "#1F51C6",
                            md: "#ffffff",
                        },
                        margin: { xs: "0 auto", sm: "0 auto", md: "10px 0" },
                        color: { xs: "#ffffff", sm: "#ffffff", md: "#383838" },
                        borderRadius: "32px",
                        textTransform: "none",
                        fontWeight: "600",
                        fontFamily:"raleway",
                        px: 4,
                        width: "172px",
                        height:"44px",
                        "&:hover": {
                            background: "#e3e8e5",
                        },
                    }}
                >
                    Book Now
                </Button>
            </Box>
            <Box
                sx={{
                    position: { xs: "static", sm: "relative" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.8,
                    
                }}
            >
                <Stack
                    spacing={6}
                    sx={{
                        position: "absolute",
                        zIndex: 999,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent:"center",
                        mt:7
                    }}
                >
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            background: "#ffffff",
                            color: "#383838",
                            borderRadius: "32px",
                            textTransform: "none",
                            fontFamily:"Raleway",
                            fontWeight:"600",
                            width: {xs:"200px", sm:"200px",md:"250px"},
                            height: "40px",
                            "&:hover": {
                                background: "#e3e8e5",
                            },
                        }}
                    >
                        <PhoneAndroidIcon sx={{mr:'7px'}}/>
                        Book Appointments
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            background: "#ffffff",
                            color: "#383838",
                            borderRadius: "32px",
                            textTransform: "none",
                            fontWeight:"600",
                            width: {xs:"200px", sm:"200px",md:"250px"},
                            fontFamily:"Raleway",
                            height: "40px",
                            alignSelf: "end",
                            "&:hover": {
                                background: "#e3e8e5",
                            },
                        }}
                    >
                        <EventNoteIcon sx={{mr:'7px'}}/>
                        Medical Records
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            background: "#ffffff",
                            color: "#383838",
                            fontFamily:"Raleway",
                            borderRadius: "32px",
                            fontWeight:"600",
                            textTransform: "none",
                            width: {xs:"200px", sm:"200px",md:"250px"},
                            height: "40px",
                            "&:hover": {
                                background: "#e3e8e5",
                            },
                        }}
                    >
                        <QueryBuilderIcon sx={{mr:'7px'}}/>
                        Appointment Tracking
                    </Button>
                </Stack>
                <Box
                    sx={{
                        // height: "300px",
                        display: {xs:"none", sm:"none", md:"flex"},
                        alignItems: "flex-end",
                        position: "relative",
                        background: {
                            xs: "#1F51C6",
                            sm: "#1F51C6",
                            md: "none",
                        },
                        // mt:'20%'
                    }}
                >
                    <img
                        src="/lady-img.png"
                        alt="img"
                        style={{
                            height: "654px",
                            marginTop: "-15.5%",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        // height: "300px",
                        display: {xs:"flex", sm:"flex", md:"none"},
                        alignItems: "flex-end",
                        position: "relative",
                        background: {
                            // xs: "#1F51C6",
                            // sm: "#1F51C6",
                            md: "none",
                        },
                        mt:'3%',
                        // mx:2
                        
                    }}
                >
                    <img
                        src="/imageForWeb.png"
                        alt="img"
                        style={{
                            width: "350px",
                            height: "450px",
                            marginTop: "-15.5%",
                        }}
                    />
                </Box>
            </Box>
        </Box>

        // <Box
        //     sx={{
        //         width: { xs: '100%', sm: 600, md:800, lg:1000, xl:1200 },
        //         height: "392px",
        //         borderRadius: "10px",
        //         background: "#1F51C6",
        //         // marginTop: "100px",
        //         display: "flex",
        //         alignItems: "center",
        //         justifyContent: "space-between",
        //         position: "relative",
        //     }}
        // >
        //     <Box sx={{ height: "248px" }}>
        //         <HeadingStyle variant="h" component={"h1"} >
        //             MediDek: Your Comprehensive Medical Companion for Seamless
        //             Healthcare Management
        //         </HeadingStyle>
        //         <ParagraphStyle variant="p" component={"p"}>
        //             Enhance Your Healthcare Experience with Medidek: Seamlessly
        //             Book Appointments, Securely Manage Medical Records, and
        //             Personalize Your Health Journey
        //         </ParagraphStyle>
        //         <Button
        //             variant="contained"
        //             style={{
        //                 borderRadius: "35px",
        //                 width: "141px",
        //                 height: "32px",
        //                 color: "#383838",
        //                 background: "#ffffff",
        //                 marginTop: "10px",
        //                 fontWeight: "bold",
        //             }}
        //         >
        //             Book Now
        //         </Button>
        //     </Box>
        //     <Box>
        //         <DoctorImgStyle src="./lady-img.png" alt="img" />
        //         <Box style={{ position: "absolute", top: "0px" }}>
        //             <Button
        //                 variant="contained"
        //                 style={{
        //                     borderRadius: "35px",
        //                     width: "141px",
        //                     height: "32px",
        //                     color: "#383838",
        //                     background: "#ffffff",
        //                     marginTop: "10px",
        //                     fontWeight: "bold",
        //                 }}
        //             >
        //                 Book Now
        //             </Button>
        //             <Button
        //                 variant="contained"
        //                 style={{
        //                     borderRadius: "35px",
        //                     width: "141px",
        //                     height: "32px",
        //                     color: "#383838",
        //                     background: "#ffffff",
        //                     marginTop: "10px",
        //                     fontWeight: "bold",
        //                 }}
        //             >
        //                 Book Now
        //             </Button>
        //             <Button
        //                 variant="contained"
        //                 style={{
        //                     borderRadius: "35px",
        //                     width: "141px",
        //                     height: "32px",
        //                     color: "#383838",
        //                     background: "#ffffff",
        //                     marginTop: "10px",
        //                     fontWeight: "bold",
        //                 }}
        //             >
        //                 Book Now
        //             </Button>
        //         </Box>
        //     </Box>
        // </Box>
    );
};

export default Banner;
