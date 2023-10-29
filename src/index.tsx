import "./styles/globals.css";

import ReactDOM from "react-dom/client";
import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Component as RootComponent, ErrorBoundary as RootErrorBoundary } from "./pages/root";
import { Component as HomePageComponent, loader as homepageLoader } from "./pages/homepage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route
                path="/"
                element={<RootComponent />}
                errorElement={<RootErrorBoundary />}
            >
                <Route
                    index
                    element={<HomePageComponent />}
                    loader={homepageLoader}
                />
                <Route
                    path=":countryName"
                    lazy={() => import("./pages/[country]")}
                />
            </Route>
        </React.Fragment>
    ),
    {
        future: {
            v7_normalizeFormMethod: true,
        }
    }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <footer className="container"></footer>
    </React.StrictMode>
);
