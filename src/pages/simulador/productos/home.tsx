import { FormProducto } from "@/components/simulador/productos/FormProducto";
import { Layout } from "../../../components/layout/index";
import { ListaProductos } from "../../../components/simulador/productos/ListaProductos";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">Gestión de Productos</h1>
        <FormProducto />
        <ListaProductos />
      </div>
    </Layout>
  );
}
