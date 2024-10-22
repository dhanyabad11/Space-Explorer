import * as imageSlice from "../redux-slices/imagesSlice";
import { setError, setIsLoading } from "../redux-slices/globalSlice";
import { FormCheckerProps } from "../Interfaces and types/Types/types";

/**!IMPORTANT helper function to check numerous input conditions */
const formChecker = async ({
    searchValue,
    setSearchValue,
    setToDisableButton,
    dispatch,
    pageView
}: FormCheckerProps) => {

    const forbiddenStrings = ['javascript', 'script', 'code', '/', ':', '<', '>', '\\'];

    if (forbiddenStrings.includes(searchValue)) {
        dispatch(setError({ error: 'This is not a valid search option!', page: 'image' }));
        dispatch(imageSlice.setClearImageData(true));
        setSearchValue('');
        return;
    }
    if (pageView === 'images') {
        setToDisableButton(false);
        dispatch(imageSlice.setClearImageData(true));
        dispatch(imageSlice.setImageQueryString(searchValue));
    }

    if (searchValue === '') {
        dispatch(setIsLoading(false));
        dispatch(setError({ error: 'Please enter your search first!', page: 'image' }));
        dispatch(imageSlice.setImagePage(1));
        return;
    }

}

export default formChecker;