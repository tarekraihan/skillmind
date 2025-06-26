import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Avatar,
  Link,
  IconButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const BookADemoCard = () => {
  return (
    <Box sx={{ maxWidth: 420, mx: "auto", my: 5, px: 2 }}>
      {/* Top Card Section */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 3,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "#2563eb", width: 48, height: 48 }}>
          <CalendarTodayIcon />
        </Avatar>

        <Typography variant="h6" fontWeight={600}>
          Book a Demo
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Schedule a 30-minute demo to see SkillMind in action and learn how it
          can help your organization.
        </Typography>

        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#2563eb",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#1e40af" },
          }}
        >
          Schedule Now
        </Button>
      </Paper>

      {/* Contact Section */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <EmailIcon color="action" />
        <Typography variant="body2">hello@skillmind.ai</Typography>
      </Stack>

      {/* Social Icons */}
      <Stack direction="row" spacing={1}>
        <IconButton sx={{ bgcolor: "#f1f5f9" }}>
          <LinkedInIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ bgcolor: "#f1f5f9" }}>
          <TwitterIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default BookADemoCard;
