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
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem, removeItem } from "../../../Utils/localStorageManager";
import { axiosClient, baseURL } from "../../../Utils/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "@mui/icons-material";
import { logout } from "../../../Store/authSlice";
import CloseIcon from "@mui/icons-material/Close";

// const LogoStyle = styled('img')({
//     width:{xs:0, sm:185},
//     height:44
// })

const TabStyle = styled(Tab)`
color:#383838;
font-size:18px;
font-weight:600;
fontfamily:Lato;
text-transform:none;
`
const LogoStyle = styled("img")(({ theme }) => ({
    display: "none",
    cursor:'pointer',
    [theme.breakpoints.up("sm")]: {
        display: "inline",
    },
}));
const LogoMobileStyle = styled("img")(({ theme }) => ({
    display: "inline",
    cursor:'pointer',
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

// const TabStyle = styled(Tab)`
//     padding: 12px;
// `

const NavBar = () => {
    const {hospital_id} = useParams()
    console.log(hospital_id);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [userLogIn, setUserLogIn] = useState(false);
    const [userSetting, setUserSetting] = useState(false);
    const {isLoggedIn} = useSelector((state)=>state.auth)
    const [activeMenu, setActiveMenu] = useState(1);
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
console.log(user, "User");


//     const myProfile = useSelector(state => state.appConfigReducer.myProfile)
// console.log(myProfile);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
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


    const logOutUser = async()=>{
        await axiosClient.post('/v2/logout')
        removeItem(KEY_ACCESS_TOKEN)
        dispatch(logout());
        setUserSetting(false)
        // navigate('/')
        // window.location.href = '/master/signin'
        window.location.replace('/');

    }


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
                            variant={activeMenu === 1 ? "contained" : "text"}
                            onClick={() => {
                                setActiveMenu(1);
                                navigate('/');
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                color: activeMenu === 1 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                background:
                                    activeMenu === 1 ? "#ffffff" : "none",
                                borderRadius: "5px",
                                
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            variant={activeMenu === 2 ? "contained" : "text"}
                            onClick={() => {
                                setActiveMenu(2);
                                navigate(
                                    '/doctors'
                                );
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                color: activeMenu === 2 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                borderRadius: "5px",
                                background:
                                    activeMenu === 2 ? "#ffffff" : "none",
                            }}
                        >
                            Find Doctors
                        </Button>
                        <Button
                            variant={activeMenu === 3 ? "contained" : "text"}
                            onClick={() => {
                                setActiveMenu(3);
                                navigate(
                                    '/tracking'
                                );
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                color: activeMenu === 3 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                borderRadius: "5px",
                                background:
                                    activeMenu === 3 ? "#ffffff" : "none",
                            }}
                        >
                            Tracking
                        </Button>
                        <Button
                            variant={activeMenu === 4 ? "contained" : "text"}
                            onClick={() => {
                                setActiveMenu(4);
                                navigate(
                                   '/medical-courses'
                                );
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                borderRadius: "5px",
                                color: activeMenu === 4 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                background:
                                    activeMenu === 4 ? "#ffffff" : "none",
                            }}
                        >
                            Medical Courses
                        </Button>
                        <Button
                            variant={activeMenu === 5 ? "contained" : "text"}
                            onClick={() => {
                                setActiveMenu(5);
                                navigate(
                                    '/contact-us'
                                );
                                setDrawer(false);
                            }}
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: "24.8px",
                                borderRadius: "5px",
                                color: activeMenu === 5 ? "#1F51C6" : "#ffffff",
                                width: "100%",
                                textTransform: "none",
                                background:
                                    activeMenu === 5 ? "#ffffff" : "none",
                            }}
                        >
                            Contact Us
                        </Button>
                    </Stack>
                </Box>
                <StyledToolbar >
                    <Stack direction="row" alignItems={"center"}>
                        <IconButton
                            onClick={() => setDrawer(!drawer)}
                            sx={{ display: { xs: "block", sm: "block", md:"none" }, zIndex:2 }}
                        >
                            {drawer ? (
                                <CloseIcon sx={{ color: "#ffffff" }} />
                            ) : (
                                <MenuIcon color="primary" />
                            )}
                        </IconButton>
                        <LogoStyle src="/m-logonew.png" width={185}  onClick={()=>navigate('/')}/>
                        <LogoMobileStyle
                            src="/m-logonew.png"
                            width={85}
                            height={20}
                        />
                    </Stack>
                    <Tabs
                        aria-label="Tab navigation"
                        onChange={handleChange}
                        value={selectedTab}
                        sx={{ display: { xs: "none", sm: "none", md:"block" } }}
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
                                label="Medical Courses"
                                to="/medical-courses"
                                tabIndex={3}
                            />
                        <TabStyle
                            component={Link}
                            label="Contact Us"
                            to="/contact-us"
                            tabIndex={4}
                        />
                    </Tabs>
                    {isLoggedIn? <Avatar
                    sx={{width:'44px', height:'44px'}}
                    src={
                        user?.img ? user?.img
                            :
                             "/patientDefault.png"
                    }
                    onClick={()=>setUserSetting(!userSetting)}/>:<Button
                        // onClick={() => navigate("/sign-up")}
                        onClick={()=>setOpen(true)}
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius:'35px',
                            // px: { xs: 2, sm: 5 },
                            // py: { xs: 0.2, sm: 1 },
                            textTransform:'none',
                            fontWeight:"700",
                            fontFamily:"Raleway",
                            fontSize:"16px",
                            width:{xs:"80px", sm:"90px", md:"121px"},
                            height:{xs:"25px", sm:"32px", md:"35px"}
                        }}
                    >
                        Sign In
                    </Button>}
                 { isLoggedIn &&  <Menu
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
                        sx={{mt:4}}
                    >
                        <MenuItem onClick={()=>navigate(`/user/profile/edit/${user?._id}`) & setUserSetting(false)} >Edit Profile</MenuItem>
                        {/* <MenuItem disabled>As a Doctor</MenuItem> */}
                        <MenuItem onClick={logOutUser} sx={{color:'red'}}>Log Out</MenuItem>
                    </Menu>}
                    {!isLoggedIn && <Menu
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
                        sx={{mt:4}}
                    >
                        <MenuItem  onClick={()=>navigate("/master/signin") & setOpen(false)}>As a Hospital</MenuItem>
                        <MenuItem onClick={()=>navigate("/doctor/signin") & setOpen(false)}>As a Doctor</MenuItem>
                        <MenuItem onClick={()=>navigate("/user/signin") & setOpen(false)}>As a Patient</MenuItem>
                    </Menu>}
                </StyledToolbar>
            </AppBar>
            {/* <Drawer open={drawer} onClose={() => setDrawer(false)} sx={{height:'100vh'}}>
                <Tabs
                    orientation="vertical"
                    aria-label="Tab navigation"
                    onChange={handleChange}
                    value={selectedTab}
                    sx={{ display: { xs: "block", sm: "block" }, background:'#1F51C6',  }}
                >
                    <Tab component={Link} label="Home" to="/" tabIndex={0} />
                    <Tab
                        component={Link}
                        label="Find Doctors"
                        to="/doctors"
                        tabIndex={1}
                        sx={{color:'red'}}
                    />
                    <Tab
                        component={Link}
                        label="Dashboard"
                        to="/dashboard"
                        tabIndex={2}
                        sx={{color:'#FFFFFF'}}
                    />
                        <Tab
                            component={Link}
                            label="Medical Courses"
                            to="/medical-courses"
                            tabIndex={3}
                            sx={{color:'#FFFFFF'}}
                        />
                    <Tab
                        component={Link}
                        label="Contact Us"
                        to="/contact-us"
                        tabIndex={4}
                        sx={{color:'#FFFFFF'}}
                    />
                </Tabs>
            </Drawer> */}
        </>
      
    );
};

export default NavBar;
