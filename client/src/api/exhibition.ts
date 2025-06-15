import { type paths } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";
import { type components } from "../types/api";

type Exhibition = components["schemas"]["Exhibition"];

export async function listExihibitions(): Promise<
  paths["/exhibitions"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const response = await fetch(endpoint("/exhibitions"));
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return response.json();
}

export function getExhibitions(): Record<number, Exhibition> {
  const [exhibitions, setExhibitions] = useState<Record<number, Exhibition>>({});
  useEffect(() => {
    async function fetchedExhibitions() {
      try {
        const fetchedExhibitions = await listExihibitions();
        setExhibitions(fetchedExhibitions);
      } catch (error) {
        console.error("Failed to fetch exhibitions:", error);
        setExhibitions({}); // エラー時は空のオブジェクトを設定
      }
    }
    fetchedExhibitions();
  }, []);
  return exhibitions;
}
