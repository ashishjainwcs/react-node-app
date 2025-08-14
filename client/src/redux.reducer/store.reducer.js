import { ADD_PAYMENT_DETAILS, ADD_SHIPPING_DETAILS, ADD_USER, initialSiteData, RESET_ACTION } from "../constants/store.constants"
import { ADD_TO_CART, LOGIN_USER, LOGOUT_USER, UPDATE_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY } from "../constants/store.constants";
import { UPDATE_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT, REMOVE_CART } from "../constants/store.constants";

const initialState = {
    siteData: initialSiteData(),
    additionalNotes: {
    },
    action: ""
}

console.log("initialState:::::", initialState);


export const storeReducer = (state = initialState, action) => {

    console.log(" REDUCER CALLED ....", action.payload, " initialise state : ", state);
    switch (action.type) {
        case ADD_TO_CART:
            console.log("reducer add to cart called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        orders: [
                            ...action.payload.data
                        ]
                    }
                },
                action: ADD_TO_CART
            }

        case REMOVE_CART:
            console.log("reducer add to cart called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        orders: [
                            ...action.payload.data
                        ]
                    }
                },
                action: REMOVE_CART
            }


        case LOGIN_USER:
            console.log("reducer login called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        loggedInUser: action.payload.data.loggedInUser,
                        loggedInUserId: action.payload.data.loggedInUserId,
                        loggedInUserType: action.payload.data.loggedInUserType
                    }
                },
                action: LOGIN_USER
            }


        case LOGOUT_USER:
            console.log("reducer logut called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        loggedInUser: action.payload.data.loggedInUser,
                        loggedInUserId: action.payload.data.loggedInUserId,
                        loggedInUserType: action.payload.data.loggedInUserType
                    }
                },
                action: LOGOUT_USER
            }

        case ADD_USER:
            console.log("reducer add user called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        loggedInUser: action.payload.data.loggedInUser,
                        loggedInUserId: action.payload.data.loggedInUserId,
                        loggedInUserType: action.payload.data.loggedInUserType,
                        users: [...state.siteData.siteData.users, action.payload.data.user]
                    }
                },
                action: ADD_USER
            }

        case UPDATE_CATEGORY:
            console.log("reducer update category called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        categories: action.payload.data.updatedCategories
                    }
                },
                action: UPDATE_CATEGORY
            }


        case ADD_CATEGORY:
            console.log("reducer add category called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        categories: action.payload.data.updatedCategories
                    }
                },
                action: ADD_CATEGORY
            }

        case DELETE_CATEGORY:
            console.log("reducer delete category called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        categories: action.payload.data.updatedCategories
                    }
                },
                action: DELETE_CATEGORY
            }



        case UPDATE_PRODUCT:
            console.log("reducer update product called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        products: action.payload.data.updatedProducts
                    }
                },
                action: UPDATE_PRODUCT
            }


        case ADD_PRODUCT:
            console.log("reducer add product called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        products: action.payload.data.updatedProducts
                    }
                },
                action: ADD_PRODUCT
            }

        case DELETE_PRODUCT:
            console.log("reducer delete product called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        products: action.payload.data.updatedProducts
                    }
                },
                action: DELETE_PRODUCT
            }

        case RESET_ACTION:
            console.log("reducer reset action called ");
            return {
                ...state,
                action: ""
            }

         case ADD_SHIPPING_DETAILS:
            console.log("reducer shipping details called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        orders: [
                            ...action.payload.data
                        ]
                    }
                },
                action: ADD_SHIPPING_DETAILS
            }

         case ADD_PAYMENT_DETAILS:
            console.log("reducer payment details called ");
            return {
                ...state,
                siteData: {
                    ...state.siteData,
                    siteData: {
                        ...state.siteData.siteData,
                        orders: [
                            ...action.payload.data
                        ]
                    }
                },
                action: ADD_PAYMENT_DETAILS
            }
            default:
            return state;
    }
}