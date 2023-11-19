import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Divider,
    FormControl,
    FormGroup,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUserData } from "../../Store/authSlice";
import Footer from "../../Components/Footer/Footer";
import { tab } from "../../Store/tabSlice";
import ChangePasswordDialogForPatient from "../../Components/Patient/ChangePasswordDialogForPatient";
import DatePicker from "react-date-picker";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StackStyle = styled(Stack)(({ theme }) => ({
    width: "48%",
    mx: 1,
    [theme.breakpoints.between("xs", "sm")]: {
        width: "100%",
    },
}));

const TextFieldStyle = styled(TextField)({
    [`& input`]: {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        color: "#383838",
    },

    "& .MuiOutlinedInput-input": {
        padding: "10px 15px",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
});
const SelectFieldStyle = styled(Select)({
    // [`& select`]: {
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: "15px",
    color: "#383838",
    // },

    "& .MuiOutlinedInput-input": {
        padding: "10px 15px",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
});

const MenuItemStyle = styled(MenuItem)({
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: "15px",
    color: "#383838",
});

const LabelStyle = styled("label")({
    marginBottom: "5px",
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: "15px",
    color: "#383838",
});

const DatePickerStyle = styled(MobileDatePicker)({
    [`& input`]: {
        color: "#383838",
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
    },
    [`& div`]: {
        height: "41px",
    },
});

const EditPetientProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    // console.log(user.user._id);
    // const [dob, setDob] = useState("");

    const [inputValue, setInputValue] = useState({
        name: user?.name,
        email: user?.email,
        dateOfBirth: user?.dateOfBirth ? user?.dateOfBirth : "",
        phone: user?.phone,
        gender: user?.gender,
    });

    const dispatch = useDispatch();
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [err, setError] = useState(false);
    const [imageValues, setImageValues] = useState("");
    const [hospitalData, setHospitalData] = useState({});
    const [disableButton, setDisableButton] = useState(false);
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);

    useEffect(() => {
        dispatch(tab(null));
    }, []);

    const getUserData = async () => {
        const response = await axiosClient.get(
            `/v2/getSinglePetient/${user?._id}`
        );
        console.log(response.result.user);
        if (response.status === "ok") {
            setInputValue(response.result);
            setImageValues(response.result.imgurl);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

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
        console.log("clicked");
        e.preventDefault();
        if (
            !inputValue.name ||
            !inputValue.email ||
            !inputValue.dateOfBirth ||
            !inputValue.phone ||
            !inputValue.gender
        ) {
            setError(true);
            return false;
        }

        let formData = new FormData();
        formData.append("name", inputValue.name);
        formData.append("email", inputValue.email);
        formData.append("dateOfBirth", inputValue.dateOfBirth);
        formData.append("phone", inputValue.phone);
        formData.append("gender", inputValue.gender);
        formData.append("image", inputImage || imageValues);

        try {
            const response = await axiosClient.put(
                `/v2/updateuserpatient/${id}`,
                formData
            );
            console.log(response.result);
            if (response.status === "ok") {
                dispatch(updateUserData(response.result));

                toast.success("Profile updated successfully");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 30px)",
                    },
                    m: "0px auto",
                    p: 1,
                }}
            >
                <Box
                    sx={{
                        // height: "90vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        borderRadius: "10px",
                        p: { xs: 0, sm: 0, md: 4 },
                    }}
                >
                    <Card
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "752px" },
                            height: "90%",
                            p: "25px",
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                            borderRadius: "5px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "600",
                                fontSize: "1.25rem",
                            }}
                        >
                            Edit Profile
                        </Typography>
                        <Divider sx={{ mt: "10px", mx: "-25px" }} />
                        <form onSubmit={handleSubmit}>
                            <Stack
                                direction={"row"}
                                spacing="5px"
                                alignItems={"center"}
                                sx={{ my: "15px" }}
                            >
                                <Avatar
                                    src={
                                        (preview && preview) ||
                                        (user?.imgurl && user?.imgurl) ||
                                        "/default.png"
                                    }
                                    alt="img"
                                    sx={{ width: "86px", height: "86px" }}
                                />

                                <Stack>
                                    <Typography
                                        my={1}
                                        color={"#706D6D"}
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "500",
                                            fontSize: "12px",
                                            lineHeight: "14px",
                                        }}
                                        width="200px"
                                    >
                                        Pick a photo from <br />
                                        your computer
                                    </Typography>

                                    <label
                                        htmlFor="hospitalImg"
                                        style={{
                                            color: "#1F51C6",
                                            fontWeight: "600",
                                            fontFamily: "Lato",
                                        }}
                                    >
                                        Change Profile photo
                                    </label>
                                    <input
                                        type="file"
                                        id="hospitalImg"
                                        name="photo"
                                        style={{ display: "none" }}
                                        onChange={getUserImage}
                                    />
                                </Stack>
                            </Stack>
                            <Divider sx={{ mt: 2 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    mt: 2,
                                    gap: "20px",
                                }}
                            >
                                <StackStyle>
                                    <LabelStyle htmlFor="hospitalName">
                                        Name
                                    </LabelStyle>
                                    <TextFieldStyle
                                        id="hospitalName"
                                        name="name"
                                        fullWidth
                                        placeholder="Enter Your Name"
                                        error={err && !inputValue.name && true}
                                        helperText={
                                            err &&
                                            !inputValue.name &&
                                            "Please enter your name"
                                        }
                                        value={inputValue.name}
                                        onChange={handleChange}
                                    />
                                </StackStyle>
                                <StackStyle>
                                    <LabelStyle htmlFor="email">
                                        Email
                                    </LabelStyle>
                                    <TextFieldStyle
                                        id="email"
                                        name="email"
                                        fullWidth
                                        placeholder="Enter Email "
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
                                    <LabelStyle htmlFor="phone">
                                        Phone
                                    </LabelStyle>
                                    <TextFieldStyle
                                        id="phone"
                                        name="phone"
                                        fullWidth
                                        placeholder="Enter Your Phone"
                                        error={err && !inputValue.phone && true}
                                        helperText={
                                            err &&
                                            !inputValue.phone &&
                                            "Please enter your phone"
                                        }
                                        value={inputValue.phone}
                                        onChange={handleChange}
                                    />
                                </StackStyle>
                                <StackStyle>
                                    <LabelStyle htmlFor="dateOfBirth">
                                        Date Of Birth
                                    </LabelStyle>
                                    {/* <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePickerStyle
                                            format="DD/MM/YYYY"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            defaultValue={"DD/MM/YYYY"}
                                            error={
                                                err &&
                                                !inputValue.dateOfBirth &&
                                                true
                                            }
                                            helperText={
                                                err &&
                                                !inputValue.dateOfBirth &&
                                                "Please enter your email"
                                            }
                                            value={inputValue.dateOfBirth}
                                            onChange={()=>console.log()}
                                        />
                                    </LocalizationProvider> */}
                                    <TextFieldStyle
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        fullWidth
                                        // type="date"
                                        placeholder="Enter Date Of Birth"
                                        error={
                                            err &&
                                            !inputValue.dateOfBirth &&
                                            true
                                        }
                                        helperText={
                                            err &&
                                            !inputValue.dateOfBirth &&
                                            "Please enter your date of birth"
                                        }
                                        value={inputValue.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </StackStyle>
                                <StackStyle>
                                    <LabelStyle htmlFor="gender">
                                        Gender
                                    </LabelStyle>
                                    <SelectFieldStyle
                                        id="gender"
                                        name="gender"
                                        fullWidth
                                        placeholder="Select Gender"
                                        error={
                                            err && !inputValue.gender && true
                                        }
                                        value={inputValue.gender}
                                        onChange={handleChange}
                                    >
                                        <MenuItemStyle value="male">
                                            Male
                                        </MenuItemStyle>
                                        <MenuItemStyle value="female">
                                            Female
                                        </MenuItemStyle>
                                        <MenuItemStyle value="other">
                                            Other
                                        </MenuItemStyle>
                                    </SelectFieldStyle>
                                    {/* <TextFieldStyle
                                        id="gender"
                                        name="gender"
                                        fullWidth
                                        placeholder="Select Gender"
                                        error={
                                            err &&
                                            !inputValue.dateOfBirth &&
                                            true
                                        }
                                        helperText={
                                            err &&
                                            !inputValue.dateOfBirth &&
                                            "Please enter your email"
                                        }
                                        value={inputValue.dateOfBirth}
                                        onChange={handleChange}
                                    /> */}
                                </StackStyle>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    flex: 0.3,
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                    },
                                    my: 2,
                                    mx: "auto",
                                    display: "block",
                                    textTransform: "none",
                                    borderRadius: "63px",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "17px",
                                    boxShadow: "none",
                                }}
                            >
                                Save Details
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setChangePasswordDialog(true)}
                                sx={{
                                    flex: 0.3,
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                    },
                                    my: 2,
                                    mx: "auto",
                                    display: "block",
                                    textTransform: "none",
                                    borderRadius: "63px",
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "17px",
                                    backgroundColor: "#FFFFFF",
                                    color: "#383838",
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    "&:hover": {
                                        backgroundColor: "#DCE3F6",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                Change Password
                            </Button>
                        </form>
                    </Card>
                </Box>
                <ChangePasswordDialogForPatient
                    changePasswordDialog={changePasswordDialog}
                    setChangePasswordDialog={setChangePasswordDialog}
                />
            </Box>
            <Footer />
        </>
    );
};

export default EditPetientProfile;
