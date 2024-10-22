import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import imgNotFound from "@SpaceExplorer/assets/icons/img-not-found.webp";

import styles from "./ArticleCard.module.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";

import { TArticleItem } from "@SpaceExplorer/Interfaces and types/Types/types";
import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";

type ShareProps = {
    handleShare: (id: number | null, url: string) => void;
};

export const InteractiveArticleCard = ({
    id,
    image_url,
    title,
    published_at,
    summary,
    url,
    handleShare,
}: TArticleItem & ShareProps) => {
    const [imgNotLoaded, setImgNotLoaded] = useState<boolean>(false);
    const [textCopied, setToCopy] = useState<boolean>(false);

    const { isMobileWidth } = useGetAgentView();
    
    const handleImgLoadError = () => {
        setImgNotLoaded(true);
    };

    const handleToCopyText = () => {
        setToCopy(() => true);
        const timeout = setTimeout(() => {
            setToCopy(() => false);
            clearTimeout(timeout);
        }, 300);
    };

    const handleShareButtonClick = (id: number | null, url: string) => {
        if (!isMobileWidth) {
            handleShare(id, url);
            handleToCopyText();
            return;
        }
        handleShare(id, url);
    };

    const publishTime = useMemo(() => {
        const date = dayjs(published_at).format("DD.MM.YYYY");
        const time = dayjs(published_at).format("HH:mm");
        return { date, time };
    }, [published_at]);

    return (
        <div className={styles["card-main-container"]}>
            <Card
                sx={{
                    maxWidth: 450,
                    backgroundColor: "var(--card-almost-tranpsarent-bgr)",
                    backdropFilter: "blur(5px)",
                    minWidth: 300,
                }}
            >
                <Link to={url} target="_blank" rel="noopener" className={styles["header-link"]}>
                    <CardHeader
                        sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "6px",
                            height: isMobileWidth ? "62px" : "85px",
                        }}
                        title={title}
                        titleTypographyProps={{
                            color: "var(--about-link-collor)",
                            fontSize: isMobileWidth ? "1.2rem" : "1.8rem",
                        }}
                    />
                </Link>
                <CardHeader
                    sx={{
                        padding: "6px",
                    }}
                    subheader={`Published: ${publishTime.date}, ${publishTime.time}`}
                    subheaderTypographyProps={{
                        color: "var(--text-color-shadow)",
                        fontSize: isMobileWidth ? "0.8rem" : "1rem",
                    }}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imgNotLoaded ? imgNotFound : image_url}
                    alt="Error while fetching image"
                    loading="lazy"
                    onError={handleImgLoadError}
                />
                <CardContent
                    sx={{
                        backgroundColor: "var(--component-bgr-transparent-color)",
                        height: "90px",
                        padding: "6px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {summary && (
                        <Typography variant="body2" color="var(--card-box-shadow-color-hover)">
                            {summary}
                        </Typography>
                    )}
                </CardContent>
                <CardActions disableSpacing sx={{ height: "50px", display: "flex", gap: "1rem" }}>
                    <IconButton
                        sx={{
                            color: "var(--card-text-collor-button-1)",
                            fontSize: isMobileWidth ? "0.9rem" : "1.2rem",
                            padding: "0px",
                        }}
                        aria-label="read-more"
                    >
                        <Link to={url} target="_blank" rel="noopener" className={styles["read-more"]}>
                            Read more
                        </Link>
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "var(--card-text-collor-button-1)",
                            fontSize: isMobileWidth ? "0.9rem" : "1.2rem",
                            padding: "0",
                        }}
                        aria-label="share or copy link"
                        onClick={() => handleShareButtonClick(id, url)}
                    >
                        <ShareIcon className={styles["share-icon"]} />
                        {textCopied ? <span>Copied!</span> : null}
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};
export default InteractiveArticleCard;
