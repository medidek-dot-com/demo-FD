import React from "react";
import { Box, Card, InputLabel, Typography } from "@mui/material";
import { FiPlus } from "react-icons/fi";

const MedicalRecords = () => {
    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "calc(100% - 100px)",
                },
                m: "0px auto",
                p: 1,
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "700",
                        fontSize: "1.875rem",
                        color: "#383838",
                        mb: "25px",
                    }}
                >
                    Medical Upload
                </Typography>
                <Box sx={{ display: "flex", gap: "25px" }}>
                    <label htmlFor="uploadFile">
                        <Card
                            sx={{
                                width: "219px",
                                height: "219px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                            }}
                        >
                            <FiPlus
                                style={{
                                    width: "54.83px",
                                    height: "54.83px",
                                    color: "#1F51C6",
                                }}
                            />
                        </Card>
                    </label>
                    <input
                        type="file"
                        id="uploadFile"
                        style={{ display: "none" }}
                    />
                    
                </Box>
            </Box>
        </Box>
    );
};

export default MedicalRecords;
