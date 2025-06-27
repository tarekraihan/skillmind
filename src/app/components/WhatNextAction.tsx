import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ReplayIcon from "@mui/icons-material/Replay";
import EventIcon from "@mui/icons-material/Event";

const WhatsNextActions: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "#fff",
        p: 3,
        textAlign: "center",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",

        margin: "0 auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        What’s Next?
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Share Results
        </Button>

        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Try Again
        </Button>

        <Button
          variant="contained"
          startIcon={<EventIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Talk to a Coach
        </Button>
      </Box>
    </Box>
  );
};

export default WhatsNextActions;
