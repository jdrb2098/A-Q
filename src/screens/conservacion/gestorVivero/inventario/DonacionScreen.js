import Select from "react-select";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const options = [
  { label: "Macarenia", value: "CL" },
  { label: "Villavicencio", value: "CL" },
  { label: "Mapiripan", value: "CL" },
  { label: "Todos", value: "CL" },
];

export const DonacionesScreen = () => {
  let gridApi;
  const columnDefs = [
    { headerName: "Nombre Comun", field: "Nombre Comun" },
    { headerName: "Nombre Cientifico", field: "Nombre Cientifico" },
    { headerName: "Viveros", field: "Viveros" },
    { headerName: "Total", field: "Total" },
  ];
  const rowData = [
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
  ];
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-8 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Inventario Donaciones</h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
        >
          {/*  Selecion  */}
          <label className="font-weight">Seleccione vivero</label>
          <div className="multisteps-form__content">
            <div className="row">
              <div className="col-12 col-sm-4">
                <Select placeholder="Seleccionar" options={options} />
              </div>
            </div>
          </div>
          {/*Suma de tabla*/}
          <div className="d-flex mt-4 px-4 justify-content-end">
            <div>
              <label type="number"> Total de plantas |</label>
            </div>
            <div>
              <label type="number" align="right">
                {" "}
                1460
              </label>
            </div>
          </div>
          {/*  Tabla  */}
          <div id="myGrid" className="ag-theme-alpine">
            <div className="ag-theme-alpine" style={{ height: "400px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
          {/*  BOTONES DE ABAJO  */}
          <div class="d-grid gap-2 d-flex justify-content-end  mt-3">
            <button
              className="btn bg-primary text-white me-md-2 text-capitalize"
              type="button"
              title="Send"
            >
              Limpiar
            </button>
            <button
              className="btn bg-danger text-white text-capitalize"
              type="button"
              title="Send"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DonacionesScreen;
