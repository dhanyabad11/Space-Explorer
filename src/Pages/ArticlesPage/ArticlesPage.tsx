import { useState } from "react";
import styles from "./ArticlesPage.module.scss";
import { ErrorMessage } from "@SpaceExplorer/Layouts/index";
import InteractiveArticleCard from "@SpaceExplorer/Components/ArticleCard/InteractiveArticleCard";
import { useAppSelector } from "@SpaceExplorer/App/hooks";

import { TArticleItem } from "@SpaceExplorer/Interfaces and types/Types/types";
import SearchForm from "@SpaceExplorer/Components/SearchForm/SearchForm";
import { articleState } from "@SpaceExplorer/redux-slices/articleSlice";
import { globalState } from "@SpaceExplorer/redux-slices/globalSlice";

import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";
import { v4 as uuidv4 } from "uuid";

export const ArticlesPage = () => {
    const articleData = useAppSelector(articleState);
    const globalData = useAppSelector(globalState);

    const { isMobileWidth } = useGetAgentView();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setToDisableLoadButton] = useState<boolean>(false);

    const handleShare = async (id: number | null, url: string) => {
        if (!id) {
            return;
        }
        if (isMobileWidth) {
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

    return (
        <section
            id="articles"
            style={{ marginTop: isMobileWidth ? "200px" : "" }}
            className={styles["articles-main-container"]}
        >
            <div
                className={
                    styles[isMobileWidth ? "active-header-container-mobile" : "active-header-container"]
                }
            >
                <h2 className={styles["header"]}>Articles</h2>
                <p className={styles["sub-text"]}>The more you know</p>
                <div>
                    <SearchForm {...{ setToDisableLoadButton, pageView: "articles" }} />
                </div>
            </div>
            <div className={styles["articles-secondary-container"]}>
                {(globalData.error.error && globalData.error.page === "articles") ||
                globalData.error.page === "modal" ? (
                    <div className={styles["loader-error"]}>
                        <ErrorMessage error={globalData.error.error} />
                    </div>
                ) : articleData.results?.length ? (
                    articleData.results.map((el: TArticleItem) => {
                        return (
                            <InteractiveArticleCard
                                {...el}
                                handleShare={handleShare}
                                key={uuidv4()}
                            />
                        );
                    })
                ) : null}
            </div>
        </section>
    );
};

export default ArticlesPage;
