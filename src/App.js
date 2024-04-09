import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Polis from "./pages/polis/Polis";
import Vatandas from "./pages/vatandas/Vatandas";
import Giris from "./pages/auth/Giris";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/polis" element={<Polis />} />
          <Route path="/" element={<Vatandas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
