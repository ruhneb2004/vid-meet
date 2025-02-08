import { createRoot } from "react-dom/client";
import "./index.css";

import { RoomProvider } from "./context/RoomContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage.tsx";
import RoomPage from "./pages/roomPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RoomProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:id" element={<RoomPage />} />
      </Routes>
    </RoomProvider>
  </BrowserRouter>
);
