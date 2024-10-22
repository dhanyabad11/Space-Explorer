import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IGlobal, IImageData } from "../Interfaces/interfaces";

export type TImageData = {
    href: string;
    data: [TDataObject];
    links: [TImageItem];
    handleShare?: (url: string) => void;
    currentlyIsMobile?: boolean;
};

export type TArticleData = {
    count?: number | null;
    next?: string;
    previous?: null;
    results: TArticleItem[] | null;
};

export type TPlanetData = {
    name: string;
    mass: number;
    radius: number;
    period: number;
    semi_major_axis: number;
    temperature: number;
    distance_light_year: number;
    host_star_mass: number;
    host_star_temperature: number;
    image?: string;
};

export type TArticleItem = {
    events: [];
    featured: boolean;
    id: number | null;
    image_url: string;
    launches: [];
    news_site: string;
    published_at: string;
    summary: string;
    title: string;
    updated_at: string;
    url: string;
};

export type TImageItem = {
    href: string;
    rel: string;
    render: string;
};

type TDataObject = {
    center: string;
    date_created: string;
    description?: string;
    description_508?: string;
    keywords?: [];
    media_type?: string;
    nasa_id: string;
    secondary_creator?: string;
    title: string;
};

export type TPicOfTheDay = {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    title: string;
    url: string;
    prevUrl: string;
};

export type TGLobalError = {
    error: string;
    page?: string;
};

export type AbortType = {
    signal: AbortSignal;
    controller: AbortController;
};

export type PageChangerProps = {
    imageData: IImageData;
    signal: AbortSignal;
    controller: AbortController;
    setToDisableLoadButton: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: ThunkDispatch<
        {
            globalSlice: IGlobal;
            imageSlice: IImageData;
            podSlice: TPicOfTheDay;
        },
        undefined,
        AnyAction
    >;
};

export type FormCheckerProps = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setToDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: ThunkDispatch<
        {
            globalSlice: IGlobal;
            imageSlice: IImageData;
            podSlice: TPicOfTheDay;
        },
        undefined,
        AnyAction
    >;
    pageView: string;
};

export type ItemsGetterProps = {
    imageData: IImageData;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    dispatch: ThunkDispatch<
        {
            globalSlice: IGlobal;
            imageSlice: IImageData;
            podSlice: TPicOfTheDay;
        },
        undefined,
        AnyAction
    >;
    pageView: string;
} & AbortType;

export type ImageChangerProps = {
    movement: string;
    imageData: IImageData;
    globalData: IGlobal;
    dispatch: ThunkDispatch<
        {
            globalSlice: IGlobal;
            imageSlice: IImageData;
            podSlice: TPicOfTheDay;
        },
        undefined,
        AnyAction
    >;
};

export type SearchFormTypes = {
    setToDisableLoadButton: React.Dispatch<React.SetStateAction<boolean>>;
    pageView: "images" | "articles" | "planets";
};
