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
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { axiosClient } from "../../Utils/axiosClient";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { baseURL } from "../../Utils/axiosClient"; 
import { useDispatch } from "react-redux";
import { updateUserData } from "../../Store/authSlice";


const StackStyle = styled(Stack)(({theme})=>({
    width:"48%" ,
    mx: 1,
    [theme.breakpoints.between('xs', 'sm')]:{
        width:'100%',
    },
}))

const TextFieldStyle = styled(TextField)({
    // marginBottom: "20px",
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
    },
});

const LabelStyle = styled("label")({
    marginBottom: "5px",
});

const MasterUser = () => {
    const navigate = useNavigate();
    const {hospital_id} = useParams();
    const [inputValue, setInputValue] = useState({
        nameOfhospitalOrClinic: "",
        hospitalType: "",
        location: "",
        landmark: "",
        enterFullAddress: "",
    });

    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [err, setError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const dispatch = useDispatch();

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

    const handleSubmit = async(e) => {
        console.log('clicked');
        e.preventDefault();
        if (
            !inputValue.nameOfhospitalOrClinic ||
            !inputValue.hospitalType ||
            !inputValue.enterFullAddress ||
            !inputValue.location ||
            !inputValue.landmark
        ) {
            setError(true);
            return false;
        }
        let formData = new FormData();
        formData.append(
            "nameOfhospitalOrClinic",
            inputValue.nameOfhospitalOrClinic
        );
        formData.append("hospitalType", inputValue.hospitalType);
        formData.append("enterFullAddress", inputValue.enterFullAddress);
        formData.append("location", inputValue.location);
        formData.append("landmark", inputValue.landmark);
        formData.append("img", inputImage );

        try {
            const response = await axiosClient.put(`/v2/master/${hospital_id}`, formData);
            console.log(response.result);
            if (response.status === 'ok') {
                dispatch(updateUserData(response.result))
                toast.success("Profile updated successfully");
            navigate(`/master/user/home/${hospital_id}`);  
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
                // height: "90vh",
                display: "flex",
                alignItems: "center",
                background: "#DCE3F6",
                width:"100%",
                m: "0 auto",
                borderRadius: "10px",
                p:{xs:0, sm:0, md:4}
            }}
        >
            <Box sx={{ width: "30%", display:{xs:"none", sm:"none", md:"block"} }}>
                <Typography variant="h3">
                    Create or edit Hospital Profile
                </Typography>
                <Typography color="#706D6D">
                    Enter Your details in the given form to create a Hospital
                    Profile. By doing so, you’ll be able to add doctors, staff
                    and Paitents to your hospital.
                </Typography>
            </Box>
            <Card sx={{ width: {xs:"100%", sm:"100%", md:"70%"}, height: "90%", p: 3, boxShadow: "none" }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction={"row"} gap={3}>
                        <Avatar src={preview? preview : '/default.png'} alt="img"  sx={{ width: 50, height: 50 }}/>

                        <Box>
                            <Typography
                                my={1}
                                color={"#706D6D"}
                                width="200px"
                                lineHeight="20px"
                            >
                                Pick a photo from your computer
                            </Typography>

                            <label
                                htmlFor="hospitalImg"
                                style={{ color: "#1F51C6", fontWeight: "600" }}
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
                        </Box>
                    </Stack>
                    <Divider sx={{ mt: 2 }} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            mt: 2,
                            gap:1
                        }}
                    >
                        <StackStyle >
                            <LabelStyle htmlFor="hospitalName">
                                Name of the hospital/clinic
                            </LabelStyle>
                            <TextFieldStyle
                                id="hospitalName"
                                name="nameOfhospitalOrClinic"
                                fullWidth
                                placeholder="Enter Hospital Name"
                                error={err && !inputValue.nameOfhospitalOrClinic && true}
                                helperText={
                                    err &&
                                    !inputValue.nameOfhospitalOrClinic &&
                                    "Please enter your email"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="hospitalType">
                                Hospital type
                            </LabelStyle>
                            <TextFieldStyle
                                id="hospitalType"
                                name="hospitalType"
                                fullWidth
                                placeholder="Enter Hospital type"
                                error={err && !inputValue.hospitalType && true}
                                helperText={
                                    err &&
                                    !inputValue.hospitalType &&
                                    "Please enter your email"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="hospitalLocation">
                                Location
                            </LabelStyle>
                            <TextFieldStyle
                                id="hospitalLocation"
                                name="location"
                                fullWidth
                                placeholder="Enter Hospital’s Location"
                                error={err && !inputValue.location && true}
                                helperText={
                                    err &&
                                    !inputValue.location &&
                                    "Please enter your email"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle>
                            <LabelStyle htmlFor="hospitalLandmark">
                                Landmark
                            </LabelStyle>
                            <TextFieldStyle
                                id="hospitalLandmark"
                                name="landmark"
                                fullWidth
                                placeholder="Enter Landmark"
                                error={err && !inputValue.landmark && true}
                                helperText={
                                    err &&
                                    !inputValue.landmark &&
                                    "Please enter your email"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                        <StackStyle >
                            <LabelStyle htmlFor="hospitalAddress">
                                Enter full address
                            </LabelStyle>
                            <TextFieldStyle
                                id="hospitalAddress"
                                name="enterFullAddress"
                                fullWidth
                                placeholder="Enter Hospital’s full address"
                                error={err && !inputValue.enterFullAddress && true}
                                helperText={
                                    err &&
                                    !inputValue.enterFullAddress &&
                                    "Please enter your email"
                                }
                                onChange={handleChange}
                            />
                        </StackStyle>
                    </Box>
                    <LoadingButton
                            size="small"
                            fullWidth
                            type="submit"
                            loading={disableButton}
                            variant="contained"
                            sx={{ flex: 0.3, width:{xs:"100%", sm:"100%", md:"200px"}, my:2, mx:'auto', display:"block" }}

                        >
                            <span>Next</span>
                        </LoadingButton>
                        {/* <Button
                            type="submit"
                            variant="contained"
                            sx={{ flex: 0.3, width:{xs:"100%", sm:"100%", md:"200px"}, my:2, mx:'auto', display:"block" }}
                        >
                            Next
                        </Button> */}

                  
                </form>
            </Card>
        </Box>
        </>
    );
};

export default MasterUser;