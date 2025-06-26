// app/custom/layout.tsx
import React from "react";
import SkillMindAppBar from "../components/SkillMindAppBar";
import { Box, Container } from "@mui/material";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem" }}>
          <Box>
            <Container>
              <SkillMindAppBar />
            </Container>
          </Box>
        </header>

        <main style={{ padding: "2rem" }}>{children}</main>

        <footer
          style={{
            background: "#f1f5f9",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          Custom Footer
        </footer>
      </body>
    </html>
  );
}
