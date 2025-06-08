import { http, HttpResponse } from "msw";
import { type components, type paths } from "../types/api";
import { endpoint } from "./util";

import { exhibitions } from "./data/exhibitions";
import { works } from "./data/works";
import { arrangers } from "./data/arranger";
import { materials } from "./data/materials";
import { categories } from "./data/categories";
import { seasons } from "./data/seasons";

type MswPathParameter<T> = {
  [K in keyof T]: string;
};

function worksToWorkListItem(
  works: components["schemas"]["Work"][]
): components["schemas"]["WorkListItem"][] {
  return works.map((work, index, works) => ({
    work: work,
    navigation: {
      next: index < works.length - 1 ? works[index + 1].id : null,
      previous: index > 0 ? works[index - 1].id : null,
    },
  }));
}

export const handlers = [
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
  http.get<MswPathParameter<paths["/arrangers/{arrangerId}"]["get"]["parameters"]["path"]>>(
    endpoint("/arrangers/{arrangerId}"),
    (req) => {
      const arrangerId = req.params.arrangerId as string;
      const arranger = arrangers[parseInt(arrangerId, 10)];
      if (!arranger) {
        return HttpResponse.json<
          paths["/arrangers/{arrangerId}"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Arranger not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/arrangers/{arrangerId}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(arranger);
    }
  ),
  http.get<MswPathParameter<paths["/arrangers/{arrangerId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/arrangers/{arrangerId}/works"),
    (req) => {
      const arrangerId = req.params.arrangerId as string;
      const arranger = arrangers[parseInt(arrangerId, 10)];
      if (!arranger) {
        return HttpResponse.json<
          paths["/arrangers/{arrangerId}/works"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Arranger not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/arrangers/{arrangerId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
      >(
        worksToWorkListItem(
          Object.values(works).filter((work) => work.arranger_id === parseInt(arrangerId, 10))
        )
      );
    }
  ),
  http.get<MswPathParameter<paths["/categories/{categoryId}"]["get"]["parameters"]["path"]>>(
    endpoint("/categories/{categoryId}"),
    (req) => {
      const categoryId = req.params.categoryId as string;
      const category = categories[parseInt(categoryId, 10)];
      if (!category) {
        return HttpResponse.json<
          paths["/categories/{categoryId}"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Category not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/categories/{categoryId}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(category);
    }
  ),
  http.get<MswPathParameter<paths["/categories/{categoryId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/categories/{categoryId}/works"),
    (req) => {
      const categoryId = req.params.categoryId as string;
      const category = categories[parseInt(categoryId, 10)];
      if (!category) {
        return HttpResponse.json<
          paths["/categories/{categoryId}/works"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Category not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/categories/{categoryId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
      >(
        worksToWorkListItem(
          Object.values(works).filter((work) => work.category_id === parseInt(categoryId, 10))
        )
      );
    }
  ),
  http.get<MswPathParameter<paths["/materials/{materialId}"]["get"]["parameters"]["path"]>>(
    endpoint("/materials/{materialId}"),
    (req) => {
      const materialId = req.params.materialId as string;
      const material = materials[parseInt(materialId, 10)];
      if (!material) {
        return HttpResponse.json<
          paths["/materials/{materialId}"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Material not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/materials/{materialId}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(material);
    }
  ),
  http.get<MswPathParameter<paths["/materials/{materialId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/materials/{materialId}/works"),
    (req) => {
      const materialId = req.params.materialId as string;
      const material = materials[parseInt(materialId, 10)];
      if (!material) {
        return HttpResponse.json<
          paths["/materials/{materialId}/works"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Material not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/materials/{materialId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
      >(
        worksToWorkListItem(
          Object.values(works).filter((work) =>
            work.material_ids.includes(parseInt(materialId, 10))
          )
        )
      );
    }
  ),
  http.get<MswPathParameter<paths["/seasons/{seasonId}"]["get"]["parameters"]["path"]>>(
    endpoint("/seasons/{seasonId}"),
    (req) => {
      const seasonId = req.params.seasonId as string;
      const season = seasons[parseInt(seasonId, 10)];
      if (!season) {
        return HttpResponse.json<
          paths["/seasons/{seasonId}"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Season not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/seasons/{seasonId}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(season);
    }
  ),
  http.get<MswPathParameter<paths["/seasons/{seasonId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/seasons/{seasonId}/works"),
    (req) => {
      const seasonId = req.params.seasonId as string;
      const season = seasons[parseInt(seasonId, 10)];
      if (!season) {
        return HttpResponse.json<
          paths["/seasons/{seasonId}/works"]["get"]["responses"]["404"]["content"]["application/json"]
        >({ message: "Season not found" }, { status: 404 });
      }
      return HttpResponse.json<
        paths["/seasons/{seasonId}/works"]["get"]["responses"]["200"]["content"]["application/json"]
      >(
        worksToWorkListItem(
          Object.values(works).filter((work) => work.season_id === parseInt(seasonId, 10))
        )
      );
    }
  ),
];
