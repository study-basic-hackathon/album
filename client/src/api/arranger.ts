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
    throw new Error(`作者ID ${arrangerId} の情報取得に失敗しました。`);
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
    throw new Error(`作者ID ${arrangerId} の作品一覧取得に失敗しました。`);
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
    throw new Error(`作者ID ${arrangerId} の作品ID ${workId} の情報取得に失敗しました。`);
  }
  return response.json();
}
