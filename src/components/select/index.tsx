import Observer from "@/lib/observer";
import React from "react";
import styles from "./styles.module.css";

interface Props {
    list: string[];
    label: string;
    id: string;
}

const listener = new Observer("");

const Select: React.FC<Props> = ({ list, label, id }) => {
    const [activeData, setActiveData] = React.useState<`list-${(typeof list)[number]}`>();
    const [isActive, setIsActive] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleWindowClick = React.useCallback((e: MouseEvent) => {
        if (!containerRef.current) {
            return;
        }

        const el = containerRef.current;

        if (el == e.target) {
            return;
        }

        for (const child of document.getElementById(el.id)!.querySelectorAll("*")) {
            if (e.target == child) {
                return;
            }
        }

        setIsActive(false);
    }, []);

    React.useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, [isActive]);

    return (
        <div className={styles.container} ref={containerRef} id={`${id}-parent-container`}>
            <button
                type="button"
                aria-controls={id}
                aria-haspopup="listbox"
                aria-activedescendant={activeData}
                aria-expanded={isActive}
                aria-labelledby={`${id}-button-label`}
                className={styles.trigger}
                onClick={() => {
                    setIsActive((p) => {
                        return !p;
                    });
                }}
            >
                <span id={`${id}-button-label`}>{activeData?.split("list-")[1] || label}</span>
                <svg
                    aria-label="A chevron arrow pointing down to indicate the open status of the popup that shows a list of regions to filter what country is shown. This rotates by 180 degrees upon activation."
                    className={styles.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </button>

            <div data-hidden={!isActive} id={id} className={styles.listContainer}>
                <div className={styles.listWrapper}>
                    <ul
                        className={styles.list}
                        aria-label="List of regions to filter what country to show based on the chosen region"
                    >
                        {list.map((item, idx) => (
                            <li id={`list-${item}`} key={item + idx}>
                                <button
                                    type="button"
                                    aria-current={`list-${item}` == activeData}
                                    aria-label={`Only show countries in the region: ${item}`}
                                    tabIndex={isActive ? undefined : -1}
                                    onClick={() => {
                                        setActiveData((curr) => {
                                            if (curr == `list-${item}`) {
                                                listener.update("");

                                                return;
                                            } else {
                                                listener.update(item);

                                                return `list-${item}`;
                                            }
                                        });
                                        setIsActive(false);
                                    }}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export { listener };
export default React.memo(Select);
