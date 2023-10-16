import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    InputAdornment,
    Rating,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GroupIcon from "@mui/icons-material/Group";
import { BsFillCalendarFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { axiosClient } from "../Utils/axiosClient";
const SearchFeildStyle = styled(TextField)({
    "& .css-1kzw815-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "25px",
    },
});

const CourseDiscriptionTypography = styled(Box)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const CourseImageStyle = styled("img")(({ theme }) => ({
    width: "259px",
    height: "192px",
    margin: "10px auto",
    [theme.breakpoints.between("xs", "sm")]: {
        width: "120px",
        height: "103px",
    },
}));

const MedicalCourses = () => {
    const navigate = useNavigate();
    const [courseName, setcourseName] = useState({ courseName: "" });
    const [allCourse, setallCourse] = useState([]);
    const [search, setSearch] = useState("");
    // const getCourses = async (val)=>{
    //     setcourseName((prev)=>{
    //         return {...prev,courseName:val}
    //     })

    //     let result= await axiosClient.post("/v2/getCourseByName",courseName)
    //     console.log(result.result)
    //     setallCourse(result.result)
    // }
    const getCourses = async () => {
        const result = await axiosClient.get(`/v2/getCourse?search=${search}`);
        setallCourse(result.result);
    };

    useEffect(() => {
        getCourses();
    }, [search]);
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
                    minHeight:'80vh'
                }}
            >
            <Stack sx={{ display: "flex", alignItems: "center" }}>
                <SearchFeildStyle
                    // onChange={(e) => getCourses(e.target.value)}
                    onChange={(e) => setSearch(e.target.value)}
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
                <Typography
                    variant="h5"
                    sx={{ alignSelf: "flex-start", fontWeight: 600, my: 1 }}
                >
                    Certification Courses
                </Typography>
                {allCourse.map((val, i) => {
                    return (
                        <Card
                            onClick={() =>
                                navigate(`/medical-course/${val._id}/details`)
                            }
                            key={i}
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: {xs:0, sm:0, md:2},
                                boxShadow: "none",
                                borderBottom: "1px solid #D9D9D9",
                                flexDirection: "row",
                                cursor: "pointer",
                            }}
                        >
                            <Stack direction="row" sx={{ flex: 1 }}>
                                <CourseImageStyle
                                    src="/course.png"
                                    alt="img"
                                    // width="100%"
                                    // height="100%"
                                />

                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "Lato",
                                            fontSize: {
                                                xs: "13px",
                                                sm: "15px",
                                                md: "22px",
                                            },
                                            lineHeight: {
                                                xs: "15px",
                                                sm: "15px",
                                                md: "25.83px",
                                            },
                                        }}
                                    >
                                        {/* Program in Acute medicine (Equivalent to Emergency
                            Medicine) */}
                                        {val.courseName}
                                    </Typography>
                                    <CourseDiscriptionTypography
                                        component="span"
                                        sx={{
                                            color: "#706D6D",
                                            width: "70%",
                                            display: {
                                                xs: "none",
                                                sm: "none",
                                                md: "-webkit-box",
                                            },
                                        }}
                                    >
                                        {val.courseDiscription}
                                    </CourseDiscriptionTypography>
                                    <Box component="span" sx={{display:{xs:'none', sm:'none', md:'block'}}}>
                                        <Link
                                            style={{
                                                color: "#1F51C6",
                                                textDecoration: "none",
                                                display: "inline",
                                                zIndex: "999",
                                            }}
                                            to={`/medical-course/${val._id}/details`}
                                        >
                                            Read More
                                        </Link>
                                    </Box>
                                    <Stack
                                        direction={"row"}
                                        sx={{
                                            my: 1,
                                            display: {
                                                xs: "none",
                                                sm: "none",
                                                md: "flex",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mr: 1,
                                            }}
                                        >
                                            <WatchLaterIcon
                                                sx={{ color: "#1F51C6", mr: 1 }}
                                            />
                                            <Box
                                                component={"span"}
                                                sx={{
                                                    color: "#383838",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                               {val.courseDuration}
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mr: 1,
                                            }}
                                        >
                                            <GroupIcon
                                                sx={{ color: "#1F51C6", mr: 1 }}
                                            />
                                            <Box
                                                component={"span"}
                                                sx={{
                                                    color: "#383838",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                NA students
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mr: 1,
                                            }}
                                        >
                                            <BsFillCalendarFill color="#1F51C6" />
                                            <Box
                                                component={"span"}
                                                sx={{
                                                    color: "#383838",
                                                    fontWeight: "bold",
                                                    ml: 1,
                                                }}
                                            >
                                                Starts on --
                                            </Box>
                                        </Box>
                                    </Stack>
                                    <Stack
                                        direction={"row"}
                                        flexWrap='wrap-reverse'
                                        spacing={{xs:0, sm:0, md:1}}
                                        alignItems="center"
                                        sx={{ my: { xs: 0, sm: 0, md: 1 } }}
                                        gap='5px'
                                    >
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                navigate(
                                                    "/medical-course/course_id/details"
                                                )
                                            }
                                            sx={{
                                                borderRadius: "25px",
                                                textTransform: "none",
                                                display: "block",
                                                width:{xs:'100px', sm:'100px', md:'175px'},
                                                height:{xs:'30px', sm:'30px', md:'41px'},
                                                fontSize:{xs:'12px', sm:'12px', md:'18px', fontFamily:'Raleway', fontWeight:'600'}
                                            }}
                                        >
                                            View Details
                                        </Button>
                                        <Rating
                                            size="small"
                                            name="read-only"
                                            value={4}
                                            readOnly
                                        />
                                        <Box
                                            component={"span"}
                                            sx={{
                                                color: "#706D6D",
                                                fontSize: {
                                                    xs: "12px",
                                                    sm: "12px",
                                                    md: "13px",
                                                },
                                            }}
                                        >
                                            (223 ratings)
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Stack>
                            <Button
                                variant="contained"
                                sx={{
                                    lineHeight: "14px",
                                    display: "block",
                                    px: 5,
                                    py: 1,
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "flex",
                                    },
                                }}
                            >
                                {val.courseFee}
                                <br />
                                <Box
                                    component={"span"}
                                    sx={{ fontSize: "0.6rem" }}
                                >
                                    +₹2,700 Gst
                                </Box>
                            </Button>
                        </Card>

                        // <Card
                        //     onClick={() =>
                        //         navigate(`/medical-course/${val._id}/details`)
                        //     }
                        //     key={i}
                        //     sx={{
                        //         display: { xs: "flex", sm: "flex", md: "none" },
                        //         gap: 1,
                        //         p: "8px",
                        //         width: "100%",
                        //     }}
                        // >
                        //     <img
                        //         src="/course.png"
                        //         alt="img"
                        //         width="120px"
                        //         height="103px"
                        //         style={{ borderRadius: "5px" }}
                        //     />
                        //     <Stack spacing={1}>
                        //         <Typography
                        //             sx={{
                        //                 fontFamily: "Lato",
                        //                 fontWeight: "600",
                        //                 lineHeight: "15.6px",
                        //                 fontSize: "13px",
                        //             }}
                        //         >
                        //             {val.courseName}
                        //         </Typography>
                        //         <Stack direction="row" alignItems="center">
                        //             <Rating value={5} readOnly size="small" />{" "}
                        //             <Box
                        //                 component="span"
                        //                 sx={{
                        //                     fontFamily: "Lato",
                        //                     fontWeight: "500",
                        //                     fontSize: "12px",
                        //                     color: "#706D6D",
                        //                 }}
                        //             >
                        //                 114 Ratings
                        //             </Box>
                        //         </Stack>
                        //         <Button
                        //             variant="contained"
                        //             sx={{
                        //                 width: "100px",
                        //                 height: "30px",
                        //                 fontFamily: "Lato",
                        //                 fontWeight: "600",
                        //                 fontSize: "11px",
                        //                 textTransform: "none",
                        //                 lineHeight: "14.4px",
                        //                 borderRadius: "21px",
                        //             }}
                        //         >
                        //             View Details
                        //         </Button>
                        //     </Stack>
                        // </Card>
                    );
                })}
            </Stack>
            </Box>
            <Footer />
        </>
    );
};

export default MedicalCourses;
