import { useState } from "react";
import styles from "./ImagePage.module.scss";

import { globalState } from "@SpaceExplorer/redux-slices/globalSlice";
import { imageState } from "@SpaceExplorer/redux-slices/imagesSlice";
import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import { SearchForm, ImageModal, ImageComponent } from "@SpaceExplorer/Components/index";
import { ErrorMessage } from "@SpaceExplorer/Layouts/index";

import { TImageData } from "@SpaceExplorer/Interfaces and types/Types/types";

import pageChanger from "@SpaceExplorer/utils/pageChanger";

import { ImageListItem } from "@mui/material";
import useDetectDevice from "@SpaceExplorer/hooks/useDetectDevice";

export const ImagePage = () => {
    const imageData = useAppSelector(imageState);
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const [disableLoadButton, setToDisableLoadButton] = useState<boolean>(false);
    const { currentlyIsMobile } = useDetectDevice();

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

    const handleShare = async (url: string) => {
        if (!url) {
            return;
        }
        try {
            if (currentlyIsMobile) {
                await navigator.share({ url });
                return;
            }
            await navigator.clipboard.writeText(url);
        } catch (error) {
            console.error(`We ran into an error while attempting to share: ${error}`);
        }
    };

    const hasImageData = !!imageData?.allData[0]?.links[0].href;
    const hasError =
        (globalData.error.error && globalData.error.page === "images") || globalData.error.page === "modal";

    return (
        <section id="gallery" className={styles["image-container"]}>
            <div className={styles["image-container-heading-container"]}>
                <h1>Gallery</h1>
                {<SearchForm setToDisableLoadButton={setToDisableLoadButton} pageView={"images"} />}

                {hasImageData ? (
                    <p style={{ margin: "1rem 0" }}>
                        Showing {imageData?.allData?.length}
                        {imageData.allData.length <= 1 ? " image" : " images"}
                    </p>
                ) : null}
            </div>
            {// IF MODAL IS TO BE SHOWN
            globalData.toExpandImage ? (
                <ImageModal handleShare={handleShare} currentlyIsMobile={currentlyIsMobile} />
            ) : null}

            {hasError ? (
                <div className={styles["loader-error"]}>
                    <ErrorMessage error={globalData.error.error} />
                </div>
            ) : // IF THERE ARE IMAGES IN THE GLOBAL DATA, SHOW THE LIST OF IMAGES
            hasImageData ? (
                <div className={styles["image-list"]}>
                    {imageData.allData.map((item: TImageData) => (
                        <ImageListItem className={styles["image-list-item"]} key={item.data[0].nasa_id}>
                            <ImageComponent
                                {...item}
                                handleShare={handleShare}
                                currentlyIsMobile={currentlyIsMobile}
                            />
                        </ImageListItem>
                    ))}
                </div>
            ) : null

            // IF THERE ARE NO IMAGES, CHECK IF IT'S STILL LOADING OR IF THERE IS AN ERROR
            }
            {hasImageData ? (
                <button
                    className={styles["fetch-more-images"]}
                    disabled={disableLoadButton}
                    style={{ color: disableLoadButton ? "red" : "" }}
                    onClick={() => handlePageChange()}
                >
                    {disableLoadButton ? "NO more images to load" : "Load more images"}
                </button>
            ) : null}
        </section>
    );
};

export default ImagePage;
