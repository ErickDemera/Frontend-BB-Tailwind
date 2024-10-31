import { Layout } from "../../../components/layout/index";
import { ListaTerms } from "@/components/simulador/productos/ListaPlazo";

export default function Index() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen p-4">
      <ListaTerms />
      </div>
    </Layout>
  );
}
