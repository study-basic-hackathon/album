import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getArranger, getArrangerWorkListItems, getArrangerWorkListItem } from "../api/arranger";

type Arranger = components["schemas"]["Arranger"];
type WorkListItem = components["schemas"]["WorkListItem"];

interface UseArrangerReturn {
  arranger: Arranger | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useArranger(arrangerId?: number): UseArrangerReturn {
  const [arranger, setArranger] = useState<Arranger | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchArranger(arrangerId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedArranger = await getArranger(arrangerId);
        setArranger(fetchedArranger);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch arranger ${arrangerId}:`, error);
        setErrorMessage(message);
        setArranger(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (arrangerId === undefined) {
      setArranger(null); // arrangerIdが未定義の場合は null を設定
      return;
    }
    fetchArranger(arrangerId);
  }, [arrangerId]);
  return { arranger, isLoading, errorMessage };
}

interface UseArrangerWorkListItemsReturn {
  workListItems: Record<number, WorkListItem>;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useArrangerWorkListItems(arrangerId?: number): UseArrangerWorkListItemsReturn {
  const [workListItems, setWorkListItems] = useState<Record<number, WorkListItem>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchArrangerWorkListItems(arrangerId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedWorkListItems = await getArrangerWorkListItems(arrangerId);
        setWorkListItems(fetchedWorkListItems);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch works for arranger ${arrangerId}:`, error);
        setErrorMessage(message);
        setWorkListItems({}); // エラー時は空のオブジェクトを設定
      } finally {
        setIsLoading(false);
      }
    }
    if (arrangerId === undefined) {
      setWorkListItems({}); // arrangerIdが未定義の場合は空のオブジェクトを設定
      return;
    }
    fetchArrangerWorkListItems(arrangerId);
  }, [arrangerId]);
  return {
    workListItems,
    isLoading,
    errorMessage,
  };
}

interface UseArrangerWorkListItemReturn {
  workListItem: WorkListItem | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useArrangerWorkListItem(
  arrangerId?: number,
  workId?: number
): UseArrangerWorkListItemReturn {
  const [workListItem, setWorkListItem] = useState<WorkListItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchArrangerWorkListItem(arrangerId: number, workId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedWorkListItem = await getArrangerWorkListItem(arrangerId, workId);
        setWorkListItem(fetchedWorkListItem);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch work ${workId} for arranger ${arrangerId}:`, error);
        setErrorMessage(message);
        setWorkListItem(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (arrangerId === undefined || workId === undefined) {
      setWorkListItem(null); // arrangerId または workId が未定義の場合は null を設定
      return;
    }
    fetchArrangerWorkListItem(arrangerId, workId);
  }, [arrangerId, workId]);
  return {
    workListItem,
    isLoading,
    errorMessage,
  };
}
