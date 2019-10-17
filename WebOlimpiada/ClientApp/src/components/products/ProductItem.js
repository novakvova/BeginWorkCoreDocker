import React, { Component } from 'react';
import { MdCreate,MdDelete} from "react-icons/md";

class ProductItem extends Component {
    state = { 
        id: 0,
        name: '',
        category: ''
     }

     static getDerivedStateFromProps(props, state) {
        //console.log('---nextProps---', props);
        return { id: props.id, name: props.name, category: props.category };
      }
    render() {
        const { id, name, category } = this.state;
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{category}</td>
                <td> 
                    <a href="#" className="edit"><MdCreate /></a>
                    <a href="#" className="delete"><MdDelete /></a>
                </td>
            </tr>
        );
    }
}
 
export default ProductItem;