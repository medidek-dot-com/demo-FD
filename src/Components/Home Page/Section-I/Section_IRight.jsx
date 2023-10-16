import React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";

const Section_IRight = () => {
    return (
        <Container sx={{display:'flex', alignItems:'center', flexDirection:{xs:'column', sm:'row'}}}>
            <Box style={{width:'200px', height:'300px'}}>
                <Card>
                    <img src="" alt="img" />
                    <Typography variant="h6" color="initial">
                        Find Doctors
                    </Typography>
                    <Typography component={"p"} color="initial">
                        Find Top-notch Doctors near you with just one Click!
                    </Typography>
                    <Link>
                        See More <ArrowOutwardIcon />
                    </Link>
                </Card>
                
            </Box>
            <Box style={{width:'200px', height:'300px'}}>
                <Card>
                    <img src="" alt="img" />
                    <Typography variant="h6" color="initial">
                        Find Doctors
                    </Typography>
                    <Typography component={"p"} color="initial">
                        Find Top-notch Doctors near you with just one Click!
                    </Typography>
                    <Link>
                        See More <ArrowOutwardIcon />
                    </Link>
                </Card>
                
            </Box>
            <Box style={{width:'200px', height:'300px'}}>
                <Card>
                    <img src="" alt="img" />
                    <Typography variant="h6" color="initial">
                        Find Doctors
                    </Typography>
                    <Typography component={"p"} color="initial">
                        Find Top-notch Doctors near you with just one Click!
                    </Typography>
                    <Link>
                        See More <ArrowOutwardIcon />
                    </Link>
                </Card>
                
            </Box>
            <Box style={{width:'200px', height:'300px'}}>
                <Card>
                    <img src="" alt="img" />
                    <Typography variant="h6" color="initial">
                        Find Doctors
                    </Typography>
                    <Typography component={"p"} color="initial">
                        Find Top-notch Doctors near you with just one Click!
                    </Typography>
                    <Link>
                        See More <ArrowOutwardIcon />
                    </Link>
                </Card>
                
            </Box>
        </Container>
    );
};

export default Section_IRight;
