import React, { useEffect, useState } from "react";
import MasterUserDoctors from "./MasterUserDoctors";
import MasterNavBar from "../../Components/Master/MasterNavBar";
import { useNavigate, useParams } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    InputAdornment,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    tableCellClasses,
} from "@mui/material";
import { axiosClient, baseURL } from "../../Utils/axiosClient";
import DoctorsTable from "../../Components/Master/DoctorsTable";
import StaffTable from "../../Components/Master/StaffTable";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { tab } from "../../Store/tabSlice";

const SearchFeildStyle = styled(TextField)({
    "& .css-1kzw815-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "31px",
        "& placeholder": {
            color: "blue",
        },
    },
});

const ManageStaff = () => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const [updatedStatus, setUpdatedStatus] = useState("pending");
    const [active, setActive] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tab(1));
    }, []);

    // console.log(pendingAppointmentsData);

    // const handleStatusChange = async (id, status) => {
    //     console.log(updatedStatus, "this is id", id);
    //     try {
    //         const response = await axiosClient.put(
    //             `/v2/updateUserAppointmentStatus/${id}`,
    //             { status }
    //         );
    //         if (response.status === "ok") {
    //           getDoctorsData();
    //         }
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setUpdatedStatus(status);
    // };

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
                    minHeight: "80vh",
                }}
            >
                <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
                    <SearchFeildStyle
                        size="small"
                        placeholder="Search Doctors"
                        sx={{
                            width: "491px",
                            // borderRadius:'30px'
                        }}
                        InputLabelProps={{ color: "red" }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img src="/search.svg" alt="img" />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                    <Button
                        onClick={() =>
                            navigate(
                                `/master/user/management/doctors/${hospital_id}`
                            )
                        }
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            width: "119px",
                            height: "41px",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "16px",
                            borderRadius: "35px",
                            color: "#383838",
                        }}
                    >
                        Doctors
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(
                                `/master/user/management/staff/${hospital_id}`
                            )
                        }
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            width: "119px",
                            height: "41px",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: "16px",
                            borderRadius: "35px",
                            color: "#ffffff",
                        }}
                    >
                        Staff
                    </Button>
                </Stack>
                <Box
                    sx={{
                        display: { xs: "block", sm: "block", md: "none" },
                        mb: "0.5rem",
                    }}
                >
                    <Select
                        sx={{
                            color: "#383838",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "16px",
                            textAlign: "center",
                            background: "#1F51C6",
                            borderRadius: "21px",
                            height: "32px",
                            color: "#FFFFFF",
                        }}
                        variant="outlined"
                        value="staff"
                    >
                        <MenuItem
                            onClick={() =>
                                navigate(
                                    `/master/user/management/doctors/${hospital_id}`
                                )
                            }
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#383838",
                            }}
                            value={"doctors"}
                        >
                            Doctors
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                navigate(
                                    `/master/user/management/staff/${hospital_id}`
                                )
                            }
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "16px",
                                textAlign: "center",
                                color: "#383838",
                            }}
                            value={"staff"}
                        >
                            Staff
                        </MenuItem>
                    </Select>
                </Box>
                <StaffTable search={search} />
            </Box>
            <Footer />
        </>
    );
};

export default ManageStaff;
