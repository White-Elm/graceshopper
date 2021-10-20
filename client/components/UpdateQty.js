import React, {Component} from 'react'
import {connect} from 'react-redux';
import {updateQty} from '../store/index';
import {Link} from 'react-router-dom';

class UpdateQty extends Component{
    constructor(props){
        super(props);
        this.state = {
            productQty : ' '
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(event){
        this.setState({productQty: event.target.value})
        console.log(event.target.value)
    }
    onSubmit(event){
        
        const {product} = this.props;
    }
    render(){
         
        const {productQty} = this.state;
        const {onChange, onSubmit} = this
        return(
            <form>
                <select value={productQty} name='productQty' onChange = {onChange}>
                    <option value='1' onChange = {onChange}> 1 </option>
                    <option value='2' onChange = {onChange}> 2 </option>
                    <option value='3' onChange = {onChange}> 3 </option>
                </select>
                <button>Add to Cart</button>
            </form>
        )
    }
}

export default UpdateQty;