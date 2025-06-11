import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import Index from "./pages/Index";
import Exhibition from "./pages/Exhibition";
import { BrowserRouter, Route, Routes } from "react-router";

async function setup() {
  if (import.meta.env.VITE_MOCK_SERVER_ENABELD) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

setup().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exhibition/:id" element={<Exhibition />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
});
