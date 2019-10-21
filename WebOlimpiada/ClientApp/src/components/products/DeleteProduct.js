import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";
import EclipseWidget from '../eclipse';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

const propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  cancelDeleteProduct: PropTypes.func.isRequired,

  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  product: PropTypes.object
};

const defaultProps = {};

class DeleteProduct extends Component {
  state = {
    _id: this.props.product ? this.props.product.id : null,
    name: this.props.product ? this.props.product.name : '',
    category: this.props.product ? this.props.product.category : '',
    errors: {},
    IsLoading: false
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { product } = nextProps;
    this.setState({
      _id: product ? product.id : null,
      name: product ? product.name : '',
      category: product ? product.category : '',
      IsLoading: nextProps.IsLoading
    });
  }

   handleSubmit = (e) => {
    e.preventDefault();

    const { _id } = this.state;
    let errors = {};
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {

      const model = {
        Id: _id
      };
      console.log('Model', model);
      this.props.deleteProduct(_id);
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { name, category, errors, IsLoading } = this.state;
    return (
      <>
        <Modal isOpen={true}>
          <form onSubmit={this.handleSubmit} className="form-horizontal">
            <ModalHeader>Видалити продукт?</ModalHeader>
            <ModalBody>
                <p>Ви видаляєте продукт {name}. Категрія продукта {category}.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit} className="btn btn-primary">Видалити</Button>
              <Button color="danger" onClick={this.props.cancelDeleteProduct} >Скасувати</Button>
            </ModalFooter>
          </form>
        </Modal>

        {/*  */}


        {IsLoading && <EclipseWidget />}
      </>
    );
  }
}

DeleteProduct.propTypes = propTypes;
DeleteProduct.defaultProps = defaultProps;

export default DeleteProduct;