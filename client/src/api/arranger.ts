import { type paths, type components } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";

type Arranger = components["schemas"]["Arranger"];

export async function getArranger(
  arrangerId: number
): Promise<
  paths["/arrangers/{arrangerId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/arrangers/{arrangerId}").replace("{arrangerId}", String(arrangerId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch arranger with ID ${arrangerId}`);
  }
  return response.json();
}

export function useArranger(arrangerId?: number): Arranger | null {
  const [arranger, setArranger] = useState<Arranger | null>(null);
  useEffect(() => {
    async function fetchArranger(arrangerId: number) {
      try {
        const fetchedArranger = await getArranger(arrangerId);
        setArranger(fetchedArranger);
      } catch (error) {
        console.error(`Failed to fetch arranger ${arrangerId}:`, error);
        setArranger(null); // エラー時は null を設定
      }
    }
    if (arrangerId === undefined) {
      setArranger(null); // arrangerIdが未定義の場合は null を設定
      return;
    }
    fetchArranger(arrangerId);
  }, [arrangerId]);
  return arranger;
}
