import React from "react";
import styles from "./styles.module.css";

const LoadingSectionOfCountries: React.FC = () => {
    return (
        <section aria-busy={true} className={styles.section}>
            {new Array(8).fill(0).map((_item, idx) => (
                <div key={idx} className={`skeleton ${styles.card}`}>
                    <div className={styles.img}></div>
                    <div className={styles.metadata}></div>
                </div>
            ))}
        </section>
    );
};

export default React.memo(LoadingSectionOfCountries);
