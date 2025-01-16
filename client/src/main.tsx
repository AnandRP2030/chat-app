import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat } from "./pages/chat.tsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="bottom-right" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
