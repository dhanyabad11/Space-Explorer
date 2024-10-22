import { useCallback, useEffect, useState } from "react";
import { deviceDetect } from "react-device-detect";

const useDetectDevice = () => {
    const [currentlyIsMobile, setCurrentlyIsMobile] = useState<boolean>(false);

    const detectedDevice = useCallback(() => {
        const { isMobile } = deviceDetect(navigator.userAgent);
        return isMobile ?? false;
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const isMobile = detectedDevice();
            setCurrentlyIsMobile(isMobile);

            isMobile
                ? console.log("%cMOBILE VIEW 📱", "color: green")
                : console.log("%cDESKTOP VIEW 💻", "color: orange");
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { currentlyIsMobile };
};
export default useDetectDevice
