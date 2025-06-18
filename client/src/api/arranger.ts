import { type paths } from "../types/api";
import { endpoint } from "./util";

export async function getArranger(
  arrangerId: number
): Promise<
  paths["/arrangers/{arrangerId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/arrangers/{arrangerId}").replace("{arrangerId}", String(arrangerId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch arranger with ID ${arrangerId}`);
  }
  return response.json();
}

export async function getArrangerWorkListItems(
  arrangerId: number
): Promise<
  paths["/arrangers/{arrangerId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/arrangers/{arrangerId}/works").replace(
    "{arrangerId}",
    String(arrangerId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch works for arranger with ID ${arrangerId}`);
  }

  return response.json();
}

export async function getArrangerWorkListItem(
  arrangerId: number,
  workId: number
): Promise<
  paths["/arrangers/{arrangerId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/arrangers/{arrangerId}/works/{workId}")
    .replace("{arrangerId}", String(arrangerId))
    .replace("{workId}", String(workId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch work with ID ${workId} for arranger with ID ${arrangerId}`);
  }
  return response.json();
}
