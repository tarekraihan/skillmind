// app/custom/layout.tsx
import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header style={{ padding: "1rem" }}>
        <Box>
          <ResponsiveAppBar />
        </Box>
      </header>
      <Box sx={{ padding: { xs: "0", md: "2rem" } }}>{children}</Box>
      <Footer />
    </>
  );
}
