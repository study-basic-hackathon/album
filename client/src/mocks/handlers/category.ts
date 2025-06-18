import { http, HttpResponse } from "msw";
import { type components, type paths } from "../../types/api";
import { endpoint } from "../util";

import { categories } from "../data/categories";
import { works } from "../data/works";

import type { MswPathParameter } from "./types";
import { worksToWorkListItem } from "./utils";

type CreateCategoryPayload = components["schemas"]["CreateCategoryPayload"];
type UpdateCategoryPayload = components["schemas"]["UpdateCategoryPayload"];

let nextCategoryId = Math.max(...Object.keys(categories).map(Number)) + 1;

export const category = [
  // 一覧取得
  http.get(endpoint("/categories"), () => {
    return HttpResponse.json<
      paths["/categories"]["get"]["responses"]["200"]["content"]["application/json"]
    >(Object.values(categories));
  }),

  // 登録
  http.post(endpoint("/categories"), async ({ request }) => {
    const data = (await request.json()) as CreateCategoryPayload;
    const id = nextCategoryId++;
    categories[id] = { id, ...data };
    return HttpResponse.json(null, {
      status: 201,
      headers: {
        Location: `/categories/${id}`,
      },
    });
  }),

  // 単一取得
  http.get<MswPathParameter<paths["/categories/{categoryId}"]["get"]["parameters"]["path"]>>(
    endpoint("/categories/{categoryId}"),
    (req) => {
      const id = parseInt(req.params.categoryId as string, 10);
      const category = categories[id];
      if (!category) {
        return HttpResponse.json({ message: "Category not found" }, { status: 404 });
      }
      return HttpResponse.json(category);
    }
  ),

  // 更新
  http.put<MswPathParameter<paths["/categories/{categoryId}"]["put"]["parameters"]["path"]>>(
    endpoint("/categories/{categoryId}"),
    async ({ params, request }) => {
      const id = parseInt(params.categoryId as string, 10);
      if (!categories[id]) {
        return HttpResponse.json({ message: "Category not found" }, { status: 404 });
      }
      const data = (await request.json()) as UpdateCategoryPayload;
      categories[id] = { id, ...data };
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 削除
  http.delete<MswPathParameter<paths["/categories/{categoryId}"]["delete"]["parameters"]["path"]>>(
    endpoint("/categories/{categoryId}"),
    ({ params }) => {
      const id = parseInt(params.categoryId as string, 10);
      if (!categories[id]) {
        return HttpResponse.json({ message: "Category not found" }, { status: 404 });
      }
      delete categories[id];
      return new HttpResponse(null, { status: 204 });
    }
  ),

  // 作品一覧取得
  http.get<MswPathParameter<paths["/categories/{categoryId}/works"]["get"]["parameters"]["path"]>>(
    endpoint("/categories/{categoryId}/works"),
    (req) => {
      const id = parseInt(req.params.categoryId as string, 10);
      if (!categories[id]) {
        return HttpResponse.json({ message: "Category not found" }, { status: 404 });
      }
      const filtered = Object.values(works).filter((w) => w.category_id === id);
      return HttpResponse.json(worksToWorkListItem(filtered));
    }
  ),

  // 作品詳細取得
  http.get<
    MswPathParameter<paths["/categories/{categoryId}/works/{workId}"]["get"]["parameters"]["path"]>
  >(endpoint("/categories/{categoryId}/works/{workId}"), (req) => {
    const categoryId = parseInt(req.params.categoryId as string, 10);
    const workId = parseInt(req.params.workId as string, 10);
    if (!categories[categoryId]) {
      return HttpResponse.json({ message: "Category not found" }, { status: 404 });
    }
    const filtered = Object.values(works).filter((w) => w.category_id === categoryId);
    const items = worksToWorkListItem(filtered);
    const item = items.find((i) => i.work.id === workId);
    if (!item) {
      return HttpResponse.json({ message: "Work not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
];
