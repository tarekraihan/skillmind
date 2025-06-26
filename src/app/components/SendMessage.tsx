import React from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const SendMessage = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        mx: "auto",
        my: 5,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Send us a message
      </Typography>

      <Stack spacing={3} mt={2}>
        <TextField
          label="Full Name"
          placeholder="Enter your name"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Message"
          placeholder="Tell us about your needs..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#2563eb",
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#1e40af",
            },
          }}
        >
          Send Message
        </Button>
      </Stack>
    </Paper>
  );
};

export default SendMessage;
