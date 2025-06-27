"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Link from "next/link";

const pages = [
  "Home",
  "Why SkillMind",
  "How It Works",
  "Courses",
  "Team",
  "FAQ",
  "Contact",
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        color: "#222",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href="/">
            <Box
              component="img"
              src="skillmind-logo.png"
              alt="Hero Image"
              sx={{ display: { xs: "none", md: "flex" }, width: "180px" }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Badge
            sx={{
              display: { xs: "flex", md: "none" },
              px: 2,
              py: 1,
              borderRadius: 2,
              mr: 1,
              color: "#fff",
              background: "#1976d2",
              fontFamily: "Inter",
              fontWeight: 700,
            }}
          >
            S
          </Badge>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Inter",
              fontWeight: "bold",
              letterSpacing: ".2rem",
              color: "#222",
              textDecoration: "none",
            }}
          >
            SkillMind.AI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#222",
                  display: "block",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Link href="/skillmind">
              <Button variant="contained">Book a Demo</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
