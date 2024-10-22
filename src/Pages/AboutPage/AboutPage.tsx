import { Link } from "react-router-dom";
import styles from "./AboutPage.module.scss";
import icon from "@SpaceExplorer/assets/icons/android-chrome-256x256.webp";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const AboutPage = () => {
    return (
        // IF THE CURRENT REF ELEMENT IS ACTIVE, IT WILL APPLY A SPECIFIC SYLE TO IT
        <section id="about" className={styles["about-container"]}>
            <div className={styles["slide-in"]}>
                <h2 className={styles["already-reg"]}>
                    About <span>"Space-explorer"</span>
                </h2>
                <p className={styles["already-reg"]}>This project is made with:</p>
                <span className={styles["emph-text"]}>
                    React, Redux, TypeScript, SCSS, AXIOS, MaterialUi.
                </span>
                <p className={styles["already-reg"]}>
                    A fan page of space exploration, different articles and images from the NASA and other
                    astronomy APIs.
                </p>
                <p className={styles["already-reg"]}>
                    More interesting space stuff at{" "}
                    <Link
                        to={"https://www.nasa.gov/"}
                        className={styles["nav-item-nasa"]}
                        rel="noreferrer"
                        target="_blank"
                    >
                        NASA
                    </Link>
                </p>
                <div className={styles["about-links-container"]}>
                    <p>Reach me</p>
                    <Link to={"https://github.com/SpooRe91"} target="_blank" rel="noopener">
                        <GitHubIcon />
                    </Link>
                    <Link to={"https://www.linkedin.com/in/mbogdanov9110/"} target="_blank" rel="noopener">
                        <LinkedInIcon />
                    </Link>
                </div>
            </div>
            <div className={styles["img-container"]}>
                <img src={icon} alt="logo" className={styles["slide-in-img"]} loading="lazy" />
            </div>
        </section>
    );
};
export default AboutPage;
