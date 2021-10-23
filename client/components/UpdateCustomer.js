import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCustomer} from '../store/customers'

class UpdateCustomer extends Component {
    constructor(props){
        super(props);
        const {customer} = this.props;
        this.state = {
             customerId: customer.id ? customer.id : '',
             firstName: customer.firstName ? customer.firstName : '',
             lastName: customer.lastName ? customer.lastName : '',
             address : customer.address ? customer.address : '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        const change = {};
        change[event.target.name] = event.target.value;
        console.log(change);
        this.setState(change);
    }
    onSubmit(event){
        const {customerId, firstName, lastName, address} = this.state;
        event.preventDefault();
        if(firstName === ''){
            window.alert('First Name is requried');
        }
        else if(lastName === ''){
            window.alert('Last Name is required');
        }
        else if(address === ''){
            window.alert('Address is required');
        }
        else{
            this.props.updateCustomer(customerId, firstName, lastName, address);
        }

    }
    render(){
        const {firstName, lastName, address} = this.state;
        const {onChange, onSubmit} = this
        return(
            <div>
            <form name='updateCustomerForm' onSubmit={onSubmit}>
                <label>First Name</label>
                <input value={firstName} name='firstName' onChange={onChange}/>
                <label>Last Name</label>
                <input value={lastName} name='lastName' onChange={onChange}/>
                <label>Address</label>
                <input value={address} name='address' onChange={onChange}/>
                <button>Update Customer Info</button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return state;
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return {
        updateCustomer: (customerId, firstName, lastName, address) =>{
            dispatch(updateCustomer(customerId, firstName, lastName, address, history))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomer)
