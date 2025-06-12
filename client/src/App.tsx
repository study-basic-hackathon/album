import Index from "./pages/Index";
import Exhibition from "./pages/Exhibition";
import ExhibitionWork from "./pages/ExhibitionWork";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="exhibition/:exhibition_id/work/:work_id" element={<ExhibitionWork />} />
        <Route path="exhibition/:exhibition_id" element={<Exhibition />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
