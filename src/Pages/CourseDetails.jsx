import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import { PiCertificateFill } from "react-icons/pi";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { BsFillCalendarFill } from "react-icons/bs";
import GroupIcon from "@mui/icons-material/Group";
import {
    Box,
    Button,
    Card,
    CardMedia,
    InputAdornment,
    Paper,
    Rating,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { axiosClient } from "../Utils/axiosClient";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SearchFeildStyle = styled(TextField)({
    "& .css-1kzw815-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "25px",
    },
});

const CourseImageStyle = styled("img")(({ theme }) => ({
    width: "259px",
    height: "192px",
    margin: "10px auto",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "120px",
        height: "103px",
    },
}));

const CourseDetails = () => {
    const { course_id } = useParams();
    const [courseDetails, setCourseDetails] = useState({});


    const getsignleCourseDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getSingleCourse/${course_id}`
            );
                console.log(response);
            if (response.status === "ok") {
                setCourseDetails(response.result);
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    useEffect(() => {
        getsignleCourseDetails();
    }, [course_id]);

    return (
        <>
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
                <Stack sx={{ alignItems: "center" }}>
                    <SearchFeildStyle
                        size="small"
                        placeholder="Search Courses"
                        sx={{
                            width: "300px",
                            borderRadius: "25px",
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img src="/search.svg" alt="img" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ width: "100%", position: "relative" }}>
                        <Card
                            sx={{
                                background: "#DCE3F6",
                                width: "100%",
                                display: "flex",
                                py: { xs: "0", sm: "0", md: "35px" },
                                px: { xs: "4px", sm: "0", md: "47px" },
                                my: 4,
                                flexDirection: {
                                    xs: "column-reverse",
                                    sm: "column-reverse",
                                    md: "row",
                                },
                                justifyContent: "space-between",
                            }}
                        >
                            <Stack
                                spacing={2}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "700px",
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "35px",
                                        },
                                        fontFamily: "Raleway",
                                        lineHeight: {
                                            xs: "23.48px",
                                            sm: "23.48px",
                                            md: "40px",
                                        },
                                        color: "#383838",
                                        textAlign: {
                                            xs: "center",
                                            sm: "center",
                                            md: "left",
                                        },
                                    }}
                                >
                                    {
                                        courseDetails.courseName
                                    }
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#706D6D",
                                        textAlign: {
                                            xs: "center",
                                            sm: "center",
                                            md: "left",
                                        },
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: { xs: "13px", sm: "15px" },
                                    }}
                                >
                                   {
                                    courseDetails.courseDiscription
                                   }
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent={{
                                        xs: "center",
                                        sm: "center",
                                        md: "start",
                                    }}
                                >
                                    <Rating value={5} readOnly />
                                    <Box
                                        component="span"
                                        sx={{ color: "#706D6D" }}
                                    >
                                        (223,003 ratings)
                                    </Box>
                                </Stack>
                            </Stack>
                            <Card
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "547px",
                                    },
                                    p: { xs: "0", sm: "0", md: "16px" },
                                    position: {
                                        xs: "static",
                                        sm: "static",
                                        md: "absolute",
                                    },
                                    right: "50px",
                                }}
                            >
                                <CourseImageStyle
                                    src="/course.png"
                                    alt="img"
                                    style={{ width: "100%", height: "252px" }}
                                />
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    p={{ xs: "10px", sm: "10px", md: "0" }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: 700,
                                            fontSize: "25px",
                                        }}
                                    >
                                        ₹15,999{" "}
                                        <Box
                                            component="span"
                                            sx={{ fontSize: "15px" }}
                                        >
                                            +₹2,700GST
                                        </Box>
                                    </Typography>{" "}
                                    &nbsp;
                                    <img
                                        src="/limited-seat.png"
                                        alt="img"
                                        width="141px"
                                        height="26px"
                                    />
                                </Stack>
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: 700,
                                        width: "100%",
                                        borderRadius: "36px",
                                        my: 2,
                                    }}
                                >
                                    Enroll Now
                                </Button>
                                <Typography
                                    sx={{
                                        fontFamily: "Raleway",
                                        fontWeight: 700,
                                        color: "#383838",
                                        textAlign: {
                                            xs: "center",
                                            sm: "center",
                                            md: "left",
                                        },
                                    }}
                                >
                                    This Course Includes:
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={{ xs: 0, sm: 0, md: 4 }}
                                    mb={{ xs: 1 }}
                                    justifyContent={{
                                        xs: "center",
                                        sm: "center",
                                        md: "start",
                                    }}
                                >
                                    <Stack
                                        justifyContent="space-between"
                                        sx={{ margin: "0 auto" }}
                                    >
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#706D6D",
                                                lineHeight: "15.6px",
                                                fontSize: {
                                                    xs: "13px",
                                                    sm: "15px",
                                                    md: "18px",
                                                },
                                            }}
                                        >
                                            <PiCertificateFill
                                                color="#1F51C6"
                                                size="1.6rem"
                                                style={{ marginRight: "10px" }}
                                            />
                                            Certificate of completion
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#706D6D",
                                                fontSize: {
                                                    xs: "13px",
                                                    sm: "15px",
                                                    md: "18px",
                                                },
                                            }}
                                        >
                                            <GroupIcon
                                                sx={{ color: "#1F51C6", mr: 1 }}
                                                size="2rem"
                                            />
                                            50 students
                                        </Typography>
                                    </Stack>
                                    <Stack justifyContent="space-between">
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#706D6D",
                                                lineHeight: "15.6px",
                                                fontSize: {
                                                    xs: "13px",
                                                    sm: "15px",
                                                    md: "18px",
                                                },
                                            }}
                                        >
                                            <WatchLaterIcon
                                                sx={{ color: "#1F51C6", mr: 1 }}
                                            />
                                           {courseDetails.courseDuration}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: "Lato",
                                                fontWeight: "600",
                                                color: "#706D6D",
                                                lineHeight: "15.6px",
                                                fontSize: {
                                                    xs: "13px",
                                                    sm: "15px",
                                                    md: "18px",
                                                },
                                            }}
                                        >
                                            <BsFillCalendarFill
                                                color="#1F51C6"
                                                size="1.2rem"
                                                style={{ marginRight: "10px" }}
                                            />
                                            Starts on 21/08/23
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Card>
                        </Card>
                    </Box>
                    {/* <Stack direction="row" flex={1}>
                    <Paper
                        sx={{
                            display: "flex",
                            width: "100%",
                            background: "#DCE3F6",
                            py: 2,
                            px: 4,
                            position: "relative",
                        }}
                    >
                        <Stack>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Program in Acute medicine (Equivalent to
                                Emergency Medicine)
                            </Typography>
                            <Typography sx={{ width: "70%", color: "#706D6D" }}>
                                Omnicuris Academy is delighted to announce a
                                highly regarded, certification course in Acute
                                and General Medicine developed by the Royal
                                Colleges of Physicians, the Royal College of
                                Physicians and Surgeons of Glasgow and the Royal
                                College of Physicians of Edinburgh in
                                partnership with the UKs NHS England Technology
                                Enhanced Learning Team. This Global course is
                                structured around critical medical and surgical
                                emergencies, and its management is instituted by
                                top experts detailed across 47 sessions. From
                                anaphylaxis to acute myocardial infarction,
                                cerebral stroke to renal failure, breathlessness
                                to cardiac arrest, we have everything in the
                                field of Acute Medicine covered for you. This
                                scientific blend of topics is expected to
                                accelerate your dream career in Acute Medicine,
                                straight from where you are, at a pace and place
                                of your liking. Don't wait any further. Go ahead
                                and enroll NOW, and upon programme completion,
                                receive a certificate of completion from OC
                                Academy and eIntegrity, co-badged by these
                                prestigious institutions.
                            </Typography>
                            <Stack direction="row">
                                <Rating name="read-only" value={4} readOnly />
                                <Box
                                    component={"span"}
                                    sx={{ color: "#706D6D" }}
                                >
                                    (223,003 ratings)
                                </Box>
                            </Stack>
                        </Stack>

                        <Card sx={{ p: 2, width: "547px" }}>
                            <Stack>
                                <img src="/course.png" alt="img" />
                                <Stack
                                    direction={"row"}
                                    spacing={1}
                                    sx={{ my: 1 }}
                                >
                                    <Box component={"span"}>₹15,999</Box>
                                    <Box component={"span"}>+₹2,700GST</Box>
                                    <img
                                        src="/limited-seat.png"
                                        alt="img"
                                        width="90px"
                                    />
                                </Stack>
                            </Stack>
                        </Card>
                    </Paper>
                </Stack> */}

                    <Card
                        sx={{
                            p: "20px",
                            width: { xs: "100%", sm: "100%", md: "50%" },
                            ml: { xs: "0", sm: "0", md: "35px" },
                            mr: { xs: "0", sm: "0", md: "auto" },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Raleway",
                                fontWeight: "700",
                                color: "#383838",
                                fontSize: "30px",
                                textAlign: {
                                    xs: "center",
                                    sm: "center",
                                    md: "left",
                                },
                            }}
                        >
                            What You’ll Learn
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "400",
                                fontSize: "15px",
                                color: "#706D6D",
                                textAlign: {
                                    xs: "center",
                                    sm: "center",
                                    md: "left",
                                },
                            }}
                        >
                            Besides receiving this well-regarded content from
                            the highly reputed Royal College of Physicians,
                            Royal College of Physicians and Surgeons of Glasgow
                            and Royal College of Physicians of Edinburgh, the
                            select few program participants shall be better able
                            to:
                        </Typography>
                        <Stack mt={2} spacing={2}>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "#706D6D",
                                    textAlign: {
                                        xs: "center",
                                        sm: "center",
                                        md: "left",
                                    },
                                }}
                            >
                                Identify life-threatening emergencies, both
                                traumatic and immunological (like anaphylaxis),
                                and outline their basic underlying
                                pathophysiological basis for timely intervention
                                and management
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "#706D6D",
                                    textAlign: {
                                        xs: "center",
                                        sm: "center",
                                        md: "left",
                                    },
                                }}
                            >
                                Identify life-threatening emergencies, both
                                traumatic and immunological (like anaphylaxis),
                                and outline their basic underlying
                                pathophysiological basis for timely intervention
                                and management
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "#706D6D",
                                    textAlign: {
                                        xs: "center",
                                        sm: "center",
                                        md: "left",
                                    },
                                }}
                            >
                                Identify life-threatening emergencies, both
                                traumatic and immunological (like anaphylaxis),
                                and outline their basic underlying
                                pathophysiological basis for timely intervention
                                and management
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "#706D6D",
                                    textAlign: {
                                        xs: "center",
                                        sm: "center",
                                        md: "left",
                                    },
                                }}
                            >
                                Identify life-threatening emergencies, both
                                traumatic and immunological (like anaphylaxis),
                                and outline their basic underlying
                                pathophysiological basis for timely intervention
                                and management
                            </Typography>
                        </Stack>
                    </Card>
                </Stack>
            </Box>
            <Footer />
        </>
    );
};

export default CourseDetails;
