import { ImageListItem, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
// import FacebookIcon from '@mui/icons-material/Facebook';
import styles from "./ArticleCard.module.scss";
import { TArticleItem } from "@SpaceExplorer/Interfaces and types/Types/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import useDetectDevice from "@SpaceExplorer/hooks/useDetectDevice";

export const ArticleCard = ({
    id,
    image_url,
    title,
    updated_at,
    published_at,
    // summary,
    url,
}: TArticleItem) => {
    const [textCopied, setToCopy] = useState<boolean>(false);
    const { currentlyIsMobile } = useDetectDevice();

    const handleShare = async () => {
        if (!id) {
            return;
        }
        if (currentlyIsMobile) {
            try {
                await navigator.share({ url });
                return;
            } catch (error) {
                console.error(`We ran into an error while attempting to share: ${error}`);
            }
        }
        await navigator.clipboard.writeText(url);
        //TEXT SHOULD BE THE HREF OF THE CURRENT ARTICLE
    };

    const handleToCopyText = () => {
        setToCopy(() => true);
        const timeout = setTimeout(() => {
            setToCopy(() => false);
            clearTimeout(timeout);
        }, 300);
    };

    return (
        <div className={styles["article-card-wrapper"]}>
            <ImageListItem className={styles["article-card-li"]}>
                <div className={styles["article-img-title-container"]}>
                    <div>
                        <Link to={image_url} rel="noopenner" target="_blank">
                            <img
                                className={styles["article-card-image"]}
                                src={image_url}
                                srcSet={image_url}
                                alt={title}
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    <h3 className={"article-card-title"}>{title}</h3>
                    {updated_at ? (
                        <Typography>
                            <span>Published:</span> {published_at.split("T")[0]}
                        </Typography>
                    ) : null}
                    <div className={styles["article-card-button-container"]}>
                        <Link to={url} target="_blank" rel="noopener" className={styles["card-link"]}>
                            Read More
                        </Link>
                        <button
                            className={styles["card-button"]}
                            onClick={() => [handleShare(), handleToCopyText()]}
                        >
                            <ShareIcon />
                            {textCopied ? <span className={styles["share-copied"]}>Copied!</span> : null}
                        </button>
                    </div>
                </div>
            </ImageListItem>
        </div>
    );
};

export default ArticleCard;
