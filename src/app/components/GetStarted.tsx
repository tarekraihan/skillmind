import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import SendMessage from "./SendMessage";
import BookADemoCard from "./BookADemoCard";

function GetStarted() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
      <Container>
        <Typography variant="h2" align="center" gutterBottom fontWeight="500">
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
          Book a demo or get in touch with our team
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <SendMessage />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <BookADemoCard />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default GetStarted;
