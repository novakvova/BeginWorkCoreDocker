import ProductsService from './productsService';
import update from '../../helpers/update';

export const FETCH_PRODUCTS_STARTED = "products/FETCH_PRODUCTS_STARTED";
export const FETCH_PRODUCTS_SUCCESS = "products/FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILED = "products/FETCH_PRODUCTS_FAILED";

const initialState = {
    list: {
        data: [],
        failed: false,
        loading: false,
        success: false
    }
}


export const productsReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case FETCH_PRODUCTS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.data', []);
            break;
        }

        case FETCH_PRODUCTS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload.data);
            break;
        }

        case FETCH_PRODUCTS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.data', []);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        default: {
            return newState;
        }
    }

    return newState;
}

//Отримати список товарів
export const getProducts = () => {
    return (dispatch) => {
        dispatch(productsGetActions.started());

        ProductsService.getProducts()
            .then((response) => {
                dispatch(productsGetActions.success(response));
            })
            .catch(() => {
                dispatch(productsGetActions.failed());
            });
    }
}

export const productsGetActions = {
    started: () => {
        return {
            type: FETCH_PRODUCTS_STARTED
        }
    },

    success: (data) => {
        return {
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data
        }
    },

    failed: (error) => {
        return {
            type: FETCH_PRODUCTS_FAILED
        }
    }
}
