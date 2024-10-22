import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";
import styles from "./PlanetButton.module.scss";

type PlanetButtonProps = {
    image: string;
    planetName: string;
    handleFetchPlanetData: (planetName: string) => Promise<void>;
};

export const PlanetButton = ({ image, planetName, handleFetchPlanetData }: PlanetButtonProps) => {
    const { isMobileWidth } = useGetAgentView();

    return (
        <div className={styles["planet-image-container"]}>
            <h4 className={styles[!isMobileWidth ? "planet-image-name" : "planet-image-name-mobile"]}>
                {planetName}
            </h4>
            <button
                className={styles["planet-image-button"]}
                onClick={() => handleFetchPlanetData(planetName)}
            >
                <img className={styles["planet-image"]} title={planetName} src={image} alt="A planet image" />
            </button>
        </div>
    );
};

export default PlanetButton;
