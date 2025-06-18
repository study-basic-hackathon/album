import { type paths, type components } from "../types/api";
import { endpoint } from "./util";

type Category = components["schemas"]["Category"];

export async function getCategory(
  categoryId: number
): Promise<
  paths["/categories/{categoryId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/categories/{categoryId}").replace("{categoryId}", String(categoryId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch category with ID ${categoryId}`);
  }
  return response.json();
}

export async function getCategoryWorkListItems(
  categoryId: number
): Promise<
  paths["/categories/{categoryId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/categories/{categoryId}/works").replace(
    "{categoryId}",
    String(categoryId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch works for category with ID ${categoryId}`);
  }
  return response.json();
}

export async function getCategoryWorkListItem(
  categoryId: number,
  workId: number
): Promise<
  paths["/categories/{categoryId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/categories/{categoryId}/works/{workId}")
    .replace("{categoryId}", String(categoryId))
    .replace("{workId}", String(workId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch work with ID ${workId} for category with ID ${categoryId}`);
  }
  return response.json();
}
