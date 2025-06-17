import { type paths, type components } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";

type Material = components["schemas"]["Material"];

export async function getMaterial(
  materialId: number
): Promise<
  paths["/materials/{materialId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/materials/{materialId}").replace("{materialId}", String(materialId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch material with ID ${materialId}`);
  }
  return response.json();
}

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
