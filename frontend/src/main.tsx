import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "./components/button.tsx";
import { App } from "./App.tsx";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
createRoot(document.getElementById("root")!).render(

  <StrictMode>
    <Button name="Click Me" color="yellow" />
    <App />
    <RouterProvider router={router} />
  </StrictMode>
);
