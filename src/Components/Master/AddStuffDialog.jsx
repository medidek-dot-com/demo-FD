import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axiosClient } from "../../Utils/axiosClient";
import { DatePicker, LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

const AddStuffDialog = ({
    addStaffDialog,
    setAddStaffDialog,
    getStaffData,
}) => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        nameOfStaff: "",
        designation: "",
        email: "",
        phone: "",
        gender: "",
        hospitalId: hospital_id,
    });

    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [err, setError] = useState(false);
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
            !inputValue.nameOfStaff ||
            !inputValue.designation ||
            !inputValue.email ||
            !inputValue.gender ||
            !inputValue.phone
        ) {
            setError(true);
            return false;
        }

        const data = new FormData();
        data.append("nameOfStaff", inputValue.nameOfStaff);
        data.append("designation", inputValue.designation);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("gender", inputValue.gender);
        data.append("image", inputImage);
        data.append("hospitalId", hospital_id);

        // console.log(data);
        try {
            const response = await axiosClient.post("/v2/addstaff", data);
            if (response.status === "ok") {
                toast.success("Staff added successfully");
                setAddStaffDialog(false);
                getStaffData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            open={addStaffDialog}
            onClose={() => setAddStaffDialog(false)}
            maxWidth={"md"}
            sx={{ margin: " 0 auto" }}
        >
            <DialogTitle>
                Add Supporting Staff
                {addStaffDialog ? (
                    <IconButton
                        aria-label="close"
                        onClick={() => setAddStaffDialog(false)}
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
            <DialogContent dividers style={{ margin: "10px" }}>
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
                                width="170px"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.75rem",
                                    lineHeight: "14.4px",
                                }}
                            >
                                {err && inputImage
                                    ? "Please Pick a photo from your computer"
                                    : ""}
                                Pick a photo from your computer
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
                            justifyContent: "center",
                            flexWrap: "wrap",
                            mt: 2,
                        }}
                    >
                        <StackStyle>
                            <LabelStyle htmlFor="staffName">
                                Name of the staff
                            </LabelStyle>
                            <TextFieldStyle
                                id="staffName"
                                name="nameOfStaff"
                                fullWidth
                                placeholder="Ex.  John Doe"
                                error={err && !inputValue.nameOfStaff && true}
                                helperText={
                                    err &&
                                    !inputValue.nameOfStaff &&
                                    "Please enter staff's name"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="designation">
                                Designation
                            </LabelStyle>
                            <TextFieldStyle
                                id="designation"
                                name="designation"
                                fullWidth
                                placeholder="Nurse/Compounder/Support Staff"
                                error={err && !inputValue.designation && true}
                                helperText={
                                    err &&
                                    !inputValue.designation &&
                                    "Please enter staff's designation"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="email">
                                Enter Email Id
                            </LabelStyle>
                            <TextFieldStyle
                                id="email"
                                name="email"
                                fullWidth
                                placeholder="doctor@gmail.com"
                                error={err && !inputValue.email && true}
                                helperText={
                                    err &&
                                    !inputValue.email &&
                                    "Please enter staff's name"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="phone">
                                Enter Phone No
                            </LabelStyle>
                            <TextFieldStyle
                                id="phone"
                                name="phone"
                                fullWidth
                                placeholder="Ex 99112240477"
                                error={err && !inputValue.phone && true}
                                helperText={
                                    err &&
                                    !inputValue.phone &&
                                    "Please enter staff's phone"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="gender">Gender</LabelStyle>
                            <TextFieldStyle
                                id="gender"
                                name="gender"
                                fullWidth
                                placeholder="Ex. Male"
                                error={err && !inputValue.gender && true}
                                helperText={
                                    err &&
                                    !inputValue.gender &&
                                    "Please enter staff's phone"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        {/* <StackStyle>
                            <LabelStyle htmlFor="dob">
                            Enter Date Of Birth
                            </LabelStyle>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} />
                            </LocalizationProvider> */}
                        {/* <TextFieldStyle
                                id="dob"
                                name="dob"
                                type="date"
                                fullWidth
                                placeholder="DD/MM/YY"
                                error={err && !inputValue.gender && true}
                                helperText={
                                    err && !inputValue.gender && "Please enter staff's phone"
                                }
                                onChange={handleChange}
                            /> */}
                        {/* </StackStyle> */}
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
                                    placeholder="Auto generated Password"
                                    value="medidekPass@123"
                                    sx={{ background: "#D9D9D9" }}
                                    onChange={handleChange}
                                />
                            </Stack>
                        </StackStyle>
                    </Box>
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
                            my: 2,
                            mx: "auto",
                            display: "block",
                            boxShadow: "none",
                            borderRadius: "41px",
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
                            Add Staff
                        </span>
                    </LoadingButton>
                    {/* <Button type="submit" variant="contained" sx={{ flex: 0.3, mt:2, textTransform:'none', display:'block', margin:'10px auto', width:'200px' }}>
                            Add Doctor
                        </Button> */}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddStuffDialog;
