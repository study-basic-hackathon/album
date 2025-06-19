import { http, HttpResponse } from "msw";
import { type components, type paths } from "../../types/api";
import { endpoint } from "../util";

import { arrangers } from "../data/arranger";
import { works } from "../data/works";
import { worksToWorkListItem } from "./utils";
import type { MswPathParameter } from "./types";

type CreateArrangerPayload = components["schemas"]["CreateArrangerPayload"];
type UpdateArrangerPayload = components["schemas"]["UpdateArrangerPayload"];

let nextArrangerId = Math.max(...Object.keys(arrangers).map(Number)) + 1;

export const arranger = [
  // 一覧取得
  http.get(endpoint("/arrangers"), () => {
    return HttpResponse.json<
      paths["/arrangers"]["get"]["responses"]["200"]["content"]["application/json"]
    >(Object.values(arrangers));
  }),

  // 登録
  http.post(endpoint("/arrangers"), async ({ request }) => {
    const data = (await request.json()) as CreateArrangerPayload;
    const id = nextArrangerId++;
    arrangers[id] = { id, ...data };
    return HttpResponse.json(null, {
      status: 201,
      headers: {
        Location: `/arrangers/${id}`,
      },
    });
  }),

  // 単一取得
  http.get<MswPathParameter<paths["/arrangers/{arrangerId}"]["get"]["parameters"]["path"]>>(
    endpoint("/arrangers/{arrangerId}"),
    (req) => {
      const id = parseInt(req.params.arrangerId as string, 10);
      const arranger = arrangers[id];
      if (!arranger) {
        return HttpResponse.json({ message: "Arranger not found" }, { status: 404 });
      }
      return HttpResponse.json(arranger);
    }
  ),

  // 更新
  http.put<MswPathParameter<paths["/arrangers/{arrangerId}"]["put"]["parameters"]["path"]>>(
    endpoint("/arrangers/{arrangerId}"),
    async ({ params, request }) => {
      const id = parseInt(params.arrangerId as string, 10);
      if (!arrangers[id]) {
        return HttpResponse.json({ message: "Arranger not found" }, { status: 404 });
      }
      const data = (await request.json()) as UpdateArrangerPayload;
      arrangers[id] = { id, ...data };
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 削除
  http.delete<MswPathParameter<paths["/arrangers/{arrangerId}"]["delete"]["parameters"]["path"]>>(
    endpoint("/arrangers/{arrangerId}"),
    ({ params }) => {
      const id = parseInt(params.arrangerId as string, 10);
      if (!arrangers[id]) {
        return HttpResponse.json({ message: "Arranger not found" }, { status: 404 });
      }
      delete arrangers[id];
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 作者の作品一覧
  http.get<MswPathParameter<paths["/arrangers/{arrangerId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/arrangers/{arrangerId}/works"),
    (req) => {
      const id = parseInt(req.params.arrangerId as string, 10);
      if (!arrangers[id]) {
        return HttpResponse.json({ message: "Arranger not found" }, { status: 404 });
      }
      const filtered = Object.values(works).filter((w) => w.arranger_id === id);
      return HttpResponse.json(worksToWorkListItem(filtered));
    }
  ),

  // 作者の作品詳細
  http.get<
    MswPathParameter<paths["/arrangers/{arrangerId}/works/{workId}"]["get"]["parameters"]["path"]>
  >(endpoint("/arrangers/{arrangerId}/works/{workId}"), (req) => {
    const arrangerId = parseInt(req.params.arrangerId as string, 10);
    const workId = parseInt(req.params.workId as string, 10);
    if (!arrangers[arrangerId]) {
      return HttpResponse.json({ message: "Arranger not found" }, { status: 404 });
    }
    const filtered = Object.values(works).filter((w) => w.arranger_id === arrangerId);
    const items = worksToWorkListItem(filtered);
    const item = items.find((i) => i.work.id === workId);
    if (!item) {
      return HttpResponse.json({ message: "Work not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
];
