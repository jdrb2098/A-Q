import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import Modal from "../../../components/Modal";

const options = [
  { label: "Todos", value: "All" },
  { label: "Villavicencio", value: "VLL" },
  { label: "Yopal", value: "YP" },
];

const dataPrueba = {
  VLL: {
    name: "La bella",
    location: "Villavicencio, cuarta división del ejercito",
    geoLocation: [
      {
        lat: `4"5'7.428"`,
        long: `4"5'7.428"`,
      },
      {
        lat: `4"5'7.428"`,
        long: `4"5'7.428"`,
      },
      {
        lat: `4"5'7.428"`,
        long: `4"5'7.428"`,
      },
    ],
    plantsQuantity: 4400,
    plantsQuantityForType: [
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 300,
      },
      {
        "Nombre Común": "Algarrobo",
        "Nombre Científico": "Himenea Courbaril",
        "Cantidad total": 200,
      },
      {
        "Nombre Común": "Bucaro",
        "Nombre Científico": "Erythrina fusca",
        "Cantidad total": 500,
      },
      {
        "Nombre Común": "Canafistol",
        "Nombre Científico": "Cassia grandis L.F.",
        "Cantidad total": 100,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 600,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 600,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 600,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 600,
      },
    ],
  },
  YP: {
    name: "Paz de ariporo",
    location: "Yopal, segunda division del ejercito",
    geoLocation: [
      {
        lat: `5"7'8.528"`,
        long: `5"7'8.528"`,
      },
      {
        lat: `5"7'8.528"`,
        long: `5"7'8.528"`,
      },
      {
        lat: `5"7'8.528"`,
        long: `5"7'8.528"`,
      },
    ],
    plantsQuantity: 1700,
    plantsQuantityForType: [
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 300,
      },
      {
        "Nombre Común": "Algarrobo",
        "Nombre Científico": "Himenea Courbaril",
        "Cantidad total": 200,
      },
      {
        "Nombre Común": "Bucaro",
        "Nombre Científico": "Erythrina fusca",
        "Cantidad total": 500,
      },
      {
        "Nombre Común": "Canafistol",
        "Nombre Científico": "Cassia grandis L.F.",
        "Cantidad total": 100,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 600,
      },
    ],
  },
};

const columnDefs = [
  { headerName: "Nombre Común", field: "Nombre Común" },
  { headerName: "Nombre Científico", field: "Nombre Científico" },
  { headerName: "Cantidad total", field: "Cantidad total" },
];

const defaultColDef = {
  sortable: true,
  editable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  suppressMovable: true,
};

const defaultColDef2 = {
  resizable: true,
  editable: true,
  sortable: true,
  flex: 1,
  initialWidth: 100,
  suppressMovable: true,
};

const columnDefs2 = [
  { headerName: "Latitud", field: "lat" },
  { headerName: "Longitud", field: "long" },
];

const onGridReady = (params) => {
  const gridApi = params.api;
  return gridApi;
};

const EditarViveroScreen = () => {
  const [currentSelectValue, setCurrentSelectValue] = useState("All");
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const getTotalPlants = () => {
    let totalPlants = 0
    const keysDataPrueba = Object.keys(dataPrueba)
    keysDataPrueba.forEach(keyData => {
      totalPlants = totalPlants + dataPrueba[keyData].plantsQuantity 
    })
    return totalPlants
  }

  const getTotalPlantsBySpecies = () => {
    const totalPlantsBySpecies = []
    const keysDataPrueba = Object.keys(dataPrueba)
    keysDataPrueba.forEach(keyData => {
      totalPlantsBySpecies.push(...dataPrueba[keyData].plantsQuantityForType)
    })
    return totalPlantsBySpecies
  }
  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Panel de control</h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h5 className="font-weight-bolder mt-2">
            Seleccione el vivero para visualización de información
          </h5>
          <div className="row">
            <div className="col-6 mt-2">
              <Select
                options={options}
                onChange={(e) => setCurrentSelectValue(e.value)}
                placeholder="Seleccione"
              />
            </div>
          </div>
          {/* Renderizado condicional para el caso de Todos los datos */}
          {currentSelectValue !== "All" && (
            <>
              <label className="mt-5 fw-bold fs-6 d-block">
                Nombre del vivero:{" "}
                <span className="fw-normal">
                  {dataPrueba[currentSelectValue]?.name}
                </span>
              </label>
              <label className="mt-4 fw-bold fs-6 d-block">
                Ubicación del vivero:{" "}
                <span className="fw-normal">
                  {dataPrueba[currentSelectValue]?.location}
                </span>
              </label>
              <label className="text-center mt-4 fw-bold fs-6 d-block">
                Ubicación geográfica
              </label>
              {/* Aqui va la tabla de lat y long */}
              <div id="myGrid" className="ag-theme-alpine">
                <div
                  className="container ag-theme-alpine"
                  style={{ height: "177px", width: "300px" }}
                >
                  <AgGridReact
                    className="ag-theme-alpine"
                    animateRows="true"
                    columnDefs={columnDefs2}
                    defaultColDef={defaultColDef2}
                    rowData={dataPrueba[currentSelectValue]?.geoLocation}
                  />
                </div>
              </div>
            </>
          )}
          <label className="text-center mt-4 fw-bold fs-6 d-block">
            Numero total de plantas:{" "}
            <span className="fw-normal">
              {currentSelectValue === "All" ? getTotalPlants() : dataPrueba[currentSelectValue]?.plantsQuantity}
            </span>
          </label>
          <label className="text-center mt-4 fw-bold fs-6 d-block">
            Numero total de plantas por especie
          </label>
          {/* Aqui va la tabla de plantas por especie */}
          <div id="myGrid" className="ag-theme-alpine">
            <div className="ag-theme-alpine" style={{ height: "400px" }}>
              <AgGridReact
                className="ag-theme-alpine"
                columnDefs={columnDefs}
                rowData={currentSelectValue === "All" ? getTotalPlantsBySpecies() : dataPrueba[currentSelectValue]?.plantsQuantityForType}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
          <div className="d-flex">
            <button
              className="btn bg-gradient-primary mt-3 ms-auto"
              onClick={handleOpenModal}
            >
              Detalle vivero
            </button>
          </div>
          {/*Renderizado del modal*/}
          <Modal title={"Tablero de control"}>
            <h5 className="font-weight-bolder mt-2">
              Instalaciones del vivero
            </h5>
            <div className="row">
              <div className="col-12 col-md-6 mt-2">
                <label className="fw-bold">Tipo de vivero: </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>Mega vivero</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">Medio de creación de vivero: </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>Recursos propios de la corporación</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">Coordinador de vivero: </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>***********************</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">Viverista: </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>***********************</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">Area del vivero: </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>300 m2</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">Area de propagación: </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>300 m2</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">
                  Area de preparación de sustrato:{" "}
                </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>20 m2</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">
                  Cantidad de areas de embolsado:{" "}
                </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>20 m2</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">
                  Area de las eras de producción:{" "}
                </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>200 m2</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">
                  Cantidad de bodegas en el vivero:{" "}
                </label>
              </div>
              <div className="col-12 col-md-6 ">
                <label>3</label>
              </div>
              <div className="col-12 col-md-6">
                <label className="fw-bold">
                  Documentación adjunta con el vivero:{" "}
                </label>
              </div>
              <div className="col-12 col-md-6 row gap-2">
                <div className="col-3 text-center">
                  <i className="fa-solid fa-file fs-3 d-block"></i>
                  <label className="d-block m-0">Contratos</label>
                </div>
                <div className="col-3 text-center">
                  <i className="fa-solid fa-file fs-3 d-block"></i>
                  <label className="d-block m-0">
                    Acta de recibimiento de vivero
                  </label>
                </div>
                <div className="col-3 text-center">
                  <i className="fa-solid fa-file fs-3 d-block"></i>
                  <label className="d-block m-0">Planos de vivero</label>
                </div>
              </div>
            </div>
            <button className="btn bg-gradient-primary d-flex ms-auto mt-2">
              Descargar todos los documentos
            </button>
            <div className="d-flex justify-content-end">
              <button
                className="btn bg-gradient-danger mt-3"
                onClick={handleCloseModal}
              >
                Cerrar modal
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default EditarViveroScreen;
