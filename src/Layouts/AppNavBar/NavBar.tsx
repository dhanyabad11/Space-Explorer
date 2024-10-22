import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import { useState } from "react";
import {
    globalState,
    setActiveNavElement,
    setIsLoading,
    setShowTopNav,
    setToShowPoD,
} from "@SpaceExplorer/redux-slices/globalSlice";

import styles from "./NavBar.module.scss";

import icon from "@SpaceExplorer/assets/icons/android-chrome-192x192.webp";
import useHideNavOnScroll from "@SpaceExplorer/hooks/useHideNavOnScroll";

import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";
import Clock from "@SpaceExplorer/Components/Clock/ClockComponent";

export const NavBar = () => {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const [scrollNavUp, setToScrollNavUp] = useState<boolean>(false);
    const { isMobileWidth } = useGetAgentView();

    const checkIfMobile = (): void => {
        dispatch(setShowTopNav(!globalData.showTopNav));
    };

    //CUSTOM HOOK TO CONTROL THE SHOWING AND HIDING OF THE NAV BAR on SCROLL
    useHideNavOnScroll(setToScrollNavUp);

    return (
        <section
            className={styles["hiding-nav"]}
            style={scrollNavUp ? { transform: "translateY(-100%)" } : { transform: "translateY(0%)" }}
        >
            <div className={styles["main-nav-container"]}>
                <div className={styles["nav-logo-container"]}>
                    <NavLink
                        to={"/"}
                        className={styles["nav-logo-item"]}
                        onClick={() =>
                            dispatch(
                                setActiveNavElement({
                                    isActive: true,
                                    activeEl: "home",
                                })
                            )
                        }
                    >
                        <img src={icon} alt="logo" loading="lazy" />
                        Space Explorer
                    </NavLink>
                </div>
                <nav
                    className={styles["secondary-nav-container"]}
                    style={
                        globalData.showTopNav
                            ? { transform: "translateY(0%)" }
                            : { transform: "translateY(-100%)" }
                    }
                >
                    <ul className={styles["nav-links"]} role="list">
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Home"
                                to={"/"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("home")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "home",
                                        })
                                    )
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Gallery"
                                to={"/gallery"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("gallery")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "gallery",
                                        })
                                    )
                                }
                            >
                                Gallery
                            </NavLink>
                        </li>
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Articles"
                                to={"/articles"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("articles")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "articles",
                                        })
                                    )
                                }
                            >
                                Articles
                            </NavLink>
                        </li>
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Solar system planets"
                                to={"/planets"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("planets")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "planets",
                                        })
                                    )
                                }
                            >
                                Planets
                            </NavLink>
                        </li>
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="About"
                                to={"/about"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("about")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "about",
                                        })
                                    )
                                }
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                    <div className={styles["nav-navbar-collapse"]}>
                        <button
                            className={styles["nav-item-pod"]}
                            onClick={() => [
                                dispatch(setToShowPoD(!globalData.showPoD)),
                                dispatch(setIsLoading(true)),
                            ]}
                        >
                            Picture of the day
                        </button>
                        <Clock />
                    </div>
                    {isMobileWidth && (
                        <div className={styles["nav-toggler-contaier"]} onClick={() => checkIfMobile()}>
                            {globalData.showTopNav ? <CloseIcon /> : <MenuIcon />}
                        </div>
                    )}
                </nav>
            </div>
        </section>
    );
};

export default NavBar;
