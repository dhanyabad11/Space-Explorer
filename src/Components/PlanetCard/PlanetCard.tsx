import styles from "./PlanetCard.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@SpaceExplorer/App/hooks";
import { planetState } from "@SpaceExplorer/redux-slices/planetSlice";
import { globalState } from "@SpaceExplorer/redux-slices/globalSlice";
import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";

type PlanetCardProps = {
    handleCloseModal: () => void;
};
const JUPITER_RADIUS = 71492;

const PlanetCard = ({ handleCloseModal }: PlanetCardProps) => {
    const planetData = useAppSelector(planetState);
    const globalData = useAppSelector(globalState);

    const planetRadius = Math.abs(planetData.radius * JUPITER_RADIUS);
    const { isMobileWidth } = useGetAgentView();

    return (
        <div className={styles["planet-main-container"]}>
            {globalData.loading ? (
                <div className={styles["planet-loading-text"]}>LOADING...</div>
            ) : (
                <>
                    <button
                        className={
                            styles[!isMobileWidth ? "planet-close-modal" : "planet-close-modal-mobile"]
                        }
                        onClick={() => handleCloseModal()}
                    >
                        <CloseIcon />
                    </button>

                    <h3
                        className={
                            styles[
                                !isMobileWidth
                                    ? "planet-data-section-title-name"
                                    : "planet-data-section-title-name-mobile"
                            ]
                        }
                    >
                        {planetData.name}
                    </h3>

                    {planetData?.image && (
                        <div className={styles["planet-image-container"]}>
                            <img
                                className={styles["planet-image"]}
                                src={planetData?.image}
                                alt="Some planet image"
                                loading="lazy"
                            />
                        </div>
                    )}
                    <div
                        className={
                            styles[!isMobileWidth ? "planet-data-container" : "planet-data-container-mobile"]
                        }
                    >
                        <div className={styles["planted-data-section"]}>
                            <p className={styles["planet-data-section-title"]}>mass: </p>
                            <span className={styles["planet-information"]}>
                                {planetData.mass} ( solar masses - M ☉)
                            </span>
                        </div>
                        <div className={styles["planted-data-section"]}>
                            <p className={styles["planet-data-section-title"]}>period: </p>
                            <span className={styles["planet-information"]}>{planetData.period} days</span>
                        </div>
                        <div className={styles["planted-data-section"]}>
                            <p className={styles["planet-data-section-title"]}>radius: </p>
                            <span className={styles["planet-information"]}>{planetRadius}km</span>
                        </div>
                        <div className={styles["planted-data-section"]}>
                            <p className={styles["planet-data-section-title"]}>temperature: </p>
                            <span className={styles["planet-information"]}>{planetData.temperature} °C</span>
                        </div>
                        <div className={styles["planted-data-section"]}>
                            <p className={styles["planet-data-section-title"]}>distance from Earth:</p>
                            <span className={styles["planet-information"]}>
                                {" "}
                                {planetData.distance_light_year} (lightyears)
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlanetCard;
