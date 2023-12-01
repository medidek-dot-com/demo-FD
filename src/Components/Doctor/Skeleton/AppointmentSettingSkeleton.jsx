import { Box } from "@mui/material";
import React from "react";

const AppointmentSettingSkeleton = () => {
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    border: "1px solid #D9D9D9",
                    borderRadius: "6px",
                    p: "16px",
                    background: "#ffffff",
                }}
            ></Box>
        </>
    );
};

export default AppointmentSettingSkeleton;
