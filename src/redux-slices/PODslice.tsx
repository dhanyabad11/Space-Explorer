import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { TPicOfTheDay } from "../Interfaces and types/Types/types";
import { IAction } from "../Interfaces and types/Interfaces/interfaces";

const initialState: TPicOfTheDay = {
    date: '',
    explanation: '',
    hdurl: '',
    media_type: '',
    title: '',
    url: '',
    prevUrl: ''
}

export const podActions = createSlice({
    name: 'podSlice',
    initialState,
    reducers: {
        setPodData: (state: TPicOfTheDay,
            action: IAction<string, TPicOfTheDay>) => {
            state.date = action.payload.date;
            state.explanation = action.payload.explanation;
            state.hdurl = action.payload.hdurl;
            state.title = action.payload.title;
            state.url = action.payload.url;
        },
        setPrevPodUrl: (state: TPicOfTheDay,
            action: IAction<string, TPicOfTheDay>) => {
            state.prevUrl = action.payload.url;
        }
    }
});

export const { setPodData, setPrevPodUrl } = podActions.actions;
export const podState = (state: RootState) => state.podSlice;
export default podActions.reducer;