import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getMaterial, getMaterialWorkListItems, getMaterialWorkListItem } from "../api/material";

type Material = components["schemas"]["Material"];

interface UseMaterialReturn {
  material: Material | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMaterial(materialId?: number): UseMaterialReturn {
  const [material, setMaterial] = useState<Material | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchMaterial(materialId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedMaterial = await getMaterial(materialId);
        setMaterial(fetchedMaterial);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch material ${materialId}:`, error);
        setErrorMessage(message);
        setMaterial(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (materialId === undefined) {
      setMaterial(null); // materialIdが未定義の場合は null を設定
      return;
    }
    fetchMaterial(materialId);
  }, [materialId]);
  return { material, isLoading, errorMessage };
}

interface UseMaterialsReturn {
  materials: Material[] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMaterials(materialIds?: number[]): UseMaterialsReturn {
  const [materials, setMaterials] = useState<Material[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchMaterials(materialIds: number[]) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedMaterials = await Promise.all(materialIds.map((id) => getMaterial(id)));
        setMaterials(fetchedMaterials);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch materials ${materialIds}:`, error);
        setErrorMessage(message);
        setMaterials(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (!materialIds) {
      setMaterials(null); // materialIdsが未定義または空の場合は null を設定
      return;
    }
    fetchMaterials(materialIds);
  }, [materialIds]);
  return {
    materials,
    isLoading,
    errorMessage,
  };
}

interface UseMaterialWorkListItemsReturn {
  workListItems: components["schemas"]["WorkListItem"][];
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMaterialWorkListItems(materialId?: number): UseMaterialWorkListItemsReturn {
  const [workListItems, setWorkListItems] = useState<components["schemas"]["WorkListItem"][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchMaterialWorkListItems(materialId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const items = await getMaterialWorkListItems(materialId);
        setWorkListItems(items);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch works for material ${materialId}:`, error);
        setErrorMessage(message);
        setWorkListItems([]); // エラー時は空の配列を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (materialId === undefined) {
      setWorkListItems([]); // materialIdが未定義の場合は空の配列を設定
      return;
    }
    fetchMaterialWorkListItems(materialId);
  }, [materialId]);
  return {
    workListItems,
    isLoading,
    errorMessage,
  };
}

export function useMaterialWorkListItem(materialId?: number, workId?: number) {
  const [workListItem, setWorkListItem] = useState<components["schemas"]["WorkListItem"] | null>(
    null
  );
  useEffect(() => {
    async function fetchMaterialWorkListItem(materialId: number, workId: number) {
      try {
        const item = await getMaterialWorkListItem(materialId, workId);
        setWorkListItem(item);
      } catch (error) {
        console.error(`Failed to fetch work ${workId} for material ${materialId}:`, error);
        setWorkListItem(null); // エラー時は null を設定
      }
    }
    if (materialId === undefined || workId === undefined) {
      setWorkListItem(null); // materialIdまたはworkIdが未定義の場合は null を設定
      return;
    }
    fetchMaterialWorkListItem(materialId, workId);
  }, [materialId, workId]);
  return workListItem;
}
