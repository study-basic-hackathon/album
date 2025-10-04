import { toAcceptedName, toAcceptedId } from "../util/index.js";

export function convertCategoryPayload(payload) {
  return {
    name: toAcceptedName(payload.name),
  };
}

export function convertCategoryId(params) {
  return {
    categoryId: toAcceptedId(params.categoryId),
  };
}

export function convertCategoryAndWorkIds(params) {
  return {
    categoryId: toAcceptedId(params.categoryId),
    workId: toAcceptedId(params.workId),
  };
}
