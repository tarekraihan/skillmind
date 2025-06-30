"use client";

import * as React from "react";
//import { useRouter } from "next/navigation";
import JobMatchCard from "../components/JobMatchCard";
// import JobMatchCard, { JobMatch } from '../components/JobMatchCard';
import ResultHeading from "../components/ResultHeading";
import WhatsNextActions from "../components/WhatNextAction";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AssessmentProgress from "../components/AssessmentProgress";
import AssessmentTips from "../components/AssessmentTips";
import NeedHelpBox from "../components/NeedHelpBox";
import AIInsightsBox from "../components/AIInsightsBox";
import PersonalInfoForm from "../components/PersonalInfoForm";

export default function ChatPage() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  const [step, setStep] = React.useState<number>(1);
  // const [personalInfo,setPersonalInfo] =
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<
    {
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
    }[]
  >([]);
  //const router = useRouter();

  const API_URL = "/api/gpt";
  const MATCH_API = "/api/match";

  React.useEffect(() => {
    if (messages.length === 0) {
      const greeting = {
        role: "assistant",
        content: `👋 Welcome to SkillMind! Let's begin:How do you feel about new experiences?\n\nA. I enjoy trying new things\nB. I prefer familiar routines\nC. I'm a mix of both`,
      };
      setMessages([greeting]);
      setOptions([
        "A. I enjoy trying new things",
        "B. I prefer familiar routines",
        "C. I'm a mix of both",
      ]);
    }
  }, [messages]);
  interface JobMatch {
    job_id: string;
    match_score: number;
    why_fit: string;
    what_you_do: string;
    labels: string[];
  }

  function extractJsonFromText(responseText: string): JobMatch[] {
    try {
      // Step 1: Clean escaped characters
      const unescaped = responseText
        .replace(/\\n/g, "") // remove \n
        .replace(/\\"/g, '"') // unescape quotes
        .trim();

      // Step 2: Check if it starts with { and has multiple objects separated by }, {
      const multipleObjectPattern = /^{[\s\S]*},\s*{[\s\S]*}$/;

      if (multipleObjectPattern.test(unescaped)) {
        const wrapped = `[${unescaped}]`; // wrap in array brackets
        return JSON.parse(wrapped) as JobMatch[];
      }

      // Step 3: Try direct array match if exists
      const arrayMatch = unescaped.match(/\[\s*{[\s\S]*}\s*\]/);
      if (arrayMatch) {
        return JSON.parse(arrayMatch[0]) as JobMatch[];
      }

      // Step 4: Fallback to single object match
      const singleMatch = unescaped.match(/{[\s\S]*}/);
      if (singleMatch) {
        return [JSON.parse(singleMatch[0]) as JobMatch];
      }

      throw new Error("No valid JSON found.");
    } catch (err) {
      console.error("Failed to extract JSON:", err);
      return [];
    }
  }

  const handleSend = async (selected?: string) => {
    const finalInput = selected || input.trim();
    if (!finalInput) return;

    const userMessage = { role: "user", content: finalInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setOptions([]);
    setLoading(true);
    setStep(step + 1);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      console.log("🧠 Full GPT response:", data);

      const botMessage = data.choices?.[0]?.message;
      if (!botMessage) throw new Error("No bot message returned");

      console.log("💬 Bot message content:", botMessage.content);

      const allMessages = [...updatedMessages, botMessage];
      setMessages(allMessages);

      const newOptions = botMessage.content
        ?.split("\n")
        .filter((line: string) => /^[A-C]\./.test(line))
        .map((line: string) => line.trim());
      if (newOptions?.length > 0) {
        setOptions(newOptions);
      }

      if (
        botMessage?.content?.includes("{") ||
        botMessage?.content?.includes("[")
      ) {
        const jobMatches = extractJsonFromText(botMessage.content);
        console.log("🔍 jobMatches:", jobMatches);
        if (jobMatches) {
          try {
            console.log("✅ Formatted jobMatches:", JSON.stringify(jobMatches));

            const matchRes = await fetch(MATCH_API, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(jobMatches),
            });

            const matchData = await matchRes.json();
            console.log("🧪 Received matchData:", matchData);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setResults(matchData.results);
          } catch (err) {
            console.error("❌ JSON parse error:", err);
          }
        } else {
          console.warn("⚠️ No valid JSON block found.");
        }
      }
    } catch (error) {
      console.error("❌ Chat error:", error);
    }

    setLoading(false);
  };
  return (
    <>
      <Container>
        {step !== 11 && (
          <Grid container spacing={2} mt={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box>
                <Paper>
                  {/* <ChatScreen messages={messages} options={options}/> */}
                  <Box
                    sx={{
                      maxWidth: "100%",
                      margin: "auto",
                      padding: 4,
                      minHeight: "100vh",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {results.length < 1 &&
                      messages.map((msg, i) =>
                        msg.role !== "user" ? (
                          <Box
                            sx={{ display: "flex", flexDirection: "row" }}
                            key={i}
                          >
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
                                borderRadius: "0 15px 15px 15px",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              <Stack direction="row" spacing={2}>
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 600,
                                      mt: 1,
                                      color: "#0d47a1",
                                      fontFamily: "Inter",
                                    }}
                                  >
                                    {msg.content.split("\n\n")[0]}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 400,
                                      mt: 1,
                                      color: "#0d47a1",
                                      fontFamily: "Inter",
                                    }}
                                  >
                                    {msg.content.split("\n\n")[1]}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Paper>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 2,
                            }}
                            key={i}
                          >
                            <Box
                              sx={{
                                bgcolor: "#1976d2",
                                color: "#fff",
                                px: 2,
                                py: 1,
                                borderRadius: "15px 0 15px 15px",
                                maxWidth: "75%",
                                fontSize: "0.875rem",
                                fontFamily: "Inter",
                              }}
                            >
                              {msg.content}
                            </Box>
                            <AccountCircleIcon
                              sx={{
                                width: "40px",
                                height: "40px",
                                color: "#64748B",
                              }}
                            />
                          </Box>
                        )
                      )}
                    {options.length > 0 && (
                      <Stack spacing={1}>
                        {options.map((opt, i) => (
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderRadius: 5,
                              textTransform: "none",
                              fontFamily: "Inter",
                              fontWeight: 500,
                              backgroundColor: "#f0f6ff",
                              borderColor: "#90caf9",
                              "&:hover": {
                                backgroundColor: "#e3f2fd",
                              },
                            }}
                            key={i}
                            onClick={() => handleSend(opt)}
                          >
                            {opt}
                          </Button>
                        ))}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            py: 1,
                          }}
                        >
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type your answer here or click a suggestion above..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => {
                              if (e.key === "Enter") {
                                handleSend();
                              }
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => handleSend()}
                                    sx={{
                                      color: "#fff",
                                      backgroundColor: "#3B82F6",
                                    }}
                                  >
                                    <SendIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                              sx: {
                                borderRadius: "30px",
                                backgroundColor: "#f8f9fb",
                              },
                            }}
                          />
                          <Box sx={{ mt: 1, fontSize: 12, color: "#6c757d" }}>
                            You can click a suggestion above or type your own
                            answer. Press Enter to send.
                          </Box>
                        </Box>
                      </Stack>
                    )}
                    <Box>
                      {results.length < 1 && loading && (
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
                              borderRadius: "0 15px 15px 15px",
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <Stack direction="row" spacing={2}>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 400,
                                    mt: 1,
                                    color: "#0d47a1",
                                    fontFamily: "Inter",
                                  }}
                                >
                                  {"SkillMind is analyzing your responses ..."}
                                </Typography>
                              </Box>
                            </Stack>
                          </Paper>
                        </Box>
                      )}
                    </Box>
                    {results.length > 0 && (
                      <PersonalInfoForm setStep={setStep} />
                    )}
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  "& > *": {
                    mb: "20px",
                  },
                }}
              >
                {/* <AssessmentProgress /> */}
                <AssessmentTips />
                <NeedHelpBox />
                <AIInsightsBox />
              </Box>
            </Grid>
          </Grid>
        )}

        {results.length > 0 && step === 11 && (
          <Grid container>
            <Grid size={12}>
              <Box>
                <ResultHeading />
                {results.map((res, i) => (
                  <JobMatchCard key={i} result={res} />
                ))}
                <WhatsNextActions />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
