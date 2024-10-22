import axios, { AxiosError } from "axios";
import { AbortType } from "../Interfaces and types/Types/types";

/**Does an axios fetch request to the endpoint, to fetch IMAGES and returns the result. */

export const imagesApi = axios.create({ baseURL: "https://images-api.nasa.gov/" });

export const fetchImages = async ({
    signal,
    controller,
    page,
    queryString,
}: AbortType & { page: number; queryString: string }) => {
    try {
        const res = await imagesApi.get(
            `search?q=${queryString}&media_type=image&page_size=20&page=${page}`,
            { signal: signal }
        );
        if (res.status === 200) {
            return await res.data.collection.items;
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
