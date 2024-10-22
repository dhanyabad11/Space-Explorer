import { useState, useCallback, useEffect } from "react";
const useHideNavOnScroll = (setToScrollNavUp: React.Dispatch<React.SetStateAction<boolean>>) => {

    const [y, setY] = useState(window.scrollY);

    const handleNavigation = useCallback((e: Event) => {
        const window = e.currentTarget as Window;
        if (y > window.scrollY) {
            setToScrollNavUp(() => false);
        } else if (y < window.scrollY) {
            setToScrollNavUp(() => true);
        }
        setY(window.scrollY);
    }, [y, setToScrollNavUp]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);
}
export default useHideNavOnScroll