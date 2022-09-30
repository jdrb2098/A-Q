import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const options = [
  { label: "Si", value: true },
  { label: "No", value: false },
];

const ProduccionPropiaScreen = () => {
  const { register, handleSubmit, control } = useForm();

  const submit = (data) => {
    console.log(data);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Configuración</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h5 className="font-weight-bolder">
            Configuración de notificaciones
          </h5>
          <label className="d-block mt-4">
            Notificaciones, alarmas y alertas:{" "}
          </label>
          {/* Primera configuracion select */}
          <div className="mt-4 row">
            <div className="col-12 col-sm-9">
              <label>
                Mostrar inmediatamente cuando se modifique el estado del
                material vegetal a:{" "}
              </label>
            </div>
            <div className="col-12 col-sm-3">
              <Controller
                name="option1"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    placeholder="Seleccione"
                  />
                )}
              />
            </div>
          </div>
          {/* Segunda configuracion select */}
          <div className="mt-4 row">
            <div className="col-12 col-sm-9">
              <label>
                Mostrar inmediatamente cuando se modifique el estado del
                material vegetal a:{" "}
              </label>
            </div>
            <div className="col-12 col-sm-3">
              <Controller
                name="option2"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    placeholder="Seleccione"
                  />
                )}
              />
            </div>
          </div>
          {/* Tercera configuracion select */}
          <div className="mt-4 row">
            <div className="col-12 col-sm-9">
              <label>
                Mostrar inmediatamente cuando se modifique el estado del
                material vegetal a:{" "}
              </label>
            </div>
            <div className="col-12 col-sm-3">
              <Controller
                name="option3"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    placeholder="Seleccione"
                  />
                )}
              />
            </div>
          </div>
          {/* Cuarta configuracion select */}
          <div className="mt-4 row">
            <div className="col-12 col-sm-9">
              <label>
                Mostrar inmediatamente cuando se modifique el estado del
                material vegetal a:{" "}
              </label>
            </div>
            <div className="col-12 col-sm-3">
              <Controller
                name="option4"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    placeholder="Seleccione"
                  />
                )}
              />
            </div>
          </div>
          {/* Configuracion porcentaje */}
          <div className="mt-3 row">
            <div className="col-12 col-sm-7">
              <label>
                Mostrar inmediatamente cuando se modifique el estado del
                material vegetal a:{" "}
              </label>
            </div>
            <div className="col-12 col-sm-5 d-flex align-items-start gap-1">
              <div className="input-group input-group-dynamic">
                {/* <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Escribir digitos de porcentaje
                </label> */}
                <input
                  className="multisteps-form__input form-control"
                  type="number"
                  {...register("option5")}
                  placeholder="Escribir digitos de porcentaje"
                />
              </div>
              <p className="pt-2 fw-bold">%</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="d-flex justify-content-end gap-4 mt-4">
            <button
              className="btn bg-gradient-danger mb-0"
              type="button"
              title="Send"
            >
              Cancelar
            </button>
            <button
              className="btn bg-gradient-primary mb-0"
              type="submit"
              title="Send"
              form="configForm"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProduccionPropiaScreen;
