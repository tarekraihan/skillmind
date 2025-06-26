import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import { Divider } from "@mui/joy";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#212121", color: "#fff", py: 6 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, md: 8 }}>
            <Box
              component="img"
              src="./skillmind-logo-white.png"
              alt="Log"
              sx={{
                width: "200px",
                mb: 2,
              }}
            />
            <Typography variant="body2">
              AI-powered career guidance to help people find their perfect job
              fit and education to get there.
            </Typography>
          </Grid>
          <Grid sx={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "right",
              }}
            >
              <Typography variant="h5">Quick Links</Typography>
              <Link href="#" underline="hover" color="inherit">
                Privacy Policy
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Terms of Service
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Contact
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ mt: 4, color: "gray.500" }}>
            © 2025 SkillMind.AI. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton sx={{ color: "#f1f5f9" }}>
              <LinkedInIcon fontSize="medium" />
            </IconButton>
            <IconButton sx={{ color: "#f1f5f9" }}>
              <TwitterIcon fontSize="medium" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
