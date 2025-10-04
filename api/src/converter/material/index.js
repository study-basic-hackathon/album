import { toAcceptedName, toAcceptedId } from "../util/index.js";

export function convertMaterialPayload(payload) {
  return {
    name: toAcceptedName(payload.name),
  };
}

export function convertMaterialId(params) {
  return {
    materialId: toAcceptedId(params.materialId),
  };
}

export function convertMaterialAndWorkIds(params) {
  return {
    materialId: toAcceptedId(params.materialId),
    workId: toAcceptedId(params.workId),
  };
}
