import Index from "./pages/Index";
import Exhibition from "./pages/Exhibition";
import Work from "./pages/Work";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/exhibition/:id" element={<Exhibition />} />
        <Route path="/work/:id" element={<Work />} />
      </Routes>
    </BrowserRouter>
  );
}
