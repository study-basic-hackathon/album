import { http, HttpResponse } from "msw";
import { type components, type paths } from "../../types/api";
import { endpoint } from "../util";

import { works } from "../data/works";

import type { MswPathParameter } from "./types";

type CreateWorkPayload = components["schemas"]["CreateWorkPayload"];
type UpdateWorkPayload = components["schemas"]["UpdateWorkPayload"];

let nextWorkId = Math.max(...Object.keys(works).map(Number)) + 1;

export const work = [
  // POST /works - 作品の登録
  http.post(endpoint("/works"), async ({ request }) => {
    const data = (await request.json()) as CreateWorkPayload;
    const id = nextWorkId++;
    works[id] = {
      id,
      title: data.title ?? null,
      exhibition_id: data.exhibition_id,
      arranger_id: data.arranger_id,
      material_ids: data.material_ids,
      season_id: data.season_id,
      category_id: data.category_id,
      image_ids: data.image_ids,
      created_at: new Date().toISOString(),
    };
    return HttpResponse.json(null, {
      status: 201,
      headers: {
        Location: `/works/${id}`,
      },
    });
  }),

  // GET /works/{workId}
  http.get<MswPathParameter<paths["/works/{workId}"]["get"]["parameters"]["path"]>>(
    endpoint("/works/{workId}"),
    (req) => {
      const id = parseInt(req.params.workId as string, 10);
      console.log({ id, works });
      const work = works[id];
      if (!work) {
        return HttpResponse.json({ message: "Work not found" }, { status: 404 });
      }
      return HttpResponse.json(work);
    }
  ),

  // PUT /works/{workId}
  http.put<MswPathParameter<paths["/works/{workId}"]["put"]["parameters"]["path"]>>(
    endpoint("/works/{workId}"),
    async ({ params, request }) => {
      const id = parseInt(params.workId as string, 10);
      if (!works[id]) {
        return HttpResponse.json({ message: "Work not found" }, { status: 404 });
      }
      const data = (await request.json()) as UpdateWorkPayload;
      works[id] = {
        ...works[id],
        title: data.title ?? null,
        arranger_id: data.arranger_id,
        material_ids: data.material_ids,
        season_id: data.season_id,
        category_id: data.category_id,
        image_ids: data.image_ids,
      };
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // DELETE /works/{workId}
  http.delete<MswPathParameter<paths["/works/{workId}"]["delete"]["parameters"]["path"]>>(
    endpoint("/works/{workId}"),
    ({ params }) => {
      const id = parseInt(params.workId as string, 10);
      if (!works[id]) {
        return HttpResponse.json({ message: "Work not found" }, { status: 404 });
      }
      delete works[id];
      return new HttpResponse(null, { status: 204 });
    }
  ),
];
