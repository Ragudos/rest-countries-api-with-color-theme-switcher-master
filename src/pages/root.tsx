import { useRouteError, isRouteErrorResponse, Outlet } from "react-router-dom";
import React from "react";
import Header from "@/components/header";

export const Component: React.FC = () => {
    return (
        <React.Fragment>
            <Header />
            <main className="container">
                <Outlet />
            </main>
        </React.Fragment>
    );
};

Component.displayName = "HomePage";

export const ErrorBoundary = () => {
    const error = useRouteError() as Error | string;

    return (
        <React.Fragment>
            <main className="container">
                <div className="flex flex-col gap-8 container">
                    {isRouteErrorResponse(error) ? (
                        <div>
                            <h1>{error.status}</h1>
                            <p>{error.statusText}</p>
                        </div>
                    ) : (
                        <h1>{error instanceof Error ? error.message : error}</h1>
                    )}
                </div>
            </main>
        </React.Fragment>
    );
};
