import { createHashRouter } from "react-router-dom";

//前台
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./pages/WebsiteFrontEnd/Home";
import Products from "./pages/WebsiteFrontEnd/Products";
import SingleProduct from "./pages/WebsiteFrontEnd/SingleProduct";
import Cart from "./pages/WebsiteFrontEnd/Cart";
import Login from "./pages/WebsiteFrontEnd/Login";

//後台
import AdminLayout from "./layout/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";

//找不到
import NotFound from "./pages/WebsiteFrontEnd/NotFound";

export const router = createHashRouter([
    {
        path: "/",
        element: <FrontendLayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "products",
                    element: <Products />,
                },
                {
                    path: "SingleProduct/:id",
                    element: <SingleProduct />,
                },
                {
                    path: "cart",
                    element: <Cart />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
        ],
    },
    {
        path:"/admin",
        element: <AdminLayout />,
        children: [
            {
                path:"orders",
                element: <AdminOrders />
            },
            {
                path:"products",
                element: <AdminProducts />
            }
        ]
    },
    {
        path:"*",
        element: <NotFound />
    }
]);

export default router;