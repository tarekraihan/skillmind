// ChatScreen.jsx
import React from "react";
import { Box, Typography, Button, Stack, Paper, } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChatScreen = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Bot Message */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="img"
          src="chatbot.png"
          alt="chat bot"
          sx={{
            width: "40px",
            height: "40px",
            mr: 2,
          }}
        />
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Hi! Im here to help you discover careers that truly fit you.
                Lets start with understanding your work style:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mt: 1, color: "#0d47a1" }}
              >
                Do you enjoy trying new things or prefer familiar routines?
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* Option Buttons */}
      <Stack spacing={1}>
        {[
          "I love trying new things",
          "I prefer routines",
          "It depends on the situation",
        ].map((option, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 5,
              textTransform: "none",
              fontWeight: 500,
              backgroundColor: "#f0f6ff",
              borderColor: "#90caf9",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            {option}
          </Button>
        ))}
      </Stack>

      {/* User Reply Bubble */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Box
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            px: 2,
            py: 1,
            borderRadius: "15px 0 15px 15px",
            maxWidth: "75%",
            fontSize: "0.875rem",
          }}
        >
          I like variety but not too much change at once
        </Box>
        <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
      </Box>
    </Box>
  );
};

export default ChatScreen;
