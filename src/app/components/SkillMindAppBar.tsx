import React from "react";
import {
  Toolbar,
  // Typography,
  // Avatar,
  Box,
  // Stack,
  // LinearProgress,
  // IconButton,
  Paper,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const SkillMindAppBar = () => {
  // const currentStep = 3;
  // const totalSteps = 8;
  // const progress = (currentStep / totalSteps) * 100;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5eaf2",
        px: 2,
        py: 1,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Left: Icon + Titles */}
        <Box
          component="img"
          src="skillmind-ai-assistant.png"
          alt="SkillMind Logo"
          sx={{ display:"flex", width: "220px" }}
        />
        {/* <Stack direction="row" alignItems="center" spacing={2}> */}
        {/* <Avatar sx={{ bgcolor: "#2563eb", width: 40, height: 40 }}>
            <BusinessCenterIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              SkillMind AI Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Finding your perfect career match
            </Typography>
          </Box> */}
        {/* </Stack> */}

        {/* Right: Step + ProgressBar + Menu */}
        {/* <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" fontWeight={500}>
            Question {currentStep} of {totalSteps}
          </Typography>
          <Box sx={{ width: 80 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e5eaf2",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#2563eb",
                },
              }}
            />
          </Box>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Stack> */}
      </Toolbar>
    </Paper>
  );
};

export default SkillMindAppBar;
