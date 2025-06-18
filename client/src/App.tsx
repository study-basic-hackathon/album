import Index from "./pages/Index";
import Exhibition from "./pages/Exhibition";
import ExhibitionWork from "./pages/ExhibitionWork";
import Arranger from "./pages/Arranger";
import ArrangerWork from "./pages/ArrangerWork";
import Category from "./pages/Category";
import CategoryWork from "./pages/CategoryWork";
import Material from "./pages/Material";
import MaterialWork from "./pages/MaterialWork";
import Season from "./pages/Season";
import SeasonWork from "./pages/SeasonWork";
import HeaderNavigation from "./components/HeaderNavigation";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <>
        <HeaderNavigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exhibition/:exhibitionId/work/:workId" element={<ExhibitionWork />} />
          <Route path="/exhibition/:exhibitionId" element={<Exhibition />} />
          <Route path="/arranger/:arranger_id/work/:work_id" element={<ArrangerWork />} />
          <Route path="/arranger/:arrangerId" element={<Arranger />} />
          <Route path="/category/:category_id/work/:work_id" element={<CategoryWork />} />
          <Route path="/category/:category_id" element={<Category />} />
          <Route path="/material/:material_id/work/:work_id" element={<MaterialWork />} />
          <Route path="/material/:material_id" element={<Material />} />
          <Route path="/season/:season_id/work/:work_id" element={<SeasonWork />} />
          <Route path="/season/:season_id" element={<Season />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}
// ToDo: snake_case で命名された変数を camelCase に直す
