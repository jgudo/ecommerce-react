export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface RootState {
    products: {
        items: IProduct[];
        lastRefKey: Record<string, unknown>;
        total: number;
    };
    basket: IProduct[];
    auth: IAuthInfo;
    profile: IUser;
    filter: IFilter;
    checkout: {
        shipping: IShippingInfo;
        payment: IPaymentInfo;
    };
    app: {
        loading: boolean;
        isAuthenticating: boolean;
        authStatus: IAuthStatus;
        requestStatus: string | null;
        theme: string;
    };
}

export interface IProduct {
    id: string;
    name: string;
    description?: string;
    price: number;
    brand: string;
    imageUrl: string;
    image: string;
    maxQuantity: number;
    quantity: number;
    dateAdded: number;
    availableColors: string[];
    imageCollection: IImageFile[];
    keywords?: string[];
}

export interface IUser {
    fullname: string;
    email: string;
    avatar: string;
    banner: string;
    address?: string;
    dateJoined: number;
    basket: IProduct[];
    mobile: IMobileInfo | {};
    role: string;
}

export interface IUserCred {
    fullname: string;
    email: string;
    password: string;
}

export interface IAuthStatus {
    success?: boolean;
    type?: string;
    message?: string;
}

export interface IAuthInfo {
    id: string | null;
    role: string | null;
    provider: string | null;
}

export interface IMisc {
    loading: boolean;
    isAuthenticating: boolean;
    authStatus: IAuthStatus | {};
    requestStatus: IAuthStatus | null;
    theme: string;
}

export interface IMobileInfo {
    value: string;
    data: {
        dialCode: string;
        countryCode: string;
        num: string;
    }
}

export interface IShippingInfo {
    fullname: string;
    email: string;
    address: string;
    mobile: IMobileInfo;
    isInternational: boolean;
    isDone: boolean;
}

export interface IPaymentInfo {
    type: string;
    data: {
        name?: string,
        cardnumber?: string,
        expiry?: string,
        ccv?: string
    };
}

export interface IFilter {
    recent: string[];
    keyword: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
}

export interface IImageFile {
    file: File | null;
    url: string;
    id: string;
}

export type ProductState = {
    lastRefKey: Record<string, unknown> | null;
    total: number;
    items: IProduct[]
};