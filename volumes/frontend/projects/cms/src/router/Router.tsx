import React, {Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import {PoraboteLayout} from "@porabote";
import {PoraboteRouteErrorLayout} from "@porabote";
import MainDashboard from "@/modules/Dashboards/MainDashboard";
import AuthRouter from "@/modules/Auth/AuthRouter";
import PoraboteAuthLayout from "@packages/porabote/src/layouts/PoraboteAuthLayout/PoraboteAuthLayout";
import AuthRoute from "@porabote/middlewares/Auth/AuthRoute";
import AccessListRouter from "@/modules/AccessList/AccessListRouter";
import NavsRouter from "@/modules/Navs/NavsRouter";
import AdminRouter from "@/modules/Admin/AdminRouter";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter><PoraboteLayout/></PrivateRouter>,
        errorElement: <PoraboteRouteErrorLayout/>,
        children: [
            {path: "/", element: <Suspense fallback={'Loading...'}><AuthRoute><MainDashboard/></AuthRoute></Suspense>},
            {
                path: '/access-lists/:action?/:id?',
                element: <Suspense fallback={'Loading...'}><AccessListRouter/></Suspense>
            },
            {path: '/navs/:action?/:id?', element: <Suspense fallback={'Loading...'}><NavsRouter/></Suspense>},
            {path: '/admin/:action?/:id?', element: <Suspense fallback={'Loading...'}><AdminRouter/></Suspense>}
        ],
    },
    {
        path: "/auth",
        element: <PoraboteAuthLayout/>,
        children: [
            {
                path: '/auth/:action?/:id?',
                element: <Suspense fallback={'Loading...'}><AuthRouter/></Suspense>
            },
        ]
    },
]);
export default router;
