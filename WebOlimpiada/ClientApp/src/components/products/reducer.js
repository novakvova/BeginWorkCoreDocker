import ProductsService from './productsService';
import update from '../../helpers/update';

export const ADD_PRODUCT_STARTED = "product/ADD_PRODUCT_STARTED";
export const ADD_PRODUCT_SUCCESS = "product/ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILED = "product/ADD_PRODUCT_STARTED";

export const FETCH_PRODUCT_STARTED = "product/FETCH_PRODUCT_STARTED";
export const FETCH_PRODUCT_SUCCESS = "product/FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAILED = "product/FETCH_PRODUCT_STARTED";

export const EDIT_PRODUCT_STARTED = "product/EDIT_PRODUCT_STARTED";
export const EDIT_PRODUCT_SUCCESS = "product/EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILED = "product/EDIT_PRODUCT_STARTED";

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

    edit: {
        product: null,
        loading: false,
        success: false,
        failed: false,
        errors: {}
    },
}


export const productsReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
//-----------------LIST OF PRODUCTS---------------------------
        case FETCH_PRODUCTS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
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
            break;
        }

        case FETCH_PRODUCTS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.data', []);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        //-----------------GET PRODUCT BY ID---------------------------
        case FETCH_PRODUCT_STARTED: {
            newState = update.set(state, 'edit.loading', true);
            newState = update.set(newState, 'edit.success', false);
            newState = update.set(newState, 'edit.failed', false);
            break;
        }

        case FETCH_PRODUCT_SUCCESS: {
            newState = update.set(state, 'edit.loading', false);
            newState = update.set(newState, 'edit.success', true);
            newState = update.set(newState, 'edit.failed', false);
            newState = update.set(newState, 'edit.product', action.payload.data);
            break;
        }

        case FETCH_PRODUCT_FAILED: {
            newState = update.set(state, 'edit.loading', false);
            newState = update.set(newState, 'edit.data', []);
            newState = update.set(newState, 'edit.failed', true);
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
            newState = update.set(newState, 'list.data', [...newState.list.data, action.payload.data]);
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
        //-----------------EDIT PRODUCT---------------------------
        case EDIT_PRODUCT_STARTED: {
            newState = update.set(state, 'edit.loading', true);
            newState = update.set(newState, 'edit.success', false);
            newState = update.set(newState, 'edit.errors', {});
            newState = update.set(newState, 'edit.failed', false);
            break;
        }
        case EDIT_PRODUCT_SUCCESS: {
            newState = update.set(state, 'edit.loading', false);
            newState = update.set(newState, 'edit.failed', false);
            
            //console.log('----Add product id----',action.payload.data);
            newState = update.set(newState, 
                'list.data',  
                newState.list.data.map(item => 
                {
                    if (item.id === action.payload.data.id) 
                        return action.payload.data;
                    return item;
                })
            );
            newState = update.set(newState, 'edit.product', null);
            //newState = update.set(newState, 'list.data', [...newState.list.data, action.payload.data]);
            newState = update.set(newState, 'edit.errors', {});
            newState = update.set(newState, 'edit.success', true);
            break;
        }
        case EDIT_PRODUCT_FAILED: {
            newState = update.set(state, 'edit.loading', false);
            newState = update.set(newState, 'edit.success', false);
            newState = update.set(newState, 'edit.errors', action.errors);
            newState = update.set(newState, 'edit.failed', true);
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

//Отримати один продукт по id
export const getProduct = (id) => {
    return (dispatch) => {
        dispatch(productGetActions.started());

        ProductsService.getProduct(id)
            .then((response) => {
                dispatch(productGetActions.success(response));
            })
            .catch(() => {
                dispatch(productGetActions.failed());
            });
    }
}

export const productGetActions = {
    started: () => {
        return {
            type: FETCH_PRODUCT_STARTED
        }
    },
    success: (data) => {
        return {
            type: FETCH_PRODUCT_SUCCESS,
            payload: data
        }
    },
    failed: (error) => {
        return {
            type: FETCH_PRODUCT_FAILED
        }
    }
}


//Додати продукт товарів
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

//Змінити продукт товарів
export const editProduct = (model) => {
    return (dispatch) => {
        dispatch(productEditActions.started());
        ProductsService.editProduct(model)
            .then((response) => {
                dispatch(productEditActions.success(response));

                //AddUpdateProducts(page, dispatch);
                //UpdateListProducts
                //history.push('gallery');
            }, err=> { throw err; })
            .catch(err=> {
                dispatch(productEditActions.failed(err.response));
                //redirectStatusCode(err.response.status);
            });
    }
}

export const productEditActions = {
    started: () => {
        return {
            type: EDIT_PRODUCT_STARTED
        }
    },
    success: (data) => {
        return {
            type: EDIT_PRODUCT_SUCCESS,
            payload: data
        }
    },
    failed: (response) => {
        return {
            type: EDIT_PRODUCT_FAILED,
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
