import { Await, defer, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import React from "react";
import styles from "./styles.module.css";
import Error from "./error";
import Section from "./section";
import { Country } from "@/types";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { countryName } = params as { countryName: string };

    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.trim().toLowerCase()}?fullText=true`, {
        headers: {
            "Content-Type": "application/json",
        },
        signal: request.signal,
        method: "GET",
    });

    return defer({ country: response.json() });
};

export const Component: React.FC = () => {
    const { country } = useLoaderData() as { country: Country[] };

    return (
        <React.Fragment>
            <div className={styles.header}>
                <button
                    type="button"
                    className={styles.button}
                    aria-label="Go back"
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back
                </button>
            </div>

           <React.Suspense>
                <Await
                    resolve={country}
                    errorElement={<Error />}
                >
                    <Section />
                </Await>
           </React.Suspense>
        </React.Fragment>
    );
};

Component.displayName = "CountryDetailsPage";
