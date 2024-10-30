import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  productos: string;
  segmentos: string;
  cliente: string;
  saldoPromedio: number;
  numeroTrx: number;
  plazoReajuste: string;
  plazoContingentes: number;
  tasaIngresada: number;
  tarifaServicio: number;
}

export const RentabilidadForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [accion, setAccion] = useState<string>("");
  const [dataList, setDataList] = useState<FormValues[]>([]);

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setDataList([...dataList, { ...data, accion }]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 border border-gray-300 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Productos</label>
            <select {...register("productos", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="">Seleccione</option>
              <option value="Cartera Comercial">Cartera Comercial</option>
              <option value="ATC">ATC</option>
              <option value="Ahorros">Ahorros</option>
              <option value="Monetarios">Monetarios</option>
            </select>
            {errors.productos && <span className="text-red-500 text-sm">{errors.productos.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Segmentos</label>
            <select {...register("segmentos", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="">Seleccione</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Empresarial">Empresarial</option>
              <option value="Pymes">Pymes</option>
              <option value="No aplica">No aplica</option>
            </select>
            {errors.segmentos && <span className="text-red-500 text-sm">{errors.segmentos.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cliente</label>
            <select {...register("cliente", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="Empresa 1">Empresa 1</option>
              <option value="Empresa 2">Empresa 2</option>
              <option value="Empresa 3">Empresa 3</option>
              <option value="Empresa 4">Empresa 4</option>
            </select>
            {errors.cliente && <span className="text-red-500 text-sm">{errors.cliente.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Saldo Promedio</label>
            <input type="number" {...register("saldoPromedio", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.saldoPromedio && <span className="text-red-500 text-sm">{errors.saldoPromedio.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número Trx</label>
            <input type="number" {...register("numeroTrx", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.numeroTrx && <span className="text-red-500 text-sm">{errors.numeroTrx.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Plazo Reajuste</label>
            <select {...register("plazoReajuste", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="">Seleccione</option>
              <option value="1-29">1-29</option>
              <option value="30-60">30-60</option>
              <option value="61-90">61-90</option>
              <option value="No aplica">No aplica</option>
            </select>
            {errors.plazoReajuste && <span className="text-red-500 text-sm">{errors.plazoReajuste.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Plazo Contingentes</label>
            <input type="number" {...register("plazoContingentes", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.plazoContingentes && <span className="text-red-500 text-sm">{errors.plazoContingentes.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tasa Ingresada</label>
            <input type="number" {...register("tasaIngresada", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.tasaIngresada && <span className="text-red-500 text-sm">{errors.tasaIngresada.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tarifa Servicio</label>
            <input type="number" {...register("tarifaServicio", { required: "Campo obligatorio" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            {errors.tarifaServicio && <span className="text-red-500 text-sm">{errors.tarifaServicio.message}</span>}
          </div>
        </div>

        {/* Botón de acción */}
        <div className="flex justify-end mt-6">
          <button type="submit" className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
            Agregar
          </button>
        </div>
      </form>

      {/* Tabla para mostrar los datos ingresados */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {["Producto", "Segmento", "Cliente", "Saldo Promedio", "Número Trx", "Plazo Reajuste", "Plazo Contingentes", "Tasa Ingresada", "Tarifa Servicio"].map((header) => (
                <th key={header} className="py-2 px-4 border-b bg-gray-100 text-sm text-gray-700 text-center">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{item.productos}</td>
                <td className="py-2 px-4 border-b">{item.segmentos}</td>
                <td className="py-2 px-4 border-b">{item.cliente}</td>
                <td className="py-2 px-4 border-b">{item.saldoPromedio}</td>
                <td className="py-2 px-4 border-b">{item.numeroTrx}</td>
                <td className="py-2 px-4 border-b">{item.plazoReajuste}</td>
                <td className="py-2 px-4 border-b">{item.plazoContingentes}</td>
                <td className="py-2 px-4 border-b">{item.tasaIngresada}</td>
                <td className="py-2 px-4 border-b">{item.tarifaServicio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
