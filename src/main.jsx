import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalState } from "./context/ModalContext.jsx";
import { GameState } from "./context/GameContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalState>
      <GameState>
        <App />
      </GameState>
    </ModalState>
  </StrictMode>
);
