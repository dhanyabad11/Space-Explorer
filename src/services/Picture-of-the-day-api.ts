import axios, { AxiosError } from "axios";
import { AbortType } from "../Interfaces and types/Types/types";

/**Does an axios fetch request to the endpoint, to fetch THE IMAGE OF THE DAY and returns the result. */

export const fetchImageOfTheDay = async ({ signal, controller }: AbortType) => {
    try {
        const res = axios
            .create({ baseURL: "https://mb-multi-tool-api.vercel.app/nasa" })
            .get("/pod", { signal: signal });
        const data = await res;
        if (data.status === 200) {
            return data.data;
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
