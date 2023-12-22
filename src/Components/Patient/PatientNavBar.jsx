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
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
} from "../../Utils/localStorageManager";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "@mui/icons-material";
import { logout } from "../../Store/authSlice";
import CloseIcon from "@mui/icons-material/Close";
import { tab } from "../../Store/tabSlice";

const TabStyle = styled(Tab)({
    color: "#383838",
    fontFamily: "Lato",
    fontSize: "20px",
    fontWeight: "semibold",
    textTransform: "none",

    "&.Mui-selected": {
        fontWeight: "700",
    },
});

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

// const LinkStyle = styled(Link)`;
//     text-decoration: none;
//     color: #383838;
// `;

// const TabStyle = styled(Tab)`
//     padding: 12px;
// `

const PatientNavBar = () => {
    const { hospital_id } = useParams();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [userLogIn, setUserLogIn] = useState(false);
    const [userSetting, setUserSetting] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [activeMenu, setActiveMenu] = useState(1);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { tabValue } = useSelector((state) => state.tab);

    const handleChange = (event, newValue) => {
        dispatch(tab(newValue));
        // setSelectedTab(newValue);
        setDrawer(false);
    };

    // const accessToken = getItem(KEY_ACCESS_TOKEN);
    // const checkUserLogin = () =>{
    // const accessToken = getItem(KEY_ACCESS_TOKEN);
    //     if(isLoggedIn){
    //         setUserLogIn(true)
    //     }else{
    //         setUserLogIn(false)
    //     }
    // }

    // useEffect(()=>{
    //     checkUserLogin()
    // },[userLogIn])

    const logOutUser = async () => {
        await axiosClient.post("/v2/logout");
        removeItem(KEY_ACCESS_TOKEN);
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
                            // alignItems: "center",
                        }}
                    >
                        <Button
                            variant={tabValue === 0 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(0));
                                navigate("/");
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
                                navigate("/doctors");
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
                            Find Doctors
                        </Button>
                        <Button
                            variant={tabValue === 2 ? "contained" : "text"}
                            onClick={() => {
                                // if(!isLoggedIn){
                                //     navigate("/user/signin", {
                                //         state: { prevUrl: urlLocation.pathname },
                                //     });
                                //     return false;
                                // }
                                dispatch(tab(2));
                                navigate("/tracking");
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
                            Tracking
                        </Button>
                        <Button
                            variant={tabValue === 3 ? "contained" : "text"}
                            onClick={() => {
                                dispatch(tab(3));
                                navigate("/contact-us");
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
                            Contact Us
                        </Button>
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
                            onClick={() => navigate("/")}
                        />
                        <LogoMobileStyle
                            src="/m-logonew.png"
                            width={85}
                            height={20}
                        />
                    </Stack>
                    <Tabs
                        aria-label="Tab navigation"
                        onChange={handleChange}
                        value={tabValue}
                        centered
                        sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    >
                        <TabStyle
                            component={Link}
                            label="Home"
                            to="/"
                            tabIndex={0}
                        />
                        <TabStyle
                            component={Link}
                            label="Find Doctors"
                            to="/doctors"
                            tabIndex={1}
                        />
                        <TabStyle
                            component={Link}
                            label="Tracking"
                            to="/tracking"
                            tabIndex={2}
                        />

                        <TabStyle
                            component={Link}
                            label="Contact Us"
                            to="/contact-us"
                            tabIndex={3}
                        />
                    </Tabs>

                    <Avatar
                        sx={{ width: "44px", height: "44px" }}
                        src={user?.imgurl ? user.imgurl : "/patientDefault.png"}
                        onClick={() => setUserSetting(!userSetting)}
                    />
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
                            sx={{
                                fontFamily: "Lato",
                                fontSize: "1rem",
                                fontWeight: "400",
                                color: "#383838",
                            }}
                            onClick={() =>
                                navigate(`/user/profile/edit/${user?._id}`) &
                                setUserSetting(false)
                            }
                        >
                            Edit Profile
                        </MenuItem>
                        <MenuItem
                            sx={{
                                fontFamily: "Lato",
                                fontSize: "1rem",
                                fontWeight: "400",
                                color: "#383838",
                            }}
                            onClick={() =>
                                navigate("/user/upload/records") &
                                setUserSetting(false)
                            }
                        >
                            Upload Records
                        </MenuItem>
                        <MenuItem
                            sx={{
                                fontFamily: "Lato",
                                fontSize: "1rem",
                                fontWeight: "400",
                                color: "#EA4335",
                            }}
                            onClick={logOutUser}
                        >
                            Log Out
                        </MenuItem>
                    </Menu>
                </StyledToolbar>
            </AppBar>
        </>
    );
};

export default PatientNavBar;
