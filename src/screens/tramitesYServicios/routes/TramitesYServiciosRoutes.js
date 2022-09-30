import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import TramitesYServicios from "../";

const TramitesYServiciosRoutes = () => {
  return (
    <Routes>

      <Route index element={<TramitesYServicios />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default TramitesYServiciosRoutes;
