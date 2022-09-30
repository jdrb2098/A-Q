import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import GestorDocumental from "..";

const GestionDocumentalRoutes = () => {
  return (
    <Routes>

      <Route index element={<GestorDocumental />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default GestionDocumentalRoutes;
