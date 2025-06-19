import type { PropsWithChildren } from "react";
import GlobalNavigation from "./GlobalNavigation";

export default function Layout ({
  children
}: PropsWithChildren) {
  return (
    <div className="flex flex-row min-w-lg">
      <div className="w-48 shrink-0 min-h-screen border-r border-gray-200">
        <GlobalNavigation />
      </div>
      <div className="flex-grow-1 bg-gray-50">
        {children}
      </div>
    </div>
  )
}
