import { type paths } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";
import { type components } from "../types/api";

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
    async function fetchedExhibitions() {
      try {
        const fetchedExhibitions = await listExhibitions();
        setExhibitions(fetchedExhibitions);
      } catch (error) {
        console.error("Failed to fetch exhibitions:", error);
        setExhibitions({}); // エラー時は空のオブジェクトを設定
      }
    }
    fetchedExhibitions();
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

export function useExhibition(exhibitionId: number): Exhibition | null {
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  useEffect(() => {
    async function fetchedExhibition() {
      try {
        const fetchedExhibition = await getExhibition(exhibitionId);
        setExhibition(fetchedExhibition);
      } catch (error) {
        console.error(`Failed to fetch exhibition ${exhibitionId}:`, error);
        setExhibition(null); // エラー時は null を設定
      }
    }
    fetchedExhibition();
  }, [exhibitionId]);
  return exhibition;
}

export async function listExhibitionWorks(
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

export function useExhibitionWorks(exhibitionId: number): Record<number, WorkListItem> {
  const [works, setWorks] = useState<Record<number, WorkListItem>>({});
  useEffect(() => {
    async function fetchedWorks() {
      try {
        const fetchedWorks = await listExhibitionWorks(exhibitionId);
        setWorks(fetchedWorks);
      } catch (error) {
        console.error(`Failed to fetch works for exhibition ${exhibitionId}:`, error);
        setWorks([]); // エラー時は空の配列を設定
      }
    }
    fetchedWorks();
  }, [exhibitionId]);
  return works;
}
