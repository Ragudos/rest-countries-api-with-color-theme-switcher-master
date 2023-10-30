import { useLoaderData, type LoaderFunctionArgs, Await, defer } from "react-router-dom";
import React from "react";
import styles from "./styles.module.css";
import Search from "@/components/search";
import ErrorSectionOfCountries from "../../components/country/error";
import SectionOfCountries from "../../components/country";
import Loading from "@/components/country/loading";
import Select from "@/components/select";

export const loader = async({ request }: LoaderFunctionArgs) => {
	return defer({ response: fetch("https://restcountries.com/v3.1/all", {
		headers: {
			"Content-Type": "application/json"
		},
		signal: request.signal,
		method: "GET"
	}) });
};

export const Component: React.FC = () => {
	const { response } = useLoaderData() as { response: Promise<Response> };

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
					resolve={response}
					errorElement={<ErrorSectionOfCountries />}
				>
					<SectionOfCountries />
				</Await>
			</React.Suspense>
		</React.Fragment>
	);
};

Component.displayName = "HomePage";
