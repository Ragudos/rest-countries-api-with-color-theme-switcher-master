import { Country } from "@/types";
import { useAsyncValue } from "react-router-dom";
import { splitNumberByThree } from "@/lib/utils";
import styles from "./section.module.css";
import React from "react";

const Section: React.FC = () => {
    const response = useAsyncValue() as Response;
    const [country, setCountry] = React.useState<Country>();
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        response.json().then((data) => {
            setCountry(data[0]);
            setLoading(false);
        });
    }, [response]);

    return (
        <React.Fragment>
            {!country && !loading && (
                <div className={styles.notFound}>
                    <div>
                        <h1>
                            <strong>
                                Country Not Found
                            </strong>
                        </h1>
                        <p>
                            This country either does not exist or there is
                            a problem with our server. Please try again later.
                        </p>
                    </div>
                </div>
            )}

            {country && !loading && (
                <section aria-labelledby="country-name" className={styles.container}>
                    <div className={styles.img}>
                        <img
                            src={country.flags?.png || country.flags?.svg}
                            alt={country.flags?.alt}
                            width={500}
                            height={400}
                        />
                    </div>

                    <div className={styles.descriptionContainer}>
                        <h1 id="country-name" className={styles.title}>
                            <strong>
                                {country.name.common}
                            </strong>
                        </h1>

                        <div className={styles.listContainer}>
                            <ul className={styles.list}>
                                <li>
                                    <span className="semibold">
                                        Common Name:&nbsp;
                                    </span>
                                    {country.name.common}
                                </li>
                                <li>
                                    <span className="semibold">
                                        Population:&nbsp;
                                    </span>
                                    {splitNumberByThree(country.population)}
                                </li>
                                <li>
                                    <span className="semibold">
                                        Region:&nbsp;
                                    </span>
                                    {country.region}
                                </li>
                                <li>
                                    <span className="semibold">
                                        Sub Region:&nbsp;
                                    </span>
                                    {country.subregion}
                                </li>
                                <li>
                                    <span className="semibold">
                                        Capital:&nbsp;
                                    </span>
                                    {country.capital}
                                </li>
                            </ul>

                            <ul className={styles.list}>
                                <li>
                                    <span className="semibold">
                                        Top Level Domain:&nbsp;
                                    </span>
                                    {country.tld.join(", ")}
                                </li>

                                <li>
                                    <span className="semibold">
                                        Currencies:&nbsp;
                                    </span>
                                    {Object.keys(country.currencies).map((key) => {
                                        return country.currencies[key as keyof typeof country.currencies].name;
                                    }).join(", ")}
                                </li>
                                <li>
                                    <span className="semibold">
                                        Languages:&nbsp;
                                    </span>
                                    {Object.keys(country.languages).map((key) => {
                                        return country.languages[key as keyof typeof country.languages];
                                    }).join(", ")}
                                </li>
                            </ul>
                        </div>

                        {country.borders?.length > 0 && <div className={styles.borderContainer}>
                            <div className={`bold ${styles.borderTitle}`}>
                                Border Countries
                            </div>

                            <ul className={styles.borderList}>
                                {country.borders.map((item) => (
                                    <li>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>}
                    </div>
                </section>
            )}
        </React.Fragment>
    );
};

export default React.memo(Section);
