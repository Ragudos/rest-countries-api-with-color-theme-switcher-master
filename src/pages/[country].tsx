import type { LoaderFunctionArgs } from "react-router-dom";
import React from "react";

export const loader = ({ request, params }: LoaderFunctionArgs) => {

    return fetch(`https://restcountries.com/v3.1/name/${params.countryName}`, {
        headers: {
            "Content-Type": "application/json"
        },
        signal: request.signal,
        method: "GET",
    });
};

export const Component: React.FC = () => {

    return (
        <React.Fragment>
            he
        </React.Fragment>
    );
};

Component.displayName = "CountryDetailsPage";
