import React from "react";
import {createBrowserRouter} from "react-router-dom";
import RouteErrorPage from "@/modules/Layout/RouteErrorPage";
import DefaultLayout from "@/modules/Layout/DefaultLayout";
import HomePage from "@/modules/HomePage";
import ContentsPage from "@/modules/ContentsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        errorElement: <RouteErrorPage/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/contents/:alias/", element: <ContentsPage/>},
            // {path: "/contents/:alias/:id", element: <ContentContainer/>},
        ],
    },
]);

export default router;
