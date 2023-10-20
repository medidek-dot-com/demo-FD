import React from 'react'

const Menu = () => {
  return (
    <>
    <Box
                    sx={{
                        width: "240px",
                        background: "#1F51C6",
                        display: { xs: "none", sm: "none", md: "flex" },
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100vh",
                        position: "sticky",
                        top: "0px",
                        bottom: "-100px",
                    }}
                >
                    <Stack alignItems={"center"} mt={4}>
                        <Avatar
                            src={
                                numberOfHospitals[0]?.doctorImg
                                    ? `${baseURL}/Uploads/Hospital/DoctorImage/${numberOfHospitals[0]?.doctorImg}`
                                    : "/default.png"
                            }
                            sx={{ width: "71px", height: "71px" }}
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                m: 1,
                                color: "#ffffff",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "22px",
                            }}
                        >
                            Dr. {numberOfHospitals[0].nameOfTheDoctor}
                        </Typography>
                    </Stack>
                    <Stack spacing={2} mt={4} flex={1} width={"100%"}>
                        <Button
                            onClick={() => navigate(`/doctor/dashboard/${hospital_id}/${doctor_id}`)}
                            variant="text"
                            sx={{
                                color: "#1F51C6",
                                background: activeTab === 1 ? "#ffffff" : null,
                                borderRadius: "0",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                color: activeTab === 1 ? "#1F51C6" : "#ffffff",
                                "&:hover": {
                                    background:
                                        activeTab === 1 ? "#ffffff" : "#DCE3F6",
                                    color: "#1F51C6",
                                },
                            }}
                        >
                            <MdDashboard
                                style={{ width: "25px", height: "25px" }}
                            />
                            &nbsp;Dashboard
                        </Button>
                        <Button
                            onClick={() => navigate(`/doctor/appointments/${hospital_id}/${doctor_id}`)}
                            variant="text"
                            sx={{
                                color: activeTab === 2 ? "#1F51C6" : "#ffffff",
                                background: activeTab === 2 ? "#ffffff" : null,
                                borderRadius: "0",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                "&:hover": {
                                    background:
                                        activeTab === 2 ? "#ffffff" : "#DCE3F6",
                                    color: "#1F51C6",
                                },
                            }}
                        >
                            <BsFillCalendarFill
                                style={{ width: "25px", height: "25px" }}
                            />
                            &nbsp; Appointments
                        </Button>
                        <Button
                            onClick={() => navigate(`/doctor/edit-profile/${hospital_id}/${doctor_id}`)}
                            variant="text"
                            sx={{
                                color: activeTab === 3 ? "#1F51C6" : "#ffffff",
                                background: activeTab === 3 ? "#ffffff" : null,
                                borderRadius: "0",
                                textTransform: "none",
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "18px",
                                "&:hover": {
                                    background:
                                        activeTab === 3 ? "#ffffff" : "#DCE3F6",
                                    color: "#1F51C6",
                                },
                            }}
                        >
                            <ImPencil
                                style={{ width: "25px", height: "25px" }}
                            />
                            Edit Profile
                        </Button>
                    </Stack>
                    <Button
                        onClick={logOutUser}
                        sx={{
                            color: "#ffffff",
                            width: "100%",
                            my: 1,
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "18px",
                            textTransform: "none",
                        }}
                    >
                        <MdLogout style={{ width: "25px", height: "25px" }} />
                        Log Out
                    </Button>
                </Box>
    </>
  )
}

export default Menu