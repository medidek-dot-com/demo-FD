import React from "react";
import {
    Box,
    Container,
    Typography,
    styled,
    Button,
    Stack,
} from "@mui/material";
import { FaGooglePlay } from "react-icons/fa";
import { BsGooglePlay } from "react-icons/bs";

const HeadingStyle = styled(Typography)`
    font-size: 35px;
    font-weight: 700;
    color: #000000;
    line-height: 31.09px;
    word-spacing: 4px;
`;
const ParagraphStyle = styled(Typography)`
    font-size: 15px;
    font-weight: 200;
    color: #706d6d;
    line-height: 21px;
    word-spacing: 4px;
    margin-top: 10px;
`;

const Section_II = () => {
    return (
        <>
            <Stack
                direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 4,
                }}
                spacing={2}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <img
                        src="/hand image.png"
                        alt="img"
                        height={"300px"}
                        style={{ alignSelf: "flex-end" }}
                    />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: {xs:"center", sm:"center", md:"end"},
                        justifyContent: "center",
                        background: {
                            xs: "#1F51C6",
                            sm: "#1F51C6",
                            md: "none",
                        },
                        borderRadius: "10px",
                        // p:'20px'
                    }}
                >
                    <Typography
                        fontSize={{ xs: "1.5rem", sm: "2.5rem" }}
                        sx={{
                            fontWeight: "600",
                            fontFamily:"Raleway",
                            color: {
                                xs: "#ffffff",
                                sm: "#ffffff",
                                md: "#000000",
                            },
                            textAlign:{
                                xs: "center",
                                sm: "center",
                                md: "right",
                                lg: "right",
                            },
                            px:'16px'
                        }}
                    >
                        Download the Medidek app
                    </Typography>
                    <Typography
                        width={{ xs: "370px", sm: "450px" }}
                        textAlign={{
                            xs: "center",
                            sm: "center",
                            md: "right",
                            lg: "right",
                        }}
                        sx={{
                            fontSize: "16px",
                            px: "5px",
                            fontFamily:"Lato",
                            fontWeight:"500",
                            my: 1,
                            color: {
                                xs: "#D9D9D9",
                                sm: "#D9D9D9",
                                md: "#706D6D",
                            },
                        }}
                    >
                        Enhance Your Healthcare Experience with Medidek:
                        Seamlessly Book Appointments, Securely Manage Medical
                        Records, and Personalize Your Health Journey
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            textTransform: "none",
                            fontFamily:"Raleway",
                            fontWeight:"600",
                            fontSize:"16px",
                            px: 2,
                            alignSelf: {
                                xs: "center",
                                sm: "center",
                                md: "end",
                            },
                            my: 2,
                            background: {
                                xs: "#ffffff",
                                sm: "#ffffff",
                                md: "#1F51C6",
                            },
                            color: {
                                xs: "#000000",
                                sm: "#000000",
                                md: "#ffffff",
                            },
                            boxShadow:"none"
                        }}
                    >
                        <BsGooglePlay /> &nbsp;
                        Google Play
                    </Button>
                </Box>
            </Stack>
        </>
    );
};

export default Section_II;
