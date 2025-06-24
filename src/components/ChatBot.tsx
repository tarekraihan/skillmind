"use client";
import * as React from "react";

export default function ChatBot() {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const API_URL = "/api/gpt";

  React.useEffect(() => {
    if (messages.length === 0) {
      const welcome = {
        role: "assistant",
        content:
          "👋 Welcome to SkillMind!\n\nA. I enjoy trying new things\nB. I prefer familiar routines\nC. I’m a mix of both",
      };
      setMessages([welcome]);
      setOptions([
        "A. I enjoy trying new things",
        "B. I prefer familiar routines",
        "C. I’m a mix of both",
      ]);
    }
  }, []);

  const handleSend = async (msg: string) => {
    const userMessage = { role: "user", content: msg };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setOptions([]);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || "No response.";

      const newOptions = botReply
        .split("\n")
        .filter((line: string) => /^[A-C]\./.test(line.trim()));

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: botReply },
      ]);
      setOptions(newOptions);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "⚠️ Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <div className="h-64 overflow-y-auto space-y-2 border rounded p-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
      </div>

      {options.map((opt, i) => (
        <button
          key={i}
          className="w-full text-left px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
          onClick={() => handleSend(opt)}
        >
          {opt}
        </button>
      ))}

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer..."
        />
        <button
          onClick={() => handleSend(input)}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
