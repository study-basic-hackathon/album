import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getSeason, getSeasonWorkListItems, getSeasonWorkListItem } from "../api/season";

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
      setSeason(null); // seasonId が未定義の場合は null を設定
      return;
    }
    fetchSeason(seasonId);
  }, [seasonId]);
  return season;
}

export function useSeasonWorkListItems(seasonId?: number) {
  const [workListItems, setWorkListItems] = useState<components["schemas"]["WorkListItem"][]>([]);
  useEffect(() => {
    async function fetchSeasonWorkListItems(seasonId: number) {
      try {
        const items = await getSeasonWorkListItems(seasonId);
        setWorkListItems(items);
      } catch (error) {
        console.error(`Failed to fetch works for season ${seasonId}:`, error);
        setWorkListItems([]); // エラー時は空の配列を設定
      }
    }
    if (seasonId === undefined) {
      setWorkListItems([]); // seasonId が未定義の場合は空の配列を設定
      return;
    }
    fetchSeasonWorkListItems(seasonId);
  }, [seasonId]);
  return workListItems;
}

export function useSeasonWorkListItem(seasonId?: number, workId?: number) {
  const [workListItem, setWorkListItem] = useState<components["schemas"]["WorkListItem"] | null>(
    null
  );
  useEffect(() => {
    async function fetchSeasonWorkListItem(seasonId: number, workId: number) {
      try {
        const item = await getSeasonWorkListItem(seasonId, workId);
        setWorkListItem(item);
      } catch (error) {
        console.error(`Failed to fetch work ${workId} for season ${seasonId}:`, error);
        setWorkListItem(null); // エラー時は null を設定
      }
    }
    if (seasonId === undefined || workId === undefined) {
      setWorkListItem(null); // seasonId または workId が未定義の場合は null を設定
      return;
    }
    fetchSeasonWorkListItem(seasonId, workId);
  }, [seasonId, workId]);
  return workListItem;
}
