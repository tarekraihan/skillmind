import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const AIInsightsBox: React.FC = () => {
  return (
    <Paper sx={{ backgroundColor: "#fff8e1", p: 2, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <SmartToyIcon sx={{ color: "#f9a825", mr: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          AI Insights
        </Typography>
      </Box>
      <Typography variant="body2">
        Insights from your responses will appear here as you complete
        assessments.
      </Typography>
    </Paper>
  );
};

export default AIInsightsBox;
