import { type paths, type components } from "../types/api";
import { endpoint } from "./util";

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
