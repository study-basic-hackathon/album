import type { PropsWithChildren } from "react";

export default function Card({ children } :PropsWithChildren) {
  return (
    <div className="bg-white border rounded-sm border-gray-200">
      {children}
    </div>
  )
}
