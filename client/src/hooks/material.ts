import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getMaterial, getMaterialWorkListItems, getMaterialWorkListItem } from "../api/material";

type Material = components["schemas"]["Material"];

export function useMaterial(materialId?: number): Material | null {
  const [material, setMaterial] = useState<Material | null>(null);
  useEffect(() => {
    async function fetchMaterial(materialId: number) {
      try {
        const fetchedMaterial = await getMaterial(materialId);
        setMaterial(fetchedMaterial);
      } catch (error) {
        console.error(`Failed to fetch material ${materialId}:`, error);
        setMaterial(null); // エラー時は null を設定
      }
    }
    if (materialId === undefined) {
      setMaterial(null); // materialIdが未定義の場合は null を設定
      return;
    }
    fetchMaterial(materialId);
  }, [materialId]);
  return material;
}

export function useMaterials(materialIds?: number[]): Material[] | null {
  const [materials, setMaterials] = useState<Material[] | null>([]);
  useEffect(() => {
    async function fetchMaterials(materialIds: number[]) {
      try {
        const fetchedMaterials = await Promise.all(materialIds.map((id) => getMaterial(id)));
        setMaterials(fetchedMaterials);
      } catch (error) {
        console.error(`Failed to fetch materials ${materialIds}:`, error);
        setMaterials(null); // エラー時は null を設定
      }
    }
    if (!materialIds) {
      setMaterials(null); // materialIdsが未定義または空の場合は null を設定
      return;
    }
    fetchMaterials(materialIds);
  }, [materialIds]);
  return materials;
}

export function useMaterialWorkListItems(materialId?: number) {
  const [workListItems, setWorkListItems] = useState<components["schemas"]["WorkListItem"][]>([]);
  useEffect(() => {
    async function fetchMaterialWorkListItems(materialId: number) {
      try {
        const items = await getMaterialWorkListItems(materialId);
        setWorkListItems(items);
      } catch (error) {
        console.error(`Failed to fetch works for material ${materialId}:`, error);
        setWorkListItems([]); // エラー時は空の配列を設定
      }
    }
    if (materialId === undefined) {
      setWorkListItems([]); // materialIdが未定義の場合は空の配列を設定
      return;
    }
    fetchMaterialWorkListItems(materialId);
  }, [materialId]);
  return workListItems;
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
