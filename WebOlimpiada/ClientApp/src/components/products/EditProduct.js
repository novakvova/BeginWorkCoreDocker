import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";
import EclipseWidget from '../eclipse';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

const propTypes = {
  editProduct: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  product: PropTypes.object
};

const defaultProps = {};

class EditProduct extends Component {
  state = {
    _id: this.props.product ? this.props.product.id : null,
    name: this.props.product ? this.props.product.name : '',
    category: this.props.product ? this.props.product.category : '',
    errors: {},
    IsLoading: false
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    //console.log(nextProps.product);
    const { product } = nextProps;
    this.setState({
      _id: product ? product.id : null,
      name: product ? product.name : '',
      category: product ? product.category : '',
      IsLoading: nextProps.IsLoading
    });
  }

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleChange = e => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { _id, name, category } = this.state;
    let errors = {};
    if (name === "") errors.name = "Поле не може бути пустим!";
    if (category === "") errors.category = "Поле не може бути пустим!";

    const isValid = Object.keys(errors).length === 0;
    if (isValid) {

      const model = {
        Id: _id,
        Name: name,
        Category: category
      };
      console.log('Model', model);
      this.props.editProduct(model);
      //this.setState({ name: "", category: "" });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { name, category, errors, IsLoading } = this.state;
    return (
      <>
        <Modal isOpen={true}>
          <form >
            <ModalHeader>Видалити фото?</ModalHeader>
            <ModalBody>
              <div className="container">
                <form className="form-horizontal">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <div className="row">
                        <label htmlFor="first_name" className="col-md-4 col-form-label">Product</label>
                        <div className="col-md-8">
                          <input type="text"
                            className={classnames('form-control', { 'is-invalid': !!errors.name })}
                            name="name"
                            id="name"
                            value={name}
                            onChange={this.handleChange} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <label htmlFor="first_name" className="col-md-4 col-form-label">Category</label>
                        <div className="col-md-8">
                          <input type="text"
                            className={classnames('form-control', { 'is-invalid': !!errors.category })}
                            name="category"
                            id="category"
                            value={category}
                            onChange={this.handleChange} />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </form>
              </div>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit} className="btn btn-primary">Зберенти</Button>
              <Button color="danger" onClick={this.toggleDialogDelete} >Скасувати</Button>
            </ModalFooter>
          </form>
        </Modal>

        {/*  */}


        {IsLoading && <EclipseWidget />}
      </>
    );
  }
}

EditProduct.propTypes = propTypes;
EditProduct.defaultProps = defaultProps;

export default EditProduct;