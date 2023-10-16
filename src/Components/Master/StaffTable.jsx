import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
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
import { useParams } from "react-router-dom";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import EditStaffDialog from "./EditStaffDialog";

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

const MobileViewCardTypographyStyle = styled(Typography)({
    fontFamily: "Raleway",
    fontWeight: "700",
    color: "#383838",
});

const StaffTable = ({ search }) => {
    const { hospital_id } = useParams();
    const [inputValue, setInputValue] = useState({
        nameOfStaff: "",
        designation: "",
        enterEmailId: "",
        enterPhoneNo: "",
        password: "",
        hospoitalId: hospital_id,
    });
    const [staffData, setStaffData] = useState([]);
    const [removeDialog, setRemoveDialog] = useState(false);
    const [areYouSureRemoveThisStaff, setAreYouSureRemoveThisStaff] = useState({
        staffId: "",
        nameOfStaff: "",
    });
    const [appointmentDropDown, setAppointmentDropDown] = useState(false);
    const [activeCard, setAciveCard] = useState();
    const [editStaffDialog, setEditStaffDialog] = useState(false);
    const [singleStaffData, setSingleStaffData] = useState(null);

    const getStaffData = async () => {
        const response = await axiosClient.get(
            `/v2/getstaff/${hospital_id}?search=${search}`
        );

        if (response.status === "ok") {
            return setStaffData(response.result);
        }
    };

    useEffect(() => {
        getStaffData();
        // getStaffData();DoctorsData();
    }, [search]);

    const handleRemoveClick = (_id, nameOfStaff) => {
        setRemoveDialog(true);
        setAreYouSureRemoveThisStaff({
            ...areYouSureRemoveThisStaff,
            doctorId: _id,
            nameOfStaff,
        });
    };

    const removeStaff = async () => {
        try {
            const response = await axiosClient.put(
                `/v2/updateStaffStatusToRemove/${areYouSureRemoveThisStaff.doctorId}`,
                { status: "REMOVED" }
            );
            console.log(response);
            if (response.status === "ok") {
                getStaffData();
                setRemoveDialog(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editStaff = (staff) => {
        console.log(staff);
        setInputValue(staff);
        setSingleStaffData(staff);
        setEditStaffDialog(true);
    };

    return (
        <>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
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
                            <StyledTableCell>Sr No.</StyledTableCell>
                            <StyledTableCell>Photo</StyledTableCell>
                            <StyledTableCell> Name </StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Contact No.</StyledTableCell>
                            <StyledTableCell>Speciality</StyledTableCell>
                            <StyledTableCell>Unique Id</StyledTableCell>
                            <StyledTableCell>Edit</StyledTableCell>
                            <StyledTableCell>Remove</StyledTableCell>
                            {/* <StyledTableCell>Status</StyledTableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffData ? (
                            staffData.map((staff, i) => (
                                <TableRow
                                    key={staff._id}
                                    sx={{
                                        boxShadow:
                                            "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                    }}
                                >
                                    <StyledTableCell>{i + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        <Avatar
                                            src={
                                                staff.img
                                                    ? `${baseURL}/Uploads/Hospital/StaffImage/${staff.img}`
                                                    : "/default.png"
                                            }
                                            sx={{
                                                width: "32px",
                                                height: "32px",
                                                margin: "0 auto",
                                            }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {staff.nameOfStaff}
                                    </StyledTableCell>
                                    {/* <StyledTableCell>{doctor.age}</StyledTableCell> */}
                                    <StyledTableCell>
                                        {staff.gender}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {staff.enterPhoneNo}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {staff.designation}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {staff.enterEmailId}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        onClick={() => editStaff(staff)}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                color: "#1F51C6",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell
                                        onClick={() =>
                                            handleRemoveClick(
                                                staff._id,
                                                staff.nameOfStaff
                                            )
                                        }
                                        sx={{ color: "#B92612" }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                color: "#B92612",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Remove
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <Typography>No Data</Typography>
                        )}
                    </TableBody>
                </Table>
                <EditStaffDialog
                    getStaffData={getStaffData}
                    editStaffDialog={editStaffDialog}
                    singleStaffData={singleStaffData}
                    setEditStaffDialog={setEditStaffDialog}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <Dialog
                    sx={{ borderRadius: "14px" }}
                    onClose={() => setRemoveDialog(false)}
                    aria-labelledby="customized-dialog-title"
                    open={removeDialog}
                >
                    <DialogTitle
                        sx={{
                            m: 0,
                            p: 2,
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "22px",
                        }}
                        id="customized-dialog-title"
                    >
                        Remove {areYouSureRemoveThisStaff.nameOfStaff}?
                    </DialogTitle>
                    {removeDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setRemoveDialog(false)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                    <DialogContent dividers>
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "16px",
                                color: "#706D6D",
                                my: "25px",
                                lineHeight: "21.6px",
                            }}
                        >
                            Are you sure you want to Remove{" "}
                            {areYouSureRemoveThisStaff.nameOfStaff}?
                        </Typography>
                        <Stack direction="row" spacing="15px">
                            <Button
                                onClick={() => setRemoveDialog(false)}
                                variant="contained"
                                sx={{
                                    width: "328px",
                                    height: "41px",
                                    background: "#D9D9D9",
                                    color: "#383838",
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    borderRadius: "44px",
                                    ":hover": { background: "#706D6D" },
                                }}
                            >
                                Cancel{" "}
                            </Button>
                            <Button
                                onClick={removeStaff}
                                variant="contained"
                                sx={{
                                    width: "328px",
                                    height: "41px",
                                    background: "#1F51C6",
                                    color: "#ffffff",
                                    textTransform: "none",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    borderRadius: "44px",
                                }}
                            >
                                Confirm{" "}
                            </Button>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </Box>
            <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
                {staffData.length > 0 ? (
                    staffData.map((staff, i) => {
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
                                        {staff.nameOfStaff}
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
                                                {staff.nameOfStaff}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                        <MobileViewCardTypographyStyle>
                                            Gender:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {staff.gender}
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
                                                {staff.enterPhoneNo}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                        <MobileViewCardTypographyStyle>
                                            Designation:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {staff.designation}
                                            </span>
                                        </MobileViewCardTypographyStyle>
                                    </Stack>
                                    <Divider />
                                    {/* <Stack
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
                                            {doctor.enterPhoneNo}
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
                                    </Box>
                                </Stack> */}
                                    <Stack direction="row" spacing="8px">
                                        <Button
                                            variant="contained"
                                            onClick={() => editDoctor(staff)}
                                            sx={{
                                                flex: 1,
                                                borderRadius: "35px",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: "1rem",
                                                textTransform: "none",
                                                boxshadow: "none",
                                                boxShadow: "none",
                                                mt: "24px",
                                            }}
                                        >
                                            <HiPencil
                                                size={20}
                                                style={{ marginRight: "2px" }}
                                            />{" "}
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleRemoveClick(
                                                    staff._id,
                                                    staff.nameOfTheDoctor
                                                )
                                            }
                                            variant="contained"
                                            sx={{
                                                flex: 1,
                                                borderRadius: "35px",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                fontSize: "1rem",
                                                boxshadow: "none",
                                                textTransform: "none",
                                                boxShadow: "none",
                                                mt: "24px",
                                                backgroundColor: "#B92612",
                                                ":hover": {
                                                    backgroundColor: "#9e2515",
                                                },
                                            }}
                                        >
                                            <AiFillDelete
                                                size={20}
                                                style={{ marginRight: "2px" }}
                                            />{" "}
                                            Remove
                                        </Button>
                                    </Stack>
                                </Card>
                            </Box>
                        );
                    })
                ) : (
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "1rem",
                            color: "#383838",
                        }}
                    >
                        No Staff Found
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default StaffTable;
