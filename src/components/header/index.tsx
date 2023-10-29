import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";

import { change_theme, subscribe_to_theme_changes } from "vanilla-theme";

const Header: React.FC = () => {
    const [theme, setTheme] = React.useState<"dark" | "light" | "system">();

    React.useEffect(() => {
        return subscribe_to_theme_changes((theme) => {
            setTheme(theme);
        });
    }, []);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <h1>
                    <Link to="/" className={styles.a}>
                        <strong>
                            Where in the world?
                        </strong>
                    </Link>
                </h1>

                <button
                    type="button"
                    aria-label="Change theme to dark mode"
                    aria-pressed={theme == "dark"}
                    className={styles.button}
                    onClick={() => {
                        change_theme(theme == "dark" ? "light" : "dark");
                    }}
                >
                    <svg className="fillOnDark" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>

                    Dark Mode
                </button>
            </div>
        </header>
    );
};

export default React.memo(Header);
