import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    InputAdornment,
    InputLabel,
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
import { FiUpload } from "react-icons/fi";
import { axiosClient } from "../../Utils/axiosClient";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import { toast } from "react-toastify";
import CompleteAppointmentTableForSlot from "./CompleteAppointmentTableForSlot";
import CompleteAppointmentTableForToken from "./CompleteAppointmentTableForToken";

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

const CompletedAppointmentsTableForLoggedInDoctor = ({
    completeAppointmentsData,
    getCompleteAppointmentsData,
    completeAppointmentsByTokenData,
    setCompleteAppointmentsByTokenData,
    getCompleteAppointmentsByTokenData,

    slotAppointment,
}) => {
    const [updatedStatus, setUpdatedStatus] = useState("completed");
    const [appointmentDropDown, setAppointmentDropDown] = useState(false);
    const [activeCard, setAciveCard] = useState();

    const handleStatusChange = async (id, status) => {
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${id}`,
                { status }
            );

            if (response.status === "ok") {
                getCompleteAppointmentsData();
            }
        } catch (error) {
            toast.error("something went wrong");
            console.log(error);
        }
        setUpdatedStatus(status);
    };

    useEffect(() => {
        getCompleteAppointmentsData();
    }, [updatedStatus]);

    return (
        <>
            {slotAppointment === "slotAppointments" ? (
                <CompleteAppointmentTableForSlot
                    completeAppointmentsData={completeAppointmentsData}
                    getCompleteAppointmentsData={getCompleteAppointmentsData}
                />
            ) : (
                <CompleteAppointmentTableForToken
                    completeAppointmentsByTokenData={
                        completeAppointmentsByTokenData
                    }
                    setCompleteAppointmentsByTokenData={
                        setCompleteAppointmentsByTokenData
                    }
                    getCompleteAppointmentsByTokenData={
                        getCompleteAppointmentsByTokenData
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
                    }}
                    aria-label="customized table"
                >
                    <TableHead
                        sx={{ position: "sticky", top: "10px", zIndex: 1 }}
                    >
                        <TableRow>
                            <StyledTableCell>Sr. No.</StyledTableCell>
                            <StyledTableCell>Patient's Name</StyledTableCell>
                            <StyledTableCell>Age</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Contact No.</StyledTableCell>
                            <StyledTableCell>Timing</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Prescription</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {completeAppointmentsData ? (
                            completeAppointmentsData.map((appointment, i) => (
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
                                    <StyledTableCell>
                                        {appointment.AppointmentTime}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {moment(
                                            appointment.appointmentDate
                                        ).format("DD-MM-YYYY")}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Box
                                            component="span"
                                            sx={{ color: "#15B912" }}
                                        >
                                            Completed
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ color: "#1F51C6" }}>
                                        <label
                                            htmlFor="file"
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                display: "flex",
                                                justifyContent: "center",
                                                color: "#1F51C6",
                                            }}
                                        >
                                            <FiUpload size={20} />
                                            &nbsp;Upload prescription
                                        </label>
                                        <TextField
                                            id="file"
                                            type="file"
                                            sx={{ display: "none" }}
                                        />
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
                {completeAppointmentsData?.length > 0 ? (
                    completeAppointmentsData.map((appointment, i) => {
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
                                            <Box
                                                component="span"
                                                sx={{ color: "#15B912" }}
                                            >
                                                Completed
                                            </Box>
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

export default CompletedAppointmentsTableForLoggedInDoctor;
