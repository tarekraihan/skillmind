import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface JobMatch {
  job_id: string;
  match_score: number;
  why_fit: string;
  what_you_do: string;
  labels: string[];
}

interface CourseMapping {
  job_id: string;
  College: string;
  Program: string;
  Duration: string;
  Link: string;
  Description: string;
  "Job Title": string;
}
type FormattedMatch = {
  jobId: string;
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

// Read CSV file from public folder
async function readCSV(): Promise<CourseMapping[]> {
  const csvPath = path.join(
    process.cwd(),
    "public",
    "Exploded_Job-Course_Mapping_with_job_id.csv"
  );
  return new Promise((resolve, reject) => {
    const results: CourseMapping[] = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", data => results.push(data))
      .on("end", () => resolve(results))
      .on("error", err => reject(err));
  });
}
function attachCsvMatchToRequest(
  request: JobMatch[],
  csvData: CourseMapping[]
): FormattedMatch[] {
  return request.map(req => {
    const matchedCsv = csvData.find(item => item.job_id === req.job_id);

    const match = matchedCsv
      ? {
          college: matchedCsv.College || "",
          program: matchedCsv.Program || "",
          duration: matchedCsv.Duration || "",
          link: matchedCsv.Link || "",
          description: matchedCsv.Description || "",
        }
      : {
          college: "",
          program: "",
          duration: "",
          link: "",
          description: "",
        };

    return {
      jobId: req.job_id,
      jobTitle: matchedCsv?.["Job Title"] || "",
      matchScore: req.match_score,
      whyFit: req.why_fit,
      whatYouDo: req.what_you_do,
      labels: req.labels,
      match,
    };
  });
}

export async function POST(req: Request) {
  console.log("🧪 Received req:", req);

  try {
    const body = await req.json();
    console.log("🧪 Received body:", body);
    const jobMatches = body;

    if (!Array.isArray(jobMatches)) {
      return NextResponse.json(
        { error: "Invalid jobMatches format" },
        { status: 400 }
      );
    }

    const csvData = await readCSV();
    //console.log("🧪 CSV data:", csvData);
    const attachedCsvMatch = attachCsvMatchToRequest(jobMatches, csvData);
    console.log("🧪 Attached CSV match:", attachedCsvMatch);

    // const mergedResults = jobMatches
    //   .filter((job: any) => job?.job_id)
    //   .map((job: JobMatch) => {
    //     const match = csvData.find(row => row.job_id === job.job_id);
    //     console.log("🧪 Match:", match);
    //     return {
    //       jobTitle: job.job_id
    //         .split("-")
    //         .map(word => word[0].toUpperCase() + word.slice(1))
    //         .join(" "),
    //       matchScore: job.match_score,
    //       whyFit: job.why_fit,
    //       whatYouDo: job.what_you_do,
    //       labels: job.labels,
    //       course: match
    //         ? {
    //             college: match.college,
    //             course: match.course,
    //             duration: match.duration,
    //             link: match.link,
    //           }
    //         : null,
    //     };
    //   });

    return NextResponse.json({ results: attachedCsvMatch });
  } catch (error) {
    console.error("❌ API /match error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
