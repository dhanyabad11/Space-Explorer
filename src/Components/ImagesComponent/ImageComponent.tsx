import { TImageData } from "@SpaceExplorer/Interfaces and types/Types/types";

import styles from "./ImageComponent.module.scss";

import { useAppDispatch } from "@SpaceExplorer/App/hooks";
import { setIsLoading, setToExpandImage } from "@SpaceExplorer/redux-slices/globalSlice";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";

export const ImageComponent = ({ href, data, links, handleShare, currentlyIsMobile }: TImageData) => {
    const dispatch = useAppDispatch();
    const [textCopied, setToCopy] = useState<boolean>(false);

    const handleToCopyText = () => {
        setToCopy(() => true);
        const timeout = setTimeout(() => {
            setToCopy(() => false);
            clearTimeout(timeout);
        }, 300);
    };

    const shouldCopyTextOnlyForDesktop = !currentlyIsMobile && textCopied;
    const hasImage = href && data?.[0]?.title;

    const handleImageExpand = () => {
        dispatch(
            setToExpandImage({
                bool: true,
                href: links[0]?.href,
                title: data[0].title,
            })
        ),
            dispatch(setIsLoading(true));
    };

    const handleShareOrCopy = () => {
        if (typeof handleShare !== "function") {
            return;
        }
        handleToCopyText();
        handleShare(links[0]?.href);
    };

    return (
        <div className={styles["card-component"]}>
            {
                <img
                    onClick={() => (hasImage ? handleImageExpand() : null)}
                    loading="lazy"
                    src={links[0]?.href}
                    alt="No image, sorry! Imagine something cool!"
                />
            }
            <div className={styles["card-content"]}>
                <p className={styles["card-content-title"]}>{data[0].title}</p>
                <button title="Share" className={styles["card-button"]} onClick={() => handleShareOrCopy()}>
                    <ShareIcon />
                    {shouldCopyTextOnlyForDesktop ? (
                        <span className={styles["share-copied"]}>Copied!</span>
                    ) : null}
                </button>
            </div>
        </div>
    );
};
export default ImageComponent;
