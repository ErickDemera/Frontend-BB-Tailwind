import { Layout } from "@/components/layout";
import { ListaProductos } from "@/components/simulador/productos/ListaProductos";
import React, { useState } from "react";


export default function Index() {
  return (
    <Layout>
      <ListaProductos />
    </Layout>
  );
}
