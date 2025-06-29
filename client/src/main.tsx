import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.scss";
import App from "./App";

async function setup() {
  if (import.meta.env.VITE_MOCK_SERVER_ENABELD) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      serviceWorker: {
        url: import.meta.env.VITE_CLIENT_BASE_PATH
          ? `${import.meta.env.VITE_CLIENT_BASE_PATH}mockServiceWorker.js`
          : "mockServiceWorker.js",
      },
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
