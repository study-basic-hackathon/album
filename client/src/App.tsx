import Index from "./pages/Index";
import Exhibition from "./pages/Exhibition";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/exhibition/:id" element={<Exhibition />} />
      </Routes>
    </BrowserRouter>
  );
}
