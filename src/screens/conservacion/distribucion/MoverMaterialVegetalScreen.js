import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export const MoverMaterialVegetalScreen = () => {
  const [selectedMover, setSelectedMover] = useState({});
  const opcMover = [
    { label: "Desde Almacen", value: "Desde" },
    { label: "Entre viveros", value: "Entre" },
    { label: "En el vivero", value: "En" },
  ];


  const [selectedVivero, setSelectedVivero] = useState({});
  const opcViv = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [selectedViveroOrigen, setSelectedViveroOrigen] = useState({});
  const opcVivOri = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [selectedViveroDestino, setSelectedViveroDestino] = useState({});
  const opcVivDes = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [rowData] = useState([
    {
      nombre: "Yopo",
      total: 2000,
    },
    {
      nombre: "Pomaroso",
      total: 4000,
    },
    {
      nombre: "Flor amarillo",
      total: 2000,
    },
    {
      nombre: "Flor morado",
      total: 3000,
    },
    {
      nombre: "Pala draga",
      total: 2000,
    },
    {
      nombre: "Abono",
      total: 5000,
    },
    {
      nombre: "Insecticida",
      total: "",
    },
    {
      nombre: "triple 15",
      total: "",
    },
    {
      nombre: "Tierra negra",
      total: "",
    },
    {
      nombre: "Arena",
      total: "",
    },
    {
      nombre: "Cascarilla",
      total: "",
    },
    {
      nombre: "Algarrobo",
      total: "",
    },
    {
      nombre: "Palmoriche",
      total: "",
    },
    {
      nombre: "Yopo",
      total: 2000,
    },
    {
      nombre: "Pomaroso",
      total: 4000,
    },
    {
      nombre: "Flor amarillo",
      total: 2000,
    },
    {
      nombre: "Flor morado",
      total: 3000,
    },
    {
      nombre: "Pala draga",
      total: 2000,
    },
    {
      nombre: "Abono",
      total: 5000,
    },
    {
      nombre: "Insecticida",
      total: 5000,
    },
    {
      nombre: "triple 15",
      total: 2000,
    },
    {
      nombre: "Tierra negra",
      total: 5000,
    },
    {
      nombre: "Arena",
      total: 4000,
    },
    {
      nombre: "Cascarilla",
      total: 3000,
    },
    {
      nombre: "Algarrobo",
      total: "",
    },
    {
      nombre: "Palmoriche",
      total: "",
    },
  ]);

  const [rowData2] = useState([
    {
      nombre2: "",
      total2: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Material solicitada", field: "nombre" },
    { headerName: "Cantidad", field: "total" },
  ];

  const columnDefs2 = [
    { headerName: "Material", field: "nombre2" },
    { headerName: "Cantidad", field: "total2" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button class="btn btn-2 btn-primary" type="button">
            Remover
          </button>
        </div>
      ),
    },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    floatingFilter: false,
    suppressMovable:true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Mover Material Vegetal</h3>
        <div className="card mt-5">
          <div className="row mt-3 mb-4">
            <div className="col px-6">
              <label>Tipo de movimiento</label>
              <Select
                defaultValue={selectedMover}
                onChange={setSelectedMover}
                options={opcMover}
                placeholder="Seleccionar"
              />
            </div>

            <div className="col px-6">
              <label>Fecha de movimiento:</label>
              <input type="date" value={native} onChange={onNativeChange} />
            </div>

            {selectedMover.value === "Desde" ?
            <div>
            <div className="row mt-3">
            

            <div className="col px-6">
              <label>Seleccionar vivero de destino</label>
              <Select
                defaultValue={selectedViveroDestino}
                onChange={setSelectedViveroDestino}
                options={opcVivDes}
                placeholder="Seleccionar"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col ms-5">
              <div
                className="ag-theme-alpine mt-4 mb-6 "
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  debounceVerticalScrollbar={true}
                  rowSelection={"single"}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
            <div
              className="col "
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label>Cantidad de material a mover</label>
              <input placeholder="Escribe la cantidad"></input>
              <div>
                <button
                  className="btn btn-2 btn-primary mt-4"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Mover
                </button>
              </div>
              <div>
                <button
                  className="btn btn-2 btn-primary"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Mover todo
                </button>
              </div>
              <div>
                <button
                  className="btn btn-2 btn-primary"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Remover todo
                </button>
              </div>
            </div>

            <div className="col me-5">
              <div
                className="ag-theme-alpine mt-4 mb-6"
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs2}
                  rowData={rowData2}
                  debounceVerticalScrollbar={true}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <button
                className="col btn btn-2 btn-danger ms-8 me-8  mb-5"
                type="button"
              
              >
                Cancelar
              </button>

              <button
                className="col btn btn-2 btn-primary ms-8 me-8 mb-5 "
                type="button"
       
              >
                Realizar movimiento
              </button>
            </div>
          </div>

            </div>
            : ""}


            {selectedMover.value === "Entre" ?
            <div>
            <div className="row mt-3">
            <div className="col px-6">
              <label>Seleccionar vivero de origen</label>
              <Select
                defaultValue={selectedViveroOrigen}
                onChange={setSelectedViveroOrigen}
                options={opcVivOri}
                placeholder="Seleccionar"
              />
            </div>

            <div className="col px-6">
              <label>Seleccionar vivero de destino</label>
              <Select
                defaultValue={selectedViveroDestino}
                onChange={setSelectedViveroDestino}
                options={opcVivDes}
                placeholder="Seleccionar"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col ms-5">
              <div
                className="ag-theme-alpine mt-4 mb-6 "
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  debounceVerticalScrollbar={true}
                  rowSelection={"single"}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
            <div
              className="col "
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label>Cantidad de material a mover</label>
              <input placeholder="Escribe la cantidad"></input>
              <div>
                <button
                  className="btn btn-2 btn-primary mt-4"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Mover
                </button>
              </div>
              <div>
                <button
                  className="btn btn-2 btn-primary"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Mover todo
                </button>
              </div>
              <div>
                <button
                  className="btn btn-2 btn-primary"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Remover todo
                </button>
              </div>
            </div>

            <div className="col me-5">
              <div
                className="ag-theme-alpine mt-4 mb-6"
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs2}
                  rowData={rowData2}
                  debounceVerticalScrollbar={true}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <button
                className="col btn btn-2 btn-danger ms-8 me-8  mb-5"
                type="button"
                style={{ width: "150px" }}
              >
                Cancelar
              </button>

              <button
                className="col btn btn-2 btn-primary ms-8 me-8 mb-5 "
                type="button"
                style={{ width: "150px" }}
              >
                Realizar movimiento
              </button>
            </div>
          </div>

            </div>
            :""}
            

            {selectedMover.value ==="En" ?
            <div>
            <div className="row mt-3">
            <div className="col px-6">
              <label>Seleccionar vivero</label>
              <Select
                defaultValue={selectedVivero}
                onChange={setSelectedVivero}
                options={opcViv}
                placeholder="Seleccionar"
              />
            </div>

            <div className="col px-6">
              
              
            </div>
          </div>
          <div className="row mt-2">
            <div className="col ms-5">
              <div
                className="ag-theme-alpine mt-4 mb-6 "
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  debounceVerticalScrollbar={true}
                  rowSelection={"single"}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
            <div
              className="col "
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label>Cantidad de material a mover</label>
              <input placeholder="Escribe la cantidad"></input>
              <div>
                <button
                  className="btn btn-2 btn-primary mt-4"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Mover
                </button>
              </div>
              <div>
                <button
                  className="btn btn-2 btn-primary"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Mover todo
                </button>
              </div>
              <div>
                <button
                  className="btn btn-2 btn-primary"
                  type="button"
                  style={{ width: "150px" }}
                >
                  Remover todo
                </button>
              </div>
            </div>

            <div className="col me-5">
              <div
                className="ag-theme-alpine mt-4 mb-6"
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs2}
                  rowData={rowData2}
                  debounceVerticalScrollbar={true}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <button
                className="col btn btn-2 btn-danger ms-8 me-8  mb-5"
                type="button"
                
              >
                Cancelar
              </button>

              <button
                className="col btn btn-2 btn-primary ms-8 me-8 mb-5 "
                type="button"
                
              >
                Realizar movimiento
              </button>
            </div>
          </div>

            </div>
            :""}

          </div>
          
        </div>
      </div>
    </div>
  );
};