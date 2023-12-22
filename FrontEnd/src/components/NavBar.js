import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./ComponentStyle.css";
import { Link } from "react-router-dom";
import { useUser } from "../UserProvider";
const pages = ["Create Recipe", "Recipe List", "Home"];
const settings = ["User Name", "Profile", "Logout"];

function getPagePath(page) {
  switch (page) {
    case "Home":
      return "/home";
    case "Create Recipe":
      return "/createRecipe";
    case "Display Recipe":
      return "/DisplayRecipe";
    case "Recipe List":
      return "/recipelist";
    // Add more cases for additional pages
    default:
      return `/${page.replace(/\s+/g, "-")}`;
  }
}

function getSettingPath(settings) {
  switch (settings) {
    case "Profile":
      return "/profile";
  }
}
const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    // logout();
    window.location.href = "/";
  }
};

function NavBar() {
  const { user } = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#231F47" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <img src="/images/appname.png" alt="logo" className="applogo" />
          </Typography>

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
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: "white" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                marginRight: "4em",
                flexDirection: "row-reverse",
              },
            }}
          >
            {pages.map((page) => (
              <Link
                sx={{ textDecoration: "none", color: "white" }}
                to={getPagePath(page)}
                className="nav-link"
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  // Adjust the 'left here'
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    left: "0rem",
                    fontSize: "small",
                    flexDirection: "row-reverse",
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, marginRight: "4em" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user.firstname}
                  src="/static/images/avatar/2.jpg"
                  sx={{ backgroundColor: "#89A4C3" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Logout" ? handleLogout : handleCloseUserMenu
                  }
                  disabled={setting === "User Name"}
                >
                  {setting === "User Name" ? (
                    <Typography
                      textAlign="center"
                      sx={{
                        ":hover": { pointerEvents: "none", cursor: "default" },
                      }}
                    >
                      {user.firstname + " " + user.lastname}
                    </Typography>
                  ) : (
                    <Link to={getSettingPath(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
