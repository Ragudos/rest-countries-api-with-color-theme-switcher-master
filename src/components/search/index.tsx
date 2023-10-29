import React from "react";
import styles from "./styles.module.css";
import Observer from "@/lib/observer";

const listener = new Observer("");

const Search: React.FC = () => {
    return (
        <div className={styles.inputContainer}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            <input
                type="text"
                placeholder="Search for a country..."
                className={styles.input}
                onChange={(e) => {
                    listener.update(e.target.value);
                }}
            />
        </div>
    );
};

export { listener };
export default React.memo(Search);
