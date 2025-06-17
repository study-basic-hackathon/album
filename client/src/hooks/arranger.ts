import { type components } from "../types/api";
import { useState, useEffect } from "react";
import { getArranger } from "../api/arranger";

type Arranger = components["schemas"]["Arranger"];

export function useArranger(arrangerId?: number): Arranger | null {
  const [arranger, setArranger] = useState<Arranger | null>(null);
  useEffect(() => {
    async function fetchArranger(arrangerId: number) {
      try {
        const fetchedArranger = await getArranger(arrangerId);
        setArranger(fetchedArranger);
      } catch (error) {
        console.error(`Failed to fetch arranger ${arrangerId}:`, error);
        setArranger(null); // エラー時は null を設定
      }
    }
    if (arrangerId === undefined) {
      setArranger(null); // arrangerIdが未定義の場合は null を設定
      return;
    }
    fetchArranger(arrangerId);
  }, [arrangerId]);
  return arranger;
}
