import { http, HttpResponse } from "msw";
import { type components, type paths } from "../../types/api";
import { endpoint } from "../util";

import { exhibitions } from "../data/exhibitions";
import { works } from "../data/works";

import type { MswPathParameter } from "./types";
import { worksToWorkListItem } from "./utils";

let nextExhibitionId = Math.max(...Object.keys(exhibitions).map(Number)) + 1;

export const exhibition = [
  http.get(endpoint("/exhibitions"), () => {
    return HttpResponse.json<
      paths["/exhibitions"]["get"]["responses"]["200"]["content"]["application/json"]
    >(Object.values(exhibitions));
  }),
  http.get<MswPathParameter<paths["/exhibitions/{exhibitionId}"]["get"]["parameters"]["path"]>>(
    endpoint("/exhibitions/{exhibitionId}"),
    (req) => {
      const exhibitionId = req.params.exhibitionId as string;
      const exhibition = exhibitions[parseInt(exhibitionId, 10)];
      if (!exhibition) {
        return HttpResponse.json<
          paths["/exhibitions/{exhibitionId}"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Exhibition not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/exhibitions/{exhibitionId}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(exhibition);
    }
  ),
  http.get<
    MswPathParameter<paths["/exhibitions/{exhibitionId}/works"]["get"]["parameters"]["path"]>
  >(endpoint("/exhibitions/{exhibitionId}/works"), (req) => {
    const exhibitionId = req.params.exhibitionId as string;
    const exhibition = exhibitions[parseInt(exhibitionId, 10)];
    if (!exhibition) {
      return HttpResponse.json<
        paths["/exhibitions/{exhibitionId}/works"]["get"]["responses"]["404"]["content"]["application/json"]
      >({ message: "Exhibition not found" }, { status: 404 });
    }
    return HttpResponse.json<
      paths["/exhibitions/{exhibitionId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
    >(
      worksToWorkListItem(
        Object.values(works).filter((work) => work.exhibition_id === exhibition.id)
      )
    );
  }),
  http.get<
    MswPathParameter<
      paths["/exhibitions/{exhibitionId}/works/{workId}"]["get"]["parameters"]["path"]
    >
  >(endpoint("/exhibitions/{exhibitionId}/works/{workId}"), (req) => {
    const workId = req.params.workId as string;
    const workListItems = Object.values(works).map(
      (work, index, works) =>
        ({
          work: work,
          navigation: {
            next: index < works.length - 1 ? works[index + 1].id : null,
            previous: index > 0 ? works[index - 1].id : null,
          },
        }) as components["schemas"]["WorkListItem"]
    );
    const workListItem: components["schemas"]["WorkListItem"] | undefined = workListItems.find(
      (item) => item.work.id === parseInt(workId, 10)
    );
    if (!workListItem) {
      return HttpResponse.json<
        paths["/exhibitions/{exhibitionId}/works/{workId}"]["get"]["responses"]["404"]["content"]["application/json"]
      >({ message: "Work not found" }, { status: 404 });
    }
    return HttpResponse.json<
      paths["/exhibitions/{exhibitionId}/works/{workId}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(workListItem);
  }),
  http.post(endpoint("/exhibitions"), async ({ request }) => {
    const data = await request.json() as components["schemas"]["CreateExhibitionPayload"];
    const id = nextExhibitionId++;
    exhibitions[id] = { id, ...data };
    return HttpResponse.json(null, {
      status: 201,
      headers: {
        Location: `/exhibitions/${id}`,
      },
    });
  }),
  http.put<MswPathParameter<paths["/exhibitions/{exhibitionId}"]["put"]["parameters"]["path"]>>(
    endpoint("/exhibitions/{exhibitionId}"),
    async ({ params, request }) => {
      const id = parseInt(params.exhibitionId, 10);
      if (!exhibitions[id]) {
        return HttpResponse.json({ message: "Exhibition not found" }, { status: 404 });
      }
      const data = await request.json() as components["schemas"]["UpdateExhibitionPayload"];
      exhibitions[id] = { id, ...data };
      return new HttpResponse(null, { status: 204 });
    }
  ),
  http.delete<MswPathParameter<paths["/exhibitions/{exhibitionId}"]["delete"]["parameters"]["path"]>>(
    endpoint("/exhibitions/{exhibitionId}"),
    ({ params }) => {
      const id = parseInt(params.exhibitionId, 10);
      if (!exhibitions[id]) {
        return HttpResponse.json({ message: "Exhibition not found" }, { status: 404 });
      }
      delete exhibitions[id];
      return new HttpResponse(null, { status: 204 });
    }
  )
]
