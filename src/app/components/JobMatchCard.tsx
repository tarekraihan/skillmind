"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Stack,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ResultProps {
  result: {
    jobTitle: string;
    matchScore: number;
    whyFit: string;
    whatYouDo: string;
    labels: string[];
    match: {
      college: string;
      program: string;
      duration: string;
      link: string;
      description: string;
    };
  };
}

export default function JobMatchCard({ result }: ResultProps) {
  if (!result) return null;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        p: 3,
        mb: 4,
        backgroundColor: "#fff",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                backgroundColor: result.matchScore > 70 ? "#22C55E" : "#F59E0B",
                width: 36,
                height: 36,
              }}
            >
              <SchoolIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              {result.jobTitle}
            </Typography>
          </Stack>
          <Chip
            label={`${result.matchScore}% Match`}
            sx={{
              backgroundColor: result.matchScore > 70 ? "#22C55E" : "#F59E0B",
              color: "#fff",
              fontWeight: 500,
              px: 1.5,
              py: 0.5,
              borderRadius: 5,
              fontSize: 13,
            }}
          />
        </Stack>

        {/* Why This Job */}
        <Box mt={3}>
          <Typography
            fontWeight="bold"
            color="warning.main"
            sx={{ display: "flex", alignItems: "center", fontFamily: "Inter" }}
          >
            <EmojiObjectsIcon sx={{ mr: 1 }} fontSize="small" />
            Why This Job:
          </Typography>
          <Typography variant="body2" mt={0.5}>
            {result.whyFit}
          </Typography>
        </Box>

        {/* What You’ll Do */}
        <Box mt={3}>
          <Typography
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center", fontFamily: "Inter" }}
          >
            <WorkOutlineIcon sx={{ mr: 1 }} fontSize="small" />
            What You’ll Do:
          </Typography>
          <Typography variant="body2" mt={0.5}>
            {result.whatYouDo}
          </Typography>
        </Box>

        {/* Tags */}
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {result.labels.map((label, i) => (
            <Chip
              key={i}
              label={label}
              icon={<CheckCircleIcon fontSize="small" />}
              sx={{
                backgroundColor: label.includes("Openness")
                  ? "#E0F2FE"
                  : label.includes("Agreeableness")
                  ? "#DCFCE7"
                  : label.includes("GED")
                  ? "#FEF3C7"
                  : "#F3F4F6",
                color: label.includes("Openness")
                  ? "#0284C7"
                  : label.includes("Agreeableness")
                  ? "#16A34A"
                  : label.includes("GED")
                  ? "#CA8A04"
                  : "#374151",
                fontSize: "12px",
              }}
              size="small"
            />
          ))}
        </Stack>

        {/* Training Info Box */}
        <Box
          mt={4}
          p={2}
          borderRadius={2}
          sx={{
            backgroundColor: "#EFF6FF",
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                fontWeight="bold"
                sx={{
                  color: "#1E40AF",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Inter",
                }}
              >
                <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
                Recommended Training:
              </Typography>
              <Typography fontWeight="bold" mt={1}>
                {result.match.college}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                {result.match.program}
              </Typography>
              <Typography fontSize={12} color="text.disabled">
                Duration: {result.match.duration}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  height: "100%",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  href={result.match.link}
                  target="_blank"
                  sx={{
                    mt: 2,
                    backgroundColor: "#3B82F6",
                    "&:hover": { backgroundColor: "#2563EB" },
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    borderRadius: 2,
                  }}
                >
                  View Course
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
