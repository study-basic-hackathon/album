import { toAcceptedName, toAcceptedId, toAcceptedIds } from "../util/index.js";

export function convertWorkPayload(payload) {
  return {
    title: toAcceptedName(payload.title),
    exhibitionId: toAcceptedId(payload.exhibition_id),
    arrangerId: toAcceptedId(payload.arranger_id),
    seasonId: toAcceptedId(payload.season_id),
    categoryId: toAcceptedId(payload.category_id),
    materialIds: toAcceptedIds(payload.material_ids),
    imageIds: toAcceptedIds(payload.image_ids),
  };
}

export function convertWorkId(params) {
  return {
    workId: toAcceptedId(params.workId),
  };
}
