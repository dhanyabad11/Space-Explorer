import { ItemsGetterProps } from "../Interfaces and types/Types/types";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { imageSlice } from "../redux-slices/imagesSlice";
import { setArticles } from "../redux-slices/articleSlice";
import { fetchImages } from "../services/Fetch-search-images.api";
import { fetchArticles } from "../services/Fetch-articles-api";

/**FUNCTION THAT FETCHES IMAGE BASED ON SEARCH QUERY */
const itemsGetter = async ({
    signal,
    controller,
    imageData,
    searchValue,
    setSearchValue,
    dispatch,
    pageView,
}: ItemsGetterProps) => {
    dispatch(setIsLoading(true));

    const fetchedData = async () => {
        switch (pageView) {
            case "images":
                return await fetchImages({
                    signal,
                    controller,
                    page: imageData.imagePage,
                    queryString: searchValue,
                });
            case "articles":
                return await fetchArticles({ signal, controller, searchValue });
        }
    };
    setSearchValue("");
    const data = await fetchedData();
    if (data?.length && typeof data !== "string" && !(data instanceof Error)) {
        if (pageView === "images") {
            dispatch(imageSlice.actions.setImageData(data)),
                dispatch(imageSlice.actions.setImagePage(imageData.imagePage + 1));
        }
        if (pageView === "articles") {
            dispatch(setArticles(data));
        }
        dispatch(setIsLoading(false));
        return;
    }
    if (!data?.length && typeof data !== "string") {
        if (pageView === "images") {
            dispatch(imageSlice.actions.setImagePage(1)),
                dispatch(setError({ error: "Sorry, no results found!", page: pageView })),
                dispatch(imageSlice.actions.setClearImageData(true));
        }
        if (pageView === "articles") {
            dispatch(setError({ error: "Sorry, no results found!", page: pageView })),
                dispatch(setArticles([]));
        }
        dispatch(setIsLoading(false));
        return;
    } else {
        if (pageView === "images") {
            dispatch(imageSlice.actions.setImagePage(1)),
                dispatch(setError({ error: data, page: pageView })),
                dispatch(imageSlice.actions.setClearImageData(true));
        }
        if (pageView === "articles") {
            dispatch(setError({ error: data, page: pageView })), dispatch(setArticles([]));
        }
        dispatch(setIsLoading(false));
        return;
    }
};
export default itemsGetter;
