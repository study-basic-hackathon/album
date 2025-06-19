import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getCategory, getCategoryWorkListItems, getCategoryWorkListItem } from "../api/category";

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

export function useCategoryWorkListItems(categoryId?: number) {
  const [workListItems, setWorkListItems] = useState<components["schemas"]["WorkListItem"][]>([]);
  useEffect(() => {
    async function fetchCategoryWorkListItems(categoryId: number) {
      try {
        const items = await getCategoryWorkListItems(categoryId);
        setWorkListItems(items);
      } catch (error) {
        console.error(`Failed to fetch works for category ${categoryId}:`, error);
        setWorkListItems([]); // エラー時は空の配列を設定
      }
    }
    if (categoryId === undefined) {
      setWorkListItems([]); // categoryIdが未定義の場合は空の配列を設定
      return;
    }
    fetchCategoryWorkListItems(categoryId);
  }, [categoryId]);
  return workListItems;
}

export function useCategoryWorkListItem(categoryId?: number, workId?: number) {
  const [workListItem, setWorkListItem] = useState<components["schemas"]["WorkListItem"] | null>(
    null
  );
  useEffect(() => {
    async function fetchCategoryWorkListItem(categoryId: number, workId: number) {
      try {
        const item = await getCategoryWorkListItem(categoryId, workId);
        setWorkListItem(item);
      } catch (error) {
        console.error(`Failed to fetch work ${workId} for category ${categoryId}:`, error);
        setWorkListItem(null); // エラー時は null を設定
      }
    }
    if (categoryId === undefined || workId === undefined) {
      setWorkListItem(null); // categoryIdまたはworkIdが未定義の場合は null を設定
      return;
    }
    fetchCategoryWorkListItem(categoryId, workId);
  }, [categoryId, workId]);
  return workListItem;
}
