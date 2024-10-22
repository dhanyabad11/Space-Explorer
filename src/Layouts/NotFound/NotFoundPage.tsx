import styles from "./NotFoundPage.module.scss";
import notFoundImage from "@SpaceExplorer/assets/space-explorer-404.webp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@SpaceExplorer/App/hooks";
import { setShowTopNav } from "@SpaceExplorer/redux-slices/globalSlice";
import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";

export const NotFound = () => {
    const dispatch = useAppDispatch();
    const { isMobileWidth } = useGetAgentView();

    return (
        <div className={styles["not-found-container"]}>
            <img src={notFoundImage} alt="Not Found" className={styles["background-image"]} />
            <div className={styles["overlay"]}>
                <div className={styles["inner-container"]}>
                    <h1 className={styles[isMobileWidth ? "title-mobile" : "title-desktop"]}>
                        Page Not Found
                    </h1>
                    <p className={styles[isMobileWidth ? "text-mobile" : "text-desktop"]}>
                        Oops! Looks like your navigation systems malfunctioned.
                    </p>
                    <Link
                        className={styles[isMobileWidth ? "link-mobile" : "link-desktop"]}
                        to={"/"}
                        onClick={() => dispatch(setShowTopNav(true))}
                    >
                        Back to orbit <RocketLaunchIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
