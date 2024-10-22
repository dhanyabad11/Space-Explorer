import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import { TGLobalError } from "@SpaceExplorer/Interfaces and types/Types/types";
import { setError, setIsLoading } from "@SpaceExplorer/redux-slices/globalSlice";
import { planetState, setPlanet, setPlanetImage } from "@SpaceExplorer/redux-slices/planetSlice";
import { fetchPlanets } from "@SpaceExplorer/services/Fetch-planets-api";
import { useCallback, useRef, useState } from "react";
import useGetCachedPlanetImages from "@SpaceExplorer/hooks/useGetCachedPlanetImages";

const useGetCurrentlySelectedPlanet = () => {
    const dispatch = useAppDispatch();
    const planetData = useAppSelector(planetState);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const currentlySelectedPlanet = useRef<string>(planetData.name);
    const scrollPosition = useRef<number>(0);
    const { planetsListImages } = useGetCachedPlanetImages();

    const handleFetchPlanetData = useCallback(
        async (planetName: string) => {
            if (planetName?.[0] && currentlySelectedPlanet.current.toLowerCase() === planetName.toLowerCase())
                return;
            if (!planetName) return;
            currentlySelectedPlanet.current = planetName;
            scrollPosition.current = window.scrollY;

            try {
                dispatch(setIsLoading(true));
                const controller = new AbortController();
                const signal = controller.signal;

                const res = await fetchPlanets({
                    signal,
                    controller: controller,
                    searchValue: planetName,
                });
                if (res && Array.isArray(res)) {
                    dispatch(setPlanet(res));
                }
                const planetImage = Object.values(planetsListImages).find(([name]) => name === planetName);

                dispatch(setPlanetImage(planetImage?.[1] || ""));
                setIsModalOpen(true);
            } catch (error) {
                console.error("Failed to fetch planet data", error);
                dispatch(setError(error as TGLobalError));
                setIsModalOpen(false);
            } finally {
                dispatch(setIsLoading(false));
                window.scrollTo(0, scrollPosition.current);
            }
        },
        [dispatch, planetsListImages]
    );

    return { isModalOpen, setIsModalOpen, handleFetchPlanetData, currentlySelectedPlanet };
};

export default useGetCurrentlySelectedPlanet;
