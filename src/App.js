import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomeScreen from "./screens/layout/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import LogoScreen from "./screens/LogoScreen";

import AlmacenRoutes from "./screens/almacen/routes/AlmacenRoutes";
import RecaudoRoutes from "./screens/recaudo/routes/RecaudoRoutes";
import ConservacionRoutes from "./screens/conservacion/routes/ConservacionRoutes";
import GestorDocumentalRoutes from "./screens/gestorDocumental/routes/GestorDocumentalRoutes";
import TramitesYServiciosRoutes from "./screens/tramitesYServicios/routes/TramitesYServiciosRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { getDataFromLocalStorage } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataFromLocalStorage())
  }, []);
  
  return (
    <Routes>
      <Route element={<ProtectedRoutes redirectTo={"/login"} />}>
        <Route path="/dashboard" element={<HomeScreen />}>
          <Route index element={<LogoScreen />} />

          <Route path="almacen/*" element={<AlmacenRoutes />} />

          <Route path="recaudo/*" element={<RecaudoRoutes />} />

          <Route path="conservacion/*" element={<ConservacionRoutes />} />

          <Route
            path="gestordocumental/*"
            element={<GestorDocumentalRoutes />}
          />

          <Route
            path="tramitesyservicios/*"
            element={<TramitesYServiciosRoutes />}
          />
        </Route>

        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Route>

      <Route
        element={<ProtectedRoutes negate={true} redirectTo={"/dashboard"} />}
      >
        <Route path="/login" element={<LoginScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
