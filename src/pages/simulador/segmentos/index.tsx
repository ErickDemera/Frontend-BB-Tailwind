import { ListaSegmentos } from "@/components/simulador/productos/ListaSegmentos";
import { Layout } from "../../../components/layout/index";

export default function Index() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen p-4">
      <ListaSegmentos />
      </div>
    </Layout>
  );
}
