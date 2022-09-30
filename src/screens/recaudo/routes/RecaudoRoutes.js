import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Recaudo from "../";
import CobroCoactivoScreen from "../CobroCoactivoScreen";
import CobroPersuasivoScreen from "../CobroPersuasivoScreen";
import FacilidadesDePagoScreen from "../FacilidadesDePagoScreen";
import FacturacionScreen from "../FacturacionScreen";
import GestorDeudoresScreen from "../GestorDeudoresScreen";
import PagosEnLineaScreen from "../PagosEnLineaScreen";
import PortalReportesScreen from "../PortalReportesScreen";

const RecaudoRoutes = () => {
  return (
    <Routes>

      <Route index element={<Recaudo />} />

      <Route path="facturacion" element={<FacturacionScreen />} />

      <Route path="cobrocoactivo" element={<CobroCoactivoScreen />} />

      <Route path="cobropersuasivo" element={<CobroPersuasivoScreen />} />

      <Route path="facilidadesdepago" element={<FacilidadesDePagoScreen />} />

      <Route path="gestordeudores" element={<GestorDeudoresScreen />} />

      <Route path="pagosenlinea" element={<PagosEnLineaScreen />} />

      <Route path="portalreportes" element={<PortalReportesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default RecaudoRoutes;
