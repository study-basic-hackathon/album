import Index from "./pages/Index";
import Exhibition from "./pages/Exhibition";
import ExhibitionWork from "./pages/ExhibitionWork";
import Arranger from "./pages/Arranger";
import Category from "./pages/Category";
import Material from "./pages/Material";
import Season from "./pages/Season";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="exhibition/:exhibition_id/work/:work_id" element={<ExhibitionWork />} />
        <Route path="exhibition/:exhibition_id" element={<Exhibition />} />
        <Route path="arranger/:arranger_id" element={<Arranger />} />
        <Route path="category/:category_id" element={<Category />} />
        <Route path="material/:material_id" element={<Material />} />
        <Route path="season/:season_id" element={<Season />} />
      </Routes>
    </BrowserRouter>
  );
}
