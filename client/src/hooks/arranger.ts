import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getArranger, getArrangerWorkListItems, getArrangerWorkListItem } from "../api/arranger";

type Arranger = components["schemas"]["Arranger"];
type WorkListItem = components["schemas"]["WorkListItem"];

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

export function useArrangerWorkListItems(arrangerId?: number): Record<number, WorkListItem> {
  const [workListItems, setWorkListItems] = useState<Record<number, WorkListItem>>({});
  useEffect(() => {
    async function fetchArrangerWorkListItems(arrangerId: number) {
      try {
        const fetchedWorkListItems = await getArrangerWorkListItems(arrangerId);
        setWorkListItems(fetchedWorkListItems);
      } catch (error) {
        console.error(`Failed to fetch works for arranger ${arrangerId}:`, error);
        setWorkListItems({}); // エラー時は空のオブジェクトを設定
      }
    }
    if (arrangerId === undefined) {
      setWorkListItems({}); // arrangerIdが未定義の場合は空のオブジェクトを設定
      return;
    }
    fetchArrangerWorkListItems(arrangerId);
  }, [arrangerId]);
  return workListItems;
}

export function useArrangerWorkListItem(arrangerId?: number, workId?: number): WorkListItem | null {
  const [workListItem, setWorkListItem] = useState<WorkListItem | null>(null);
  useEffect(() => {
    async function fetchArrangerWorkListItem(arrangerId: number, workId: number) {
      try {
        const fetchedWorkListItem = await getArrangerWorkListItem(arrangerId, workId);
        setWorkListItem(fetchedWorkListItem);
      } catch (error) {
        console.error(`Failed to fetch work ${workId} for arranger ${arrangerId}:`, error);
        setWorkListItem(null); // エラー時は null を設定
      }
    }
    if (arrangerId === undefined || workId === undefined) {
      setWorkListItem(null); // arrangerId または workId が未定義の場合は null を設定
      return;
    }
    fetchArrangerWorkListItem(arrangerId, workId);
  }, [arrangerId, workId]);
  return workListItem;
}
