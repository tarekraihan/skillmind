import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const NeedHelpBox: React.FC = () => {
  return (
    <Paper sx={{ backgroundColor: "#e3f2fd", p: 2, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <HelpOutlineIcon sx={{ color: "#1976d2" }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Need Help?
        </Typography>
      </Stack>
      <Typography variant="body2">
        If you are unsure about any question, you can always type your own
        response or contact our support team.
      </Typography>
    </Paper>
  );
};

export default NeedHelpBox;
