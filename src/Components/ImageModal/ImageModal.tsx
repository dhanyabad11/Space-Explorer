import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import { globalState, setIsLoading, setToExpandImage } from "@SpaceExplorer/redux-slices/globalSlice";

import imageChanger from "@SpaceExplorer/utils/imageChanger";
import styles from "./ImageModal.module.scss";

import React, { useMemo, useState } from "react";
import { imageState } from "@SpaceExplorer/redux-slices/imagesSlice";
import { TImageData } from "@SpaceExplorer/Interfaces and types/Types/types";
import pageChanger from "@SpaceExplorer/utils/pageChanger";
import { ErrorMessage } from "@SpaceExplorer/Layouts/index";
import useChangeImageWithKeys from "@SpaceExplorer/hooks/useChangeImageWithKeys";
import ShareIcon from "@mui/icons-material/Share";

type ImageModalProps = {
    handleShare?: (url: string) => void;
    currentlyIsMobile?: boolean;
};

export const ImageModal = ({ handleShare, currentlyIsMobile }: ImageModalProps) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [disableLoadButton, setToDisableLoadButton] = useState<boolean>(false);
    const [textCopied, setToCopy] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);
    const imageData = useAppSelector(imageState);

    const handleNextImage = () => {
        dispatch(setIsLoading(true));
        imageChanger({ movement: "next", imageData, globalData, dispatch });
    };

    const handlePreviousImage = () => {
        dispatch(setIsLoading(true));
        imageChanger({ movement: "previous", imageData, globalData, dispatch });
    };

    const currentImage: TImageData | null =
        imageData.allData.find((el) => el.links[0]?.href === globalData.modalImageHref) || null;

    const shouldCopyTextOnlyForDesktop = !currentlyIsMobile && textCopied;

    const currentImageCount = useMemo(
        () => (currentImage ? imageData?.allData?.indexOf(currentImage) + 1 : 0),
        [currentImage, imageData.allData]
    );

    useChangeImageWithKeys({ currentImageCount, handlePreviousImage, handleNextImage });

    const handlePageChange = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        pageChanger({
            imageData,
            signal,
            controller,
            setToDisableLoadButton,
            dispatch,
        });
    };

    const handleModalClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
            dispatch(setIsLoading(false));
        }
    };

    const handleImageCloase = (): void => {
        dispatch(setToExpandImage({ bool: !globalData.toExpandImage, href: "", title: "" }));
    };

    const handleImageLoaded = (): void => {
        setImageLoaded(true);
        dispatch(setIsLoading(false));
    };

    const handleToCopyText = () => {
        setToCopy(() => true);
        const timeout = setTimeout(() => {
            setToCopy(() => false);
            clearTimeout(timeout);
        }, 300);
    };

    const handleShareOrCopy = () => {
        if (typeof handleShare !== "function") {
            return;
        }
        if (globalData.modalImageHref) {
            handleToCopyText();
            handleShare(globalData.modalImageHref);
        }
    };

    return (
        <dialog
            className={
                styles[globalData.toExpandImage ? "modal-image-container-expanded" : "modal-image-container"]
            }
            onFocus={() => dispatch(setIsLoading(false))}
        >
            <section
                className={styles["modal-image-and-title-container"]}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}
            >
                {(globalData.error.error && globalData.error.page === "image") ||
                globalData.error.page === "modal" ? (
                    <ErrorMessage error={globalData.error.error} />
                ) : !globalData.modalImageHref ? null : (
                    <>
                        <Link
                            className={styles[imageLoaded ? "image-link" : ""]}
                            to={globalData.modalImageHref}
                            target="_blank"
                            rel="noopener"
                        >
                            <img
                                onLoad={() => handleImageLoaded()}
                                className={styles[imageLoaded ? "image-loaded" : ""]}
                                src={globalData.modalImageHref}
                                alt={
                                    "Sorry, there was supposed to be an image here, but something went wrong!"
                                }
                                title={globalData.modalImageTitle}
                            />
                        </Link>
                        {!imageLoaded ? <p className={styles["image-loading-text"]}>Loading...</p> : null}
                        {imageLoaded ? (
                            <p className={styles["modal-image-title"]}>{globalData.modalImageTitle}</p>
                        ) : null}
                        <div className={styles["modal-navigation-container"]}>
                            <p>
                                {currentImageCount ? currentImageCount : "N/A"} / {imageData?.allData?.length}
                            </p>
                            <div className={styles["modal-buttons-container"]}>
                                <button
                                    disabled={
                                        globalData.loading || currentImage
                                            ? imageData?.allData?.indexOf(currentImage as TImageData) + 1 ===
                                              1
                                            : true
                                    }
                                    onClick={() => handlePreviousImage()}
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={
                                        globalData.loading || currentImage
                                            ? imageData?.allData?.indexOf(currentImage as TImageData) + 1 ===
                                              imageData?.allData?.length
                                            : true
                                    }
                                    onClick={() => handleNextImage()}
                                >
                                    {currentImage
                                        ? imageData?.allData?.indexOf(currentImage as TImageData) + 1 ===
                                          imageData?.allData?.length
                                        : null}
                                    Next
                                </button>
                                {imageData?.allData[0]?.href ? (
                                    <button
                                        className={styles["fetch-more-images"]}
                                        disabled={disableLoadButton}
                                        style={{ color: disableLoadButton ? "red" : "" }}
                                        onClick={() => handlePageChange()}
                                    >
                                        {disableLoadButton ? "No more images" : "More images"}
                                    </button>
                                ) : null}
                                <Link
                                    onClick={() => handleImageCloase()}
                                    to="#"
                                    className={styles["span-link"]}
                                >
                                    <span className={"span-close-image"}>X</span>
                                </Link>
                                <button
                                    title="Share"
                                    className={styles["card-button"]}
                                    onClick={() => handleShareOrCopy()}
                                >
                                    <ShareIcon />
                                    {shouldCopyTextOnlyForDesktop ? (
                                        <span className={styles["share-copied"]}>Copied!</span>
                                    ) : null}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </dialog>
    );
};
export default ImageModal;
