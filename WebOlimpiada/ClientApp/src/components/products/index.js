import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from 'lodash.get';
import * as productsActions from './reducer';
import EclipseWidget from '../eclipse';
import ProductItem from './ProductItem';

const propTypes = {
  getProducts: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
};

const defaultProps = {};

class ProductsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('---nextProps---', props);
    return { products: props.products, loading: props.IsLoading };
  }

  componentDidMount() {
    this.props.getProducts();
  }


  render() {
    const {loading, products} = this.state;
    //console.log('---this.props---', this.props);
    console.log('-------this.state--------', this.state);
    const productContent = products.map((product) =>
      <ProductItem {...product} />
    );
    return (
      <div>
        <h1>List Products</h1>
        <table className="table">
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
  }
}

const mapDispatch = {
  getProducts: () => {
    return productsActions.getProducts();
  }
}

ProductsPage.propTypes = propTypes;
ProductsPage.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(ProductsPage);