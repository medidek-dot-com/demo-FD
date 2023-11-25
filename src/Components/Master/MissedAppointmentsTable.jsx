import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
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
import moment from "moment";

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
        fontSize: "16px",
        textAlign: "center",
        color: "#383838",
    },
});

const statusComplete = { color: "#15B912", fontWeight: 600 };
const statusPending = { color: "#000000", fontWeight: 600 };

const MissedAppointmentsTable = ({
    missedAppointmentsData,
    getMissedAppointmentsData,
}) => {
    const [updatedStatus, setUpdatedStatus] = useState("pending");

    const handleStatusChange = async (id, status) => {
        console.log(updatedStatus, "this is id", id);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${id}`,
                { status }
            );
            if (response.status === "ok") {
                getMissedAppointmentsData();
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
            <Box
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
                            <StyledTableCell>Edit</StyledTableCell>
                            <StyledTableCell>Remove</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {missedAppointmentsData ? (
                            missedAppointmentsData.map((appointment, i) => (
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
                                    <StyledTableCell sx={{ color: "#1F51C6" }}>
                                        Edit
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ color: "#B92612" }}>
                                        Cancel
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            sx={{
                                                color: "#EA4335",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                textAlign: "center",
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
                                                    color: "#EA4335",
                                                }}
                                                value={"missed"}
                                            >
                                                Missed
                                            </MenuItem>
                                        </Select>
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <Typography>No Data</Typography>
                        )}
                        {/* <TableRow
                                sx={{
                                    boxShadow:
                                        "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                }}
                            >
                                <StyledTableCell>1</StyledTableCell>
                                <StyledTableCell>Johnny Doe</StyledTableCell>
                                <StyledTableCell>54</StyledTableCell>
                                <StyledTableCell>Male</StyledTableCell>
                                <StyledTableCell>9911223344</StyledTableCell>
                                <StyledTableCell>12:00 PM</StyledTableCell>
                                <StyledTableCell>15/07/23</StyledTableCell>
                                <StyledTableCell sx={{ color: "#1F51C6" }}>
                                    Edit
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: "#B92612" }}>
                                    Cancel
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Select
                                        sx={
                                            status == "Complete"
                                                ? statusComplete
                                                : statusPending
                                        }
                                        variant="standard"
                                        value={status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Pending"}>
                                            Pending
                                        </MenuItem>
                                        <MenuItem value={"Complete"}>
                                            Complete
                                        </MenuItem>
                                    </Select>
                                </StyledTableCell>
                            </TableRow> */}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default MissedAppointmentsTable;
