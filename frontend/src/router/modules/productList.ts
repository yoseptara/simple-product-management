import { DashboardOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "@src/layout";

const routes: AppRouteRecordRaw[] = [
  {
    path: "/product-list",
    id: "product-list",
    Component: ContainerLayout,
    meta: {
      sort: 1,
      title: "Product List",
      icon: createElement(DashboardOutlined),
    },
    children: [
      {
        index: true,
        id: "product-list_index",
        lazy: async () => {
          const mod = await import("@src/pages/productList");
          return {
            ...mod,
            Component: mod.default,
          };
        },
        meta: {
          title: "Product List",
          icon: createElement(DashboardOutlined),
        },
      },
    ],
  },
];

export default routes;
