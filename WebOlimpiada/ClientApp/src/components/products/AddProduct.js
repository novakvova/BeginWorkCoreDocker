import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";
import EclipseWidget from '../eclipse';

const propTypes = {
  addProduct: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired
};

const defaultProps = {};

class AddProduct extends Component {
  state = {
    name: '',
    category: '',
    errors: {},
    IsLoading: false
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
  static getDerivedStateFromProps(props, state) {
    return { 
      IsLoading: props.IsLoading,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, category } = this.state;
    let errors = {};
    if (name === "") errors.name = "Поле не може бути пустим!";
    if (category === "") errors.category = "Поле не може бути пустим!";

    const isValid = Object.keys(errors).length === 0;
    if (isValid) {

      const model = {
        Name: name,
        Category: category
      };
      this.props.addProduct(model);
      this.setState({ name: "", category: "" });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { name, category, errors, IsLoading } = this.state;
    return (
      <>
        <div className="container">
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group row">
              <div className="col-md-5">
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
              <div className="col-md-5">
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
              <div className="col-md-2 mt-4 mt-md-0">
                <input type="submit" className="btn btn-success btn-block" value="Add" />
              </div>
            </div>
          </form>
        </div>
        {IsLoading && <EclipseWidget />}
      </>
    );
  }
}

AddProduct.propTypes = propTypes;
AddProduct.defaultProps = defaultProps;

export default AddProduct;