import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Container,
    Button,
    styled,
    Tab,
    Tabs,
    AppBar,
    Toolbar,
    Typography,
    Stack,
    IconButton,
    Drawer,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import {
    HOSPITAL_ID,
    KEY_ACCESS_TOKEN,
    MASTER_USER,
    getItem,
    removeItem,
} from "../../Utils/localStorageManager";

import { axiosClient, baseURL } from "../../Utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
import { tab } from "../../Store/tabSlice";

// const LogoStyle = styled('img')({
//     width:{xs:0, sm:185},
//     height:44
// })
const LogoStyle = styled("img")(({ theme }) => ({
    display: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
        display: "inline",
    },
}));
const LogoMobileStyle = styled("img")(({ theme }) => ({
    display: "inline",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));
const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

// const LinkStyle = styled(Link)`
//     text-decoration: none;
//     color: #383838;
// `;

const TabStyle = styled(Tab)`
    color: #383838;
    font-size: 18px;
    font-weight: 600;
    fontfamily: Lato;
    text-transform: none;
`;

const MasterNavBar = () => {
    const hospital_id = getItem(HOSPITAL_ID);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [userLogIn, setUserLogIn] = useState(false);
    const [userSetting, setUserSetting] = useState(false);
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const { tabValue } = useSelector((state) => state.tab);
    const [activeMenu, setActiveMenu] = useState(1);

    // console.log(user.user.img);
    //     const myProfile = useSelector(state => state.appConfigReducer.myProfile)
    // console.log(myProfile);
    const handleChange = (event, newValue) => {
        dispatch(tab(newValue));
        setDrawer(false);
    };

    const accessToken = getItem(KEY_ACCESS_TOKEN);
    const checkUserLogin = () => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        if (accessToken) {
            setUserLogIn(true);
        } else {
            setUserLogIn(false);
        }
    };

    useEffect(() => {
        checkUserLogin();
    }, []);

    const logOutUser = async () => {
        await axiosClient.post("/v2/logout");
        removeItem(KEY_ACCESS_TOKEN);
        removeItem(MASTER_USER);
        removeItem(HOSPITAL_ID);
        dispatch(logout());
        setUserSetting(false);
        // navigate('/')
        // window.location.href = '/master/signin'
        window.location.replace("/");
    };

    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setDrawer(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <>
            <AppBar
                position="sticky"
                sx={{ background: "#ffffff", boxShadow: "none", mb: 1 }}
            >
                <Box
                    ref={menuRef}
                    sx={{
                        width: "250px",
                        background: "#1F51C6",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        zIndex: 1,
                        display: drawer ? "flex" : "none",
                        justifyContent: "center",
                    }}
                >
                    <Stack
                        spacing="30px"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant={tabValue === 0 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(0));
                                navigate(`/master/user/home/${user?._id}`);
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                color: tabValue === 0 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                background: tabValue === 0 ? "#ffffff" : "none",
                                borderRadius: "5px",
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            variant={tabValue === 1 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(1));
                                navigate(
                                    `/master/user/management/doctors/${user?._id}`
                                );
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                color: tabValue === 1 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                borderRadius: "5px",
                                background: tabValue === 1 ? "#ffffff" : "none",
                            }}
                        >
                            Management
                        </Button>
                        <Button
                            variant={tabValue === 2 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(2));
                                navigate(`/master/user/doctors/${user?._id}`);
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                color: tabValue === 2 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                borderRadius: "5px",
                                background: tabValue === 2 ? "#ffffff" : "none",
                            }}
                        >
                            Doctors
                        </Button>
                        <Button
                            variant={tabValue === 3 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(3));
                                navigate(
                                    `/master/user/appointments/${user?._id}`
                                );
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                borderRadius: "5px",
                                color: tabValue === 3 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                background: tabValue === 3 ? "#ffffff" : "none",
                            }}
                        >
                            Appointments
                        </Button>
                        {/* <Button
                            variant={tabValue === 4 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(4));
                                navigate(`/medical-courses`);
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                borderRadius: "5px",
                                color: tabValue === 4 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                background: tabValue === 4 ? "#ffffff" : "none",
                            }}
                        >
                            Medical courses
                        </Button> */}
                    </Stack>
                </Box>
                <StyledToolbar>
                    <Stack direction="row" alignItems={"center"}>
                        <IconButton
                            onClick={() => setDrawer(!drawer)}
                            sx={{
                                display: {
                                    xs: "block",
                                    sm: "block",
                                    md: "none",
                                },
                                zIndex: 2,
                            }}
                        >
                            {drawer ? (
                                <CloseIcon sx={{ color: "#ffffff" }} />
                            ) : (
                                <MenuIcon color="primary" />
                            )}
                        </IconButton>
                        <LogoStyle
                            src="/m-logonew.png"
                            width={185}
                            onClick={() =>
                                navigate(`/master/user/home/${user._id}`)
                            }
                        />
                        <LogoMobileStyle
                            src="/m-logonew.png"
                            width={85}
                            height={20}
                            onClick={() => navigate("/")}
                        />
                    </Stack>

                    <Tabs
                        aria-label="Tab navigation"
                        onChange={handleChange}
                        value={tabValue}
                        sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    >
                        <TabStyle
                            component={Link}
                            label="Home"
                            to={`/master/user/home/${user?._id}`}
                            tabIndex={0}
                        />
                        <TabStyle
                            component={Link}
                            label="Management"
                            to={`/master/user/management/doctors/${user?._id}`}
                            tabIndex={1}
                        />
                        <TabStyle
                            component={Link}
                            label="Doctors"
                            to={`/master/user/doctors/${user?._id}`}
                            tabIndex={2}
                        />
                        <TabStyle
                            component={Link}
                            label="Appointments"
                            to={`/master/user/appointments/${user?._id}`}
                            tabIndex={3}
                        />
                        {/* {user?.role === "DOCTOR" && (
                            <TabStyle
                                component={Link}
                                label="Medical Courses"
                                to={`/medical-courses`}
                                tabIndex={4}
                            />
                        )} */}
                    </Tabs>
                    {isLoggedIn ? (
                        <Avatar
                            src={
                                user?.img
                                    ? `${baseURL}/uploads/Hospital/HospitalImage/${user?.img}`
                                    : "/default.png"
                            }
                            onClick={() => setUserSetting(!userSetting)}
                        />
                    ) : (
                        <Button
                            // onClick={() => navigate("/sign-up")}
                            onClick={() => setOpen(true)}
                            variant="contained"
                            size="small"
                            sx={{
                                borderRadius: 15,
                                px: { xs: 2, sm: 5 },
                                py: { xs: 0.2, sm: 1 },
                                textTransform: "none",
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                    {accessToken && (
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={open}
                            open={userSetting}
                            onClose={(e) => setUserSetting(false)}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            sx={{ mt: 4 }}
                        >
                            <MenuItem
                                onClick={() =>
                                    navigate(
                                        `/master/user/profile/edit/${user?._id}`
                                    ) & setUserSetting(false)
                                }
                                sx={{
                                    fontFamily: "Lato",
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    color: "#383838",
                                }}
                            >
                                Edit Profile
                            </MenuItem>
                            {/* <MenuItem disabled>As a Doctor</MenuItem> */}
                            <MenuItem
                                onClick={logOutUser}
                                sx={{
                                    fontFamily: "Lato",
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    color: "#EA4335",
                                }}
                            >
                                Log Out
                            </MenuItem>
                        </Menu>
                    )}
                    {!accessToken && (
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={open}
                            open={open}
                            onClose={(e) => setOpen(false)}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            sx={{ mt: 4 }}
                        >
                            <MenuItem
                                onClick={() =>
                                    navigate("/master/signin") & setOpen(false)
                                }
                            >
                                As a Hospital
                            </MenuItem>
                            <MenuItem disabled>As a Doctor</MenuItem>
                            <MenuItem
                                onClick={() =>
                                    navigate("/user/signup") & setOpen(false)
                                }
                            >
                                As a Patient
                            </MenuItem>
                        </Menu>
                    )}
                </StyledToolbar>
            </AppBar>

            {/* <Drawer
                open={drawer}
                onClose={() => setDrawer(false)}
                sx={{ height: "100vh" }}
            >
                <Tabs
                    orientation="vertical"
                    aria-label="Tab navigation"
                    onChange={handleChange}
                    value={selectedTab}
                    sx={{
                        display: { xs: "block", sm: "block" },
                        background: "#1F51C6",
                    }}
                >
                    <Tab component={Link} label="Home" to="/" tabIndex={0} />
                    <Tab
                        component={Link}
                        label="Home"
                        to={`/master/user/home/${user?._id}`}
                        tabIndex={1}
                        sx={{ color: "#FFFFFF" }}
                    />
                    <Tab
                        component={Link}
                        label="Management"
                        to={`/master/user/management/doctors/${user?._id}`}
                        tabIndex={2}
                        sx={{ color: "#FFFFFF" }}
                    />
                    <Tab
                        component={Link}
                        label="Doctors"
                        to={`/master/user/doctors/${user?._id}`}
                        tabIndex={3}
                        sx={{ color: "#FFFFFF" }}
                    />
                    <Tab
                        component={Link}
                        label="Contact Us"
                        to="/contact-us"
                        tabIndex={4}
                        sx={{ color: "#FFFFFF" }}
                    />
                </Tabs>
            </Drawer> */}
        </>
        // <Box
        //     maxWidth="xl"
        //     style={{
        //         display: "flex",
        //         justifyContent: "space-between",
        //         alignItems: "center",
        //         position: "sticky",
        //         top: "0",
        //         zIndex: 1,
        //         background: "#ffffff",
        //     }}
        // >
        //     <Box>
        //         <img
        //             src="/m-logonew.png"
        //             alt="img"
        //             style={{ width: "185px", height: "44px" }}
        //         />
        //     </Box>

        //     <Box
        //         style={{
        //             display: "flex",
        //             justifyContent: "space-between",
        //             alignItems: "center",

        //         }}
        //     >
        //         <Tabs
        //             value={value}
        //             onChange={handleChange}
        //             color="#383838"
        //             // indicatorColor="#1F51C6"
        //             centered
        //             aria-label="secondary tabs example"
        //         >
        //            <TabStyle onClick={()=>navigate('/')} value="one" label="Home"/>
        //             <TabStyle onClick={()=>navigate('/find-doctors')} value="two" label="Find Doctors"/>
        //             <TabStyle onClick={()=>navigate('/dashboard')} value="three" label="Dashboard"/>
        //             <TabStyle onClick={()=>navigate('/contact-us')} value="four" label="Contact Us"/>
        //             <TabStyle onClick={()=>navigate('/medical-courses')} value="five" label="Medical Courses" />

        //         </Tabs>

        //     </Box>
        //     <Box>
        //         <Button
        //         onClick={()=>navigate('/sign-up')}
        //             variant="contained"
        //             size="small"
        //             style={{
        //                 borderRadius: "35px",
        //                 width: "161px",
        //                 height: "42px",
        //                 background: "#1F51C6",
        //             }}
        //         >
        //             Sign Up
        //         </Button>
        //     </Box>
        // </Box>
    );
};

export default MasterNavBar;
