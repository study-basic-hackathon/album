import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getMaterial } from "../api/material";

type Material = components["schemas"]["Material"];

export function useMaterials(materialIds?: number[]): Material[] | null {
  const [materials, setMaterials] = useState<Material[] | null>([]);
  useEffect(() => {
    async function fetchMaterials(materialIds: number[]) {
      try {
        const fetchedMaterials = await  Promise.all(
          materialIds.map((id) => getMaterial(id))
        );
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
