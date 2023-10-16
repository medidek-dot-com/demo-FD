import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ViewPetiantAppointment = () => {
    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "calc(100% - 30px)",
                },
                m: "0px auto",
                p: 1,
                minHeight: "80vh",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "391px",
                        background: "#DCE3F6",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        py: "29px",
                        px: "26px",
                    }}
                >
                    <CheckCircleIcon
                        color="success"
                        sx={{ width: "76px", height: "76px" }}
                    />
                    <Stack alignItems="center" sx={{ mb: "40px" }}>
                        <Typography sx={{fontFamily:'Raleway', fontWeight:'600', fontSize:'1.563rem'}}>Thank You!</Typography>
                        <Typography
                        sx={{fontFamily:'Lato', fontWeight:'600', fontSize:'1rem', color:'#706D6D'}}
                        >
                            Your Appointment has been Booked!
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <Typography
                        sx={{fontFamily:'Raleway', fontWeight:'600', fontSize:'1.563rem', color:'#383838'}}
                        >Track Appointment</Typography>
                        <Box component='span'
                        sx={{fontFamily:'Lato', fontWeight:'700', fontSize:'1rem', color:'#1F51C6'}}
                        >Appointment Id: <span
                        style={{fontFamily:'Lato', fontWeight:'600', fontSize:'1rem', color:'#383838'}}
                        
                        >#02484746</span></Box>
                    </Stack>

                    <Stack>
                        
                    </Stack>


                    {/* <Stack alignSelf="start">
                        <Box
                            component="span"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                background:'red',
                                gap:'2px',
                            }}
                        >
                                <Box component='span' sx={{display:'flex', }}>
                                <CheckCircleIcon color="success" sx={{alignSelf:'start'}}/>
                            s
                                </Box>
                            <Box
                                component="span"
                                sx={{
                                    width: "2px",
                                    height: "6px",
                                    background: "#1F51C6",
                                    alignSelf:'start',
                                }}
                            ></Box>
                            <Box
                                component="span"
                                sx={{
                                    width: "2px",
                                    height: "6px",
                                    background: "#1F51C6",
                                    alignSelf:'center',
                                }}
                            ></Box>
                            <Box
                                component="span"
                                sx={{
                                    width: "2px",
                                    height: "6px",
                                    background: "#1F51C6",
                                    alignSelf:'center',
                                }}
                            ></Box>
                            <Box
                                component="span"
                                sx={{
                                    width: "2px",
                                    height: "6px",
                                    background: "#1F51C6",
                                    alignSelf:'center',
                                }}
                            ></Box>
                            <Box
                                component="span"
                                sx={{
                                    width: "2px",
                                    height: "6px",
                                    background: "#1F51C6",
                                    alignSelf:'center',
                                }}
                            ></Box>
                        </Box>
                    </Stack> */}
                </Box>
            </Box>
        </Box>
    );
};

export default ViewPetiantAppointment;
