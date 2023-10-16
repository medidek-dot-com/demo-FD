import React, { useState } from "react";
import {
    Box,
    Button,
    Fab,
    IconButton,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { axiosClient } from "./Utils/axiosClient";
import { toast } from "react-toastify";
// import styled from "@emotion/styled";

const SearchFeildStyle = styled(TextField)({
    "& .css-1jnszeg-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "42px",
        paddingInline: "3px",
        width: "319px",
        height: "45px",
    },
    "& ::placeholder": {
        color: "#706D6D",
        opacity: 1,
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "18px",
    },
});

const ComingSoon = () => {
    const [email, setEmail] = useState("");
    const [err, setError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            setError(true);
            return false;
        }
        try {
            const response = await axiosClient.post("/v2/notifyMe", {email});
            if (response.status === "ok") {
                toast.success(`We'll Get Back To You`);
                setEmail('')
            }
        } catch (error) {
          toast.error(error.message)
        }
    };
    return (
        <Box
            sx={{
                py: { xs: "24px", sm: "24px", md: "40px" },
                px: { xs: "16px", sm: "16px", md: "100px" },
                position: "relative",
                height: "100vh",
            }}
        >
            <img
                src="/newmedideklogo.png"
                alt=""
                width="100px"
                style={{ background: "#ffffff" }}
            />
            <Stack
                direction={{
                    xs: "column-reverse",
                    sm: "column-reverse",
                    md: "row",
                }}
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack alignItems={{ xs: "center", sm: "center", md: "start" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#383838",
                            fontFamily: "Lato",
                            fontWeight: "800",
                            fontSize: { xs: "12px", sm: "10px", md: "18px" },
                            textAlign: {
                                xs: "center",
                                sm: "center",
                                md: "left",
                            },
                        }}
                    >
                        STAY TUNED.
                    </Typography>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                display: "inline",
                                color: "#1F51C6",
                                fontFamily: "Lato",
                                fontWeight: "800",
                                fontSize: {
                                    xs: "28px",
                                    sm: "28px",
                                    md: "60px",
                                },
                                // lineHeight: "63px",
                            }}
                        >
                            Medidek
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                display: "inline",
                                color: "#383838",
                                fontFamily: "Lato",
                                fontWeight: "800",
                                fontSize: {
                                    xs: "28px",
                                    sm: "28px",
                                    md: "60px",
                                },
                                // lineHeight: "63px",
                            }}
                        >
                            &nbsp; is
                        </Typography>
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            display: "inline",
                            color: "#383838",
                            fontFamily: "Lato",
                            fontWeight: "800",
                            fontSize: { xs: "28px", sm: "28px", md: "60px" },
                            // lineHeight: "63px",
                        }}
                    >
                        Coming Soon!
                    </Typography>
                    <Typography
                        sx={{
                            display: { xs: "none", sm: "none", md: "inline" },
                            color: "#706D6D",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: { xs: "16px", sm: "16px", md: "20px" },
                            mb: "20px",
                        }}
                    >
                        Be the first one to know when our site is
                        <br /> live!
                    </Typography>
                    <Typography
                        sx={{
                            display: { xs: "inline", sm: "inline", md: "none" },
                            color: "#706D6D",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: { xs: "16px", sm: "16px", md: "20px" },
                            mb: "20px",
                        }}
                    >
                        Be the first one to know when our site is live!
                    </Typography>
                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        alignItems={{ xs: "center", sm: "center", md: "start" }}
                        spacing={2}
                    >
                        <SearchFeildStyle
                            onChange={(e) => setEmail(e.target.value) & setError(false)}
                            error={err && !email ? true : false}
                            name="email"
                            helperText={
                                err && !email ? "Email is required" : ""
                            }
                            value={email}
                            size="small"
                            placeholder="Enter Your Email Address"
                            
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                width: "134px",
                                height: "45px",
                                borderRadius: "42px",
                                fontFamily: "Lato",
                                fontWeight: "700",
                                textTransform: "none",
                            }}
                        >
                            Notify Me
                        </Button>
                    </Stack>
                </Stack>
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                    <img
                        src="/Medicine-bro.svg"
                        alt="img"
                        style={{ width: "540px", height: "540px" }}
                    />
                </Box>
                <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
                    <img
                        src="/Medicine-bro.svg"
                        alt="img"
                        style={{ width: "318px", height: "318px" }}
                    />
                </Box>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                mt={{ xs: "20px" }}
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                }}
            >
                <IconButton
                    target="_"
                    href="https://instagram.com/medidekofficial?igshid=MzRlODBiNWFlZA=="
                >
                    <img
                        src="/instaicon.png"
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
                        src="/linkedin.png"
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
                        src="/facebook.png"
                        alt=""
                        width="26px"
                        height="26px"
                    />
                </IconButton>
                <IconButton
                    target="_"
                    href="https://youtube.com/@MedidekSocial?si=6tXZINUsJUW6HrNF"
                >
                    <img src="/youtube.png" alt="" width="33px" height="26px" />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default ComingSoon;
