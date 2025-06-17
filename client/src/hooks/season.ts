import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getSeason } from "../api/season";

type Season = components["schemas"]["Season"];

export function useSeason(seasonId?: number): Season | null {
  const [season, setSeason] = useState<Season | null>(null);
  useEffect(() => {
    async function fetchSeason(seasonId: number) {
      try {
        const fetchedSeason = await getSeason(seasonId);
        setSeason(fetchedSeason);
      } catch (error) {
        console.error(`Failed to fetch season ${seasonId}:`, error);
        setSeason(null); // エラー時は null を設定
      }
    }
    if (seasonId === undefined) {
      setSeason(null); // seasonIdが未定義の場合は null を設定
      return;
    }
    fetchSeason(seasonId);
  }, [seasonId]);
  return season;
}
