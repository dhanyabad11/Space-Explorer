
import { useEffect, useState } from "react";
import { useAppDispatch } from "../App/hooks";
import { setActiveNavElement } from "../redux-slices/globalSlice";

const useIntersectionHook = (
    targetRef: React.RefObject<HTMLElement>,
    pageName: string) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // CREATING NEW OBSERVER FOR INTERSECTION
        const observer = new IntersectionObserver((entries) => {
            // GRABS THE ENTRY AND CHECKS IF IT INTERSECTS
            const [entry] = entries;
            setIsActive(entry.isIntersecting);
            // IF INTERSECTS - DISPATCHING THE ACTIVE ELEMENT'S NAME AND BOOLEAN TO INDICATE IT;
            if (entry.isIntersecting && targetRef.current) {
                dispatch(setActiveNavElement({
                    isActive: true,
                    activeEl: pageName
                }));
                // IF IT'S NOT INTERSECTING - DISPATCHING THE ACTIVE BOOLEAN TO FALSE AND ACTIVE ELEMENT TO "";
            } else {
                dispatch(setActiveNavElement({
                    isActive: false,
                    activeEl: ""
                }));
            }
        },
            { threshold: 1 }
        );
        // HERE WE SAY THAT IF WE HAVE A REF TO A SPECIFIC EL - WE SHOULD OBSERVE IT;
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
        // AND IF THE CURRENT ELEMENT IS ACTIVE - THEN WE SHOULD STOP OBSERVING IT;
        if (isActive && targetRef.current) {
            observer.unobserve(targetRef.current);
        }
        const target = targetRef.current;
        return (() => {
            target ?
                observer.unobserve(target)
                : null
        })
    }, [targetRef]);

    return isActive;
}
export default useIntersectionHook;