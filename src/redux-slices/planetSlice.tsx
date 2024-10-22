import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { TPlanetData } from "../Interfaces and types/Types/types";
import { IAction } from '../Interfaces and types/Interfaces/interfaces';

const initialState: TPlanetData = {
    name: '',
    mass: 0,
    radius: 0,
    period: 0,
    semi_major_axis: 0,
    temperature: 0,
    distance_light_year: 0,
    host_star_mass: 0,
    host_star_temperature: 0,
    image: '',
}

export const planetSlice = createSlice({
    name: 'planetSlice',
    initialState,
    reducers: {
        setPlanet: (state: TPlanetData, action: IAction<string, TPlanetData[]>) => {
            state = action.payload[0];
            state.image = action.payload[0]?.name;
            return state;
        },
        setPlanetImage: (state: TPlanetData, action: IAction<string, string>) => {
            state.image = action.payload;
        },
        resetPlanetData:(state:TPlanetData)=>{
            state.name = initialState.name;
            state.mass = initialState.mass;
            state.radius = initialState.radius;
            state.period = initialState.period;
            state.semi_major_axis = initialState.semi_major_axis;
            state.temperature = initialState.temperature;
            state.distance_light_year = initialState.distance_light_year;
            state.host_star_mass = initialState.host_star_mass;
            state.host_star_temperature = initialState.host_star_temperature;
            state.image = initialState.image;
        }
    }
});

export const { setPlanet,setPlanetImage,resetPlanetData } = planetSlice.actions;
export const planetState = (state: RootState) => state.planetSlice;
export default planetSlice.reducer;