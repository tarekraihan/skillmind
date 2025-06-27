import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";

type Trait = {
  label: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};

type Training = {
  school: string;
  course: string;
  duration: string;
};

export type JobMatch = {
  jobTitle: string;
  matchPercent: number;
  whyFit: string;
  whatYouDo: string;
  traits: Trait[];
  training: Training;
  color: string; // e.g., '#1E88E5' for blue icon background
};

type Props = {
  job: JobMatch;
};

const JobMatchCard: React.FC<Props> = ({ job }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                backgroundColor: job.color,
                color: "#fff",
                p: 1,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WorkOutlineIcon />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {job.jobTitle}
            </Typography>
          </Stack>
          <Chip
            label={`${job.matchPercent}% Match`}
            color="success"
            sx={{ fontWeight: "bold" }}
          />
        </Stack>

        <Box mt={2}>
          <Typography fontWeight="bold" color="warning.main">
            <EmojiObjectsIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Why This Job:
          </Typography>
          <Typography variant="body2" mt={0.5}>
            {job.whyFit}
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography fontWeight="bold">
            <WorkOutlineIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            What You’ll Do:
          </Typography>
          <Typography variant="body2" mt={0.5}>
            {job.whatYouDo}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {job.traits.map((trait, i) => (
            <Chip
              key={i}
              label={trait.label}
              color={trait.color}
              variant="outlined"
            />
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ backgroundColor: "#F1F6FF", p: 2, borderRadius: 2 }}>
          <Typography fontWeight="bold" color="primary">
            <SchoolIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Recommended Training:
          </Typography>
          <Typography variant="body2" mt={0.5}>
            {job.training.school}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.training.course} <br />
            Duration: {job.training.duration}
          </Typography>
          <Button size="small" variant="contained" sx={{ mt: 1 }}>
            View Course
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobMatchCard;
