import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { withLoading } from "@src/hocs/withLoading.hoc";
import ProductListPage from "@src/pages/productList";
import ProductForm from "@src/pages/productList/create";
import ProductDetail from "@src/pages/productList/detail";
import VariantForm from "@src/pages/productList/detail/variantList/create";

const ServerErrorPage = React.lazy(() => import("@src/pages/ServerErrorPage"));
const Error404Page = React.lazy(() => import("@src/pages/Error404Page"));

export const DASHBOARD_PATH = "/";
export const CREATE_PATH = "/create";
export const UPDATE_PATH = "/update";

export const PRODUCTS_PATH = `/products`;
export const PRODUCT_DETAIL_PATH = ":productId";

export const CREATE_PRODUCT_PATH = `${PRODUCTS_PATH}${CREATE_PATH}`;

export const FULL_UPDATE_PRODUCT_PATH = `${PRODUCTS_PATH}/:productId${UPDATE_PATH}`;

export const VARIANTS_PATH = `/variants`;
export const CREATE_VARIANT_PATH = `${VARIANTS_PATH}${CREATE_PATH}`;
export const FULL_CREATE_VARIANT_PATH = `:productId${CREATE_VARIANT_PATH}`;
export const FULL_UPDATE_VARIANT_PATH = `:productId${VARIANTS_PATH}/:variantId${UPDATE_PATH}`;

const ProductsDashboard = withLoading(ProductListPage);
const CreateOrUpdateProduct = withLoading(ProductForm);
const CreateOrUpdateVariant = withLoading(VariantForm);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={DASHBOARD_PATH}>
          <Route index element={<ProductsDashboard />} />
          <Route path={PRODUCT_DETAIL_PATH} element={<ProductDetail />} />
          <Route
            path={CREATE_PRODUCT_PATH}
            element={<CreateOrUpdateProduct />}
          />
          <Route
            path={FULL_UPDATE_PRODUCT_PATH}
            element={<CreateOrUpdateProduct />}
          />
          <Route
            path={FULL_CREATE_VARIANT_PATH}
            element={<CreateOrUpdateVariant />}
          />
          <Route
            path={FULL_UPDATE_VARIANT_PATH}
            element={<CreateOrUpdateVariant />}
          />
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
