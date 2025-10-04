import { toAcceptedName, toAcceptedId } from "../util/index.js";

export function convertSeasonPayload(payload) {
  return {
    name: toAcceptedName(payload.name),
  };
}

export function convertSeasonId(params) {
  return {
    seasonId: toAcceptedId(params.seasonId),
  };
}

export function convertSeasonAndWorkIds(params) {
  return {
    seasonId: toAcceptedId(params.seasonId),
    workId: toAcceptedId(params.workId),
  };
}
