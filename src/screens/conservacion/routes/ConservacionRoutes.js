import { Routes, Route, Navigate } from "react-router-dom";

import Conservacion from "../";
import AgregarViveroScreen from "../gestorVivero/AgregarViveroScreen";
import EditarViveroScreen from "../gestorVivero/EditarViveroScreen";
import ProduccionPropiaScreen from "../gestorVivero/inventario/ProduccionPropiaScreen";
import PropagacionScreen from "../gestorVivero/inventario/PropagacionScreen";
import CronogramaScreen from "../cronograma/CronogramaScreen";
import DonacionesScreen from "../gestorVivero/inventario/DonacionScreen";

import ProduccionPropiaJohn from "../gestorVivero/inventario/ProduccionPropiaJohn";
import { MoverMaterialVegetalScreen } from "../distribucion/MoverMaterialVegetalScreen";

import EntregasPendientesScreen from "../distribucion/EntregasPendientesScreen";
import EntregadosScreen from "../distribucion/EntregadosScreen";


const ConservacionRoutes = () => {
  return (
    <Routes>

      <Route index element={<Conservacion />} />

      <Route path="gestorvivero">

        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route path="agregarvivero" element={<AgregarViveroScreen />} />

        <Route path="editarvivero" element={<EditarViveroScreen />} />

        <Route path="inventario">

          <Route index element={<Navigate to="/dashboard/conservacion" />} />

          <Route path="propagacion" element={<PropagacionScreen />} />

          <Route path="produccionpropia" element={<ProduccionPropiaScreen />} />

          <Route path="produccionpropiajohn" element={<ProduccionPropiaJohn />} />

          <Route path="donacion" element={<DonacionesScreen />} />

        </Route>

      </Route>

      <Route path="cronograma">

        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route path="calendario" element={<CronogramaScreen />} />

      </Route>

      <Route path="distribucion">
      
        <Route path="movermaterialvegetal"  element={<MoverMaterialVegetalScreen />}/>

        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route path="entregaspendientes" element={<EntregasPendientesScreen />} />

        <Route path="entregados" element={<EntregadosScreen />} />

      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default ConservacionRoutes;
