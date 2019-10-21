import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from 'lodash.get';
import * as productsActions from './reducer';
import EclipseWidget from '../eclipse';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ItemPagination from './ItemPagination';
import './index.scss';


const propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,

  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,

  products: PropTypes.array.isRequired,

  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,

  add: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,
  //product: PropTypes.oneOfType([PropTypes.oneOf([null]).isRequired, PropTypes.object]).isRequired
};

const defaultProps = {};

class ProductsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
      pagination: {
        currentPage: 1,
        totalPage: 1
      },
      add: {}
    }
  }

  static getDerivedStateFromProps(props, state) {
    //console.log('---nextProps---', props);
    return { 
      products: props.products, 
      loading: props.IsLoading,
      pagination: {
        currentPage: props.currentPage,
        totalPage: props.totalPage
      },
      add: { ...props.add }
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  callBackParams = (page) =>{
    this.props.getProducts(page);
  }

  addProductToTable = (model) => {
    const {pagination} = this.state;
    this.props.addProduct(model, pagination.currentPage);
  }

  editProductTotable = (model) => {
    this.props.editProduct(model);
  }

  render() {
    const {loading, products, pagination, add} = this.state;
    const productContent = products.map((product) =>
      <ProductItem key={product.id} {...product} getProduct = {this.props.getProduct} />
    );
    return (
      <div>
        <h1>List Products</h1>
        <AddProduct {...add} addProduct={this.addProductToTable} /> 
        {this.props.edit.product && <EditProduct {...this.props.edit} editProduct={this.editProductTotable} /> }
        <table className="table table-striped table-hover products_table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productContent}
          </tbody>
        </table>

        {loading && <EclipseWidget />}

         <ItemPagination callBackParams={this.callBackParams} {...pagination} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    IsLoading: get(state, 'products.list.loading'),
    IsFailed: get(state, 'products.list.failed'),
    IsSuccess: get(state, 'products.list.success'),
    products: get(state, 'products.list.data'),
    currentPage: get(state, 'products.list.currentPage'),
    totalPage: get(state, 'products.list.totalPage'),
    add: 
    {
      IsLoading: get(state, 'products.add.loading'),
      IsFailed: get(state, 'products.add.failed'),
      IsSuccess: get(state, 'products.add.success'),
    },
    edit: {
      product: get(state, 'products.edit.product'),
      IsLoading: get(state, 'products.edit.loading'),
      IsFailed: get(state, 'products.edit.failed'),
      IsSuccess: get(state, 'products.edit.success'),
    }
    
  }
}

const mapDispatch = {
  getProducts: (page) => {
    return productsActions.getProducts(page);
  },
  addProduct: (product, currentPage) => {
    return productsActions.addProduct(product, currentPage);
  },

  editProduct: (product) => {
    return productsActions.editProduct(product);
  },
  getProduct: (id) => {
    return productsActions.getProduct(id);
  }
}

ProductsPage.propTypes = propTypes;
ProductsPage.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(ProductsPage);