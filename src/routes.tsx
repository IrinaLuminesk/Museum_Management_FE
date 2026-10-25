import { createBrowserRouter } from "react-router-dom";
import Layout from "./scenes/global/Layout";
import Loading from "./scenes/global/Loading";
import RouteError from "./scenes/global/RouteError";
import masterdataRoutes from "./modules/masterData/masterData.routes";
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                HydrateFallback: Loading,
                errorElement: <RouteError />,
                lazy: async () => {
                    const { default: Dashboard } = await import(
                        "./scenes/dashboard"
                    );
                    return { Component: Dashboard };
                },
            },

            ...masterdataRoutes,

            {
                path: "*",
                element: <RouteError />,
            },
        ],
    },
]);

export default router;