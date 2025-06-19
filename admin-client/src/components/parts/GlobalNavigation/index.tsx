import { Link } from "react-router"
import GlobalNavigationItem from "./GlobalNavigationItem"

export default function GlobalNavigation() {
  return (
    <div className="sticky top-0">
      <Link to="/" className="p-2 block py-4">
        管理者ツール
      </Link>
      <div className="flex flex-col">
        <GlobalNavigationItem to="/">
          ホーム
        </GlobalNavigationItem>
        <GlobalNavigationItem to="/exhibitions">
          花展
        </GlobalNavigationItem>
        <GlobalNavigationItem to="/seasons">
          季節
        </GlobalNavigationItem>
        <GlobalNavigationItem to="/materials">
          花材
        </GlobalNavigationItem>
        <GlobalNavigationItem to="/categories">
          作品分類
        </GlobalNavigationItem>
        <GlobalNavigationItem to="/arrangers">
          作者
        </GlobalNavigationItem>
      </div>
    </div>
  )
}
