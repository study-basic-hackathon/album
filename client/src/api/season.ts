import { type paths } from "../types/api";
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

export async function getSeasonWorkListItems(
  seasonId: number
): Promise<
  paths["/seasons/{seasonId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/seasons/{seasonId}/works").replace("{seasonId}", String(seasonId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch works for season with ID ${seasonId}`);
  }
  return response.json();
}

export async function getSeasonWorkListItem(
  seasonId: number,
  workId: number
): Promise<
  paths["/seasons/{seasonId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/seasons/{seasonId}/works/{workId}")
    .replace("{seasonId}", String(seasonId))
    .replace("{workId}", String(workId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch work with ID ${workId} for season with ID ${seasonId}`);
  }
  return response.json();
}
