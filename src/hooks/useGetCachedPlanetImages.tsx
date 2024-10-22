import { useMemo } from "react";
import * as planets from "@SpaceExplorer/assets/Planets/index";
import { PLANETS_ORDERED_LIST } from "@SpaceExplorer/utils/constants";

export const useGetSortedPlanetsImages = () => {
    const planetsListImages = useMemo(() => {
        const planetOrderMap = new Map(
            PLANETS_ORDERED_LIST.map((name, index) => [name.toLowerCase(), index])
        );

        return Object.entries(planets).sort(([arrA], [arrB]) => {
            const indexA = planetOrderMap.get(arrA.toLowerCase()) ?? Infinity;
            const indexB = planetOrderMap.get(arrB.toLowerCase()) ?? Infinity;
            return indexA - indexB;
        });
    }, []);

    return { planetsListImages };
};

export default useGetSortedPlanetsImages;
