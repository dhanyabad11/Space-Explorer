import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { fetchImages } from "../services/Fetch-search-images.api";
import { setImagePage, setAdditionalImageData } from "../redux-slices/imagesSlice";
import { PageChangerProps } from "../Interfaces and types/Types/types";

/** !IMPORTANT helper function to check numerous conditions
    before and after changing a page for next request of images
    or if there are any more to request */
const pageChanger = async ({
    imageData,
    signal,
    controller,
    setToDisableLoadButton,
    dispatch
}: PageChangerProps) => {
    dispatch(setIsLoading(true));
    dispatch(setImagePage(imageData.imagePage + 1));

    const data = await fetchImages({
        signal,
        controller,
        page: imageData.imagePage,
        queryString: imageData.queryString
    });

    if (data.length && typeof data !== "string") {
        dispatch(setIsLoading(false));
        dispatch(setAdditionalImageData(data));
        dispatch(setImagePage(imageData.imagePage + 1));
        return;
    }

    if (!data.length && typeof data !== "string") {
        if (imageData.imagePage) {
            setToDisableLoadButton(true);
            dispatch(setIsLoading(false));
            return;
        }
        dispatch(setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError({ error: "Sorry, no results found!", page: 'modal' }));
        return;

    } else {
        dispatch(setIsLoading(false));
        dispatch(setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError({ error: data, page: "modal" }));
        return;
    }
}

export default pageChanger