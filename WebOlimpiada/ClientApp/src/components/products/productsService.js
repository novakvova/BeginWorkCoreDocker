import axios from "axios";
import {serverUrl} from '../../config';

// Rest Full API
export default class ProductsService {

    static getProducts() {
        return axios.get(`${serverUrl}api/Products`)
    };
}