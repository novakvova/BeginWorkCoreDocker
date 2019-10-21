import axios from "axios";
import {serverUrl} from '../../config';

// Rest Full API
export default class ProductsService {

    static getProducts(page) {
        return axios.get(`${serverUrl}api/Products/${page}`);
    };

    static addProduct(product) {
        return axios.post(`${serverUrl}api/Products`, product);
    };

    static getProduct(id) {
        return axios.get(`${serverUrl}api/Products/edit/${id}`);
    };

    static editProduct(product) {
        return axios.put(`${serverUrl}api/Products`, product);
    };
}