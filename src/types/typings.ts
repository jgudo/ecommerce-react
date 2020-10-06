import {
    EAuthActionType, EBasketActionType,
    ECheckOutActionType, EFilterActionType, EProductActionType, EProfileActionType
} from 'constants/constants';

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
        authStatus: IAuthInfo;
        requestStatus: string | null;
        theme: string;
    };
}

export interface IProduct {
    id?: string;
    name: string;
    description?: string;
    price: number;
    brand: string;
    imageUrl: string;
    image: string;
    maxQuantity: number;
    quantity: number;
    dateAdded: number;
    imageCollection?: IProductImage[];
    keywords?: string[];
}

export interface IProductImage {
    id: string;
    url: string;
}

export interface IUser {
    fullname: string;
    email: string;
    avatar: string;
    banner: string;
    address?: string;
    dateJoined: number;
    mobile?: IMobileInfo | {};
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
    role: string;
    provider: string | null;
}

export interface IMisc {
    loading: boolean;
    isAuthenticating: boolean;
    authStatus: IAuthStatus | {};
    requestStatus: string | null;
    theme: string;
}

export interface IMobileInfo {
    dialCode: string;
    countryCode: string;
    num: string;
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
        expiry?: number,
        ccv?: number
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
    file: File;
    url: string;
    id: string;
}

// *************************** AUTH ACTION *********************** //

interface AuthAction {
    type: EAuthActionType.SIGNIN;
    payload: {
        email: string,
        password: string
    };
}

interface SignUpAction {
    type: EAuthActionType.SIGNUP;
    payload: IUserCred;
}

interface SignInSuccessAction {
    type: EAuthActionType.SIGNIN_SUCCESS;
    payload: IAuthInfo;
}

interface SignOutSuccessAction {
    type: EAuthActionType.SIGNOUT_SUCCESS;
}

interface AuthStatusAction {
    type: EAuthActionType.SET_AUTH_STATUS;
    payload: IAuthStatus;
}

interface AuthStateSuccessAction {
    type: EAuthActionType.ON_AUTHSTATE_SUCCESS;
    payload: IUser;
}

interface ResetPasswordAction {
    type: EAuthActionType.RESET_PASSWORD;
    payload: string;
}

export type AuthActionType =
    | AuthAction
    | SignUpAction
    | SignInSuccessAction
    | SignOutSuccessAction
    | AuthStatusAction
    | AuthStateSuccessAction
    | ResetPasswordAction;

// *************************** END OF AUTH ACTION *********************** //

// *************************** BASKET ACTION *********************** //

interface AddToBasketdAction {
    type: EBasketActionType.ADD_TO_BASKET;
    payload: IProduct;
}

interface RemoveFromBasketdAction {
    type: EBasketActionType.REMOVE_FROM_BASKET;
    payload: string;
}

interface ClearBasketdAction {
    type: EBasketActionType.CLEAR_BASKET;
}

interface AddQtyAction {
    type: EBasketActionType.ADD_QTY_ITEM;
    payload: string;
}

interface MinusQtydAction {
    type: EBasketActionType.MINUS_QTY_ITEM;
    payload: string;
}

export type BasketActionType =
    | AddToBasketdAction
    | RemoveFromBasketdAction
    | ClearBasketdAction
    | AddQtyAction
    | MinusQtydAction;

// *************************** END OF BASKET ACTION *********************** //

// *************************** CHECKOUT ACTION *********************** //
interface SetShippingDetailsAction {
    type: ECheckOutActionType.SET_CHECKOUT_SHIPPING_DETAILS;
    payload: IShippingInfo;
}

interface SetPaymentDetailsAction {
    type: ECheckOutActionType.SET_CHECKOUT_PAYMENT_DETAILS;
    payload: IPaymentInfo;
}

export type CheckOutActionType = SetShippingDetailsAction | SetPaymentDetailsAction;
// *************************** END OF CHECKOUT ACTION *********************** //

// *************************** FILTER ACTION *********************** //

interface SetTextFilterAction {
    type: EFilterActionType.SET_TEXT_FILTER;
    payload: string;
}

interface SetBrandFilterAction {
    type: EFilterActionType.SET_BRAND_FILTER;
    payload: string;
}

interface SetMinPriceFilterAction {
    type: EFilterActionType.SET_MIN_PRICE_FILTER;
    payload: number;
}

interface SetMaxPriceFilterAction {
    type: EFilterActionType.SET_MAX_PRICE_FILTER;
    payload: number;
}

interface RemoveSelectedRecentFilterAction {
    type: EFilterActionType.REMOVE_SELECTED_RECENT;
    payload: string;
}

interface ApplyFilterAction {
    type: EFilterActionType.APPLY_FILTER;
    payload: Partial<IFilter>;
}

export type FilterActionType =
    | SetTextFilterAction
    | SetBrandFilterAction
    | SetMinPriceFilterAction
    | SetMaxPriceFilterAction
    | RemoveSelectedRecentFilterAction
    | ApplyFilterAction;
// *************************** END OF FILTER ACTION *********************** //


// *************************** PRODUCT ACTION *********************** //
export type ProductState = {
    lastRefKey: Record<string, unknown> | null;
    total: number;
    items: IProduct[]
}

interface GetProductAction {
    type: EProductActionType.GET_PRODUCTS;
    payload: any;
}

interface GetProductSuccessAction {
    type: EProductActionType.GET_PRODUCTS_SUCCESS;
    payload: ProductState;
}

interface AddProductSuccessAction {
    type: EProductActionType.ADD_PRODUCT_SUCCESS;
    payload: IProduct;
}

interface RemoveProductSuccessAction {
    type: EProductActionType.REMOVE_PRODUCT_SUCCESS;
    payload: string;
}

interface EditProductAction {
    type: EProductActionType.EDIT_PRODUCT;
    payload: { id: string, updates: Partial<IProduct> };
}

interface RemoveProductAction {
    type: EProductActionType.REMOVE_PRODUCT;
    payload: string;
}

interface EditProductSuccessAction {
    type: EProductActionType.EDIT_PRODUCT_SUCCESS;
    payload: { id: string, updates: Partial<IProduct> };
}

export type ProductActionType =
    | GetProductAction
    | GetProductSuccessAction
    | AddProductSuccessAction
    | RemoveProductSuccessAction
    | EditProductAction
    | EditProductSuccessAction
    | RemoveProductAction;

// *************************** END OF PRODUCT ACTION *********************** //

// *************************** PROFILE ACTION *********************** //

interface SetProfileAction {
    type: EProfileActionType.SET_PROFILE;
    payload: IUser;
}

interface UpdateProfileSuccessAction {
    type: EProfileActionType.UPDATE_PROFILE_SUCCESS;
    payload: Partial<IUser>;
}

interface ClearProfileAction {
    type: EProfileActionType.CLEAR_PROFILE;
}

export type ProfileActionType =
    | SetProfileAction
    | UpdateProfileSuccessAction
    | ClearProfileAction;

// *************************** END OF PROFILE ACTION *********************** //

