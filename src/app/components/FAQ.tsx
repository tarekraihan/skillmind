import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function FAQ() {
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography variant="h2" align="center" gutterBottom fontWeight="500">
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
          Everything you need to know about SkillMind.AI
        </Typography>
        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                How is this different from a personality test?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Unlike generic personality tests, we use the scientifically-backed
              OCEAN model combined with AI conversations to understand not just
              who you are, but what careers will actually fulfill you and match
              your lifestyle needs.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">
                Do I need a GED to use this?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              No! SkillMind works for people at all education levels. We'll
              match you with careers and show you exactly what education or
              training you need to get there, including GED programs if needed.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">
                What happens after I get matched?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              You'll receive 2-3 personalized career recommendations with
              specific education pathways from our partner colleges. We also
              provide next steps and can connect you with enrollment counselors.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">Can I try it for free?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Yes! We offer a free initial assessment. Book a demo to experience
              how our AI works and see sample career matches. Full access is
              available through our partner programs.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">
                Can I use this for workforce training programs?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Absolutely! SkillMind is designed for workforce development
              organizations, reentry programs, and upskilling initiatives.
              Contact us to learn about our institutional partnerships.
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </Box>
  );
}
