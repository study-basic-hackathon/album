import { type paths } from "../types/api";
import { endpoint } from "./util";

export async function getExhibitions(): Promise<
  paths["/exhibitions"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const response = await fetch(endpoint("/exhibitions"));
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return response.json();
}

export async function getExhibition(
  exhibitionId: number
): Promise<
  paths["/exhibitions/{exhibitionId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/exhibitions/{exhibitionId}").replace(
    "{exhibitionId}",
    String(exhibitionId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch exhibition with ID ${exhibitionId}`);
  }
  return response.json();
}

export async function getExhibitionWorkListItems(
  exhibitionId: number
): Promise<
  paths["/exhibitions/{exhibitionId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint(`/exhibitions/{exhibitionId}/works`).replace(
    "{exhibitionId}",
    String(exhibitionId)
  );
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch works for exhibition with ID ${exhibitionId}`);
  }
  return response.json();
}

export async function getExhibitionWorkListItem(
  exhibitionId: number,
  workId: number
): Promise<
  paths["/exhibitions/{exhibitionId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint(`/exhibitions/{exhibitionId}/works/{workId}`)
    .replace("{exhibitionId}", String(exhibitionId))
    .replace("{workId}", String(workId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch work with ID ${workId} for exhibition ${exhibitionId}`);
  }
  return response.json();
}
