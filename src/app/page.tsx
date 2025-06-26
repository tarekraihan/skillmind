import ResponsiveAppBar from "./components/ResponsiveAppBar";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Stack,
  Button,} from "@mui/material";
import FAQ from "./components/FAQ";
import GetStarted from "./components/GetStarted";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <ResponsiveAppBar />

      {/* Hero Section */}
      <Box sx={{ py: 10, textAlign: "center", backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="h1"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    fontSize: "50px",
                  }}
                >
                  Unlock Your Team's Potential
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  AI-powered guidance to help individuals discover the best job
                  fit and the education that gets them there.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained">Book a Demo</Button>

                  <Button size="medium">How it works</Button>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Box
                  component="img"
                  src="hero-image.png"
                  alt="Hero Image"
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why SkillMind */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom fontWeight="500">
            Why SkillMind
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            We're different from generic career tests. Here's how we help you
            find your true calling.
          </Typography>
          <Grid container spacing={2} mt={2}>
            {[
              "Personalized, Not Generic",
              "All That Understands People",
              "Education That Matches Careers",
              "Designed for Workforce Readiness",
            ].map((title, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {title === "Personalized, Not Generic" &&
                      "Uses OCEAN psychology model to assess strengths and match to career paths."}
                    {title === "All That Understands People" &&
                      "Conversational AI dynamically asks questions and learns about the user."}
                    {title === "Education That Matches Careers" &&
                      "Every job recommendation is linked with accessible programs."}
                    {title === "Designed for Workforce Readiness" &&
                      "Perfect for job seekers, reentry programs, and upskilling initiatives."}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom fontWeight="500">
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            We use AI + psychology to find your best-fit career.
          </Typography>
          <Grid container spacing={2} justifyContent="center" mt={4}>
            {[
              {
                step: 1,
                bgColor: "primary.main",
                title: "Chat with AI",
                desc: "Understand your personality and preferences.",
              },
              {
                step: 2,
                bgColor: "success.main",
                title: "Smart Job Matching",
                desc: "You’ll get 2–3 jobs that actually fit you.",
              },
              {
                step: 3,
                bgColor: "warning.main",
                title: "Education Ready",
                desc: "Each job includes a course to get started.",
              },
            ].map(({ step, title, desc, bgColor }) => (
              <Grid size={{ xs: 12, md: 4 }} spacing={2} key={step}>
                <Box
                  textAlign="center"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      p: 1,
                    }}
                    bgcolor={bgColor}
                    color="white"
                  >
                    {step}
                  </Typography>
                  <Typography variant="h6" mt={1}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Courses Offered By */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h2" align="center" gutterBottom fontWeight="500">
          Courses Offered By
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
          Partnered with leading community colleges across Arizona
        </Typography>
        <Grid container spacing={2} justifyContent="center" mt={4}>
          {[
            {
              step: 1,
              title: "MCC",
              desc: "Maricopa Community Colleges",
            },
            {
              step: 2,
              title: "RSC",
              desc: "Rio Salado College",
            },
            {
              step: 3,
              bgColor: "warning.main",
              title: "PCC",
              desc: "Pima Community College",
            },
            {
              step: 4,
              bgColor: "warning.main",
              title: "CAC",
              desc: "Central Arizona College",
            },
          ].map(({ step, title, desc, bgColor }) => (
            <Grid size={{ xs: 6, md: 3 }} key={step}>
              <Box
                textAlign="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    borderRadius: "10%",
                    width: "100px",
                    height: "50px",
                    p: 1,
                  }}
                  bgcolor="text.disabled"
                  color="#fff"
                >
                  {title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Meet the People Behind SkillMind*/}
      <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom fontWeight="500">
            Meet the People Behind SkillMind
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            We believe in access, equity, and personalized pathways to
            opportunity.
          </Typography>
          <Grid container spacing={2} justifyContent="center" mt={4}>
            {[
              {
                step: "JD",
                bgColor: "primary.main",
                title: "Jane Doe",
                post: "Founder & CEO",
                desc: "Former workforce development specialist with 10+ years helping people find meaningful careers.",
              },
              {
                step: "MS",
                bgColor: "success.main",
                title: "Mike Smith",
                post: "Head of AI Development",
                desc: "AI researcher focused on personality psychology and career matching algorithms.",
              },
              {
                step: "SJ",
                bgColor: "warning.main",
                title: "Sarah Johnson",
                post: "Education Partnerships",
                desc: "Building bridges between career paths and educational opportunities at community colleges.",
              },
            ].map(({ step, title, desc, bgColor, post }) => (
              <Grid size={{ xs: 12, md: 4 }} key={step}>
                <Paper sx={{ p: 2, height: "260px" }}>
                  <Box
                    textAlign="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        p: 1.6,
                      }}
                      bgcolor={bgColor}
                      color="white"
                    >
                      {step}
                    </Typography>
                    <Typography variant="h5" mt={1}>
                      {title}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                      {post}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* FAQ */}
      <FAQ />
      {/* GetStarted */}
      <GetStarted />
      {/* Footer */}
      <Footer />
    </Box>
  );
}
