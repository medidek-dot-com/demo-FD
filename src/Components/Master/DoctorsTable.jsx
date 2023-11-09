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
    Modal,
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
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import EditDoctorDialog from "./EditDoctorDialog";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {HiPencil} from 'react-icons/hi'
import {AiFillDelete} from 'react-icons/ai'

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

const DoctorsTable = ({ search }) => {
    const { hospital_id } = useParams();

    const [doctorsData, setDoctorsData] = useState([]);
    const [removeDialog, setRemoveDialog] = useState(false);
    const [editDoctorDialog, setEditDoctorDialog] = useState(false);
    const [singleDoctorsData, setSingleDoctorsData] = useState(null);
    const [areYouSureRemoveThisDoctor, setareYouSureRemoveThisDoctor] =
        useState({ doctorId: "", nameOfTheDoctor: "" });

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: "",
        qulification: "",
        speciality: "",
        yearOfExprience: "",
        enterEmailId: "",
        enterPhoneNo: "",
        connsultationFee: "",
        consultingTime: "",
        location: "",
        hospitalId: hospital_id,
    });

    const [appointmentDropDown, setAppointmentDropDown] = useState(false);
    const [activeCard, setAciveCard] = useState();
    const [updatedStatus, setUpdatedStatus] = useState("pending");

    const getDoctorsData = async () => {
        const response = await axiosClient.get(
            `/v2/getAlldoctor/${hospital_id}?search=${search}`
        );
       
        if (response.status === "ok") {
            return setDoctorsData(response.result);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, [search]);

    const handleRemoveClick = (_id, nameOfTheDoctor) => {
        setRemoveDialog(true);
        setareYouSureRemoveThisDoctor({
            ...areYouSureRemoveThisDoctor,
            doctorId: _id,
            nameOfTheDoctor,
        });
    };

    const removeDoctor = async () => {
        try {
            const response = await axiosClient.put(
                `/v2/updateDoctorStatusToRemove/${areYouSureRemoveThisDoctor.doctorId}`,
                { status: "REMOVED" }
            );
            console.log(response);
            if (response.status === "ok") {
                getDoctorsData();
                setRemoveDialog(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editDoctor = (doctor) => {
        console.log(doctor);
        setInputValue(doctor);
        setSingleDoctorsData(doctor);
        setEditDoctorDialog(true);
    };

    const handleStatusChange = async (id, status) => {
        console.log(updatedStatus, "this is id", id);
        try {
            const response = await axiosClient.put(
                `/v2/updateUserAppointmentStatus/${id}`,
                { status }
            );
            if (response.status === "ok") {
                getPendingAppointmentsData();
                setAppointmentDropDown(false);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setUpdatedStatus(status);
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
                            {/* <StyledTableCell>Gender</StyledTableCell> */}
                            <StyledTableCell>Contact No.</StyledTableCell>
                            <StyledTableCell>Speciality</StyledTableCell>
                            <StyledTableCell>Unique Id</StyledTableCell>
                            <StyledTableCell>Edit</StyledTableCell>
                            <StyledTableCell>Remove</StyledTableCell>
                            {/* <StyledTableCell>Status</StyledTableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctorsData ? (
                            doctorsData.map((doctor, i) => (
                                <TableRow
                                    key={doctor._id}
                                    sx={{
                                        boxShadow:
                                            "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                    }}
                                >
                                    <StyledTableCell>{i + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        <Avatar
                                            src={
                                                doctor?.imgurl ? doctor.imgurl : "/default.png"
                                            }
                                            sx={{
                                                width: "32px",
                                                height: "32px",
                                                margin: "0 auto",
                                            }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doctor.nameOfTheDoctor}
                                    </StyledTableCell>
                                    {/* <StyledTableCell>{doctor.age}</StyledTableCell> */}
                                    {/* <StyledTableCell>
                                        {doctor.gender}
                                    </StyledTableCell> */}
                                    <StyledTableCell>
                                        {doctor.phone}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doctor.speciality}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doctor.doctorid}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        onClick={() => editDoctor(doctor)}
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
                                                doctor._id,
                                                doctor.nameOfTheDoctor
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
                        Remove Dr. {areYouSureRemoveThisDoctor.nameOfTheDoctor}?
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
                            Are you sure you want to Remove Dr.{" "}
                            {areYouSureRemoveThisDoctor.nameOfTheDoctor}?
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
                                onClick={removeDoctor}
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

                <EditDoctorDialog
                    getDoctorsData={getDoctorsData}
                    editDoctorDialog={editDoctorDialog}
                    singleDoctorsData={singleDoctorsData}
                    setEditDoctorDialog={setEditDoctorDialog}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </Box>
            <Box sx={{display:{xs:'block', sm:'block', md:'none'}}}>
            {doctorsData.length > 0 ? (
                doctorsData.map((doctor, i) => {
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
                                    {doctor.nameOfTheDoctor}
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
                                        appointmentDropDown && activeCard === i
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
                                            {doctor.nameOfTheDoctor}
                                        </span>
                                    </MobileViewCardTypographyStyle>
                                    <MobileViewCardTypographyStyle>
                                        Gender:{" "}
                                        <span
                                            style={{
                                                fontWeight: "600",
                                            }}
                                        >
                                            {doctor.gender}
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
                                            {doctor.enterPhoneNo}
                                        </span>
                                    </MobileViewCardTypographyStyle>
                                    <MobileViewCardTypographyStyle>
                                        Speciality:{" "}
                                        <span
                                            style={{
                                                fontWeight: "600",
                                            }}
                                        >
                                            {doctor.speciality}
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
                                <Stack direction='row' spacing='8px'>
                                    <Button
                                        variant="contained"
                                        onClick={() => editDoctor(doctor)}
                                        sx={{
                                           flex: 1,
                                            borderRadius: "35px",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize:'1rem',
                                            textTransform: "none",
                                            boxshadow:'none',
                                            boxShadow: "none",
                                            mt: "24px",
                                        }}
                                    >
                                       <HiPencil size={20} style={{marginRight:'2px'}} /> Edit
                                    </Button>
                                    <Button
                                     onClick={() =>
                                        handleRemoveClick(
                                            doctor._id,
                                            doctor.nameOfTheDoctor
                                        )
                                    }
                                        variant="contained"
                                        sx={{
                                           flex: 1,
                                            borderRadius: "35px",
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize:'1rem',
                                            boxshadow:'none',
                                            textTransform: "none",
                                            boxShadow: "none",
                                            mt: "24px",
                                            backgroundColor:'#B92612',
                                            ':hover': {
                                                backgroundColor:'#9e2515'
                                            }
                                        }}
                                    >
                                       <AiFillDelete size={20} style={{marginRight:'2px'}}/> Remove
                                    </Button>
                                </Stack>
                            </Card>
                        </Box>
                    );
                })
            ) : (
                <Typography sx={{textAlign:'center', fontFamily:'Raleway', fontWeight:'600', fontSize:'1rem', color:'#383838'}}>No doctors Found</Typography>
            )}
            </Box>
        </>
    );
};

export default DoctorsTable;
