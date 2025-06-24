"use client";

import * as React from "react";
//import { useRouter } from "next/navigation";
import ResultCard from "@/components/ResultCard";

export default function ChatPage() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
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
        content: `👋 Welcome to SkillMind! Let's begin:\n\nA. I enjoy trying new things\nB. I prefer familiar routines\nC. I'm a mix of both`,
      };
      setMessages([greeting]);
      setOptions([
        "A. I enjoy trying new things",
        "B. I prefer familiar routines",
        "C. I'm a mix of both",
      ]);
    }
  }, []);
  interface JobMatch {
    job_id: string;
    match_score: number;
    why_fit: string;
    what_you_do: string;
    labels: string[];
  }
  // function correctStringToJson(input: string) {
  //   // Trim whitespace and wrap in brackets if not already an array
  //   let corrected = `[${input.trim()}]`;

  //   // Replace newlines and escape sequences
  //   corrected = corrected
  //     .replace(/\\n/g, "")
  //     .replace(/\\"/g, '"')
  //     .replace(/},\s*{/g, "},{"); // ensure proper object separation

  //   // Parse to JSON
  //   try {
  //     const jsonArray = JSON.parse(corrected);
  //     return jsonArray;
  //   } catch (err) {
  //     console.error("Failed to parse JSON:", err);
  //     return null;
  //   }
  // }

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
    } catch (err: any) {
      console.error("Failed to extract JSON:", err.message);
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
        // const jsonRegex = /```json\s*([\s\S]*?)```|(\[[\s\S]*?\])|({[\s\S]*?})/;
        // const match = botMessage.content.match(jsonRegex);
        // console.log("Bot message content:", botMessage.content);
        // const match = correctStringToJson(botMessage.content);
        // console.log("🔍 Match:", match);
        const jobMatches = extractJsonFromText(botMessage.content);
        console.log("🔍 jobMatches:", jobMatches);
        if (jobMatches) {
          // const jsonString = match[1] || match[2] || match[3];
          // console.log("🔍 Matched JSON block string:", jsonString);

          try {
            // const cleaned = jsonString.trim().replace(/[\u201C\u201D]/g, '"');
            // console.log("🧾 Raw JSON string before parsing:\n", cleaned);
            // let jobMatches = JSON.parse(cleaned);

            // // 🧹 Normalize structure
            // if (!Array.isArray(jobMatches) && typeof jobMatches === "object") {
            //   jobMatches = [jobMatches];
            // }
            // if (!Array.isArray(jobMatches)) {
            //   jobMatches = [jobMatches];
            // }
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

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 h-[300px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">
            <strong>{msg.role === "user" ? "You" : "SkillMind"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

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
      )}

      <div className="flex gap-2">
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
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            🎯 Best Match Jobs & Courses
          </h2>
          {results.map((res, i) => (
            <ResultCard key={i} result={res} />
          ))}
        </div>
      )}
    </div>
  );
}
