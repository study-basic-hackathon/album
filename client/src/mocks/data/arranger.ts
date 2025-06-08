import { type components } from "../../types/api";

type Arranger = components["schemas"]["Arranger"];

export const arrangers: Record<number, Arranger> = {
  1: {
    id: 1,
    name: "山田 太郎",
  },
  2: {
    id: 2,
    name: "佐藤 花子",
  },
  3: {
    id: 3,
    name: "鈴木 次郎",
  },
  4: {
    id: 4,
    name: "田中 美咲",
  },
};
