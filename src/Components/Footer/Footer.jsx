import React from "react";
import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const LinkStyle = styled(Link)`
    text-align: left;
    display: block;
    line-height: 25px;
    // margin-bottom: 15px;
    text-decoration: none;
    color: #ffffff;
    font-size: 0.6rem;
    font-family: Lato;
`;

const ExploreWrapper = styled(Box)`
    // margin-right: 20px;
`;

const UlStyle = styled("ul")({
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
});

const LiStyle = styled("li")({
    cursor: "pointer",
    fontFamily: "Lato",
});

const Footer = () => {
    return (
        <>
            <Box
                sx={{
                    background: "#1F51C6",
                    // margin: "60px auto 0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    color: "#ffffff",
                    // pr:"20px",
                    minHeight: "253px",
                    px: "16px",
                    // flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        alignSelf: {
                            xs: "center",
                            sm: "center",
                            md: "center",
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="/MedidekWhite.png"
                        alt="logo-img"
                        sx={{ width: "185px", height: "90px" }}
                    />
                </Box>
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 1.5, md: 5 }}
                    sx={{
                        justifyContent: {
                            xs: "space-evenly",
                            sm: "space-between",
                            md: "end",
                        },
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    <UlStyle>
                        <LiStyle>Home</LiStyle>
                        <LiStyle>Find Doctors</LiStyle>
                        <LiStyle>Traking</LiStyle>
                        <LiStyle>Medical Courses</LiStyle>
                        <LiStyle>Contact Us</LiStyle>
                    </UlStyle>
                    <UlStyle>
                        <LiStyle>Help</LiStyle>
                        <LiStyle>Privacy Policy</LiStyle>Help
                        <LiStyle>Terms & Condition</LiStyle>
                        <LiStyle>Cancellation Policy</LiStyle>
                    </UlStyle>
                    {/* <Stack spacing={{ xs: "5px", sm: "7px", md: "10px" }}> */}
                    <Stack direction="row" justifyContent="center">
                        <IconButton
                            target="_"
                            href="https://instagram.com/medidekofficial?igshid=MzRlODBiNWFlZA=="
                        >
                            <img
                                src="/social-icon1.svg"
                                alt=""
                                width="26px"
                                height="26px"
                            />
                        </IconButton>
                        <IconButton
                            target="_"
                            href="https://www.linkedin.com/company/medidek/"
                        >
                            <img
                                src="/social-icon2.svg"
                                alt=""
                                width="26px"
                                height="26px"
                            />
                        </IconButton>
                        <IconButton
                            target="_"
                            href="https://www.facebook.com/profile.php?id=100094316681517&mibextid=ZbWKwL"
                        >
                            <img
                                src="/social-icon3.svg"
                                alt=""
                                width="26px"
                                height="26px"
                            />
                        </IconButton>
                        <IconButton
                            target="_"
                            href="https://youtube.com/@MedidekSocial?si=6tXZINUsJUW6HrNF"
                        >
                            <img
                                src="/social-icon4.svg"
                                alt=""
                                width="33px"
                                height="26px"
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default Footer;
