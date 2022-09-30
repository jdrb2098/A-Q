// import { addHours } from "date-fns";
import Select from "react-select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { AgGridReact } from "ag-grid-react";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
};

Modal.setAppElement("#root");

const options = [
  { label: "Con insumos del vivero", value: "ACI" },
  { label: "Del vivero", value: "AV" },
];

const optionsVivero = [
  { label: "Villavicencio", value: "V" },
  { label: "Puerto Lopez", value: "PL" },
  { label: "Mapiripan", value: "M" },
  { label: "La Macarena", value: "LM" },
  { label: "San Juan de Arama", value: "SJA" },
  { label: "Puerto Rico", value: "PR" },
];

const defaultColDef = {
  sortable: true,
  editable: false,
  flex: 1,
  filter: true,
  floatingFilter: false,
  suppressMovable: true,
};

const columnDefs = [
  { headerName: "Material", field: "nombre" },
  { headerName: "Cantidad", field: "total" },
];

const columnDefs2 = [
  { headerName: "Material", field: "nombre2" },
  { headerName: "Cantidad", field: "total2" },
];

const CalendarModal = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const [isOpen, setIsOpen] = useState(true);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState({
    tipoActividad: "",
    seleccioneVivero: "",
  });
  const [rowData2] = useState([
    {
      nombre2: "",
      total2: "",
    },
  ]);

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
  ]);

  const [formValues, setFormValues] = useState({
    fechaInicio: "",
    fechaFin: "",
  });

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onSubmitBuscar = (data) => {
    console.log("submitBuscar", data);
    setOpcionesSeleccionadas({
      tipoActividad: data.tipoActividad,
      seleccioneVivero: data.seleccioneVivero,
    });
  };

  const onSubmitForm = (data) => {
    console.log("submitForm", data);
    setFormValues({
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin
    })
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <h4> Nuevo evento </h4>
      <hr />
      <div className="container">
        <form className="row" onSubmit={handleSubmit(onSubmitBuscar)}>
          <div className="col-sm-6">
            <label className="form-control ms-0">
              Tipo de actividad <small className="text-danger">*</small>
            </label>
            <Controller
              name="tipoActividad"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Seleccionar"
                />
              )}
            />
            {errors.tipoActividad && (
              <small className="text-danger">Este campo es obligatorio</small>
            )}
          </div>
          <div className="col-sm-6">
            <label className="form-control ms-0">
              Seleccionar vivero <span className="text-danger">*</span>
            </label>
            <Controller
              name="seleccioneVivero"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsVivero}
                  placeholder="Seleccionar"
                />
              )}
            />
            {errors.seleccioneVivero && (
              <small className="text-danger">Este campo es obligatorio</small>
            )}
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button
              type="submit"
              className="mt-3 btn btn-primary flex-center text-capitalize"
            >
              Buscar
            </button>
          </div>
        </form>
        {opcionesSeleccionadas.tipoActividad &&
          opcionesSeleccionadas.seleccioneVivero && (
            <form onSubmit={handleSubmit2(onSubmitForm)}>
              <div className="row col-6">
                <div className="input-group input-group-dynamic flex-column">
                  <label htmlFor="exampleFormControlInput1">
                    Nombre de la actividad
                  </label>
                  <input
                    className="multisteps-form__input form-control p-2 w-auto"
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    // {...register("nombre", { required: true })}
                  />
                </div>
                {/* {errors.nombre && (
            <p className="text-danger">Este campo es obligatorio</p>
          )} */}
              </div>
              <div className="d-flex flex-row mt-3">
                <div className="input-group input-group-dynamic flex-column">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de inicio
                  </label>
                  <Controller
                    name="fechaInicio"
                    control={control2}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        selected={formValues.fechaInicio}
                        className="multisteps-form__input form-control p-2"
                        placeholderText="dd/mm/aaaa"
                        onSelect={(e) => setFormValues({...formValues, fechaInicio: e })}
                      />
                    )}
                  />
                </div>
                <div className="input-group input-group-dynamic flex-column ms-3">
                  <label htmlFor="exampleFormControlInput1">Fecha de fin</label>
                  <Controller
                    name="fechaFin"
                    control={control2}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        minDate={formValues.fechaInicio}
                        selected={formValues.fechaFin}
                        className="multisteps-form__input form-control p-2"
                        placeholderText="dd/mm/aaaa"
                        onSelect={(e) => setFormValues({...formValues, fechaFin: e })}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
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
                    ></AgGridReact>
                  </div>
                </div>
                <div
                  className="col-2 d-flex flex-column justify-content-center aling-items-center"
                  // style={{
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   flexWrap: "nowrap",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  // }}
                >
                  <div className="input-group input-group-dynamic flex-column">
                    <label htmlFor="exampleFormControlInput1">Cantidad</label>
                    <input
                      className="multisteps-form__input form-control p-2 mw-100 w-auto"
                      type="text"
                      placeholder="Nombre"
                      name="nombre"
                      // {...register("nombre", { required: true })}
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center aling-items-center">
                    <button
                      className="btn btn-2 btn-primary mt-4 text-capitalize"
                      type="button"
                    >
                      Mover&gt;
                    </button>
                    <button
                      className="btn btn-2 btn-primary text-capitalize"
                      type="button"
                    >
                      &lt;Remover
                    </button>
                  </div>
                </div>

                <div className="col">
                  <div
                    className="ag-theme-alpine mt-4 mb-6"
                    style={{ height: "500px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs2}
                      rowData={rowData2}
                      // debounceVerticalScrollbar={true}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary text-capitalize"
                >
                  <span> Guardar</span>
                </button>
              </div>
            </form>
          )}

        {/* <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div> */}
        {/* <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary text-capitalize">
            <span> Guardar</span>
          </button>
        </div> */}
      </div>
    </Modal>
  );
};
export default CalendarModal;
