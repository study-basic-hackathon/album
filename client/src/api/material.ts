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

export function useMaterial(materialId: number): Material | null {
  const [material, setMaterial] = useState<Material | null>(null);
  useEffect(() => {
    async function fetchedMaterial() {
      try {
        const fetchedMaterial = await getMaterial(materialId);
        setMaterial(fetchedMaterial);
      } catch (error) {
        console.error(`Failed to fetch material ${materialId}:`, error);
        setMaterial(null); // エラー時は null を設定
      }
    }
    fetchedMaterial();
  }, [materialId]);
  return material;
}
