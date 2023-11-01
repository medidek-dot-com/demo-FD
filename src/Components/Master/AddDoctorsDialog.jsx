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
    Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { duiddata } from "./DuidDialog";
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
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
    },
    ["& input:disabled"]: {
        color: "#706D6D",
        backgroundColor: "#D9D9D9",
        cursor: "no-drop",
    },
    ["& input"]: {
        // color: "white",
        fontFamily: "Lato",
        fontWeight: "600",
        color: "#383838",
        fontSize: "0.938rem",
        borderColor: "red",
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

const AddDoctorsDialog = ({
    inputValue,
    setInputValue,
    addDoctorsDialog,
    setAddDoctorsDialog,
    getDoctorsData,
    hospitalLocation,
}) => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();
    const [err, setError] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [confirmAddDoctorDialog, setConfirmAddDoctorDialog] = useState(false);

    // const propLocation = hospitalLocation

    // const [inputValue, setInputValue] = useState({
    //     nameOfTheDoctor: duiddata?.nameOfTheDoctor ? duiddata.nameOfTheDoctor : "",
    //     qulification: duiddata?.qulification ? duiddata.qulification : "",
    //     speciality: duiddata?.speciality ? duiddata.speciality : "",
    //     yearOfExprience:  duiddata?.yearOfExprience ? duiddata.yearOfExprience : "",
    //     email: duiddata?.email ? duiddata.email : "",
    //     phone: duiddata?.phone ? duiddata.phone : "",
    //     connsultationFee: duiddata?.connsultationFee ? duiddata.connsultationFee : "",
    //     doctorid: duiddata?.doctorid ? duiddata.doctorid : "",
    // });

    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const getUserImage = (e) => {
        // console.log(e.target.files[0]);
        setInputImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !inputValue.nameOfTheDoctor ||
            !inputValue.qulification ||
            !inputValue.speciality ||
            !inputValue.yearOfExprience ||
            !inputValue.email ||
            // !inputImage ||
            !inputValue.phone ||
            !inputValue.connsultationFee ||
            !inputValue.description ||
            !inputValue.hospitalId
        ) {
            setError(true);
            return false;
        }

        setConfirmAddDoctorDialog(true);
    };

    const addDoctor = async () => {
        setDisableButton(true);
        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("speciality", inputValue.speciality);
        data.append("yearOfExprience", inputValue.yearOfExprience);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("connsultationFee", inputValue.connsultationFee);
        data.append("doctorid", inputValue.doctorid);
        data.append("description", inputValue.description);
        data.append("image", inputImage || inputValue?.imgurl);

        // console.log(data);
        try {
            const response = await axiosClient.post(
                `/v2/addDoctor/${user?._id}`,
                data
            );
            console.log(response);
            if (response.status === "ok") {
                // navigate(`/master/user/home/${uuid.id}`);
                setDisableButton(false);
                setAddDoctorsDialog(false);
                setConfirmAddDoctorDialog(false);
                getDoctorsData();
                toast.success("Doctor added successfully");
                return;
            }
        } catch (e) {
            setDisableButton(false);
            return toast.error(e.message);
        }
    };

    // console.log(hospitalSpecialties.map (speciality => speciality.specialty));
    return (
        <>
            <Dialog
                open={addDoctorsDialog}
                onClose={() => setAddDoctorsDialog(false)}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: { xs: "1rem", sm: "1rem", md: "1.375rem" },
                    }}
                >
                    Add Doctor
                    {addDoctorsDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setAddDoctorsDialog(false)}
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
                </DialogTitle>
                <DialogContent dividers sx={{ margin: "0px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack
                                direction={"row"}
                                spacing={{ xs: 0.5, sm: 0.5, md: 3 }}
                                sx={{ flex: 1 }}
                            >
                                <Avatar
                                    src={
                                        inputValue.imgurl
                                            ? inputValue.imgurl
                                            : "/default.png" || preview
                                            ? preview
                                            : "/default.png"
                                    }
                                    sx={{
                                        width: {
                                            xs: "60px",
                                            sm: "60px",
                                            md: "86px",
                                        },
                                        height: {
                                            xs: "60px",
                                            sm: "60px",
                                            md: "86px",
                                        },
                                    }}
                                    alt="user"
                                />

                                <Box>
                                    <Typography
                                        color="#706D6D"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "500",
                                            fontSize: "0.75rem",
                                            lineHeight: "14.4px",
                                            display: {
                                                xs: "none",
                                                sm: "none",
                                                md: "block",
                                            },
                                            width: "120.73px",
                                        }}
                                    >
                                        Pick a photo from your computer
                                    </Typography>
                                    <Typography
                                        color={
                                            err && !inputImage
                                                ? "red"
                                                : "#706D6D"
                                        }
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "500",
                                            fontSize: "0.75rem",
                                            lineHeight: "14.4px",
                                            display: {
                                                xs: "block",
                                                sm: "block",
                                                md: "none",
                                            },
                                            width: "89px",
                                        }}
                                    >
                                        Pick a photo from your phone
                                    </Typography>

                                    <FormLabel
                                        htmlFor="hospitalImg"
                                        sx={{
                                            fontWeight: "600",
                                            color: "#1F51C6",
                                            fontSize: {
                                                xs: "0.75rem",
                                                sm: "0.75rem",
                                                md: "0.875rem",
                                            },
                                        }}
                                    >
                                        Change Profile photo
                                    </FormLabel>
                                    <Box
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "600",
                                            fontSize: {
                                                xs: "0.75rem",
                                                sm: "0.75rem",
                                                md: "0.938rem",
                                            },
                                            color: "#1F51C6",
                                        }}
                                    >
                                        DUID:{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "#000000" }}
                                        >
                                            {inputValue.doctorid}
                                        </Box>
                                    </Box>
                                    <input
                                        type="file"
                                        id="hospitalImg"
                                        name="photo"
                                        style={{ display: "none" }}
                                        onChange={getUserImage}
                                    />
                                </Box>
                            </Stack>
                            {/* <Box sx={{background:"green", display:'flex', alignItems:'center', width:'200px', flex:1}}> */}
                            {/* <Button
                            sx={{
                                fontSize: {
                                    xs: "0.75rem",
                                    sm: "0.75rem",
                                    md: "0.875rem",
                                },
                                fontFamily: "Lato",
                                fontWeight: "600",
                                color: "#1F51C6",
                                cursor: "pointer",
                                textTransform: "none",
                                lineHeight: "14.4px",
                                textAlign: {
                                    xs: "right",
                                    sm: "right",
                                    md: "center",
                                },
                                width: {
                                    xs: "130px",
                                    sm: "114px",
                                    md: "250px",
                                },
                                // backgroundColor:'blue',
                                p: 0,
                                ":hover": {
                                    background: "none",
                                },
                            }}
                        >
                            Change Appointment settings
                        </Button> */}

                            {/* </Box> */}
                        </Stack>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",

                                mt: 2,
                            }}
                        >
                            <StackStyle>
                                <LabelStyle htmlFor="DoctorName">
                                    Name of the Doctor
                                </LabelStyle>
                                <TextFieldStyle
                                    id="DoctorName"
                                    name="nameOfTheDoctor"
                                    fullWidth
                                    disabled
                                    sx={{
                                        ":disabled": {
                                            color: "red",
                                        },
                                    }}
                                    placeholder="Ex. Dr. John Doe"
                                    error={
                                        err &&
                                        !inputValue.nameOfTheDoctor &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.nameOfTheDoctor &&
                                        "Please enter Doctor's name"
                                    }
                                    value={inputValue.nameOfTheDoctor}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="qualification">
                                    Qualification
                                </LabelStyle>
                                <TextFieldStyle
                                    id="qualification"
                                    name="qulification"
                                    fullWidth
                                    disabled
                                    placeholder="Ex. MBBS. MD"
                                    error={
                                        err && !inputValue.qulification && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.qulification &&
                                        "Please enter your qualification"
                                    }
                                    value={inputValue.qulification}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="speciality">
                                    Speciality
                                </LabelStyle>
                                {/* <Select>
                                {hospitalSpecialties.map((speciality, i) => {
                                    return (
                                        <MenuItem key={i} value={speciality}>
                                            {speciality}
                                        </MenuItem>
                                    );
                                })}
                            </Select> */}
                                <TextFieldStyle
                                    id="speciality"
                                    name="speciality"
                                    fullWidth
                                    disabled
                                    placeholder="Ex. ENT"
                                    error={
                                        err && !inputValue.speciality && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.speciality &&
                                        "Please enter specialty"
                                    }
                                    value={inputValue.speciality}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="experience">
                                    Years Of Experience
                                </LabelStyle>
                                <TextFieldStyle
                                    id="experience"
                                    name="yearOfExprience"
                                    fullWidth
                                    disabled
                                    placeholder="Ex. 5 Years"
                                    error={
                                        err &&
                                        !inputValue.yearOfExprience &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.yearOfExprience &&
                                        "Please enter your experience"
                                    }
                                    value={inputValue.yearOfExprience}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="mailId">
                                    Enter Email Id
                                </LabelStyle>
                                <TextFieldStyle
                                    id="mailId"
                                    name="enterEmailId"
                                    fullWidth
                                    disabled
                                    placeholder="doctor@gmail.com"
                                    error={err && !inputValue.email && true}
                                    helperText={
                                        err &&
                                        !inputValue.email &&
                                        "Please enter your email"
                                    }
                                    value={inputValue.email}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="phoneNo">
                                    Enter Phone No
                                </LabelStyle>
                                <TextFieldStyle
                                    id="phoneNo"
                                    name="enterPhoneNo"
                                    fullWidth
                                    disabled
                                    placeholder="Ex 99112240477"
                                    error={err && !inputValue.phone && true}
                                    helperText={
                                        err &&
                                        !inputValue.phone &&
                                        "Please enter your phone number"
                                    }
                                    value={inputValue.phone}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="connsultationFee">
                                    Connsultation Fee
                                </LabelStyle>
                                <TextFieldStyle
                                    id="connsultationFee"
                                    name="connsultationFee"
                                    fullWidth
                                    placeholder="Ex ₹500"
                                    error={
                                        err &&
                                        !inputValue.connsultationFee &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.connsultationFee &&
                                        "Please enter your fees"
                                    }
                                    value={inputValue.connsultationFee}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="description">
                                    Enter Description
                                </LabelStyle>
                                <TextFieldStyle
                                    id="description"
                                    name="description"
                                    fullWidth
                                    placeholder="Enter Description"
                                    error={
                                        err && !inputValue.description && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue.description &&
                                        "Please enter Doctor's description"
                                    }
                                    value={inputValue.description}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            {/* <StackStyle>
                            <LabelStyle htmlFor="Category1">
                                Category 1
                            </LabelStyle>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "262.93px",
                                    },
                                    height: "40px",
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                }}
                                placeholder="Choose Slot Duration"
                                // value={view}
                                onChange={(e) => setView(e.target.value)}
                            >
                                <MenuItem
                                    value="Weekly view"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Choose Slot Duration
                                </MenuItem>
                                <MenuItem
                                    value="Calandar View"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Calandar View
                                </MenuItem>
                            </Select>
                        </StackStyle> */}
                        </Box>
                        <Button
                            size="small"
                            type="submit"
                            // onClick={()=>setConfirmAddDoctorDialog(true)}
                            fullWidth
                            variant="contained"
                            sx={{
                                flex: 0.3,
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "1rem",
                                textTransform: "none",
                                width: {
                                    xs: "100%",
                                    sm: "100%",
                                    md: "364.69px",
                                },
                                my: 2,
                                mx: "auto",
                                display: "block",
                                boxShadow: "none",
                            }}
                        >
                            Add Doctor
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog
                sx={{ borderRadius: "14px" }}
                onClose={() => setConfirmAddDoctorDialog(false)}
                aria-labelledby="customized-dialog-title"
                open={confirmAddDoctorDialog}
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
                    Confirm Doctor Details?
                </DialogTitle>
                {confirmAddDoctorDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => setConfirmAddDoctorDialog(false)}
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
                        Are you sure you want to Add Doctor?
                    </Typography>
                    <Stack direction="row" spacing="15px">
                        <Button
                            onClick={() => setConfirmAddDoctorDialog(false)}
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
                                boxShadow: "none",
                                ":hover": { background: "#706D6D" },
                            }}
                        >
                            Cancel{" "}
                        </Button>
                        <LoadingButton
                            size="small"
                            fullWidth
                            onClick={addDoctor}
                            loading={disableButton}
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
                                boxShadow: "none",
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
                                Add Doctor
                            </span>
                        </LoadingButton>
                        {/* <Button
                                onClick={handleSubmit}
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
                            </Button> */}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddDoctorsDialog;
