import "./styles/globals.css";

import ReactDOM from "react-dom/client";
import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Component as RootComponent, ErrorBoundary as RootErrorBoundary } from "./pages/root";
import { Component as HomePageComponent, loader as homepageLoader } from "./pages/homepage";
import { Component as CountryPageComponent, loader as countryLoader } from "./pages/[country]";

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route path="/" element={<RootComponent />} errorElement={<RootErrorBoundary />}>
                <Route index element={<HomePageComponent />} loader={homepageLoader} />
                <Route path="country/:countryName" element={<CountryPageComponent />} loader={countryLoader} />
            </Route>
        </React.Fragment>,
    ),
    {
        future: {
            v7_normalizeFormMethod: true,
        },
    },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <footer className="container">
            <div>
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend
                    Mentor</a>
                Coded by <a href="https://youtube.com/@programmers_sanctuary?si=eBEJ2GG7sEsiLUFT" target="_blank"
                    rel="noreferrer">Programmer's Sanctuary</a>
            </div>
        </footer>
    </React.StrictMode>,
);
