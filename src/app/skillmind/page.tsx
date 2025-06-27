"use client";

import * as React from "react";
//import { useRouter } from "next/navigation";
import ResultCard from "@/components/ResultCard";
// import JobMatchCard, { JobMatch } from '../components/JobMatchCard';
import ResultHeading from "../components/ResultHeading";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AssessmentProgress from "../components/AssessmentProgress";
import AssessmentTips from "../components/AssessmentTips";
import NeedHelpBox from "../components/NeedHelpBox";
import AIInsightsBox from "../components/AIInsightsBox";

export default function ChatPage() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  // const [loading, setLoading] = React.useState(false);
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
        content: `👋 Welcome to SkillMind! Let's begin:\n\nA. I enjoy trying new things\nB. I prefer familiar routines\nC. I'm a mix of both`,
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
    // setLoading(true);

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

    // setLoading(false);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={2} mt={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <Paper>
                {/* <ChatScreen messages={messages} options={options}/> */}
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
                              borderRadius: 3,
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
                                  }}
                                >
                                  {msg.content}
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
                            }}
                          >
                            {msg.content}
                          </Box>
                          <AccountCircleIcon
                            sx={{ width: "40px", height: "40px" }}
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
                    </Stack>
                  )}

                  <div className="max-w-2xl mx-auto p-4">
                    {/* <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 h-[300px] overflow-y-auto">
                  {messages.map((msg, i) => (
                    <div key={i} className="mb-2 whitespace-pre-wrap">
                      <strong>{msg.role === "user" ? "You" : "SkillMind"}:</strong>{" "}
                      {msg.content}
                    </div>
                  ))}
                </div> */}
                    {/* 
                {options.length > 0 && (
                  <div className="flex flex-col gap-2 mb-4">
                    {options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt)}
                        className="px-4 py-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )} */}

                    {/* <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    {loading ? "..." : "Send"}
                  </button>
                </div> */}

                    {results.length > 0 && (
                      <Box>
                        <ResultHeading />
                        {results.map((res, i) => (
                          <ResultCard key={i} result={res} />
                        ))}
                      </Box>
                    )}
                  </div>
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
      </Container>
    </Box>
  );
}
