export type ApiResult <Fn extends (...args: any) => any> = Awaited<ReturnType<Fn>>;
