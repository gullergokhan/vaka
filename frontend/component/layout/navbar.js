import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import { useRouter } from "next/navigation";
import { mainColor } from "@/constants/Colors";
import API from "@/helpers/ApiBuilder";
import AppContext from "@/AppContext";
import Cookies from "js-cookie";
import { BackendMediaPath } from "@/constants/BackendValues";
import DropdownMain from "../menuItems/DropdownMain";

const pages = ["Products", "Pricing", "Blog"];

function ResponsiveAppBar() {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [photoPath, setPhotoPath] = useState("/static/images/avatar/2.jpg");
  const [appBarOpacity, setAppBarOpacity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserSource = await API.get(
          "get_current_user",
          Cookies.get("accessToken")
        );
        const currentUser = currentUserSource.data;

        if (currentUser) {
          setUser(currentUser?.email);
          setUserInfo({
            user: currentUser,
            loggedIn: currentUser?.email ? true : false,
          });
          setPhotoPath(BackendMediaPath + currentUser?.photo);
        }
      } catch (error) {
        console.info("Not logged in");
      }
    };
    fetchData();
  }, [userInfo?.user?.photo, Cookies.get("accessToken")]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setAppBarOpacity(0.1);
      } else {
        setAppBarOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const appBarBackground = `rgba(97, 97, 97, ${appBarOpacity})`;

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    setUserInfo({ user: null, loggedIn: false });
    router.push("/login");
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget); // Only MUI Menu components should get anchorEl
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget); // Same for User Menu
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const redirectToLogin = () => {
    router.push("/login");
  };
  
  const redirectToRegister = () => {
    router.push("/register");
  };

  return (
    <AppBar component="nav" sx={{ backgroundColor: appBarBackground, transition: "0.3s" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="/logoy.png"
            alt="Topfıyt"
            onClick={() => router.push("/")}
            style={{ width: "40px", height: "50px", marginRight: "1px", cursor: "pointer" }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{ position: "absolute", top: 57, left: -15 }}
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <DropdownMain onClose={handleCloseNavMenu} />
            </Menu>
          </Box>

          <MovieOutlinedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, pt: 2 }}>
            <DropdownMain />
          </Box>

          {!user ? (
            <>
              <MenuItem onClick={redirectToLogin}>
                <Typography textAlign="center">Giriş Yap</Typography>
              </MenuItem>
              <MenuItem onClick={redirectToRegister}>
                <Typography textAlign="center">Kayıt Ol</Typography>
              </MenuItem>
            </>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="kullanıcı fotoğrafı" src={photoPath} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => router.push("/profile")}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Çıkış Yap</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
