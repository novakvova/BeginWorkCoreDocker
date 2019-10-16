import React, { Component } from 'react';

class ProductItem extends Component {
    state = { 
        id: 0,
        name: '',
        category: ''
     }

     static getDerivedStateFromProps(props, state) {
        console.log('---nextProps---', props);
        return { id: props.id, name: props.name, category: props.category };
      }
    render() {
        const {id, name, category} = this.state;
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{category}</td>
                <td> </td>
            </tr>
        );
    }
}
 
export default ProductItem;