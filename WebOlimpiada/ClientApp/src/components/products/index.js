import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from 'lodash.get';
import * as productsActions from './reducer';

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
        if (props.products !== state.products) {
          return {
            products: props.products,
          };
        }
    
        // Return null if the state hasn't changed
        return null;
      }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('---nextProps---', nextProps);
    //     return { products: nextProps.products, loading: nextProps.IsLoading };
    // }

    componentDidMount() {
        this.props.getProducts();
    }

    

    render() { 
        console.log('---this.props---', this.props);
        console.log('-------this.state--------', this.state);
        return ( 
            <h1>List Products</h1>
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