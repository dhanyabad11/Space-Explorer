import { useCallback } from "react";
import { podState, setPodData, setPrevPodUrl } from "../redux-slices/PODslice";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { fetchImageOfTheDay } from "../services/Picture-of-the-day-api";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const useGetPod = () => {
    const dispatch = useAppDispatch();
    const podData = useAppSelector(podState);

    const podFetcher = useCallback(async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const data = await fetchImageOfTheDay({ signal, controller });

            setTimeout(() => {
                if (typeof data === "string") {
                    dispatch(setIsLoading(false)),
                        dispatch(
                            setError({
                                error: "Unable to reach the server at the moment, please try again later!",
                                page: "pod",
                            })
                        );
                    controller.abort();
                    return data;
                }
            }, 30000);
            if (data) {
                dispatch(setIsLoading(false));
                dispatch(setPrevPodUrl(podData));
                dispatch(setPodData(data));
            }
        } catch (error) {
            console.error("Unable to fetch Picture of the day!");
        }

        return;
    }, []);

    return podFetcher;
};
export default useGetPod;
