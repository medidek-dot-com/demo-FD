import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    InputAdornment,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    tableCellClasses,
} from "@mui/material";
import { axiosClient } from "../../Utils/axiosClient";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import SlotAppointmentsTable from "./SlotAppointmentsTable";
import TokenAppointmentsTable from "./TokenAppointmentsTable";

const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1F51C6",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "Raleway",
        fontWeight: "600",
        fontSize: "16px",
    },
    [`&.${tableCellClasses.body}`]: {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        textAlign: "center",
        color: "#383838",
    },
});

const MobileViewCardTypographyStyle = styled(Typography)({
    fontFamily: "Raleway",
    fontWeight: "700",
    color: "#383838",
});

const PendingAppointmentsTableForLoggedInDoctor = ({
    pendingAppointmentsData,
    getPendingAppointmentsData,
    pendingAppointmentsByTokenData,
    setPendingAppointmentsByTokenData,
    getPendingAppointmentsByTokenData,
    slotAppointment,
    setSlotAppointment,
}) => {
    // const [updatedStatus, setUpdatedStatus] = useState("pending");
    // const [appointmentDropDown, setAppointmentDropDown] = useState(false);
    // const [activeCard, setAciveCard] = useState();

    // console.log(pendingAppointmentsData);
    // const handleStatusChange = async (id, status) => {
    //     console.log(updatedStatus, "this is id", id);
    //     try {
    //         const response = await axiosClient.put(
    //             `/v2/updateUserAppointmentStatus/${id}`,
    //             { status }
    //         );
    //         if (response.status === "ok") {
    //             getPendingAppointmentsData();
    //         }
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setUpdatedStatus(status);
    // };

    // useEffect(() => {
    //     getPendingAppointmentsData();
    // }, [updatedStatus]);
    return (
        <>
            {slotAppointment === "slotAppointments" ? (
                <SlotAppointmentsTable
                    pendingAppointmentsData={pendingAppointmentsData}
                    getPendingAppointmentsData={getPendingAppointmentsData}
                />
            ) : (
                <TokenAppointmentsTable
                    pendingAppointmentsByTokenData={
                        pendingAppointmentsByTokenData
                    }
                    setPendingAppointmentsByTokenData={
                        setPendingAppointmentsByTokenData
                    }
                    getPendingAppointmentsByTokenData={
                        getPendingAppointmentsByTokenData
                    }
                />
            )}
            {/* <Box
                sx={{
                    overflow: "auto",
                    display: { xs: "none", sm: "none", md: "block" },
                }}
            >
                <Table
                    sx={{
                        minWidth: 400,
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                        background: "#ffffff",
                        textAlign: "center",
                        mt: 2,
                        overflow: "scroll",
                    }}
                    aria-label="customized table"
                >
                    <TableHead sx={{ position: "relative" }}>
                        <TableRow
                            sx={{ position: "sticky", top: "10px", zIndex: 1 }}
                        >
                            <StyledTableCell>Token No.</StyledTableCell>
                            <StyledTableCell>Patient's Name</StyledTableCell>
                            <StyledTableCell>Age</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Contact No.</StyledTableCell>
                            <StyledTableCell>Timing</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Records</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingAppointmentsData ? (
                            pendingAppointmentsData.map((appointment, i) => (
                                <TableRow
                                    key={appointment._id}
                                    sx={{
                                        boxShadow:
                                            "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                    }}
                                >
                                    <StyledTableCell>{i + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        {appointment.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {appointment.age}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {appointment.gender}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {appointment.phone}
                                    </StyledTableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "1rem",
                                            textAlign: "center",
                                            color: "#383838",
                                        }}
                                    >
                                        {appointment.AppointmentTime}
                                    </TableCell>
                                    <StyledTableCell>
                                        {moment(
                                            appointment.appointmentDate
                                        ).format("DD-MM-YYYY")}
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ color: "#1F51C6" }}>
                                        View
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            sx={{
                                                color: "#383838",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                textAlign: "center",
                                            }}
                                            variant="standard"
                                            value={appointment.status}
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
                                                    color: "#EA4335",
                                                }}
                                                value={"missed"}
                                            >
                                                Missed
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
                                                    color: "#EA4335",
                                                }}
                                                value={"cancelled"}
                                            >
                                                Cancelled
                                            </MenuItem>
                                        </Select>
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <Typography>No Data</Typography>
                        )}
                    </TableBody>
                </Table>
            </Box>

            <Stack
                sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                }}
            >
                {pendingAppointmentsData?.length > 0 ? (
                    pendingAppointmentsData.map((appointment, i) => {
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
                                        {appointment.name}
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
                                                {appointment.name}
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
                                                {appointment.phone}
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
                                                {moment(
                                                    appointment.appointmentDate
                                                ).format("DD-MM-YYYY")}
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
                                                  
                                                    borderRadius: "21px",
                                                    height: "32px",
                                                    mr: "2px",
                                                }}
                                                variant="standard"
                                                value={appointment.status}
                                                
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
                                            
                                        </Box>
                                    </Stack>
                                </Card>
                            </Box>
                        );
                    })
                ) : (
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            mt: "10px",
                        }}
                    >
                        No Appointments For Today
                    </Typography>
                )}
            </Stack> */}
        </>
    );
};

export default PendingAppointmentsTableForLoggedInDoctor;
