import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Marker from "./pages/Marker";
import Polygon from "./pages/Polygon";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/marker" element={<Marker />} />
        <Route path="/polygon" element={<Polygon />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
