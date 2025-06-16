import { type paths, type components } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";

type Season = components["schemas"]["Season"];

export async function getSeason(
  seasonId: number
): Promise<paths["/seasons/{seasonId}"]["get"]["responses"]["200"]["content"]["application/json"]> {
  const path = endpoint("/seasons/{seasonId}").replace("{seasonId}", String(seasonId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch season with ID ${seasonId}`);
  }
  return response.json();
}

export function useSeason(seasonId: number): Season | null {
  const [season, setSeason] = useState<Season | null>(null);
  useEffect(() => {
    async function fetchedSeason() {
      try {
        const fetchedSeason = await getSeason(seasonId);
        setSeason(fetchedSeason);
      } catch (error) {
        console.error(`Failed to fetch season ${seasonId}:`, error);
        setSeason(null); // エラー時は null を設定
      }
    }
    fetchedSeason();
  }, [seasonId]);
  return season;
}
