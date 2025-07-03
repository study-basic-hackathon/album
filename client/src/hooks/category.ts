import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getCategory, getCategoryWorkListItems, getCategoryWorkListItem } from "../api/category";

type Category = components["schemas"]["Category"];

interface UseCategoryReturn {
  category: Category | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useCategory(categoryId?: number): UseCategoryReturn {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchCategory(categoryId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const fetchedCategory = await getCategory(categoryId);
        setCategory(fetchedCategory);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch category ${categoryId}:`, error);
        setErrorMessage(message);
        setCategory(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (categoryId === undefined) {
      setCategory(null); // categoryIdが未定義の場合は null を設定
      return;
    }
    fetchCategory(categoryId);
  }, [categoryId]);
  return { category, isLoading, errorMessage };
}

interface UseCategoryWorkListItemsReturn {
  workListItems: components["schemas"]["WorkListItem"][];
  isLoading: boolean;
  errorMessage: string | null;
}

export function useCategoryWorkListItems(categoryId?: number): UseCategoryWorkListItemsReturn {
  const [workListItems, setWorkListItems] = useState<components["schemas"]["WorkListItem"][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchCategoryWorkListItems(categoryId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const items = await getCategoryWorkListItems(categoryId);
        setWorkListItems(items);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch works for category ${categoryId}:`, error);
        setErrorMessage(message);
        setWorkListItems([]); // エラー時は空の配列を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (categoryId === undefined) {
      setWorkListItems([]); // categoryIdが未定義の場合は空の配列を設定
      return;
    }
    fetchCategoryWorkListItems(categoryId);
  }, [categoryId]);
  return {
    workListItems,
    isLoading,
    errorMessage,
  };
}

interface UseCategoryWorkListItemReturn {
  workListItem: components["schemas"]["WorkListItem"] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useCategoryWorkListItem(
  categoryId?: number,
  workId?: number
): UseCategoryWorkListItemReturn {
  const [workListItem, setWorkListItem] = useState<components["schemas"]["WorkListItem"] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchCategoryWorkListItem(categoryId: number, workId: number) {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const item = await getCategoryWorkListItem(categoryId, workId);
        setWorkListItem(item);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Failed to fetch work ${workId} for category ${categoryId}:`, error);
        setErrorMessage(message);
        setWorkListItem(null); // エラー時は null を設定
      } finally {
        setIsLoading(false);
      }
    }
    if (categoryId === undefined || workId === undefined) {
      setWorkListItem(null); // categoryIdまたはworkIdが未定義の場合は null を設定
      return;
    }
    fetchCategoryWorkListItem(categoryId, workId);
  }, [categoryId, workId]);
  return {
    workListItem,
    isLoading,
    errorMessage,
  };
}
