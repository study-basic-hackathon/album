import { toAcceptedName, toAcceptedId, toAcceptedDate } from "../util/index.js";

export function convertExhibitionPayload(payload) {
  const result = {
    name: toAcceptedName(payload.name),
    started_date: toAcceptedDate(payload.started_date),
    ended_date: toAcceptedDate(payload.ended_date),
  };

  if (result.started_date && result.ended_date) {
    if (new Date(result.started_date) > new Date(result.ended_date)) {
      result.started_date = null;
      result.ended_date = null;
    }
  }
  return result;
}

export function convertExhibitionId(params) {
  return {
    exhibitionId: toAcceptedId(params.exhibitionId),
  };
}

export function convertExhibitionAndWorkIds(params) {
  return {
    exhibitionId: toAcceptedId(params.exhibitionId),
    workId: toAcceptedId(params.workId),
  };
}
