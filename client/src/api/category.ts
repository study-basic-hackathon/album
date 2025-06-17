import { type paths, type components } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";

type Category = components["schemas"]["Category"];

export async function getCategory(
  categoryId: number
): Promise<
  paths["/categories/{categoryId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/categories/{categoryId}").replace("{categoryId}", String(categoryId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch category with ID ${categoryId}`);
  }
  return response.json();
}

export function useCategory(categoryId?: number): Category | null {
  const [category, setCategory] = useState<Category | null>(null);
  useEffect(() => {
    async function fetchCategory(categoryId: number) {
      try {
        const fetchedCategory = await getCategory(categoryId);
        setCategory(fetchedCategory);
      } catch (error) {
        console.error(`Failed to fetch category ${categoryId}:`, error);
        setCategory(null); // エラー時は null を設定
      }
    }
    if (categoryId === undefined) {
      setCategory(null); // categoryIdが未定義の場合は null を設定
      return;
    }
    fetchCategory(categoryId);
  }, [categoryId]);
  return category;
}
