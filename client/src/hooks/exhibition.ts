import { type components } from "../types/api";
import { useState, useEffect } from "react";
import {
  getExhibitions,
  getExhibition,
  getExhibitionWorkListItems,
  getExhibitionWorkListItem,
} from "../api/exhibition";

type Exhibition = components["schemas"]["Exhibition"];
type WorkListItem = components["schemas"]["WorkListItem"];

interface UseExhibitionsReturn {
  exhibitions: Record<number, Exhibition>;
  isLoading: boolean;
  errorMessage: string | null;
  refetch: () => void; // この API が特にデータ取得に失敗する確率が高いので、再取得のための refetch 関数を追加
}

export function useExhibitions(): UseExhibitionsReturn {
  const [exhibitions, setExhibitions] = useState<Record<number, Exhibition>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchExhibitions = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const fetchedExhibitions = await getExhibitions();
      setExhibitions(fetchedExhibitions);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Failed to fetch exhibitions:", error);
      setErrorMessage(message);
      setExhibitions({}); // エラー時は空のオブジェクトを設定
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchExhibitions();
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  return { exhibitions, isLoading, errorMessage, refetch };
}

interface UseExhibitionReturn {
  exhibition: Exhibition | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useExhibition(exhibitionId?: number): UseExhibitionReturn {
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchExhibition(exhibitionId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedExhibition = await getExhibition(exhibitionId);
        setExhibition(fetchedExhibition);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch exhibition ${exhibitionId}:`, error);
        setErrorMessage(message);
        setExhibition(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (exhibitionId === undefined) {
      setExhibition(null); // exhibitionId が未定義の場合は null を設定
      return;
    }
    fetchExhibition(exhibitionId);
  }, [exhibitionId]);
  return {
    exhibition,
    isLoading,
    errorMessage,
  };
}

interface ExhibitionWorkListItemsReturn {
  workListItems: Record<number, WorkListItem>;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useExhibitionWorkListItems(exhibitionId?: number): ExhibitionWorkListItemsReturn {
  const [workListItems, setWorkListItems] = useState<Record<number, WorkListItem>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchExhibitionWorkListItems(exhibitionId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedWorkListItems = await getExhibitionWorkListItems(exhibitionId);
        setWorkListItems(fetchedWorkListItems);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch works for exhibition ${exhibitionId}:`, error);
        setErrorMessage(message);
        setWorkListItems({}); // エラー時は空の配列を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (exhibitionId === undefined) {
      setWorkListItems({}); // exhibitionId が未定義の場合は空のオブジェクトを設定
      return;
    }
    fetchExhibitionWorkListItems(exhibitionId);
  }, [exhibitionId]);
  return {
    workListItems,
    isLoading,
    errorMessage,
  };
}

interface UseExhibitionWorkListItemReturn {
  workListItem: WorkListItem | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useExhibitionWorkListItem(
  exhibitionId?: number,
  workId?: number
): UseExhibitionWorkListItemReturn {
  const [workListItem, setWorkListItem] = useState<WorkListItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchExhibitionWorkListItem(exhibitionId: number, workId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedWorkListItem = await getExhibitionWorkListItem(exhibitionId, workId);
        setWorkListItem(fetchedWorkListItem);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch work ${workId} for exhibition ${exhibitionId}:`, error);
        setErrorMessage(message);
        setWorkListItem(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (exhibitionId === undefined || workId === undefined) {
      setWorkListItem(null); // exhibitionId または workId が未定義の場合は null を設定
      return;
    }
    fetchExhibitionWorkListItem(exhibitionId, workId);
  }, [exhibitionId, workId]);
  return {
    workListItem,
    isLoading,
    errorMessage,
  };
}
