import React from "react";
import { Box, Typography, Stack, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CelebrationIcon from "@mui/icons-material/Celebration";

const BestFitJobPathsBanner: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#F9FBFC",
        py: 4,
        px: 2,
        textAlign: "center",
        borderRadius: 2,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Avatar
          sx={{
            bgcolor: "#22C55E",
            width: 48,
            height: 48,
          }}
        >
          <CheckCircleIcon sx={{ color: "#fff" }} />
        </Avatar>

        <Typography variant="h6" component="div" fontWeight="bold">
          <CelebrationIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Here are your best-fit job paths!
        </Typography>

        <Typography variant="body2" color="text.secondary" maxWidth={400}>
          Based on your answers, we found career directions that align with your
          strengths and background.
        </Typography>
      </Stack>
    </Box>
  );
};

export default BestFitJobPathsBanner;
