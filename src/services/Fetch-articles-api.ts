import axios, { AxiosError } from "axios";
import { AbortType } from "../Interfaces and types/Types/types";

/**Does an axios fetch request to the endpoint, to fetch ARTICLES and returns the result.*/
export const fetchArticles = async ({
    signal,
    controller,
    searchValue,
}: AbortType & { searchValue: string }) => {
    try {
        const res = axios
            .create({
                baseURL: "https://mb-multi-tool-api.vercel.app/nasa",
                params: { query: searchValue },
            })
            .get("/articles", { signal: signal });
        const data = await res;

        if (data.status >= 200 && data.status <= 300 && data?.data?.results?.length) {
            return data.data.results;
        }
    } catch (error) {
        if (controller.signal.aborted) {
            return;
        }
        if (typeof error === "string") {
            return error.toUpperCase();
        }
        if (error instanceof AxiosError) {
            return `We ran into a ${error.message}, please try again later!`;
        }
        if (error instanceof Error) {
            return error.message;
        }
    }
};
