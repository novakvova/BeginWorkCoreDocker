import React, { Component } from 'react';
import { MdCreate, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const propTypes = {
    getEditProduct: PropTypes.func.isRequired,
    getDeleteProduct: PropTypes.func.isRequired,

};

const defaultProps = {};

class ProductItem extends Component {
    state = {
        id: 0,
        name: '',
        category: ''
    }

    static getDerivedStateFromProps(props, state) {
        return { id: props.id, name: props.name, category: props.category };
    }

    editProduct = (e, id) => {
        e.preventDefault();
        this.props.getEditProduct(id);
    }

    deleteProduct = (e, id) => {
        e.preventDefault();
        this.props.getDeleteProduct(id);
    }

    render() {
        const { id, name, category } = this.state;
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{category}</td>
                <td>
                    <a href="#" onClick={(e) => this.editProduct(e, id)} className="edit"><MdCreate /></a>
                    <a href="#" onClick={(e) => this.deleteProduct(e, id)} className="delete"><MdDelete /></a>
                </td>
            </tr>
        );
    }
}

ProductItem.propTypes = propTypes;
ProductItem.defaultProps = defaultProps;

export default ProductItem;