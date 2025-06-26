import React from "react";
import { Typography, Stack, Paper } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const AssessmentTips: React.FC = () => {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <LightbulbIcon sx={{ color: "orange" }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Assessment Tips
        </Typography>
      </Stack>
      <ul style={{ paddingLeft: 16, margin: 0 }}>
        <li>
          <Typography variant="body2">
            Answer honestly - there are no wrong answers
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Think about what energizes you, not what you think sounds good
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Consider your natural tendencies and preferences
          </Typography>
        </li>
      </ul>
    </Paper>
  );
};

export default AssessmentTips;
