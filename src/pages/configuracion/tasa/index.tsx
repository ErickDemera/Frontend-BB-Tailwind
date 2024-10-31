import { ListaTasas } from "@/components/simulador/configuracion/Tasa";
import { Layout } from "../../../components/layout/index";
export default function Index() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen p-4">
      <ListaTasas />
      </div>
    </Layout>
  );
}
