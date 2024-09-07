import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export enum ChallengeFilter {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced"
}

export interface ChallengeVisibleTestCaseProps {
  input?: Record<string, any>;
  expected: string;
  received: string;
  result: boolean;
}

export interface ChallengeTestCaseProps {
  position: number,
  inputs: string,
  expectedOutput: string,
  receivedOutput: string,
  result: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastSevenDays() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const lastSevenDays = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayName = daysOfWeek[date.getDay()];
    lastSevenDays.push(dayName);
  }

  return lastSevenDays.reverse();
}

export async function getLeaderboardUsersData() {

  const response = await fetch('/api/getLeaderboardUsersData');
  const json = await response.json();

  const formattedJson = json.sort((a: any, b: any) => parseFloat(b.points) - parseFloat(a.points));

  return formattedJson;
}

export function codeEditorTheme(monaco: any) {
  monaco.editor.defineTheme("moon", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "D4D4D4" },
      { token: "keyword", foreground: "569CD6" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "9CDCFE" },
      { token: "comment", foreground: "6A9955" },
      { token: "delimiter", foreground: "B8D7A3" },
      { token: "variable", foreground: "DCDCAA" },
      { token: "type", foreground: "4EC9B0" },
      { token: "constant", foreground: "B5CEA8" },
      { token: "property", foreground: "D4D4D4" },
      { token: "method", foreground: "9CDCFE" },
      { token: "builtin", foreground: "D4D4D4" },
      { token: "attribute", foreground: "DCDCAA" },
      { token: "operator", foreground: "B5CEA8" },
      { token: "function", foreground: "D8A3FF" },
    ],
    colors: {
      "editor.background": "#020817",
      "editorCursor.foreground": "#569CD6",
      "editor.lineHighlightBackground": "#00000000",
      "editorBracketMatch.background": "#00000000",
      "editorBracketMatch.border": "#00000000",
      "editorLineNumber.foreground": "#858585",
      "editorLineNumber.activeForeground": "#FFFFFF",
      "editor.lineHighlightBorder": "#00000000",
      "editorOverviewRuler.border": "#00000000",
    },
  });
}