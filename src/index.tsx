import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QuizMateSite } from "./screens/QuizMateSite/QuizMateSite";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <QuizMateSite />
    </BrowserRouter>
  </StrictMode>,
);
