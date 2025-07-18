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
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import styles from "./scss/layout/index.module.scss";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_CLIENT_BASE_PATH ?? "/"}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/exhibition/:exhibitionId/work/:workId" element={<ExhibitionWork />} />
              <Route path="/exhibition/:exhibitionId" element={<Exhibition />} />
              <Route path="/arranger/:arrangerId/work/:workId" element={<ArrangerWork />} />
              <Route path="/arranger/:arrangerId" element={<Arranger />} />
              <Route path="/category/:categoryId/work/:workId" element={<CategoryWork />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/material/:materialId/work/:workId" element={<MaterialWork />} />
              <Route path="/material/:materialId" element={<Material />} />
              <Route path="/season/:seasonId/work/:workId" element={<SeasonWork />} />
              <Route path="/season/:seasonId" element={<Season />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
