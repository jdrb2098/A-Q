import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import Modal from "../../../components/Modal";

const optionsMostrar = [
  { label: "Villavicencio", value: "VLL" },
  { label: "Yopal", value: "YP" },
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

const dataPrueba = [
  {
    "Numero de solicitud": "0001",
    "Nombre de profesional": "Juan Carlos",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "10/09/2022",
  },
  {
    "Numero de solicitud": "0002",
    "Nombre de profesional": "Juan David",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "12/09/2022",
  },
  {
    "Numero de solicitud": "0003",
    "Nombre de profesional": "Jesus Esteban",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "27/09/2022",
  },
  {
    "Numero de solicitud": "0004",
    "Nombre de profesional": "Santiago Aguirre",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "30/09/2022",
  },
  {
    "Numero de solicitud": "0005",
    "Nombre de profesional": "Marcos Rivera",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "01/09/2022",
  },
  {
    "Numero de solicitud": "0006",
    "Nombre de profesional": "Marcos Rivera",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "02/09/2022",
  },
  {
    "Numero de solicitud": "0007",
    "Nombre de profesional": "Sebastian Mendez",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "27/09/2022",
  },
  {
    "Numero de solicitud": "0008",
    "Nombre de profesional": "Carlos Barrios",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "04/09/2022",
  },
];

const dataPruebaModal = [
  {
    Objeto: "palo cruz",
    Viveros: "La bella",
    Cantidad: 500,
    "Cantidad entregada": "",
    Solicitante: "Profesional MV",
    "Fecha solicitud": "06/07/2022",
  },
  {
    Objeto: "palin",
    Viveros: "La bella",
    Cantidad: 10,
    "Cantidad entregada": "",
    Solicitante: "Profesional MV",
    "Fecha solicitud": "06/07/2022",
  },
  {
    Objeto: "triple 15",
    Viveros: "La bella",
    Cantidad: 50,
    "Cantidad entregada": "",
    Solicitante: "Profesional MV",
    "Fecha solicitud": "06/07/2022",
  },
];

const columnDefsModal = [
  { headerName: "Objeto", field: "Objeto" },
  { headerName: "Viveros", field: "Viveros" },
  { headerName: "Cantidad", field: "Cantidad" },
  { headerName: "Cantidad entregada", field: "Fecha solicitud" },
  { headerName: "Solicitante", field: "Solicitante" },
  { headerName: "Fecha solicitud", field: "Fecha solicitud" },
];

const EntregadosScreen = () => {
  const [viveroSelect, setViveroSelect] = useState(null);
  const [profesionalSelect, setProfesionalSelect] = useState(null);

  const [rowData, setRowData] = useState(dataPrueba);

  const refSelect = useRef();
  const dispatch = useDispatch();
  const getOptionsForSelects = (valueName) => {
    const dataOptionsAll = dataPrueba.map(
      (data) => data[valueName]
    );
    const dataOptionsWithoutFormat = dataOptionsAll.filter(
      (item, index) => dataOptionsAll.indexOf(item) === index
    );
    const dataOptions = dataOptionsWithoutFormat.map((data) => ({
      label: data,
      value: data,
    }));
    return dataOptions;
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const actionButton = (params) => {
    dispatch(activeModalAction());
    console.log(refSelect.current.props.value);
  };

  const columnDefs = [
    { headerName: "Numero de solicitud", field: "Numero de solicitud" },
    { headerName: "Nombre de profesional", field: "Nombre de profesional" },
    { headerName: "Vivero relacionado", field: "Vivero relacionado" },
    { headerName: "Fecha solicitud", field: "Fecha solicitud" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-primary mx-auto my-auto btn-sm text-xxs text-capitalize"
            onClick={() => actionButton(params)}
          >
            Editar
          </button>
        </div>
      ),
    },
  ];

  const filterBySelects = () => {
    if (viveroSelect === null && profesionalSelect === null) {
      return false;
    }

    const dataFilteredByVivero = dataPrueba.filter(
      (data) =>
        data["Vivero relacionado"] === viveroSelect || viveroSelect === "Todos"
    );

    const dataFilteredByProfesional = dataFilteredByVivero.filter(
      (data) =>
        data["Nombre de profesional"] === profesionalSelect ||
        profesionalSelect === "Todos"
    );

    setRowData(dataFilteredByProfesional);
  };

  const handleClickBuscar = () => {
    console.log("Estamos entrando");
    filterBySelects();
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-8 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Entregas Completadas</h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h5 className="font-weight-bolder mt-2">
            Seleccione la opción a mostrar
          </h5>
          <div className="row">
            <div className="col-12 col-md-6">
              <label>Vivero</label>
              <Select
                options={getOptionsForSelects("Vivero relacionado")}
                placeholder="Seleccione"
                onChange={(e) => setViveroSelect(e.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Profesional</label>
              <Select
                options={getOptionsForSelects("Nombre de profesional")}
                placeholder="Seleccione"
              />
            </div>
          </div>
          <button
            onClick={handleClickBuscar}
            className="btn bg-gradient-primary d-block ms-auto mt-3"
          >
            Buscar
          </button>

          <div id="myGrid" className="ag-theme-alpine mt-3">
            <div
              className="container ag-theme-alpine"
              style={{ height: "300px", maxWidth: "800px" }}
            >
              <AgGridReact
                className="ag-theme-alpine"
                animateRows="true"
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
              ></AgGridReact>
            </div>
          </div>
          <Modal title={"Entrega"}>
            <label className="mt-5 fw-bold fs-6 d-block">
              Numero de entrega: <span className="fw-normal">0000960</span>
            </label>
            <div className="row mt-3">
              <div className="col-12 col-md-6">
                <label className="fw-bold fs-6 d-block">
                  Documentación relacionada:
                </label>
              </div>
              <div className="col-12 col-md-6">
                <div className="col-3 text-center">
                  <i className="fa-solid fa-file fs-3 d-block"></i>
                  <label className="d-block m-0">Contratos</label>
                </div>
                <button className="btn bg-gradient-primary ms-auto d-block mt-3">
                  Anexar Documentación
                </button>
              </div>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-3">
              <div
                className="container ag-theme-alpine"
                style={{ height: "300px", maxWidth: "900px" }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  animateRows="true"
                  columnDefs={columnDefsModal}
                  rowData={dataPruebaModal}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
            <div className="input-group input-group-dynamic flex-column">
              <label htmlFor="exampleFormControlInput1">Observaciones:</label>
              <textarea
                disabled
                className="multisteps-form__input form-control w-auto"
                value={
                  "La solicitud se entrega a conformidad del profesional que recoge, no hubo ninguna anomalia en la entrega"
                }
              />
            </div>
            <label>
              Estos campos no son editables por seguridad de la información
            </label>
            <button
              className="btn bg-gradient-primary d-block ms-auto mt-3"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EntregadosScreen;
