import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marker from "./pages/Marker";
import Polygon from "./pages/Polygon";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marker />} />
        <Route path="/polygon" element={<Polygon />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
