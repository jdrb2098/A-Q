import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import LogoCormacarena from "../assets/logos/eps/LogoVertical.svg";
import IconoAlmacen from "../assets/ecology-house-svgrepo-com.svg";
import IconoRecaudo from "../assets/voltmeter-power-svgrepo-com.svg";
import IconoSeguimientoPlanes from "../assets/networking-share-svgrepo-com.svg";
import IconoConservacion from "../assets/sprout-tree-svgrepo-com.svg";
import IconoGestionDocumental from "../assets/recycling-environment-svgrepo-com.svg";
import IconoTramitesServicios from "../assets/analytics-bar-chart-svgrepo-com.svg";
import IconoRecursoHidrico from "../assets/h2o-svgrepo-com.svg";
import IconoAgregarVivero from "../assets/iconosConservacion/add-svgrepo-com.svg";
import IconoGestorVivero from "../assets/iconosConservacion/leaf-svgrepo-com.svg";
import IconoEditarVivero from "../assets/iconosConservacion/edit-svgrepo-com.svg";
import IconoGMaterialVegetal from "../assets/iconosConservacion/sprout-tree-svgrepo-com.svg";
import IconoProduccion from "../assets/iconosConservacion/ecologic-leaf-svgrepo-com.svg";
import IconoSolicitudes from "../assets/iconosConservacion/folder-svgrepo-com.svg";
import IconoDistribucion from "../assets/iconosConservacion/delivery-truck-delivery-svgrepo-com.svg";
import IconoCronograma from "../assets/iconosConservacion/calendar-svgrepo-com.svg";
import IconoConfiguracion from "../assets/iconosConservacion/settings-svgrepo-com.svg";
import IconoCentroNotificacion from "../assets/iconosConservacion/paper-plane-svgrepo-com.svg";
import IconoReportes from "../assets/iconosConservacion/chart-presentation-report-svgrepo-com.svg";

const Aside = () => {
  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <aside
      className="collapse sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
    >
      <Scrollbars style={{ width: "100%", height: "100%" }} autoHide>
        {/* <div class="mobile-toggler d-xl-none">
          <button data-bs-toggle="modal" data-bs-target="#navbModal">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div> */}

        <div className="sidenav-header mb-5">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <Link
            className="navbar-brand m-0 d-flex flex-column align-items-center"
            to="dashboard"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <img
                src={LogoCormacarena}
                className=""
                alt="main_logo"
              />
            </div>

            <span className="ms-1 font-weight-bold text-white">
              A&Q - Ingenieria
            </span>
          </Link>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto h-auto"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item mb-2 mt-0">
              <a
                data-bs-toggle="collapse"
                href="#ProfileNav"
                className="nav-link text-white"
                aria-controls="ProfileNav"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-text ms-2 ps-1">
                  {userInfo.email}
                </span>
              </a>
              <div className="collapse" id="ProfileNav">
                <ul className="nav ">
                  <li className="nav-item">
                    <div
                      className="nav-link text-white "
                      onClick={logoutHandler}
                    >
                      <span className="sidenav-mini-icon"> L </span>
                      <span className="sidenav-normal  ms-3  ps-1">
                        {" "}
                        Logout{" "}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <hr className="horizontal light mt-0" />

            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#pagesExamples"
                className="nav-link text-white "
                aria-controls="pagesExamples"
                role="button"
                aria-expanded="false"
              >
                {/* <i class="fa-solid fa-money-check"></i> */}
                <img src={IconoRecaudo} alt="Recaudo" />
                <span className="nav-link-text ms-2 ps-1">Dashboard</span>
              </a>
              <div className="collapse " id="pagesExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="dashboard"
                    >
                      <span className="sidenav-mini-icon"> C   </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Charts{" "}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#almacen"
                className="nav-link text-white"
                aria-controls="almacen"
                role="button"
                aria-expanded="false"
              >
                {/* <i class="fa-solid fa-warehouse"></i> */}
                <img src={IconoAlmacen} alt="almacen" />
                <span className="nav-link-text ms-2 ps-1">Solped</span>
              </a>
              <div className="collapse" id="almacen">
                <ul className="nav ">
                  <li className="nav-item active">
                    <Link
                      to="almacen/creacion-articulo"
                      className="nav-link text-white"
                    >
                      <span className="sidenav-mini-icon"> N </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Nueva Solped{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/dashboards/discover.html"
                    >
                      <span className="sidenav-mini-icon"> H </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Historial Pedidos{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/dashboards/sales.html"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Solped Analytics{" "}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#applicationsExamples"
                className="nav-link text-white "
                aria-controls="applicationsExamples"
                role="button"
                aria-expanded="false"
              >
                {/* <i class="fa-solid fa-magnifying-glass-chart"></i> */}
                <img src={IconoSeguimientoPlanes} alt="Seguimiento planes" />
                <span className="nav-link-text ms-2 ps-1">Orden de Compra</span>
              </a>
              <div className="collapse " id="applicationsExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/crm.html"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Analytics{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/kanban.html"
                    >
                      <span className="sidenav-mini-icon"> H </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Historial{" "}
                      </span>
                    </a>
                  </li>
                  
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#conservacion"
                className="nav-link text-white"
                aria-controls="conservacion"
                role="button"
                aria-expanded="false"
              >
                {/* <i className="fas fa-sharp fa-solid fa-seedling"></i> */}
                <img src={IconoConservacion} alt="Conservacion" />
                <span className="nav-link-text ms-2 ps-1">Resumen</span>
              </a>
              <div className="collapse" id="conservacion">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Gestor-vivero"
                    >
                      {/* <i
                        className="fas fa-solid fa-leaf"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoGestorVivero} alt="Gestor vivero" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Gestor Vivero <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Gestor-vivero">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestorvivero/agregarvivero"
                          >
                            {/* <span className="sidenav-mini-icon"> A </span> */}
                            <img
                              src={IconoAgregarVivero}
                              className="sidenav-mini-icon"
                              alt="Agregar vivero"
                            />
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Agregar Vivero{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestorvivero/editarvivero"
                          >
                            {/* <span className="sidenav-mini-icon"> E </span> */}
                            <img src={IconoEditarVivero} alt="Editar vivero" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Editar Vivero{" "}
                            </span>
                          </Link>
                        </li>
                        {/* <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/profile/messages.html"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Inventario{" "}
                            </span>
                          </a>
                        </li> */}
                        <li className="nav-item ">
                          <a
                            className="nav-link text-white "
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            href="#inventario"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Inventario{" "}
                            </span>
                          </a>
                          <div className="collapse " id="inventario">
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/propagacion"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Propagacion{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/produccionpropia"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Produccion propia{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Plantas en cuarentena{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Compensacion{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/donacion"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Donacion{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Medidas de resarcimiento{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Insumos{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Herramientas{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Disponible Material Vegetal{" "}
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#GestorMaterialVegetal"
                    >
                      {/* <i
                        className="fa fa-brands fa-pagelines"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img
                        src={IconoGMaterialVegetal}
                        alt="G. Material vegetal"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        G. material vegetal <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="GestorMaterialVegetal">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> p </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Produccion propia
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> M </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Material vegetal sembrado
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> E </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Editar material vegetal
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Cuarentena material vegetal
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> A </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Activar material vegetal
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Produccion"
                    >
                      {/* <i
                        className="fa fa-solid fa-gears"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoProduccion} alt="Produccion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Produccion <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Produccion">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/account/settings.html"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Control y seguimiento de <br /> material vegetal
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/account/billing.html"
                          >
                            <span className="sidenav-mini-icon"> E </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Etapas de material vegetal
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#projectsExample"
                    >
                      {/* <i
                        className="fa-solid fa-arrow-up-right-from-square"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoSolicitudes} alt="Solicitudes" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        solicitudes de <br />
                        material vegetal
                      </span>
                    </a>
                    <div className="collapse " id="projectsExample">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/projects/general.html"
                          >
                            <span className="sidenav-mini-icon"> G </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitudes realizadas <br />a vivero
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/projects/timeline.html"
                          >
                            <span className="sidenav-mini-icon"> T </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Historial de solicitudes
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/projects/new-project.html"
                          >
                            <span className="sidenav-mini-icon"> N </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Consulta de informes <br />
                              de caracterizacion
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Distrubucion"
                    >
                      {/* <i
                        className="fa-solid fa-truck"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoDistribucion} alt="Distribucion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Distrubucion
                      </span>
                    </a>
                    <div className="collapse " id="Distrubucion">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-default.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de material <br />
                              vegetal
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Mover material vegetal
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Historial de movimientos
                            </span>
                          </a>
                        </li>

                        <li className="nav-item ">
                          <a
                            className="nav-link text-white "
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            href="#entregaDeMaterial"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Entrega de material <br />
                              vegetal
                            </span>
                          </a>
                          <div className="collapse " id="entregaDeMaterial">
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/propagacion"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Material vegetal entregado
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/produccionpropia"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Material vegetal pendiente
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Cronograma"
                    >
                      {/* <i
                        className="fa-solid fa-calendar-days"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoCronograma} alt="Cronograma" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Cronograma
                      </span>
                    </a>
                    <div className="collapse " id="Cronograma">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion-cronograma-calendario"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Calendario{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Info{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Reportes"
                    >
                      {/* <i
                        className="fa-regular fa-file"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoReportes} alt="Reportes" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Reportes <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Reportes">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-default.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Default{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Info{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Configuracion"
                    >
                      {/* <i
                        className="fa-solid fa-sliders"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img src={IconoConfiguracion} alt="Configuracion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Configuracion <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Configuracion">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-default.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Default{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Info{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#CentroNotificaciones"
                    >
                      {/* <i
                        className="fa-solid fa-bell"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
                      <img
                        src={IconoCentroNotificacion}
                        alt="Centro de notificaciones"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Centro de <br />
                        Notificaciones <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="CentroNotificaciones">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-default.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Default{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Info{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </Scrollbars>
    </aside>
  );
};
export default Aside;
