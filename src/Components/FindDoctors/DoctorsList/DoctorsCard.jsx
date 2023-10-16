import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Rating,
    styled,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DateSlider from "./DateSlider";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaStarHalfStroke, FaLocationDot } from "react-icons/fa6";

const DoctorDetailsStyle = styled(Typography)`
    color: #706d6d;
    font-size: 10px;
`;
const ListItemsStyling = styled(ListItem)`
    border: 2px solid #706d6d57;
    border-radius: 5px;
    padding: 5px 30px;
`;

const ListBoxStyle = styled(Box)`
    margin: 0 10px;
    text-align: center;
    cursor: pointer;
`;

const SpanTypograophyStyle = styled(Typography)`
    font-size: 10px;
    color: #15b912;
    text-align: center;
`;

const DoctorsCard = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)};

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Card
            
                sx={{
                    display: "flex",
                    flexDirection:{xs: "column", sm: "column", md: "row"},
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    marginTop: "10px",
                    minWidth: "360px",
                }}
            >
                <Box
                onClick={()=>navigate('/doctor/details/id')}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",   
                        cursor:'pointer'
                        
                    }}
                >
                    <Box>
                        <img src="./doctor.png" alt="doctor-img" />
                    </Box>
                    <Box style={{ marginLeft: "10px" }}>
                        <Typography variant={"h6"}>
                            Dr Shawant Magarkar
                        </Typography>
                        <DoctorDetailsStyle component={"p"}>
                            Dentist 5 Years Experience
                        </DoctorDetailsStyle>
                        <Box>
                        <Rating
                                    name="simple-controlled"
                                    value={5}
                                    readOnly
                                />
                            <DoctorDetailsStyle component={"span"}>
                                114 ratings
                            </DoctorDetailsStyle>
                            <DoctorDetailsStyle component={"p"}>
                                <FaLocationDot color="#1F51C6" />
                                &nbsp;Dharampeth
                            </DoctorDetailsStyle>
                            <DoctorDetailsStyle component={"p"}>
                                ₹500 Consultation fee
                            </DoctorDetailsStyle>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        style={{ background: "#15B912", zIndex:1000 }}
                    >
                        Book Appointment
                    </Button>
                </Box>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"md"}
                style={{ margin: " 0 auto" }}
            >
                <DialogTitle>
                    Book Appointment
                    {open ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent dividers style={{ margin: "10px" }}>
                    <DateSlider />

                    <List
                        style={{
                            display: "flex",
                            width: "60%",
                            marginTop: "20px",
                        }}
                    >
                        <ListBoxStyle>
                            <ListItemsStyling>12:30</ListItemsStyling>
                            <SpanTypograophyStyle
                                variant="caption"
                                color="initial"
                            >
                                2 Slots Available
                            </SpanTypograophyStyle>
                        </ListBoxStyle>
                        <ListBoxStyle>
                            <ListItemsStyling>12:30</ListItemsStyling>
                            <SpanTypograophyStyle
                                variant="caption"
                                color="initial"
                            >
                                2 Slots Available
                            </SpanTypograophyStyle>
                        </ListBoxStyle>
                        <ListBoxStyle>
                            <ListItemsStyling>12:30</ListItemsStyling>
                            <SpanTypograophyStyle
                                variant="caption"
                                color="initial"
                            >
                                2 Slots Available
                            </SpanTypograophyStyle>
                        </ListBoxStyle>
                        <ListBoxStyle>
                            <ListItemsStyling>12:30</ListItemsStyling>
                            <SpanTypograophyStyle
                                variant="caption"
                                color="initial"
                            >
                                2 Slots Available
                            </SpanTypograophyStyle>
                        </ListBoxStyle>
                    </List>
                    <Button
                        variant="contained"
                        sx={{ background: "#15B912", margin: "20px 10px" }}
                        onClick={()=>navigate('/doctor/appointment/payment')}
                    >
                        Book Appointment
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DoctorsCard;
