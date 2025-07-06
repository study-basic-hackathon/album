import { type paths } from "../types/api";
import { endpoint } from "./util";

export async function getCategory(
  categoryId: number
): Promise<
  paths["/categories/{categoryId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/categories/{categoryId}").replace("{categoryId}", String(categoryId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`カテゴリID ${categoryId} の情報取得に失敗しました。`);
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
    throw new Error(`カテゴリID ${categoryId} の作品一覧取得に失敗しました。`);
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
    throw new Error(`カテゴリID ${categoryId} の作品ID ${workId} の情報取得に失敗しました。`);
  }
  return response.json();
}
