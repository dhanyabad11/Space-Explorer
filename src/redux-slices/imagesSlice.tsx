import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IAction, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TImageData } from "../Interfaces and types/Types/types";

const initialState: IImageData = {
    allData: [{
        href: '',
        data: [{
            center: '',
            date_created: '',
            description: '',
            description_508: '',
            keywords: [],
            media_type: '',
            nasa_id: '',
            secondary_creator: '',
            title: ''
        }],
        links: [{
            href: '',
            rel: '',
            render: ''
        }]
    }],
    imagePage: 1,
    queryString: ""
}

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState,
    reducers: {
        setImageData: (state: IImageData, action: IAction<string, [TImageData]>) => {
            state.allData = action.payload;
        },
        setAdditionalImageData: (state: IImageData, action: IAction<string, TImageData[]>) => {
            const newState = [...state.allData, ...action.payload];
            state.allData = newState;
        },
        setImagePage: (state: IImageData, action: IAction<string, number>) => {
            state.imagePage = action.payload;
        },
        setImageQueryString: (state: IImageData, action: IAction<string, string>) => {
            state.queryString = action.payload;
        },
        setClearImageData: (state: IImageData, action: IAction<string, boolean>) => {
            if (action.payload) {
                state.allData = [];
            }
        }
    }
});

export const { setImageData, setAdditionalImageData, setImagePage, setImageQueryString, setClearImageData } = imageSlice.actions;
export const imageState = (state: RootState) => state.imageSlice;
export default imageSlice.reducer;