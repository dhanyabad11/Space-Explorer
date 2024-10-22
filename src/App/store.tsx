import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../redux-slices/globalSlice";
import imageSlice from "../redux-slices/imagesSlice";
import PODslice from "../redux-slices/PODslice";
import articleSlice from "./../redux-slices/articleSlice";
import planetSlice from "@SpaceExplorer/redux-slices/planetSlice";

export const store = configureStore({
    reducer: {
        globalSlice: globalSlice,
        imageSlice: imageSlice,
        podSlice: PODslice,
        articleSlice: articleSlice,
        planetSlice: planetSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
