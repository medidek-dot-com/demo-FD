import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    MenuItem,
    Select,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FiUpload } from "react-icons/fi";
import { axiosClient } from "../../Utils/axiosClient";

const MobileViewCardTypographyStyle = styled(Typography)({
    fontFamily: "Raleway",
    fontWeight: "700",
    color: "#383838",
});

const MissedAppointmentsTableForMobile = ({ missedAppointmentsData, getMissedAppointmentsData }) => {
    const [appointmentDropDown, setAppointmentDropDown] = useState(false);
    const [activeCard, setAciveCard] = useState();
    const [updatedStatus, setUpdatedStatus] = useState("missed");

    const handleStatusChange = async (id, status) => {
        console.log(updatedStatus, "this is id", id);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${id}`,
                { status }
            );
            if (response.status === "ok") {
                getMissedAppointmentsData();
                setAppointmentDropDown(false);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setUpdatedStatus(status);
    };

    useEffect(() => {
        getMissedAppointmentsData();
    }, [updatedStatus]);

    return (
        <>
            <Stack
                sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                }}
            >
                {missedAppointmentsData?.length > 0 ? (
                    missedAppointmentsData.map((appointment, i) => {
                        return (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                <Card
                                    onClick={() =>
                                        setAppointmentDropDown(
                                            !appointmentDropDown
                                        ) & setAciveCard(i)
                                    }
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 1,
                                        px: 2,
                                        py: 1,
                                        border: " 1px solid #D9D9D9",
                                        boxShadow: "none",
                                        backgroundColor: "#DCE3F6",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            flex: 1,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {appointment.patientName}
                                    </Typography>
                                    {appointmentDropDown && activeCard === i ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </Card>
                                <Card
                                    sx={{
                                        p: "16px",
                                        display:
                                            appointmentDropDown &&
                                            activeCard === i
                                                ? "flex"
                                                : "none",
                                        flexDirection: "column",
                                        gap: "10px",
                                        boxShadow: "none",
                                        border: "1px solid #D1D1D67A",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <MobileViewCardTypographyStyle>
                                            Name:{"  "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    fontFamily: "Raleway",
                                                }}
                                            >
                                                {appointment.patientName}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                        <MobileViewCardTypographyStyle>
                                            Gender:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {appointment.gender}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                    </Stack>
                                    <Divider />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <MobileViewCardTypographyStyle>
                                            Contact No:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {appointment.phoneNumber}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                        <MobileViewCardTypographyStyle>
                                            Age:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {appointment.age}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                    </Stack>
                                    <Divider />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <MobileViewCardTypographyStyle>
                                            Date:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {appointment.appointmentDate}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                        <Box
                                            sx={{
                                                fontFamily: "Raleway",
                                                fontWeight: "700",
                                                color: "#383838",
                                            }}
                                        >
                                            Status:{" "}
                                            <Select
                                                sx={{
                                                    color: "#383838",
                                                    fontFamily: "Lato",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                    // p:'5px 10px',
                                                    borderRadius: "21px",
                                                    height: "32px",
                                                    mr: "2px",
                                                }}
                                                variant="standard"
                                                value={appointment.status}
                                                // onChange={(e) => handleChange(e, i)}
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            appointment._id,
                                                            "pending"
                                                        )
                                                    }
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        textAlign: "center",
                                                        color: "#383838",
                                                    }}
                                                    value={"pending"}
                                                >
                                                    Pending
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            appointment._id,
                                                            "completed"
                                                        )
                                                    }
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        textAlign: "center",
                                                        color: "#15B912",
                                                    }}
                                                    value={"completed"}
                                                >
                                                    Completed
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            appointment._id,
                                                            "missed"
                                                        )
                                                    }
                                                    sx={{
                                                        fontFamily: "Lato",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        textAlign: "center",
                                                        color: "#B92612",
                                                    }}
                                                    value={"missed"}
                                                >
                                                    Missed
                                                </MenuItem>
                                            </Select>
                                            {/* <span
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Male
                                                    </span> */}
                                        </Box>
                                    </Stack>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: "100%",
                                            borderRadius: "35px",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            textTransform: "none",
                                            boxShadow: "none",
                                            mt: "24px",
                                        }}
                                    >
                                        <FiUpload size={20} />
                                        Upload Prescription
                                    </Button>
                                </Card>
                            </Box>
                        );
                    })
                ) : (
                    <Typography sx={{textAlign:'center', fontFamily: "Lato",
                    fontWeight: "600", mt:'10px'}}>No Appointments For Today</Typography>
                )}
            </Stack>
        </>
    );
};

export default MissedAppointmentsTableForMobile;
