import ProductsService from './productsService';
import update from '../../helpers/update';

export const ADD_PRODUCT_STARTED = "product/ADD_PRODUCT_STARTED";
export const ADD_PRODUCT_SUCCESS = "product/ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILED = "product/ADD_PRODUCT_STARTED";

export const FETCH_PRODUCTS_STARTED = "products/FETCH_PRODUCTS_STARTED";
export const FETCH_PRODUCTS_SUCCESS = "products/FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILED = "products/FETCH_PRODUCTS_FAILED";

const initialState = {
    list: {
        data: [],
        currentPage: 1,
        totalPage: 1,
        failed: false,
        loading: false,
        success: false
    },
    add: {
        loading: false,
        success: false,
        failed: false,
        errors: {}
    },
}


export const productsReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
//-----------------LIST OF PRODUCT---------------------------
        case FETCH_PRODUCTS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            //newState = update.set(newState, 'list.data', []);
            break;
        }

        case FETCH_PRODUCTS_SUCCESS: {
            newState = update.set(state, 'list', 
            {
                ...state.list, 
                loading: false,
                success: true,
                ...action.payload.data
            });
            // newState = update.set(state, 'list.loading', false);
            // newState = update.set(newState, 'list.success', true);
            // newState = update.set(newState, 'list.data', action.payload.data.products);
            break;
        }

        case FETCH_PRODUCTS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.data', []);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        //-----------------ADD PRODUCT---------------------------
        case ADD_PRODUCT_STARTED: {
            newState = update.set(state, 'add.loading', true);
            newState = update.set(newState, 'add.success', false);
            newState = update.set(newState, 'add.errors', {});
            newState = update.set(newState, 'add.failed', false);
            break;
        }
        case ADD_PRODUCT_SUCCESS: {
            newState = update.set(state, 'add.loading', false);
            newState = update.set(newState, 'add.failed', false);
            
            //console.log('----Add product id----',action.payload.data);
            //newState = update.set(newState, 'list.data', [...newState.list.data, action.payload.data]);
            newState = update.set(newState, 'add.errors', {});
            newState = update.set(newState, 'add.success', true);
            break;
        }
        case ADD_PRODUCT_FAILED: {
            newState = update.set(state, 'add.loading', false);
            newState = update.set(newState, 'add.success', false);
            newState = update.set(newState, 'add.errors', action.errors);
            newState = update.set(newState, 'add.failed', true);
            break;
        }
        default: {
            return newState;
        }
    }

    return newState;
}

//Отримати список товарів
export const getProducts = (page=1) => {
    return (dispatch) => {
        AddUpdateProducts(page,dispatch);
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


//Отримати список товарів
export const addProduct = (model, page) => {
    return (dispatch) => {
        dispatch(productAddActions.started());
        ProductsService.addProduct(model)
            .then((response) => {
                dispatch(productAddActions.success(response));

                AddUpdateProducts(page, dispatch);
                //UpdateListProducts
                //history.push('gallery');
            }, err=> { throw err; })
            .catch(err=> {
                dispatch(productAddActions.failed(err.response));
                //redirectStatusCode(err.response.status);
            });
    }
}

export const productAddActions = {
    started: () => {
        return {
            type: ADD_PRODUCT_STARTED
        }
    },
    success: (data) => {
        return {
            type: ADD_PRODUCT_SUCCESS,
            payload: data
        }
    },
    failed: (response) => {
        return {
            type: ADD_PRODUCT_FAILED,
            errors: response.data
        }
    }
}

//Update list products
const AddUpdateProducts = (page, dispatch) => {
    dispatch(productsGetActions.started());

    ProductsService.getProducts(page)
        .then((response) => {
            dispatch(productsGetActions.success(response));
        })
        .catch(() => {
            dispatch(productsGetActions.failed());
        });
}
