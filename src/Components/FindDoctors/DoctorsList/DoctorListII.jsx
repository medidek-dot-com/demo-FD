import React from "react";
import { Box, Container, Typography, Button, Card, styled } from "@mui/material";
import { FaSort, FaFilter, FaStar, FaRegStar } from "react-icons/fa";
import { FaStarHalfStroke, FaLocationDot } from "react-icons/fa6";

import DoctorsCard from "./DoctorsCard";



const DoctorListII = () => {
    return (
      <>
        <Container style={{ marginTop: "30px", width: "80%" }}>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6" color="initial">
                    35 Dentists near you
                </Typography>
                <Box>
                    <FaSort />{" "}
                    <Typography component={"span"}>SortBy: Nearest</Typography>
                    <Typography component={"span"}>
                        &nbsp; &nbsp; <FaFilter /> Filter
                    </Typography>
                </Box>
            </Box>
           <DoctorsCard/>
            
        </Container>
        </>
    );
};

export default DoctorListII;
