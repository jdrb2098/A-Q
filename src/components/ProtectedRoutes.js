import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom/dist";

const ProtectedRoutes = ({ redirectTo, negate }) => {
  const userInfo = useSelector((state) => state.user.user);

  let validation = Object.entries(userInfo).length !== 0;

  if(negate){
    validation = !validation;
  }

  if (validation) {
    return <Outlet />;
  }
  return <Navigate to={redirectTo} />;
};

ProtectedRoutes.defaultProps = {
  negate: false,
};

export default ProtectedRoutes;
