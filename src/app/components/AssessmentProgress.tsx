import React from "react";
import { Box, Typography, Stack, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

type StepStatus = "completed" | "inProgress" | "pending";

interface Step {
  label: string;
  status: StepStatus;
}

const steps: Step[] = [
  { label: "Work Style Preferences", status: "completed" },
  { label: "Education Background", status: "completed" },
  { label: "Work Environment", status: "inProgress" },
  { label: "Personality Traits", status: "pending" },
  { label: "Career Interests", status: "pending" },
];

const getStatusIcon = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon sx={{ color: "green" }} />;
    case "inProgress":
      return <AccessTimeIcon sx={{ color: "#1976d2" }} />;
    default:
      return <RadioButtonUncheckedIcon sx={{ color: "grey.500" }} />;
  }
};

const getStatusText = (status: StepStatus): string => {
  switch (status) {
    case "completed":
      return "Completed";
    case "inProgress":
      return "In Progress";
    default:
      return "Pending";
  }
};

const getStatusColor = (status: StepStatus): string => {
  switch (status) {
    case "completed":
      return "green";
    case "inProgress":
      return "#1976d2";
    default:
      return "text.secondary";
  }
};

const AssessmentProgress: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Your Assessment Progress
      </Typography>
      <Stack spacing={2}>
        {steps.map((step, idx) => (
          <Stack key={idx} direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "transparent" }}>
              {getStatusIcon(step.status)}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight={500}>
                {step.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: getStatusColor(step.status) }}
              >
                {getStatusText(step.status)}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default AssessmentProgress;
