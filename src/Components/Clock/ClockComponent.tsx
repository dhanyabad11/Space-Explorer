import React, { useEffect, useState } from "react";
import styles from "./ClockComponent.module.scss";
import dayjs from "dayjs";
import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";

export const Clock: React.FC = () => {
    const [time, setTime] = useState<string>(dayjs().format("HH:mm:ss"));

    const { isMobileWidth } = useGetAgentView();

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(dayjs().format("HH:mm:ss"));
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className={styles[!isMobileWidth ? "clock-main-container" : "clock-main-container-mobile"]}>
            <div className={styles["clock-frame"]}>
                <span className={styles["clock-dial"]}>{time}</span>
            </div>
        </div>
    );
};

export default Clock;
