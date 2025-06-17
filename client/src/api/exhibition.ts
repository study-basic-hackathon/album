import { type paths, type components } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";

type Exhibition = components["schemas"]["Exhibition"];
type WorkListItem = components["schemas"]["WorkListItem"];

export async function listExhibitions(): Promise<
  paths["/exhibitions"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const response = await fetch(endpoint("/exhibitions"));
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return response.json();
}

export function useExhibitions(): Record<number, Exhibition> {
  const [exhibitions, setExhibitions] = useState<Record<number, Exhibition>>({});
  useEffect(() => {
    async function fetchExhibitions() {
      try {
        const fetchedExhibitions = await listExhibitions();
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

export async function getExhibition(
  exhibitionId: number
): Promise<
  paths["/exhibitions/{exhibitionId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/exhibitions/{exhibitionId}").replace(
    "{exhibitionId}",
    String(exhibitionId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch exhibition with ID ${exhibitionId}`);
  }
  return response.json();
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
      setExhibition(null); // exhibitionIdが未定義の場合は null を設定
      return;
    }
    fetchExhibition(exhibitionId);
  }, [exhibitionId]);
  return exhibition;
}

export async function listExhibitionWorkListItems(
  exhibitionId: number
): Promise<
  paths["/exhibitions/{exhibitionId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint(`/exhibitions/{exhibitionId}/works`).replace(
    "{exhibitionId}",
    String(exhibitionId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch works for exhibition with ID ${exhibitionId}`);
  }
  return response.json();
}

export function useExhibitionWorkListItems(exhibitionId?: number): Record<number, WorkListItem> {
  const [workListItems, setWorkListItems] = useState<Record<number, WorkListItem>>({});
  useEffect(() => {
    async function fetchExhibitionWorkListItems(exhibitionId: number) {
      try {
        const fetchedWorkListItems = await listExhibitionWorkListItems(exhibitionId);
        setWorkListItems(fetchedWorkListItems);
      } catch (error) {
        console.error(`Failed to fetch works for exhibition ${exhibitionId}:`, error);
        setWorkListItems([]); // エラー時は空の配列を設定
      }
    }
    if (exhibitionId === undefined) {
      setWorkListItems({}); // exhibitionIdが未定義の場合は空のオブジェクトを設定
      return;
    }
    fetchExhibitionWorkListItems(exhibitionId);
  }, [exhibitionId]);
  return workListItems;
}

export async function getExhibitionWorkListItem(
  exhibitionId: number,
  workId: number
): Promise<
  paths["/exhibitions/{exhibitionId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint(`/exhibitions/{exhibitionId}/works/{workId}`)
    .replace("{exhibitionId}", String(exhibitionId))
    .replace("{workId}", String(workId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch work with ID ${workId} for exhibition ${exhibitionId}`);
  }
  return response.json();
}

export function useExhibitionWorkListItem(exhibitionId?: number, workId?: number): WorkListItem | null {
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
