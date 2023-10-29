import type { Country } from "@/types";
import { useLoaderData, type LoaderFunctionArgs, Await, defer } from "react-router-dom";
import React from "react";
import styles from "./styles.module.css";
import Search from "@/components/search";
import ErrorSectionOfCountries from "../../components/country/error";
import SectionOfCountries from "../../components/country";
import Loading from "@/components/country/loading";
import Select from "@/components/select";

export const loader = async({ request }: LoaderFunctionArgs) => {
	const response = await fetch("https://restcountries.com/v3.1/all", {
		headers: {
			"Content-Type": "application/json"
		},
		signal: request.signal,
		method: "GET"
	});

	const countries = response.json();
	
	return defer({ countries });
};

export const Component: React.FC = () => {
	const { countries } = useLoaderData() as { countries: Country[] };

	return (
		<React.Fragment>
			<div className={styles.filterContainer}>
				<Search />
				<Select
					label="Filter by Region"
					list={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
					id="list-of-regions"
				/>
			</div>

			<React.Suspense fallback={<Loading />}>
				<Await
					resolve={countries}
					errorElement={<ErrorSectionOfCountries />}
				>
					<SectionOfCountries />
				</Await>
			</React.Suspense>
		</React.Fragment>
	);
};

Component.displayName = "HomePage";
