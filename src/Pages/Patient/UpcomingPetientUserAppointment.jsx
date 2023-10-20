import React from "react";
import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpcomingPetientUserAppointment = ({pendingAppointmentsData}) => {
  const navigate = useNavigate();
    return (
        <Stack spacing='15px'>
          {
            pendingAppointmentsData.length > 0 ? pendingAppointmentsData.map((appointment, i)=>{
              return (
<Card
key={i}
                sx={{
                    display: "flex",
                    flexDirection: {xs:"column", sm:"column", md:"row"},
                    gap:'19px',
                    // flexWrap:'wrap',
                    justifyContent: "space-between",
                    p: "20px",
                  boxShadow:'none',
                  border:'1px solid #D9D9D9'
                }}
            >
                <Stack direction="row" spacing="14px" alignItems="center">
                    <Avatar sx={{ width: {xs:"57px", sm:"57px", md:"74px"}, height: {xs:"57px", sm:"57px", md:"74px"} }} />
                    <Stack>
                        <Typography
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                color: "#383838",
                            }}
                        >
                            Appointment with Dr. {appointment.doctorsId.nameOfTheDoctor}
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                color: "#706D6D",
                            }}
                        >
                            Date: {appointment.appointmentDate}
                        </Box>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                        },
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button
                       onClick={()=>navigate(`/tracking/view-appointment/${appointment._id}`)}
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: "25px",
                            height:'40px',
                            fontSize: "16px",
                            fontFamily: "Lato",
                            fontWeight: "semibold",
                            textTransform: "none",
                            px: "15px",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "210px",
                            },
                        }}
                    >
                        View Appointment
                    </Button>
                </Box>
            </Card>
              )
            }) : <Typography
            sx={{
                fontFamily: "Raleway",
                fontWeight: "600",
                fontSize: "18px",
                color: "#383838",
                textAlign: "center",
            }}
            >No Upcoming Appointment Found</Typography>
          }
            
            {/* <Card
                sx={{
                    display: "flex",
                    flexDirection: {xs:"column", sm:"column", md:"row"},
                    gap:'19px',
                    // flexWrap:'wrap',
                    justifyContent: "space-between",
                    p: "20px",
                  boxShadow:'none',
                  border:'1px solid #D9D9D9'
                }}
            >
                <Stack direction="row" spacing="14px" alignItems="center">
                    <Avatar sx={{ width: {xs:"57px", sm:"57px", md:"74px"}, height: {xs:"57px", sm:"57px", md:"74px"} }} />
                    <Stack>
                        <Typography
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                color: "#383838",
                            }}
                        >
                            Appointment with Dr. Shashwat Magarkar
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                color: "#706D6D",
                            }}
                        >
                            Date: 25/05/2023
                        </Box>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                        },
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button
                       
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: "25px",
                            height:'40px',
                            fontSize: "16px",
                            fontFamily: "Lato",
                            fontWeight: "semibold",
                            textTransform: "none",
                            px: "15px",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "210px",
                            },
                        }}
                    >
                        View Appointment
                    </Button>
                </Box>
            </Card> */}
            {/* <Card
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: "20px",
                  boxShadow:'none',
                  border:'1px solid #D9D9D9'
                }}
            >
                <Stack direction="row" spacing="9px" alignItems="center">
                    <Avatar sx={{ width: "74px", height: "74px" }} />
                    <Stack>
                        <Typography
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                color: "#383838",
                            }}
                        >
                            Appointment with Dr. Shashwat Magarkar
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "16px",
                                color: "#706D6D",
                            }}
                        >
                            Date: 25/05/2023
                        </Box>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                        },
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button
                       
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: "25px",
                            height:'40px',
                            fontSize: "16px",
                            fontFamily: "Lato",
                            fontWeight: "semibold",
                            textTransform: "none",
                            px: "15px",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "210px",
                            },
                        }}
                    >
                        View Appointment
                    </Button>
                </Box>
            </Card> */}
        </Stack>
    );
};

export default UpcomingPetientUserAppointment;
