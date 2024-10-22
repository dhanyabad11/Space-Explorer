import { useEffect } from "react";
import { useAppSelector } from "../App/hooks";
import { imageState } from "../redux-slices/imagesSlice";
type ChangeImageProps = {
    currentImageCount: number;
    handlePreviousImage: () => void;
    handleNextImage: () => void;
};

export const useChangeImageWithKeys = (props: ChangeImageProps) => {
    const { handlePreviousImage, handleNextImage } = props;
    const imageData = useAppSelector(imageState);

    const handleKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
                if (props.currentImageCount === 1) {
                    return;
                }
                handlePreviousImage();
                break;
            case "ArrowRight":
                if (props.currentImageCount >= imageData.allData.length) {
                    return;
                }
                handleNextImage();
                break;
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [handlePreviousImage, handleNextImage]);
};
export default useChangeImageWithKeys;
