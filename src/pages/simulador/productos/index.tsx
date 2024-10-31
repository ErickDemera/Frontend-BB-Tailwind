import { Layout } from "../../../components/layout/index";
import { ListaProductos } from "../../../components/simulador/productos/ListaProductos";

export default function Index() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen p-4">
      <ListaProductos />
      </div>
    </Layout>
  );
}
