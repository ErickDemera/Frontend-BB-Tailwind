import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  tipoBusqueda: string;
  periodoConsulta: string;
  beneficiariosRot: string;
  grupoEconomico: string;
  seleccionEmpresas: string[];
}

export const FormProducto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [tipoBusqueda, setTipoBusqueda] = useState<string | null>(null);
  const [periodoConsulta, setPeriodoConsulta] = useState<string | null>(null);
  const [beneficiariosRot, setBeneficiariosRot] = useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    console.log({
      tipoBusqueda,
      periodoConsulta,
      beneficiariosRot,
      ...data
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-md border border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Tipo de búsqueda */}
          <label className="block text-gray-700">Tipo de Búsqueda:</label>
          <div className="flex space-x-4 mt-2">
            <button
              type="button"
              onClick={() => setTipoBusqueda("individual")}
              className={`px-4 py-2 rounded ${
                tipoBusqueda === "individual" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Cliente Individual
            </button>
            <button
              type="button"
              onClick={() => setTipoBusqueda("grupo")}
              className={`px-4 py-2 rounded ${
                tipoBusqueda === "grupo" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Grupo Económico
            </button>
          </div>
          {errors.tipoBusqueda && <span className="text-red-500">{errors.tipoBusqueda.message}</span>}
        </div>

        <div>
          {/* Periodo de Consulta */}
          <label className="block text-gray-700">Periodo de Consulta</label>
          <div className="flex space-x-4 mt-2">
            <button
              type="button"
              onClick={() => setPeriodoConsulta("actual")}
              className={`px-4 py-2 rounded ${
                periodoConsulta === "actual" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Corte Actual
            </button>
            <button
              type="button"
              onClick={() => setPeriodoConsulta("calendario")}
              className={`px-4 py-2 rounded ${
                periodoConsulta === "calendario" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Año Calendario
            </button>
          </div>
          {errors.periodoConsulta && <span className="text-red-500">{errors.periodoConsulta.message}</span>}
        </div>

        <div>
          {/* Beneficiarios Rot */}
          <label className="block text-gray-700">Beneficiarios Rot</label>
          <div className="flex space-x-4 mt-2">
            <button
              type="button"
              onClick={() => setBeneficiariosRot("yes")}
              className={`px-4 py-2 rounded ${
                beneficiariosRot === "yes" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setBeneficiariosRot("no")}
              className={`px-4 py-2 rounded ${
                beneficiariosRot === "no" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              No
            </button>
          </div>
          {errors.beneficiariosRot && <span className="text-red-500">{errors.beneficiariosRot.message}</span>}
        </div>

        <div>
          {/* Cliente / Grupo Económico */}
          <label className="block text-gray-700">Cliente / Grupo Económico</label>
          <input
            type="text"
            placeholder="Ingrese ID o nombre de empresa"
            {...register("grupoEconomico", { required: "Este campo es obligatorio" })}
            className={`mt-2 w-full p-2 border rounded ${errors.grupoEconomico ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.grupoEconomico && <span className="text-red-500">{errors.grupoEconomico.message}</span>}

          <div className="relative mt-2">
            <button
              type="button"
              className="w-full text-left px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm hover:bg-gray-100"
            >
              Seleccionar Empresa
            </button>
            <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 hidden">
              <button type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-100">Empresa 1</button>
              <button type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-100">Empresa 2</button>
              <button type="button" className="block w-full text-left px-4 py-2 hover:bg-gray-100">Empresa 3</button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Generar */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
        >
          Generar
        </button>
      </div>
    </form>
  );
};
