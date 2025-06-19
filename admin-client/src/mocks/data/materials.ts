import { type components } from "../../types/api";

type Material = components["schemas"]["Material"];

export const materials: Record<number, Material> = {
  1: {
    id: 1,
    name: "菊",
  },
  2: {
    id: 2,
    name: "バラ",
  },
  3: {
    id: 3,
    name: "ユリ",
  },
  4: {
    id: 4,
    name: "アジサイ",
  },
  5: {
    id: 5,
    name: "ヒマワリ",
  },
  6: {
    id: 6,
    name: "チューリップ",
  },
  7: {
    id: 7,
    name: "カーネーション",
  },
  8: {
    id: 8,
    name: "スイートピー",
  },
  9: {
    id: 9,
    name: "ダリア",
  },
  10: {
    id: 10,
    name: "コスモス",
  },
  11: {
    id: 11,
    name: "パンジー",
  },
  12: {
    id: 12,
    name: "ラベンダー",
  },
  13: {
    id: 13,
    name: "アイリス",
  },
};
