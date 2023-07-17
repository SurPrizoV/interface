import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { Login } from "../../pages/Login/Login";
import { NotFound } from "../../pages/NotFound/NotFound";
import { WorkOrders } from "../../pages/WorkOrders/WorkOrders";
import { EditOrder } from "../../pages/EditOrder/EditOrder";
import { Product } from "../../pages/Product/Product";

export const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login/>}
      />
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/" element={<WorkOrders />} />
        <Route path="/edit_order/:id" element={<EditOrder />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
