import styles from "./index.module.scss";

import PoDModal from "@SpaceExplorer/Components/PoDModal/PoDModal";
import useGetPod from "@SpaceExplorer/hooks/useGetPod";
import { useAppSelector } from "@SpaceExplorer/App/hooks";
import { podState } from "@SpaceExplorer/redux-slices/PODslice";
import { useEffect } from "react";

export const PoDPage = () => {
    const podData = useAppSelector(podState);

    const podResult = useGetPod();

    const currDate = new Date(Date.now());
    const offset = currDate.getTimezoneOffset();
    const currTime = new Date(currDate.getTime() - offset * 60 * 1000).toISOString().split("T")[0];

    useEffect(() => {
        //if the time of the initial request is different than the current time today => make a new request, else don't
        if ((podData?.date || "0") !== currTime) {
            (async function() {
                await podResult();
            })();
        }
    }, []);

    return (
        <div className={styles["pod-main-container"]}>
            <PoDModal />
        </div>
    );
};
export default PoDPage;
