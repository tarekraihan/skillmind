"use client";

import * as React from "react";
import { GraduationCap } from "lucide-react";

interface ResultProps {
  result: {
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
  };
}

export default function ResultCard({ result }: ResultProps) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-100 p-2 rounded-full">
            <GraduationCap size={18} className="text-emerald-700" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">{result.jobTitle}</h2>
        </div>
        <span className="bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full">
          {result.matchScore}% Match
        </span>
      </div>

      <div className="mt-4">
        <p className="text-yellow-700 font-semibold mb-1">📌 Why This Job:</p>
        <p>{result.whyFit}</p>
      </div>

      {/* <div className="mt-4">
        <p className="text-gray-800 font-semibold mb-1">🛠 What You'll Do:</p>
        <p>{result.whatYouDo}</p>
      </div> */}

      <div className="flex flex-wrap gap-2 mt-4">
        {result.labels.map((label, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 border border-gray-300 px-3 py-1 rounded-full"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-6">
        <p className="text-blue-700 font-semibold mb-1">
          🎓 Recommended Training:
        </p>
        <p className="font-bold text-gray-800">{result.match.college}</p>
        <p className="text-sm text-gray-700">{result.match.program}</p>
        <p className="text-xs text-gray-500">
          Duration: {result.match.duration}
        </p>
        <a
          href={result.match.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3"
        >
          <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700">
            View Course
          </button>
        </a>
      </div>
    </div>
  );
}
