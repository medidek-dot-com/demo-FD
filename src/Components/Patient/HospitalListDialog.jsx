import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const DialogStyle = styled(Dialog)({
    ".MuiDialog-paper": {
        margin: "0px",
    },
    // ["& div:first-child"]:{
    //     // marginInline:"8px"
    // },
    // ["& .MuiDialog-container:nth-of-type(1)"]: {
    //     marginInline: "16px",
    // },
    // ["& .abhay  div:nth-child(2)"]:{
    //     marginInline:"16px"
    // }
});

const HospitalListDialog = ({
    hospitalList,
    inputValue,
    setInputValue,
    hospitalListDialog,
    setHospitalListDialog,
    setOpenBookingAppointmentDialog,
    openBookingAppointmentDialog,
    setDoctor_id,
    setOpen,
    bookingAppointmentDetails,
    setBookingAppointmentDetails,
}) => {
    console.log(hospitalList);
    console.log(bookingAppointmentDetails);

    const { user } = useSelector((state) => state.auth);

    const selectDoctor = (data) => {
        console.log(data);
        setBookingAppointmentDetails({
            ...bookingAppointmentDetails,
            nameOfTheDoctor: data.nameOfTheDoctor,
            imgurl: data.imgurl,
            doctorid: data._id,
            connsultationFee: data.connsultationFee,
            location: data.location,
            hospitalName: data.hospitalId.nameOfhospitalOrClinic,
        });
        setInputValue({ ...inputValue, doctorid: data._id });
        setOpenBookingAppointmentDialog(true);
        setDoctor_id(data._id);
    };
    // const [hospitalList, setHospitalList] = useState([]);

    // const multipleloginprofile = async () => {
    //     try {
    //         const response = await axiosClient.get(
    //             `/v2/multipleloginprofile/${bookingAppointmentDetails?.doctorid}`
    //         );
    //         setHospitalList(response.result);
    //         console.log(response);
    //         return;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     multipleloginprofile();
    // }, []);
    return (
        <>
            <DialogStyle open={hospitalListDialog} maxWidth={"md"}>
                <DialogTitle
                    open={hospitalListDialog}
                    onClose={() => setDuidDialog(false)}
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
                    Hospitals List
                    {hospitalListDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setHospitalListDialog(false)}
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
                <DialogContent>
                    {hospitalList.map((hospital, i) => (
                        <Stack
                            key={i}
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",

                                borderBottom: "1px solid #D9D9D9",
                                p: "5px",
                                width: {
                                    xs: "300px",
                                    sm: "300px",
                                    md: "603px",
                                },
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing="10px"
                            >
                                {/* <Badge badgeContent={4} color="primary"> */}
                                <Avatar
                                    src={
                                        hospital?.hospitalId === null
                                            ? hospital?.imgurl
                                            : hospital?.hospitalId?.imgurl ||
                                              "/default.png"
                                    }
                                    sx={{
                                        width: "58px",
                                        height: "58px",
                                    }}
                                />
                                {/* </Badge> */}
                                <Stack>
                                    <Typography
                                        sx={{
                                            lineHeight: "21.6px",
                                            fontFamily: "Lato",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {hospital?.hospitalId === null
                                            ? hospital?.nameOfTheDoctor
                                            : hospital?.hospitalId
                                                  ?.nameOfhospitalOrClinic}
                                    </Typography>
                                    <Stack direction="row">
                                        {/* <Box
                                            component="span"
                                            sx={{
                                                lineHeight: "19.2px",
                                                fontFamily: "Lato",
                                                color: "#706D6D",
                                            }}
                                        >
                                            {hospital?.hospitalId === null
                                                ? hospital?.connsultationFee
                                                : hospital?.hospitalId
                                                      ?.connsultationFee}
                                        </Box> */}
                                        <Box
                                            component="span"
                                            sx={{
                                                lineHeight: "19.2px",
                                                fontFamily: "Lato",
                                                color: "#706D6D",
                                            }}
                                        >
                                            {hospital?.hospitalId === null
                                                ? hospital?.location
                                                : hospital?.hospitalId
                                                      ?.location}
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Button
                                onClick={() => selectDoctor(hospital)}
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    p: "14px 42px",
                                    height: "40px",
                                    fontSize: "1rem",
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    borderRadius: "20px",
                                    boxShadow: "none",
                                }}
                            >
                                Book
                            </Button>
                        </Stack>
                    ))}
                </DialogContent>
            </DialogStyle>
        </>
    );
};

export default HospitalListDialog;
