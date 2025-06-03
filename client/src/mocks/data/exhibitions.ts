import { type components } from "../../types/api";

type Exhibition = components["schemas"]["Exhibition"];

export const exhibitions: Record<number, Exhibition> = {
  1: {
    id: 1,
    name: "大阪いけばな展",
    started_date: "2023-10-01",
    ended_date: "2023-10-31",
  },
  2: {
    id: 2,
    name: "東京いけばな展",
    started_date: "2023-11-01",
    ended_date: "2023-11-30",
  },
  3: {
    id: 3,
    name: "京都いけばな展",
    started_date: "2023-12-01",
    ended_date: "2023-12-31",
  },
  4: {
    id: 4,
    name: "福岡いけばな展",
    started_date: "2024-01-01",
    ended_date: "2024-01-31",
  },
  5: {
    id: 5,
    name: "札幌いけばな展",
    started_date: "2024-02-01",
    ended_date: "2024-02-28",
  },
};
