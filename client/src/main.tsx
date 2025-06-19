import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import App from "./App";

async function setup() {
  if (import.meta.env.VITE_MOCK_SERVER_ENABELD) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
}

setup().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
