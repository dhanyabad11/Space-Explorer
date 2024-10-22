import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./PlanetsPage.module.scss";
import { globalState } from "@SpaceExplorer/redux-slices/globalSlice";
import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";

import { ErrorMessage } from "@SpaceExplorer/Layouts";
import PlanetButton from "@SpaceExplorer/Components/PlanetButton/PlanetButton";

import { resetPlanetData } from "@SpaceExplorer/redux-slices/planetSlice";
import PlanetCard from "@SpaceExplorer/Components/PlanetCard/PlanetCard";
import useGetCachedPlanetImages from "@SpaceExplorer/hooks/useGetCachedPlanetImages";
import useGetCurrentlySelectedPlanet from "@SpaceExplorer/hooks/useGetCurrentlySelectedPlanet";

export const PlanetsPage = () => {
    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);
    const { isMobileWidth } = useGetAgentView();
    const { planetsListImages } = useGetCachedPlanetImages();

    const { isModalOpen, setIsModalOpen, handleFetchPlanetData, currentlySelectedPlanet } =
        useGetCurrentlySelectedPlanet();

    const renderPlanets = useMemo(
        () =>
            planetsListImages.map(([planetName, imageUrl]) => (
                <PlanetButton
                    key={uuidv4()}
                    image={imageUrl}
                    planetName={planetName}
                    handleFetchPlanetData={handleFetchPlanetData}
                />
            )),
        [planetsListImages, handleFetchPlanetData]
    );

    const handleCloseTheModal = useCallback(() => {
        dispatch(resetPlanetData());
        setIsModalOpen(false);
        currentlySelectedPlanet.current = "";
    }, [dispatch, setIsModalOpen, currentlySelectedPlanet]);

    return (
        <section
            id="planets"
            style={{ marginTop: isMobileWidth ? "200px" : "100px" }}
            className={styles["planets-main-container"]}
        >
            <div
                className={
                    styles[!isMobileWidth ? "planets-header-container" : "planets-header-container-mobile"]
                }
            >
                <h3 className={styles["header"]}>Solar system planets</h3>
                <p className={styles["sub-text"]}>
                    Explore the planets of our solar system, Pluto included &#128512;
                </p>
            </div>

            {isModalOpen && <PlanetCard handleCloseModal={handleCloseTheModal} />}
            <div className={styles["planets-secondary-container"]}>
                {globalData.error.error && globalData.error.page === "planets" ? (
                    <div className={styles["loader-error"]}>
                        <ErrorMessage error={globalData.error.error} />
                    </div>
                ) : (
                    <div className={styles["planet-buttons-container"]}>{renderPlanets}</div>
                )}
            </div>
        </section>
    );
};

export default PlanetsPage;
