import styles from "./HomePage.module.scss";
import RocketIcon from "@mui/icons-material/Rocket";

export const HomePage = () => {
    return (
        <section id="home" className={styles["home-hero-section"]}>
            <div className={styles["home-hero-container"]}>
                <div className={styles["home-hero-heading-container"]}>
                    <h1 className={styles["home-hero-header1"]}>
                        Space Explorer
                        <span className={styles["home-hero-icon1"]}>
                            <RocketIcon />
                        </span>
                    </h1>
                    <h2 className={styles["home-hero-header3"]}>
                        Delve into the vast cosmos, read many topics and articles, find astronomy images,
                        learn with NASA.
                    </h2>
                    <div className={styles["home-hero-small-text-container"]}>
                        <p className={styles["home-hero-small-text"]}>Discover the experience</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
