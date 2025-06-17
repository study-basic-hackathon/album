import { type paths, type components } from "../types/api";
import { endpoint } from "./util";
import { useState, useEffect } from "react";

export async function getArranger(
  arrangerId: number
): Promise<
  paths["/arrangers/{arrangerId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
  const path = endpoint("/arrangers/{arrangerId}").replace("{arrangerId}", String(arrangerId));
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch arranger with ID ${arrangerId}`);
  }
  return response.json();
}
