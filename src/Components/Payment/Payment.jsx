import React, { useState } from "react";
import {
    Card,
    Container,
    Divider,
    Typography,
    Box,
    Grid,
    Tabs,
    Tab,
    Radio,
} from "@mui/material";
import "./paymentStyle.css";
import { SiPhonepe } from "react-icons/si";

const Payment = () => {
    const [value, setValue] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("phonePay");
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    

    return (
        <>
            <Divider sx={{ marginTop: "10px" }} />

            <Container
                sx={{
                    margin: "100px auto 0 auto",
                    display: "flex",
                    width: "70%",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        padding: "10px 15px",
                        border: "1px solid #D9D9D9",
                    }}
                >
                    <Grid container>
                        <Grid lg={8} item>
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Appointment with Dr Shashwat Magarkar
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        color: "#1F51C6",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        marginTop: "5px",
                                    }}
                                >
                                    Today, 12:00PM
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        color: "#706D6D",
                                        fontSize: "12px",
                                        marginTop: "5px",
                                        wordWrap: "wrap",
                                        width: "300px",
                                    }}
                                >
                                    66/1, Ashish Apartments, 2nd Floor,
                                    Abhyankar Marg Road., Landmark: Opposite
                                    Anand Ashram Hotel, Nagpur
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid lg={4} item>
                            <Box>
                                <Typography
                                    component="h6"
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    PRICE DETAILS
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "5px",
                                    }}
                                >
                                    <Typography
                                        component="p"
                                        sx={{ fontSize: "13px" }}
                                    >
                                        Total MRP
                                    </Typography>
                                    <Typography
                                        component="p"
                                        sx={{ fontSize: "13px" }}
                                    >
                                        ₹500
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component="p"
                                        sx={{ fontSize: "13px" }}
                                    >
                                        @GST
                                    </Typography>
                                    <Typography
                                        component="p"
                                        sx={{ fontSize: "13px" }}
                                    >
                                        ₹20
                                    </Typography>
                                </Box>
                                <Divider sx={{ marginTop: "10px" }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component="p"
                                        sx={{
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        TOTAL
                                    </Typography>
                                    <Typography
                                        component="p"
                                        sx={{ fontSize: "14px" }}
                                    >
                                        ₹520
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
                <Typography
                    variant="h6"
                    sx={{
                        alignSelf: "start",
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginTop: "10px",
                    }}
                >
                    Choose Payment Mode
                </Typography>

                <Card
                    sx={{
                        width: "100%",
                        padding: "0 2px",
                        border: "1px solid #D9D9D9",
                        display: "flex",
                        marginTop: "10px",
                    }}
                >
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            orientation="vertical"
                            sx={{
                                marginLeft: "-2px",
                                "& span.MuiTabs-indicator": {
                                    left: 0,
                                    width: "5px",
                                    zIndex: 999,
                                },
                            }}
                        >
                            <Tab label="UPI (Phonepe/Gpay)" value={1} />

                            <Tab label="Credit/Debit Card" value={2} />
                            <Tab label="Net Banking" value={3} />
                        </Tabs>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ margin: "10px" }}>
                        <Typography>Pay Using UPI</Typography>
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Radio />
                                <SiPhonepe size="30px" color="#5f259f" />&nbsp;
                                <Typography component="span">
                                    PhonePe
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Radio />
                                <img src="/googlePay.png" width="30px" alt="googlePay" />&nbsp;
                                <Typography component="span">
                                    GooglePay
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Radio />
                                <img src="/upi.png" width="30px" alt="googlePay" />&nbsp;
                                <Typography component="span">
                                Enter UPI ID
                                </Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                </Card>
            </Container>
        </>
    );
};

export default Payment;
