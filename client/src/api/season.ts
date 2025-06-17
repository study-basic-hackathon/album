import { type paths, type components } from "../types/api";
import { endpoint } from "./util";

export async function getSeason(
  seasonId: number
): Promise<paths["/seasons/{seasonId}"]["get"]["responses"]["200"]["content"]["application/json"]> {
  const path = endpoint("/seasons/{seasonId}").replace("{seasonId}", String(seasonId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch season with ID ${seasonId}`);
  }
  return response.json();
}
