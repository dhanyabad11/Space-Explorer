import { useEffect, useState } from "react";

const mobileThreshold = 768;

const useGetAgentView = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const isMobileWidth = mobileThreshold > windowWidth;
    return { isMobileWidth };
};

export default useGetAgentView;
