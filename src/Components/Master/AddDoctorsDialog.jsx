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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

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
});

const LabelStyle = styled("label")({
    marginBottom: "5px",
});

const AddDoctorsDialog = ({
    addDoctorsDialog,
    setAddDoctorsDialog,
    getDoctorsData,
    hospitalLocation,
}) => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();

    const [err, setError] = useState(false);
    // const propLocation = hospitalLocation

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: "",
        qulification: "",
        speciality: "",
        yearOfExprience: "",
        enterEmailId: "",
        enterPhoneNo: "",
        connsultationFee: "",
        consultingTime: "",
        location: hospitalLocation,
        hospitalId: hospital_id,
    });

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
            !inputValue.enterEmailId ||
            // !inputImage ||
            !inputValue.enterPhoneNo ||
            !inputValue.connsultationFee ||
            !inputValue.consultingTime ||
            !inputValue.hospitalId
        ) {
            setError(true);
            return false;
        }

        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("speciality", inputValue.speciality);
        data.append("yearOfExprience", inputValue.yearOfExprience);
        data.append("enterEmailId", inputValue.enterEmailId);
        data.append("enterPhoneNo", inputValue.enterPhoneNo);
        data.append("connsultationFee", inputValue.connsultationFee);
        data.append("consultingTime", inputValue.consultingTime);
        data.append("hospitalId", inputValue.hospitalId);
        data.append("location", hospitalLocation);
        data.append("doctorImg", inputImage);
        data.append("password", "Medidek@123");

        // console.log(data);
        try {
            const response = await axiosClient.post("/v2/addDoctor", data);
            console.log(response);
            if (response.status === "ok") {
                // navigate(`/master/user/home/${uuid.id}`);
                setAddDoctorsDialog(false);
                getDoctorsData();
                toast.success("Doctor added successfully");
                return;
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    // console.log(hospitalSpecialties.map (speciality => speciality.specialty));
    return (
        <Dialog
            open={addDoctorsDialog}
            onClose={() => setAddDoctorsDialog(false)}
            maxWidth={"md"}
            sx={{ margin: " 0 auto" }}
        >
            <DialogTitle>
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
            <DialogContent dividers sx={{ margin: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction={"row"} gap={3}>
                        <img
                            src={preview ? preview : "/default.png"}
                            alt="user"
                            width={60}
                            height={60}
                            style={{ borderRadius: "50%" }}
                        />

                        <Box>
                            <Typography
                                my={1}
                                color={err && !inputImage ? "red" : "#706D6D"}
                                width="200px"
                                lineHeight="20px"
                            >
                                {err && inputImage
                                    ? "Please Pick a photo from your computer"
                                    : "Pick a photo from your computer"}
                            </Typography>

                            <FormLabel
                                htmlFor="hospitalImg"
                                sx={{ fontWeight: "600", color: "#1F51C6" }}
                            >
                                Change Profile photo
                            </FormLabel>
                            <input
                                type="file"
                                id="hospitalImg"
                                name="photo"
                                style={{ display: "none" }}
                                onChange={getUserImage}
                            />
                        </Box>
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
                                placeholder="Ex. Dr. John Doe"
                                error={
                                    err && !inputValue.nameOfTheDoctor && true
                                }
                                helperText={
                                    err &&
                                    !inputValue.nameOfTheDoctor &&
                                    "Please enter Doctor's name"
                                }
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
                                placeholder="Ex. MBBS. MD"
                                error={err && !inputValue.qulification && true}
                                helperText={
                                    err &&
                                    !inputValue.qulification &&
                                    "Please enter your qualification"
                                }
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
                                placeholder="Ex. ENT"
                                error={err && !inputValue.speciality && true}
                                helperText={
                                    err &&
                                    !inputValue.speciality &&
                                    "Please enter specialty"
                                }
                                onChange={handleChange}
                                select
                                SelectProps={{}}
                            >
                                {hospitalSpecialties.map((speciality, i) => (
                                    <MenuItem
                                        value={speciality.specialty}
                                        key={i}
                                    >
                                        {speciality.specialty}
                                    </MenuItem>
                                ))}
                            </TextFieldStyle>
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="experience">
                                Years Of Experience
                            </LabelStyle>
                            <TextFieldStyle
                                id="experience"
                                name="yearOfExprience"
                                fullWidth
                                placeholder="Ex. 5 Years"
                                error={
                                    err && !inputValue.yearOfExprience && true
                                }
                                helperText={
                                    err &&
                                    !inputValue.yearOfExprience &&
                                    "Please enter your experience"
                                }
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
                                placeholder="doctor@gmail.com"
                                error={err && !inputValue.enterEmailId && true}
                                helperText={
                                    err &&
                                    !inputValue.enterEmailId &&
                                    "Please enter your email"
                                }
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
                                placeholder="Ex 99112240477"
                                error={err && !inputValue.enterPhoneNo && true}
                                helperText={
                                    err &&
                                    !inputValue.enterPhoneNo &&
                                    "Please enter your phone number"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="password">
                                Password(can be edited later)
                            </LabelStyle>
                            <Stack direction={"row"}>
                                <TextFieldStyle
                                    disabled
                                    id="password"
                                    name="password"
                                    fullWidth
                                    value="Medidek@123"
                                    sx={{ color: "green" }}
                                    placeholder="Auto generated Password"
                                />
                            </Stack>
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
                                    err && !inputValue.connsultationFee && true
                                }
                                helperText={
                                    err &&
                                    !inputValue.connsultationFee &&
                                    "Please enter your fees"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="consultingTime">
                                Consulting Time
                            </LabelStyle>
                            <TextFieldStyle
                                id="consultingTime"
                                name="consultingTime"
                                fullWidth
                                placeholder="Ex 2PM to 5PM"
                                error={
                                    err && !inputValue.consultingTime && true
                                }
                                helperText={
                                    err &&
                                    !inputValue.consultingTime &&
                                    "Please enter OPD Hrs"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="location">
                                Full Address
                            </LabelStyle>
                            <TextFieldStyle
                                id="location"
                                name="location"
                                fullWidth
                                placeholder="Enter Full Address"
                                error={
                                    err && !inputValue.enterFullAdress && true
                                }
                                helperText={
                                    err &&
                                    !inputValue.enterFullAdress &&
                                    "Please enter Doctor's Full Address"
                                }
                                // onChange={handleChange}
                                value={hospitalLocation}
                            />
                        </StackStyle>
                    </Box>
                    <LoadingButton
                        size="small"
                        fullWidth
                        type="submit"
                        loading={disableButton}
                        // loadingPosition="end"
                        variant="contained"
                        sx={{
                            margin: "10px auto",
                            textTransform: "none",
                            display: "block",
                            width: "200px",
                        }}
                    >
                        <span>Add Doctor</span>
                    </LoadingButton>
                    {/* <Button type="submit" variant="contained" sx={{ margin:'10px auto', textTransform:'none', display:'block', width:'200px' }}>
                            Add Doctor
                        </Button> */}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddDoctorsDialog;
