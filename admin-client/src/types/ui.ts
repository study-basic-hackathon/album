import type { UseMutationResult } from "@tanstack/react-query";

export type ApiResult <Fn extends (...args: any) => any> = Awaited<ReturnType<Fn>>;
