import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
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
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
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

const ChangePasswordField = styled(TextField)({
    "& input::placeholder": {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        color: "#706D6D",
    },
    "& .css-1jnszeg-MuiInputBase-root-MuiOutlinedInput-root": {
        height: "38px",
    },
});

const EditDoctorDialog = ({
    editDoctorDialog,
    setEditDoctorDialog,
    getDoctorsData,
    setInputValue,
    inputValue,
    singleDoctorsData,
}) => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();

    const [err, setError] = useState(false);
    // const propLocation = hospitalLocation

    // const [inputValue, setInputValue] = useState(singleDoctorsData)

    // const [inputValue, setInputValue] = useState({
    //     nameOfTheDoctor:singleDoctorsData?.nameOfTheDoctor,
    //     qulification: "",
    //     speciality:"",
    //     yearOfExprience:"",
    //     enterEmailId:"",
    //     enterPhoneNo: "",
    //     connsultationFee: "",
    //     consultingTime: "",
    //     location: "",
    //     hospitalId: hospital_id,
    // });

    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);

    // useEffect(()=>{
    //     setInputValue(singleDoctorsData)
    // },[])

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
            !inputValue.acceptAppointments ||
            !inputValue.hospitalId
        ) {
            setError(true);
            return false;
        }
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
        data.append("acceptAppointments", inputValue.acceptAppointments);
        data.append("location", inputValue.location);
        data.append("image", inputImage || inputValue?.imgurl);

        // console.log(data);
        try {
            const response = await axiosClient.put(
                `/v2/editDoctorfile/${singleDoctorsData._id}`,
                data
            );
            console.log(response);
            if (response.status === "ok") {
                // navigate(`/master/user/home/${uuid.id}`);
                await getDoctorsData();
                setEditDoctorDialog(false);
                toast.success("Doctor's Data update successfully");
                setDisableButton(false);
                return;
            }
        } catch (e) {
            toast.error(e.message);
            setDisableButton(false);
        }
    };

    const changeDoctorPassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            return setError(true);
        }

        if (newPassword !== confirmPassword) {
            setError(true);
            return setPasswordNotMatch(true);
        }
        try {
            const response = await axiosClient.put(
                `/v2/changePasswordForDoctor/${inputValue._id}`,
                {
                    oldPassword,
                    newPassword,
                }
            );
            if (response.status === "ok") {
                setChangePasswordDialog(false);
                return toast.success("password Changed successfully");
            } else if (
                response.status === "error" &&
                response.statusCode === 403
            ) {
                setWrongPassword(true);
            }
        } catch (error) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError(true);
            setWrongPassword(error.message);
        }
    };
    return (
        <>
            <Dialog
                open={editDoctorDialog}
                onClose={() => setEditDoctorDialog(false) & setPreview("")}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "22px",
                    }}
                >
                    Edit Doctor
                    {editDoctorDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() =>
                                setEditDoctorDialog(false) & setPreview("")
                            }
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
                <Divider />
                <DialogContent sx={{ margin: "10px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            direction={"row"}
                            spacing={{ xs: 1, sm: 1, md: 3 }}
                        >
                            <img
                                src={
                                    (preview && preview) ||
                                    (inputValue.imgurl && inputValue.imgurl) ||
                                    "/default.png"
                                }
                                alt="user"
                                width={60}
                                height={60}
                                style={{ borderRadius: "50%" }}
                            />

                            <Box>
                                <Typography
                                    my={1}
                                    sx={{
                                        width: "200px",
                                        fontFamily: "Lato",
                                        fontWeight: "500",
                                        fontSize: "0.8rem",
                                        lineHeight: "14.4px",
                                        color: "#706D6D",
                                    }}
                                >
                                    {(err && inputImage) ||
                                    inputValue?.doctorImg
                                        ? "Please Pick a photo from your computer"
                                        : "Pick a photo from your computer"}
                                </Typography>

                                <FormLabel
                                    htmlFor="hospitalImg"
                                    sx={{
                                        fontWeight: "600",
                                        color: "#1F51C6",
                                        fontFamily: "Lato",
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
                                    name="imgurl"
                                    style={{ display: "none" }}
                                    onChange={getUserImage}
                                />
                            </Box>
                        </Stack>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",

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
                                    placeholder="Ex. Dr. John Doe"
                                    error={
                                        err &&
                                        !inputValue?.nameOfTheDoctor &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue?.nameOfTheDoctor &&
                                        "Please enter Doctor's name"
                                    }
                                    value={inputValue?.nameOfTheDoctor}
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
                                        err && !inputValue?.qulification && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue?.qulification &&
                                        "Please enter your qualification"
                                    }
                                    value={inputValue?.qulification}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="speciality">
                                    Speciality
                                </LabelStyle>
                                <TextFieldStyle
                                    id="speciality"
                                    name="speciality"
                                    fullWidth
                                    disabled
                                    placeholder="Ex. ENT"
                                    error={
                                        err && !inputValue?.speciality && true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue?.speciality &&
                                        "Please enter specialty"
                                    }
                                    value={inputValue?.speciality}
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
                                        !inputValue?.yearOfExprience &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue?.yearOfExprience &&
                                        "Please enter your experience"
                                    }
                                    value={inputValue?.yearOfExprience}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="mailId">
                                    Enter Email Id
                                </LabelStyle>
                                <TextFieldStyle
                                    id="mailId"
                                    name="email"
                                    fullWidth
                                    disabled
                                    placeholder="doctor@gmail.com"
                                    error={err && !inputValue?.email && true}
                                    helperText={
                                        err &&
                                        !inputValue?.email &&
                                        "Please enter your email"
                                    }
                                    value={inputValue?.email}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            <StackStyle>
                                <LabelStyle htmlFor="phone">
                                    Enter Phone No
                                </LabelStyle>
                                <TextFieldStyle
                                    id="phoneNo"
                                    name="enterPhoneNo"
                                    fullWidth
                                    disabled
                                    placeholder="Ex 99112240477"
                                    error={err && !inputValue?.phone && true}
                                    helperText={
                                        err &&
                                        !inputValue?.phone &&
                                        "Please enter your phone number"
                                    }
                                    value={inputValue?.phone}
                                    onChange={handleChange}
                                />
                            </StackStyle>
                            {/* <StackStyle>
                            <LabelStyle htmlFor="password">
                                Password(can be edited later)
                            </LabelStyle>
                            <Stack direction={'row'}>
                                <TextFieldStyle
                                disabled
                                    id="password"
                                    name="password"
                                    fullWidth
                                    value='Medidek@123'
                                    sx={{color:'green'}}
                                    placeholder="Auto generated Password"
                                    
                                />
                            </Stack>
                        </StackStyle> */}
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
                                        !inputValue?.connsultationFee &&
                                        true
                                    }
                                    helperText={
                                        err &&
                                        !inputValue?.connsultationFee &&
                                        "Please enter your fees"
                                    }
                                    value={inputValue?.connsultationFee}
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
                                    disabled
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
                            <StackStyle>
                                <LabelStyle htmlFor="acceptAppointments">
                                    How would you like to accept appointments ?
                                </LabelStyle>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="acceptAppointments"
                                    value={inputValue.acceptAppointments}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value="byToken"
                                        control={<Radio />}
                                        label="By Token"
                                        sx={{ fontFamily: "Lato" }}
                                    />
                                    <FormControlLabel
                                        value="bySlot"
                                        control={<Radio />}
                                        label="By Slot"
                                    />
                                </RadioGroup>
                                {/* <TextFieldStyle
                                                id="acceptAppointments"
                                                name="acceptAppointments"
                                                fullWidth
                                                placeholder="Enter Doctor’s Description"
                                                error={
                                                    err &&
                                                    !inputValue.description &&
                                                    true
                                                }
                                                helperText={
                                                    err &&
                                                    !inputValue.description &&
                                                    "Please enter description"
                                                }
                                                value={inputValue.description}
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                            /> */}
                            </StackStyle>
                            {/* <StackStyle>
                                <LabelStyle htmlFor="location">
                                    Full Address
                                </LabelStyle>
                                <TextFieldStyle
                                    id="location"
                                    name="location"
                                    fullWidth
                                    placeholder="Enter Full Address"
                                    error={err && !inputValue?.location && true}
                                    helperText={
                                        err &&
                                        !inputValue?.location &&
                                        "Please enter Doctor's Full Address"
                                    }
                                    value={inputValue?.location}
                                    onChange={handleChange}
                                />
                            </StackStyle> */}
                        </Box>
                        <LoadingButton
                            // size="small"
                            type="submit"
                            loading={disableButton}
                            // loadingPosition="end"
                            variant="contained"
                            sx={{
                                // marginTop: "25px",
                                textTransform: "none",
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                borderRadius: "63px",
                                // height: "40px",
                                boxshadow: "none !important",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "17px",
                                    boxshadow: "none",
                                }}
                            >
                                Save Details
                            </span>
                        </LoadingButton>
                        {/* <Button
                            onClick={() => setChangePasswordDialog(true)}
                            variant="outlined"
                            sx={{
                                margin: "10px auto",
                                textTransform: "none",
                                display: "block",
                                width: "100%",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "17px",
                                color: "#383838",
                                borderRadius: "63px",
                                borderColor: "#D9D9D9",
                                height: "40px",
                                boxshadow: "none",
                            }}
                        >
                            Change Password
                        </Button> */}
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog
                open={changePasswordDialog}
                onClose={() => setChangePasswordDialog(false)}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Change Password
                    {changePasswordDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setChangePasswordDialog(false)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: "#383838",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <Divider />
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Stack spacing="10px">
                        <InputLabel
                            htmlFor="oldPass"
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "15px",
                                color: "#383838",
                            }}
                        >
                            Enter Old Password
                            <span style={{ color: "#EA4335" }}>*</span>
                        </InputLabel>
                        <ChangePasswordField
                            id="oldPass"
                            value={oldPassword}
                            error={
                                err && !oldPassword
                                    ? true
                                    : false || (err && wrongPassword)
                                    ? true
                                    : false
                            }
                            helperText={
                                err && !oldPassword
                                    ? "Please enter old password"
                                    : null || (err && wrongPassword)
                                    ? wrongPassword
                                    : null
                            }
                            sx={{ width: "344px" }}
                            placeholder="Old Password"
                            onChange={(e) =>
                                setOldPassword(e.target.value) & setError(false)
                            }
                        />
                    </Stack>
                    <Stack spacing="10px">
                        <InputLabel
                            htmlFor="oldPass"
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "15px",
                                color: "#383838",
                            }}
                        >
                            Enter New Password
                            <span style={{ color: "#EA4335" }}>*</span>
                        </InputLabel>
                        <ChangePasswordField
                            value={newPassword}
                            error={
                                err && !newPassword
                                    ? true
                                    : false || (err && passwordNotMatch)
                                    ? true
                                    : false
                            }
                            helperText={
                                err && !newPassword
                                    ? "Please enter new password"
                                    : null || (err && passwordNotMatch)
                                    ? "Password did not match"
                                    : null
                            }
                            id="oldPass"
                            sx={{ width: "344px" }}
                            placeholder="New Password"
                            onChange={(e) =>
                                setNewPassword(e.target.value) & setError(false)
                            }
                        />
                    </Stack>
                    <Stack spacing="10px">
                        <InputLabel
                            htmlFor="oldPass"
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "15px",
                                color: "#383838",
                            }}
                        >
                            Confirm New Password
                            <span style={{ color: "#EA4335" }}>*</span>
                        </InputLabel>
                        <ChangePasswordField
                            value={confirmPassword}
                            error={
                                err && !confirmPassword
                                    ? true
                                    : false || (err && passwordNotMatch)
                                    ? true
                                    : false
                            }
                            helperText={
                                err && !confirmPassword
                                    ? "Please enter new password"
                                    : null || (err && passwordNotMatch)
                                    ? "Password did not match"
                                    : null
                            }
                            id="oldPass"
                            sx={{ width: "344px" }}
                            placeholder="Confirm New"
                            onChange={(e) =>
                                setConfirmPassword(e.target.value) &
                                setError(false)
                            }
                        />
                    </Stack>
                    <Stack spacing="10px">
                        <Button
                            onClick={changeDoctorPassword}
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "17px",
                                color: "#ffffff",
                                borderRadius: "63px",
                                borderColor: "#D9D9D9",
                                height: "40px",
                            }}
                        >
                            Change Password
                        </Button>
                        <Button
                            onClick={() => setChangePasswordDialog(false)}
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                fontSize: "17px",
                                color: "#383838",
                                borderRadius: "63px",
                                borderColor: "#D9D9D9",
                                height: "40px",
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditDoctorDialog;
