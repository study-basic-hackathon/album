import { toAcceptedName, toAcceptedId } from "../util/index.js";

export function convertArrangerPayload(payload) {
  return {
    name: toAcceptedName(payload.name),
  };
}

export function convertArrangerId(params) {
  return {
    arrangerId: toAcceptedId(params.arrangerId),
  };
}

export function convertArrangerAndWorkIds(params) {
  return {
    arrangerId: toAcceptedId(params.arrangerId),
    workId: toAcceptedId(params.workId),
  };
}
