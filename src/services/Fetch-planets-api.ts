import axios, { AxiosError } from "axios";
import { AbortType, TPlanetData } from "../Interfaces and types/Types/types";
type FetchPlanetsResponse = TPlanetData | "No results" | string | undefined;

/**Does an axios fetch request to the endpoint, to fetch IMAGES and returns the result.*/
export const fetchPlanets = async ({
    signal,
    controller,
    searchValue,
}: AbortType & { searchValue: string }): Promise<FetchPlanetsResponse> => {
    try {
        const axiosInstance = axios.create({
            baseURL: "https://mb-multi-tool-api.vercel.app/nasa",
            params: { query: searchValue },
        });

        const response = await axiosInstance.get("/planets", { signal });

        if (response.status >= 200 && response.status < 300) {
            if (!response.data.length) {
                return "No results";
            }
            return response.data;
        }

        return "An unexpected error occurred";
    } catch (error) {
        if (controller.signal.aborted) {
            return;
        }
        if (!(error instanceof AxiosError)) {
            return "An unexpected arror occured. Please try again later";
        }
        return error.message;
    }
};
