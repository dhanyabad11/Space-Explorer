import { TGLobalError, TImageData } from "../Types/types";

export interface IGlobal {
    loading: boolean;
    error: TGLobalError;
    showTopNav: boolean;
    toExpandImage: boolean;
    modalImageHref: string | null;
    modalImageTitle: string;
    activeNavElement: { isActive: boolean; activeEl: string };
    showPoD: boolean;
}

export interface IImageData {
    allData: TImageData[];
    imagePage: number;
    queryString: string;
}

export interface IAction<T, P> {
    readonly type: T;
    readonly payload: P;
}
