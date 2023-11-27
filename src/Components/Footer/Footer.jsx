import React from "react";
import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

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
                        <LiStyle
                            onClick={() =>
                                navigate(
                                    isLoggedIn && user?.role === "MASTER"
                                        ? `/master/user/home/${user?._id}`
                                        : "/"
                                )
                            }
                        >
                            Home
                        </LiStyle>
                        <LiStyle
                            onClick={() =>
                                navigate(
                                    isLoggedIn && user?.role === "MASTER"
                                        ? `/master/user/management/doctors/${user?._id}`
                                        : "/doctors"
                                )
                            }
                        >
                            {isLoggedIn && user?.role === "MASTER"
                                ? "Management"
                                : "Find Doctors"}
                        </LiStyle>
                        <LiStyle
                            onClick={() =>
                                navigate(
                                    isLoggedIn && user?.role === "MASTER"
                                        ? `/master/user/doctors/${user?._id}`
                                        : "/tracking"
                                )
                            }
                        >
                            {isLoggedIn && user?.role === "MASTER"
                                ? "Doctors"
                                : "Traking"}
                        </LiStyle>
                        {/* <LiStyle onClick={() => navigate("/medical-courses")}>
                            Medical Courses
                        </LiStyle> */}
                        <LiStyle
                            onClick={() =>
                                navigate(
                                    isLoggedIn && user?.role === "MASTER"
                                        ? `/master/user/appointments/${user?._id}`
                                        : "/contact-us"
                                )
                            }
                        >
                            {isLoggedIn && user?.role === "MASTER"
                                ? "Appointments"
                                : "Contact Us"}
                        </LiStyle>
                    </UlStyle>
                    <UlStyle>
                        <LiStyle onClick={() => navigate("/medidek/help")}>
                            Help
                        </LiStyle>
                        <LiStyle
                            onClick={() => navigate("/medidek/Privacy-policy")}
                        >
                            Privacy Policy
                        </LiStyle>
                        <LiStyle
                            onClick={() =>
                                navigate("/medidek/terms&Privacy-policy")
                            }
                        >
                            Terms & Condition
                        </LiStyle>
                        <LiStyle
                            onClick={() =>
                                navigate("/medidek/cancellation-policy")
                            }
                        >
                            Cancellation Policy
                        </LiStyle>
                    </UlStyle>
                    {/* <Stack spacing={{ xs: "5px", sm: "7px", md: "10px" }}> */}
                    <Stack direction="row" justifyContent="center">
                        <IconButton
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            target="_"
                            href="https://instagram.com/medidekofficial?igshid=MzRlODBiNWFlZA=="
                        >
                            <Box
                                component="img"
                                src="/social-icon1.svg"
                                alt=""
                                sx={{
                                    width: "26px",
                                    height: "26px",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            target="_"
                            href="https://www.linkedin.com/company/medidek/"
                        >
                            <Box
                                component="img"
                                src="/social-icon2.svg"
                                alt=""
                                sx={{
                                    width: "26px",
                                    height: "26px",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            target="_"
                            href="https://www.facebook.com/profile.php?id=100094316681517&mibextid=ZbWKwL"
                        >
                            <Box
                                component="img"
                                src="/social-icon3.svg"
                                alt=""
                                sx={{
                                    width: "26px",
                                    height: "26px",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            sx={{
                                ":hover": {
                                    background: "none",
                                },
                            }}
                            target="_"
                            href="https://youtube.com/@MedidekSocial?si=6tXZINUsJUW6HrNF"
                        >
                            <Box
                                component="img"
                                src="/social-icon4.svg"
                                alt=""
                                sx={{
                                    width: "26px",
                                    height: "26px",
                                }}
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default Footer;
