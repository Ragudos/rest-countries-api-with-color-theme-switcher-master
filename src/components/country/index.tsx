import type { Country } from "@/types";
import React from "react";
import { Link, useAsyncValue } from "react-router-dom";
import { listener as searchListener } from "../search";
import { listener as regionListener } from "../select";
import Fuse, { FuseResult } from "fuse.js";

import styles from "./styles.module.css";
import { splitNumberByThree } from "@/lib/utils";

const SectionOfCountries: React.FC = () => {
    const countries = useAsyncValue() as Country[];
    const [filteredCountries, setFilteredCountries] = React.useState<
        FuseResult<Country>[] | Country[]
    >(countries);
    const [category, setCategory] = React.useState<Country["region"]>();
    const [searchInput, setSearchInput] = React.useState("");

    const fuse = React.useMemo(() => {
        return new Fuse(countries, {
            shouldSort: true,
            keys: ["altSpellings", "capital", "name.common", "name.official", "region"],
        });
    }, [countries]);

    React.useEffect(() => {
        setFilteredCountries(() => {
            const filtered = searchInput ? fuse.search(searchInput) : countries;

            if (category) {
                return filtered.filter((country) => {
                    const result = country as FuseResult<Country>;
                    const data = result.item ?? result;

                    return data.region == category ? data : null;
                }) as Country[] | FuseResult<Country>[];
            }

            return filtered;
        });
    }, [searchInput, category, countries, fuse]);

    React.useEffect(() => {
        const unsubSearchListener = searchListener.subscribe((searchInput) => {
            setSearchInput(searchInput);
        });
        const unsubRegionListener = regionListener.subscribe((item) => {
            setCategory(item);
        });

        return () => {
            unsubRegionListener();
            unsubSearchListener();
        };
    }, []);

    return (
        <section className={styles.section}>
            <h2 className="sr-only">Section of countries</h2>

            {filteredCountries &&
                filteredCountries.map((country) => {
                    const result = country as FuseResult<Country>;
                    const data = result.item ?? result;

                    return (
                        <Link
                            to={`/country/${data.name.common}`}
                            aria-label={`Read more information about ${data.name.official}`}
                            title={`Read more information about ${data.name.official}`}
                            className={styles.card}
                            key={data.name.official}
                        >
                            <div className={styles.img}>
                                <img
                                    src={data.flags.png || data.flags.svg}
                                    alt={data.flags.alt}
                                    width={250}
                                    height={150}
                                    style={{ opacity: "0" }}
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;

                                        target.style.opacity = "1";
                                    }}
                                />
                            </div>

                            <div className={styles.metadata}>
                                <div>
                                    <strong>{data.name.official}</strong>
                                </div>

                                <ul className={styles.list}>
                                    <li>
                                        <span className="semibold">Population:&nbsp;</span>
                                        {splitNumberByThree(data.population)}
                                    </li>
                                    <li>
                                        <span className="semibold">Region:&nbsp;</span>
                                        {data.region}
                                    </li>
                                    <li>
                                        <span className="semibold">Capital:&nbsp;</span>
                                        {data.capital}
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    );
                })}
        </section>
    );
};

export default React.memo(SectionOfCountries);
