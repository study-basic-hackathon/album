import { type paths } from "../types/api";
import { endpoint } from "./util";

export async function getMaterial(
  materialId: number
): Promise<
  paths["/materials/{materialId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/materials/{materialId}").replace("{materialId}", String(materialId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`花材ID ${materialId} の情報取得に失敗しました。`);
  }
  return response.json();
}

export async function getMaterialWorkListItems(
  materialId: number
): Promise<
  paths["/materials/{materialId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/materials/{materialId}/works").replace(
    "{materialId}",
    String(materialId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`花材ID ${materialId} の作品一覧取得に失敗しました。`);
  }
  return response.json();
}

export async function getMaterialWorkListItem(
  materialId: number,
  workId: number
): Promise<
  paths["/materials/{materialId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/materials/{materialId}/works/{workId}")
    .replace("{materialId}", String(materialId))
    .replace("{workId}", String(workId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`花材ID ${materialId} の作品ID ${workId} の情報取得に失敗しました。`);
  }
  return response.json();
}
