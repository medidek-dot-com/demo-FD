import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import hospitalSpecialties from "../../hospitalSpecialtyList";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    styled,
    TextField,
    Divider,
    FormLabel,
    Select,
    MenuItem,
    InputLabel,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { GrDown } from "react-icons/gr";
import { useSelector } from "react-redux";

const StackStyle = styled(Stack)(({ theme }) => ({
    width: "48%",
    margin: "5px",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "100%",
    },
}));

const TextFieldStyle = styled(TextField)({
    // marginBottom: "20px",
    ["& input"]: {
        // color: "white",
        fontFamily: "Lato",
        fontWeight: "600",
        color: "#706D6D",
        fontSize: "0.938rem",
    },
    ["& fieldset"]: {
        // color: "white",
        borderColor: "#D9D9D9",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
    },
});

const LabelStyle = styled("label")({
    marginBottom: "5px",
    fontFamily: "Lato",
    fontWeight: "600",
    color: "#383838",
});

const CourseEnrollFormDialog = ({
    courseEnrollDialog,
    setCourseEnrollDialog,
    getDoctorsData,
    hospitalLocation,
    courseList,
}) => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();
    const [err, setError] = useState(false);
    const [courseName, setCourseName] = useState("Select a Course");
    // const propLocation = hospitalLocation

    const { user } = useSelector((state) => state.auth);

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: user?.nameOfTheDoctor ? user.nameOfTheDoctor : "",
        qulification: user?.qulification ? user.qulification : "",
        email: user?.email ? user.email : "",
        phone: user?.phone ? user.phone : "",
        nameOfTheCourse: courseName,
    });

    const [disableButton, setDisableButton] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !inputValue.nameOfTheDoctor ||
            !inputValue.qulification ||
            !inputValue.email ||
            !inputValue.phone
        ) {
            setError(true);
            return false;
        }

        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);

        // try {
        //     const response = await axiosClient.post("/v2/addDoctor", data);
        //     console.log(response);
        //     if (response.status === "ok") {
        //         // navigate(`/master/user/home/${uuid.id}`);
        //         setAddDoctorsDialog(false);
        //         getDoctorsData();
        //         toast.success("Doctor added successfully");
        //         return;
        //     }
        // } catch (e) {
        //     toast.error(e.message);
        // }
    };

    // console.log(hospitalSpecialties.map (speciality => speciality.specialty));
    return (
        <Dialog
            open={courseEnrollDialog}
            onClose={() => setCourseEnrollDialog(false)}
            maxWidth={"lg"}
            sx={{ margin: " 0 auto" }}
        >
            <DialogTitle
                sx={{
                    fontFamily: "Raleway",
                    fontWeight: "600",
                    fontSize: "1.375rem",
                    lineHeight: "14.4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                Enrollment Form
                {courseEnrollDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => setCourseEnrollDialog(false)}
                        sx={{
                            // position: "absolute",
                            // right: 8,
                            // top: 8,
                            color: "#383838",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            {/* <hr /> */}
            <Divider />
            <DialogContent sx={{}}>
                <form onSubmit={handleSubmit}>
                    <Stack sx={{ position: "relative" }}>
                        <LabelStyle>Name of the course</LabelStyle>
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "880px" },
                            }}
                        >
                            {/* <Select
                                fullWidth
                                placeholder="Select a Course"
                                sx={{
                                    input: {
                                        height: "10px",
                                    },
                                    "input::placeholder": {
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        color: "#706D6D",
                                        opacity: 0.7,
                                    },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    color: "#383838",
                                    fontSize: "0.938rem",
                                    borderColor: "red",
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <GrDown />
                                        </InputAdornment>
                                    ),
                                }}
                            /> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                }}
                                placeholder="Select a Course"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            >
                                <MenuItem
                                    value="Select a Course"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Select a Course
                                </MenuItem>
                                {courseList?.map((courseName, i) => (
                                    <MenuItem
                                        key={i}
                                        value={courseName.courseName}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {courseName.courseName}
                                    </MenuItem>
                                ))}

                                {/* <MenuItem
                                    value="Calandar View"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Calandar View
                                </MenuItem> */}
                            </Select>
                            {/* <Box sx={{ position: "absolute", width: "100%" }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        borderBottom: "1px solid #D9D9D9",
                                        backgroundColor:"#ffffff",
                                        
                                    }}
                                >
                                    <Button
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "15px",
                                            textTransform: "none",
                                            borderRadius: 0,
                                            textAlign: "left",
                                        }}
                                    >
                                        Program In Acute Medicine
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        borderBottom: "1px solid #D9D9D9",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: "15px",
                                            textTransform: "none",
                                            borderRadius: 0,
                                            textAlign: "left",
                                        }}
                                    >
                                        Program In Acute Medicine
                                    </Button>
                                </Box>
                            </Box> */}
                        </Box>
                    </Stack>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={{ xs: "12px", sm: "12px", md: "24px" }}
                        mt={{ xs: "12px", sm: "12px", md: "24px" }}
                    >
                        <Stack sx={{ flex: 1 }}>
                            <LabelStyle>Name</LabelStyle>
                            <TextField
                                placeholder="Ex.  John Doe"
                                sx={{
                                    input: {
                                        height: "10px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        color: "#706D6D",
                                        fontSize: "0.938rem",
                                    },
                                    "input::placeholder": {
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        color: "#706D6D",
                                        opacity: 0.7,
                                    },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    color: "#383838",
                                    fontSize: "0.938rem",
                                    borderColor: "red",
                                }}
                                value={inputValue.nameOfTheDoctor}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack sx={{ flex: 1 }}>
                            <LabelStyle>Qualification</LabelStyle>
                            <TextField
                                placeholder="MBBS"
                                sx={{
                                    input: {
                                        height: "10px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        color: "#706D6D",
                                        fontSize: "0.938rem",
                                    },
                                    "input::placeholder": {
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        color: "#706D6D",
                                        opacity: 0.7,
                                    },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    color: "#383838",
                                    fontSize: "0.938rem",
                                    borderColor: "red",
                                }}
                                value={inputValue.qulification}
                                onChange={handleChange}
                            />
                        </Stack>
                    </Stack>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        spacing={{ xs: "12px", sm: "12px", md: "24px" }}
                        mt={{ xs: "12px", sm: "12px", md: "24px" }}
                    >
                        <Stack sx={{ flex: 1 }}>
                            <LabelStyle>Enter Email Id</LabelStyle>
                            <TextField
                                placeholder="doctor@gmail.com"
                                sx={{
                                    input: {
                                        height: "10px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        color: "#706D6D",
                                        fontSize: "0.938rem",
                                    },
                                    "input::placeholder": {
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        color: "#706D6D",
                                        opacity: 0.7,
                                    },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    color: "#383838",
                                    fontSize: "0.938rem",
                                    borderColor: "red",
                                }}
                                value={inputValue.email}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack sx={{ flex: 1 }}>
                            <LabelStyle>Enter Phone No</LabelStyle>
                            <TextField
                                placeholder="Ex 99112240477"
                                sx={{
                                    input: {
                                        height: "10px",
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        color: "#706D6D",
                                        fontSize: "0.938rem",
                                    },
                                    "input::placeholder": {
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        color: "#706D6D",
                                        opacity: 0.7,
                                    },
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    color: "#383838",
                                    fontSize: "0.938rem",
                                    borderColor: "red",
                                }}
                                value={inputValue.phone}
                                onChange={handleChange}
                            />
                        </Stack>
                    </Stack>
                    <LoadingButton
                        size="small"
                        fullWidth
                        type="submit"
                        loading={disableButton}
                        variant="contained"
                        sx={{
                            flex: 0.3,
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "364.69px",
                            },
                            mt: 4,
                            mb: 1.4,
                            mx: "auto",
                            display: "block",
                            boxShadow: "none",
                            borderRadius: "41px",
                            zIndex: 1,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "1rem",
                                textTransform: "none",
                            }}
                        >
                            Enroll now
                        </span>
                    </LoadingButton>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CourseEnrollFormDialog;
