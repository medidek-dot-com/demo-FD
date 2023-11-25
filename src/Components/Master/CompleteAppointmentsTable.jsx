import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
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
    styled,
    tableCellClasses,
} from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { axiosClient } from "../../Utils/axiosClient";
import CompletedAppointmentsTableForMobile from "./CompletedAppointmentsTableForMobile";
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

const CompleteAppointmentsTable = ({
    completeAppointmentsData,
    getCompleteAppointmentsData,
}) => {
    const [updatedStatus, setUpdatedStatus] = useState("completed");

    const handleStatusChange = async (id, status) => {
        console.log(updatedStatus, "this is id", id);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${id}`,
                { status }
            );
            console.log(response);
            if (response.status === "ok") {
                getCompleteAppointmentsData();
            }
        } catch (error) {
            console.log(error);
        }
        setUpdatedStatus(status);
    };

    useEffect(() => {
        getCompleteAppointmentsData();
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
                    }}
                    aria-label="customized table"
                >
                    <TableHead
                        sx={{ position: "sticky", top: "10px", zIndex: 1 }}
                    >
                        <TableRow>
                            <StyledTableCell>Token No.</StyledTableCell>
                            <StyledTableCell>Patient's Name</StyledTableCell>
                            <StyledTableCell>Age</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Contact No.</StyledTableCell>
                            <StyledTableCell>Timing</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Remove</StyledTableCell>
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
                                    <StyledTableCell sx={{ color: "#1F51C6" }}>
                                        Edit
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            sx={{
                                                color: "#15B912",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                textAlign: "center",
                                            }}
                                            variant="standard"
                                            value={appointment.status}
                                            // onChange={handleChange}
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
        </>
    );
};

export default CompleteAppointmentsTable;
