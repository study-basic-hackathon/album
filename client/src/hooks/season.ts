import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getSeason, getSeasonWorkListItems, getSeasonWorkListItem } from "../api/season";

type Season = components["schemas"]["Season"];

interface UseSeasonReturn {
  season: Season | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useSeason(seasonId?: number): UseSeasonReturn {
  const [season, setSeason] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchSeason(seasonId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedSeason = await getSeason(seasonId);
        setSeason(fetchedSeason);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch season ${seasonId}:`, error);
        setErrorMessage(message);
        setSeason(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (seasonId === undefined) {
      setSeason(null); // seasonId が未定義の場合は null を設定
      return;
    }
    fetchSeason(seasonId);
  }, [seasonId]);
  return { season, isLoading, errorMessage };
}

interface UseSeasonWorkListItemsReturn {
  workListItems: components["schemas"]["WorkListItem"][];
  isLoading: boolean;
  errorMessage: string | null;
}

export function useSeasonWorkListItems(seasonId?: number): UseSeasonWorkListItemsReturn {
  const [workListItems, setWorkListItems] = useState<components["schemas"]["WorkListItem"][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchSeasonWorkListItems(seasonId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const items = await getSeasonWorkListItems(seasonId);
        setWorkListItems(items);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch works for season ${seasonId}:`, error);
        setErrorMessage(message);
        setWorkListItems([]); // エラー時は空の配列を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (seasonId === undefined) {
      setWorkListItems([]); // seasonId が未定義の場合は空の配列を設定
      return;
    }
    fetchSeasonWorkListItems(seasonId);
  }, [seasonId]);
  return {
    workListItems,
    isLoading,
    errorMessage,
  };
}

interface UseSeasonWorkListItemReturn {
  workListItem: components["schemas"]["WorkListItem"] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useSeasonWorkListItem(
  seasonId?: number,
  workId?: number
): UseSeasonWorkListItemReturn {
  const [workListItem, setWorkListItem] = useState<components["schemas"]["WorkListItem"] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchSeasonWorkListItem(seasonId: number, workId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const item = await getSeasonWorkListItem(seasonId, workId);
        setWorkListItem(item);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch work ${workId} for season ${seasonId}:`, error);
        setErrorMessage(message);
        setWorkListItem(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (seasonId === undefined || workId === undefined) {
      setWorkListItem(null); // seasonId または workId が未定義の場合は null を設定
      return;
    }
    fetchSeasonWorkListItem(seasonId, workId);
  }, [seasonId, workId]);
  return {
    workListItem,
    isLoading,
    errorMessage,
  };
}
