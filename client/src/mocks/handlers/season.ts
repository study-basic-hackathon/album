import { http, HttpResponse } from "msw";
import { type components, type paths } from "../../types/api";
import { endpoint } from "../util";

import { seasons } from "../data/seasons";
import { works } from "../data/works";

import type { MswPathParameter } from "./types";
import { worksToWorkListItem } from "./utils";

type CreateSeasonPayload = components["schemas"]["CreateSeasonPayload"];
type UpdateSeasonPayload = components["schemas"]["UpdateSeasonPayload"];

let nextSeasonId = Math.max(...Object.keys(seasons).map(Number)) + 1;

export const season = [
  // 一覧取得
  http.get(endpoint("/seasons"), () => {
    return HttpResponse.json<
      paths["/seasons"]["get"]["responses"]["200"]["content"]["application/json"]
    >(Object.values(seasons));
  }),

  // 登録
  http.post(endpoint("/seasons"), async ({ request }) => {
    const data = (await request.json()) as CreateSeasonPayload;
    const id = nextSeasonId++;
    seasons[id] = { id, ...data };
    return HttpResponse.json(null, {
      status: 201,
      headers: {
        Location: `/seasons/${id}`,
      },
    });
  }),

  // 単一取得
  http.get<MswPathParameter<paths["/seasons/{seasonId}"]["get"]["parameters"]["path"]>>(
    endpoint("/seasons/{seasonId}"),
    (req) => {
      const id = parseInt(req.params.seasonId as string, 10);
      const season = seasons[id];
      if (!season) {
        return HttpResponse.json({ message: "Season not found" }, { status: 404 });
      }
      return HttpResponse.json(season);
    }
  ),

  // 更新
  http.put<MswPathParameter<paths["/seasons/{seasonId}"]["put"]["parameters"]["path"]>>(
    endpoint("/seasons/{seasonId}"),
    async ({ params, request }) => {
      const id = parseInt(params.seasonId as string, 10);
      if (!seasons[id]) {
        return HttpResponse.json({ message: "Season not found" }, { status: 404 });
      }
      const data = (await request.json()) as UpdateSeasonPayload;
      seasons[id] = { id, ...data };
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 削除
  http.delete<MswPathParameter<paths["/seasons/{seasonId}"]["delete"]["parameters"]["path"]>>(
    endpoint("/seasons/{seasonId}"),
    ({ params }) => {
      const id = parseInt(params.seasonId as string, 10);
      if (!seasons[id]) {
        return HttpResponse.json({ message: "Season not found" }, { status: 404 });
      }
      delete seasons[id];
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 作品一覧
  http.get<MswPathParameter<paths["/seasons/{seasonId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/seasons/{seasonId}/works"),
    (req) => {
      const id = parseInt(req.params.seasonId as string, 10);
      if (!seasons[id]) {
        return HttpResponse.json({ message: "Season not found" }, { status: 404 });
      }
      const filtered = Object.values(works).filter((w) => w.season_id === id);
      return HttpResponse.json(worksToWorkListItem(filtered));
    }
  ),

  // 作品詳細取得
  http.get<
    MswPathParameter<paths["/seasons/{seasonId}/works/{workId}"]["get"]["parameters"]["path"]>
  >(endpoint("/seasons/{seasonId}/works/{workId}"), (req) => {
    const seasonId = parseInt(req.params.seasonId as string, 10);
    const workId = parseInt(req.params.workId as string, 10);
    if (!seasons[seasonId]) {
      return HttpResponse.json({ message: "Season not found" }, { status: 404 });
    }
    const filtered = Object.values(works).filter((w) => w.season_id === seasonId);
    const items = worksToWorkListItem(filtered);
    const item = items.find((i) => i.work.id === workId);
    if (!item) {
      return HttpResponse.json({ message: "Work not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
];
