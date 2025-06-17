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
