import { Layout } from "../../../components/layout/index";
import { ListaProductos } from "../../../components/simulador/productos/ListaProductos";

export default function Index() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-6"></h1>
        <ListaProductos />
      </div>
    </Layout>
  );
}
