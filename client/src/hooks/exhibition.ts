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

export function useExhibitions(): Record<number, Exhibition> {
  const [exhibitions, setExhibitions] = useState<Record<number, Exhibition>>({});
  useEffect(() => {
    async function fetchExhibitions() {
      try {
        const fetchedExhibitions = await getExhibitions();
        setExhibitions(fetchedExhibitions);
      } catch (error) {
        console.error("Failed to fetch exhibitions:", error);
        setExhibitions({}); // エラー時は空のオブジェクトを設定
      }
    }
    fetchExhibitions();
  }, []);
  return exhibitions;
}

export function useExhibition(exhibitionId?: number): Exhibition | null {
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  useEffect(() => {
    async function fetchExhibition(exhibitionId: number) {
      try {
        const fetchedExhibition = await getExhibition(exhibitionId);
        setExhibition(fetchedExhibition);
      } catch (error) {
        console.error(`Failed to fetch exhibition ${exhibitionId}:`, error);
        setExhibition(null); // エラー時は null を設定
      }
    }
    if (exhibitionId === undefined) {
      setExhibition(null); // exhibitionId が未定義の場合は null を設定
      return;
    }
    fetchExhibition(exhibitionId);
  }, [exhibitionId]);
  return exhibition;
}

export function useExhibitionWorkListItems(exhibitionId?: number): Record<number, WorkListItem> {
  const [workListItems, setWorkListItems] = useState<Record<number, WorkListItem>>({});
  useEffect(() => {
    async function fetchExhibitionWorkListItems(exhibitionId: number) {
      try {
        const fetchedWorkListItems = await getExhibitionWorkListItems(exhibitionId);
        setWorkListItems(fetchedWorkListItems);
      } catch (error) {
        console.error(`Failed to fetch works for exhibition ${exhibitionId}:`, error);
        setWorkListItems({}); // エラー時は空の配列を設定
      }
    }
    if (exhibitionId === undefined) {
      setWorkListItems({}); // exhibitionId が未定義の場合は空のオブジェクトを設定
      return;
    }
    fetchExhibitionWorkListItems(exhibitionId);
  }, [exhibitionId]);
  return workListItems;
}

export function useExhibitionWorkListItem(
  exhibitionId?: number,
  workId?: number
): WorkListItem | null {
  const [workListItem, setWorkListItem] = useState<WorkListItem | null>(null);
  useEffect(() => {
    async function fetchExhibitionWorkListItem(exhibitionId: number, workId: number) {
      try {
        const fetchedWorkListItem = await getExhibitionWorkListItem(exhibitionId, workId);
        setWorkListItem(fetchedWorkListItem);
      } catch (error) {
        console.error(`Failed to fetch work ${workId} for exhibition ${exhibitionId}:`, error);
        setWorkListItem(null); // エラー時は null を設定
      }
    }
    if (exhibitionId === undefined || workId === undefined) {
      setWorkListItem(null); // exhibitionId または workId が未定義の場合は null を設定
      return;
    }
    fetchExhibitionWorkListItem(exhibitionId, workId);
  }, [exhibitionId, workId]);
  return workListItem;
}
