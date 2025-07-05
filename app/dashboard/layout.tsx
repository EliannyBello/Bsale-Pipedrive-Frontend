import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React from "react";
import { Option } from "@/app/context/DashboardContext";

const pillColor = {
  agilizar: { color: "#2D9CDB" }, // azul cielo vibrante
  blueExpress: { color: "#7ceaf6" }, // azul cielo claro
  blueExpress2: { color: "#378ab8" }, // azul acero
  defontana: { color: "#FF5100" }, // naranja intenso / rojo anaranjado
  defontana2: { color: "#00D0CA" }, // turquesa brillante
  laudus: { color: "#416BA9" }, // azul acero / azul medio oscuro
  multivende: { color: "#2D9CDB" }, // azul cielo vibrante
  odoo: { color: "#714B67" }, // morado ciruela
  SAP: { color: "#0070f2" }, // azul electrico
  toteat: { color: "#FF7F50" }, // coral anaranjado
  shopify: { color: "#96BF48" }, // verde lima
};

const options: Option[] = [
  {
    name: "Bsale - Pipedrive",
    leftColor: pillColor.shopify.color,
    rightColor: pillColor.defontana.color,
    modules: [
      // { label: "Inicio", href: "/dashboard" },
      { label: "Clientes", href: "/dashboard/client" },
      { label: "Productos", href: "/dashboard/products" },
      { label: "Configuraciones", href: "/dashboard/configuraciones" },
    ],
  },
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout options={options}>{children}</DashboardLayout>;
}
