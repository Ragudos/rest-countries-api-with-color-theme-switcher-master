interface CapitalInfo {
    latlng: [number, number];
}

interface Car {
    side: "right" | "left";
    signs: string[];
}

interface CoatOfArms {
    png?: string;
    svg?: string;
    jpg?: string;
    webp?: string;
}

interface Currencies {
    UZS: {
        name: string;
        symbol: string;
    };
}

interface Demonyms {
    eng: {
        f: string;
        m: string;
    };
    fra: {
        f: string;
        m: string;
    };
}

interface Flags {
    alt: string;
    png?: string;
    svg?: string;
}

interface Country {
    altSpellings: string[];
    area: number;
    borders: string[];
    capital: string[];
    capitalInfo: CapitalInfo;
    car: Car;
    cca2: string;
    cca3: string;
    ccn3: string;
    cioc: string;
    coatOfArms: CoatOfArms;
    continents: string[];
    currencies: Currencies;
    demonyms: Demonyms;
    fifa: string;
    flag: string;
    flags: Flags;
    gini: {
        [key: `${number}${number}${number}${number}`]: number;
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    independent: boolean;
    landlocked: boolean;
    languages: {
        [key: string]: string;
    };
    latlng: [number, number];
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: string;
        };
    };
    population: number;
    postalCode: {
        format: string;
        regex: string;
    };
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
    unMember: boolean;
}

export type { Country };
