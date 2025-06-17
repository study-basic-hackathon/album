import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getCategory } from "../api/category";

type Category = components["schemas"]["Category"];

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
