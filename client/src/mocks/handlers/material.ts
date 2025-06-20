import { http, HttpResponse } from "msw";
import { type components, type paths } from "../../types/api";
import { endpoint } from "../util";

import { materials } from "../data/materials";
import { works } from "../data/works";

import type { MswPathParameter } from "./types";
import { worksToWorkListItem } from "./utils";

type CreateMaterialPayload = components["schemas"]["CreateMaterialPayload"];
type UpdateMaterialPayload = components["schemas"]["UpdateMaterialPayload"];

let nextMaterialId = Math.max(...Object.keys(materials).map(Number)) + 1;

export const material = [
  // 一覧取得
  http.get(endpoint("/materials"), () => {
    return HttpResponse.json<
      paths["/materials"]["get"]["responses"]["200"]["content"]["application/json"]
    >(Object.values(materials));
  }),

  // 登録
  http.post(endpoint("/materials"), async ({ request }) => {
    const data = (await request.json()) as CreateMaterialPayload;
    const id = nextMaterialId++;
    materials[id] = { id, ...data };
    return HttpResponse.json(null, {
      status: 201,
      headers: {
        Location: `/materials/${id}`,
      },
    });
  }),

  // 単一取得
  http.get<MswPathParameter<paths["/materials/{materialId}"]["get"]["parameters"]["path"]>>(
    endpoint("/materials/{materialId}"),
    (req) => {
      const id = parseInt(req.params.materialId as string, 10);
      const material = materials[id];
      if (!material) {
        return HttpResponse.json({ message: "Material not found" }, { status: 404 });
      }
      return HttpResponse.json(material);
    }
  ),

  // 更新
  http.put<MswPathParameter<paths["/materials/{materialId}"]["put"]["parameters"]["path"]>>(
    endpoint("/materials/{materialId}"),
    async ({ params, request }) => {
      const id = parseInt(params.materialId as string, 10);
      if (!materials[id]) {
        return HttpResponse.json({ message: "Material not found" }, { status: 404 });
      }
      const data = (await request.json()) as UpdateMaterialPayload;
      materials[id] = { id, ...data };
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 削除
  http.delete<MswPathParameter<paths["/materials/{materialId}"]["delete"]["parameters"]["path"]>>(
    endpoint("/materials/{materialId}"),
    ({ params }) => {
      const id = parseInt(params.materialId as string, 10);
      if (!materials[id]) {
        return HttpResponse.json({ message: "Material not found" }, { status: 404 });
      }
      delete materials[id];
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 作品一覧取得
  http.get<MswPathParameter<paths["/materials/{materialId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/materials/{materialId}/works"),
    (req) => {
      const id = parseInt(req.params.materialId as string, 10);
      if (!materials[id]) {
        return HttpResponse.json({ message: "Material not found" }, { status: 404 });
      }
      const filtered = Object.values(works).filter((work) => work.material_ids.includes(id));
      return HttpResponse.json(worksToWorkListItem(filtered));
    }
  ),

  // 作品詳細取得
  http.get<
    MswPathParameter<paths["/materials/{materialId}/works/{workId}"]["get"]["parameters"]["path"]>
  >(endpoint("/materials/{materialId}/works/{workId}"), (req) => {
    const materialId = parseInt(req.params.materialId as string, 10);
    const workId = parseInt(req.params.workId as string, 10);
    if (!materials[materialId]) {
      return HttpResponse.json({ message: "Material not found" }, { status: 404 });
    }
    const filtered = Object.values(works).filter((work) => work.material_ids.includes(materialId));
    const items = worksToWorkListItem(filtered);
    const item = items.find((i) => i.work.id === workId);
    if (!item) {
      return HttpResponse.json({ message: "Work not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
];
