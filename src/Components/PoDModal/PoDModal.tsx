import styles from "./PoDModal.module.scss";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import { podState } from "@SpaceExplorer/redux-slices/PODslice";
import { globalState, setIsLoading, setToShowPoD } from "@SpaceExplorer/redux-slices/globalSlice";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@SpaceExplorer/Layouts/index";

export const PoDModal = () => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const globalData = useAppSelector(globalState);
    const podData = useAppSelector(podState);
    const dispatch = useAppDispatch();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLSpanElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            dispatch(setIsLoading(false));
            dispatch(setToShowPoD(false));
        }
    };

    const handleImageLoaded = (): void => {
        setImageLoaded(true);
        dispatch(setIsLoading(false));
    };

    return (
        <div className={styles["modal-main-container"]}>
            {globalData.error.error && globalData.error.page === "pod" ? (
                <ErrorMessage error={globalData.error.error} />
            ) : (
                <>
                    <div className={styles["pod-container"]}>
                        {!imageLoaded ? (
                            <p className={styles["image-loading-text"]}>Loading...</p>
                        ) : (
                            <section
                                className={styles["text-container"]}
                                onClick={(e: React.MouseEvent<HTMLDivElement>) => handleModalClick(e)}
                            >
                                <p className={styles["modal-pod-title"]}>{podData.title}</p>
                                <p className={styles["modal-pod-explanation"]}>{podData.explanation}</p>
                            </section>
                        )}
                        <section
                            className={styles["img-container"]}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleModalClick(e)}
                        >
                            <Link
                                onLoad={() => handleImageLoaded()}
                                to={podData.url}
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    className={styles["pod-image"]}
                                    src={podData.url}
                                    onLoad={() => handleImageLoaded()}
                                    title={podData.title}
                                    loading={"lazy"}
                                    alt={
                                        !imageLoaded
                                            ? ""
                                            : globalData.error.error ||
                                              "There was supposed to be a NASA pic, but sometimes things don't go as planned"
                                    }
                                />
                            </Link>
                        </section>
                        <Link to="#" className={styles["span-link"]}>
                            <span
                                className={styles["span-close-x"]}
                                onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}
                            >
                                X
                            </span>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};
export default PoDModal;
