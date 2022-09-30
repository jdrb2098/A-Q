import Select from "react-select";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function ProduccionPropiaJohn() {
  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

  let gridApi;
  const columnDefs = [
    {
      headerName: "Nombre común",
      field: "nombreComun",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
    },
    {
      headerName: "Nombre científico",
      field: "nombreCientifico",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
    },
    {
      headerName: "Viveros",
      field: "viveros",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
    },
    {
      headerName: "Producción < 30",
      field: "produccion",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value > 0) {
          return { color: "red", backgroundColor: "yellow" };
        }
        return null;
      },
    },
    {
      headerName: "Disponible en vivero > 30",
      field: "disponibleVivero",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value > 0) {
          return { color: "white", backgroundColor: "green" };
        }
        return null;
      },
    },
    {
      headerName: "Mortalidad",
      field: "mortalidad",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value > 0) {
          return { color: "white", backgroundColor: "red" };
        }
        return null;
      },
    },
    {
      headerName: "Total",
      field: "total",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
    },
    {
      headerName: "Accion",
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

  const rowData = [
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 550,
      disponibleVivero: 300,
      mortalidad: 500,
      total: 350,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 501,
      disponibleVivero: 0,
      mortalidad: 500,
      total: 501,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 0,
      disponibleVivero: 300,
      mortalidad: 0,
      total: 300,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 300,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 2017,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 1,
      mortalidad: 2,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 230,
      disponibleVivero: 300,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 300,
      mortalidad: 0,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 2000,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 34,
      disponibleVivero: 7,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 0,
      mortalidad: 200,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 0,
      disponibleVivero: 300,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 300,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 30,
      disponibleVivero: 0,
      mortalidad: 1,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 300,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 2000,
      disponibleVivero: 300,
      mortalidad: 2,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 1,
      disponibleVivero: 2,
      mortalidad: 500,
      total: 1100,
    },
    {
      nombreComun: "Rahul",
      nombreCientifico: 19,
      viveros: 9876543210,
      produccion: 4,
      disponibleVivero: 300,
      mortalidad: 0,
      total: 1100,
    },
  ];
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: false,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div className="min-vh-100">
      <div className="row">
        <div className="col col-lg-10 col-md-10 col-12 mx-auto">
          <h3 className="text-center my-4">Producción Propia</h3>
        </div>
      </div>
      <div class="card col-lg-10 col-md-10 col-12 mx-auto">
        <form className="multisteps-form__form">
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="my-3">
              <h5 className="font-weight-bolder border-radius-xl my-2">
                Produccion propia por vivero
              </h5>
            </div>
            <div className="my-4">
              <label>Seleccione vivero</label>
              <div className="col-sm-3 text-xxs">
                <Select placeholder="Seleccione vivero" />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col mx-auto d-flex justify-content-end flex-column align-items-start">
                <label>Crear producto nuevo</label>
                <button className="btn btn-primary mx-4 btn-sm text-xxs text-capitalize">
                  Crear
                </button>
              </div>
              {/*<div className="col mx-auto d-flex flex-column align-items-center justify-content-center">
                  <h6 className="font-weight-bolder text-xs">
                    Editar material vegetal
                  </h6>
                  <button className="btn btn-primary btn-sm text-xxs text-capitalize">
                    Editar
                  </button>
                </div>*/}
            </div>

            <div className="ag-theme-alpine my-3" style={{ height: "500px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>

            <div className="row">
              <div className="col mx-auto d-flex justify-content-end flex-column align-items-end">
                <span>
                  <label>Producción &#60; 30: &#32;</label>
                  <label>500</label>
                  <label className="ms-3">
                    Disponible en vivero &#62; 30: &#32;
                  </label>
                  <label>1200</label>
                  <label className="ms-3">Mortalidad: &#32;</label>
                  <label>1100</label>
                  <label className="ms-3">Total: &#32;</label>
                  <label>1200</label>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProduccionPropiaJohn;