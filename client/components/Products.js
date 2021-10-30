import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            productRoom : '',
            productType : '',
        }
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event){
        const {history} = this.props
        // const change = {};
        // change[event.target.name] = event.target.value;
        // this.setState(change)
        history.push(`/Products/Sort/${event.target.value}`);
    }
    onSubmit(event){
        const {productRoom, productType} = this.state
    }
    render(){
        const { types, rooms, history, match } = this.props
        let {products} = this.props
        const {productRoom, productType} = this.state;
        const {onChange, onSubmit} = this
        const roomIdArr = []
        const productTypeIdArr = []
        const matchBy = match.params.by
        
        if(products.length > 0){
            for(let i = 0; i<products.length; i++){
                if(products[i].roomId && !roomIdArr.includes(products[i].roomId) ){
                    roomIdArr.push(products[i].roomId)
                }
            }

            for(let i = 0; i<products.length; i++){
                if(products[i].productTypeId && !productTypeIdArr.includes(products[i].productTypeId)){
                    productTypeIdArr.push(products[i].productTypeId)
                }
            }
        }
        for(let i = 0; i<roomIdArr.length; i++){
            const roomId = rooms.find(room => room.name === matchBy) ? rooms.find(room => room.name === matchBy).id : null
            if(roomId !== null){
                products = products.filter(product => product.roomId === roomId)
            }
        }
        for(let i = 0; i<productTypeIdArr.length; i++){
            const typeId = types.find(type => type.name === matchBy) ? types.find(type => type.name === matchBy).id : null
            if(typeId !== null){
                products = products.filter(product => product.productTypeId === typeId)
            }
        }

        

        //Sorts
        if(matchBy === undefined){
            products.sort((A,B) => A.id.toString().localeCompare(B.id.toString()))
        }
        if(matchBy === 'aToz'){
            products.sort((A,B) => A.name.localeCompare(B.name))
        }
        if(matchBy === 'zToa'){
            products.sort((A,B) => B.name.localeCompare(A.name))
        }
        if(matchBy === 'LowToHigh'){
            products.forEach(product => product.cost = product.cost * 1)
            products.sort(function(a, b){return a.cost-b.cost})
            products.forEach(product => product.cost = product.cost.toString())
        }
        if(matchBy === 'HighToLow'){
            products.forEach(product => product.cost = product.cost * 1)
            products.sort(function(a, b){return b.cost-a.cost})
            products.forEach(product => product.cost = product.cost.toString())
        }

        //Filters
        return (
            <div>
                <div className ='SortProducts'>
                    <Link to='/Products'>Remove Filters / Sorts</Link>
                    <br/>
                    <Link to='/Products/Sort/aToz'>A to Z</Link>
                    <br/>
                    <Link to='/Products/Sort/zToa'>Z to A</Link>
                    <br/>
                    <Link to='/Products/Sort/LowToHigh'>Low to High</Link>
                    <br/>
                    <Link to='/Products/Sort/HighToLow'>High to Low</Link>
                    <br/>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <select value={productRoom} name='productRoom' onChange={onChange}>
                            <option>Filter By Room</option>
                            {roomIdArr.map(roomId =>{
                                return(
                                    <option key={roomId} value ={rooms.find(room => room.id === roomId) ? rooms.find(room => room.id === roomId).name : null} onChange={onChange}>
                                        {rooms.find(room => room.id === roomId) ? rooms.find(room => room.id === roomId).name : null}
                                    </option>
                                )
                            })}
                        </select>
                        <select value={productType} name='productType' onChange={onChange}>
                            <option>Filter By Product Type</option>
                            {productTypeIdArr.map(typeId =>{
                                    return(
                                        <option key={typeId} value ={types.find(type => type.id === typeId) ? types.find(type => type.id === typeId).name : null} onChange={onChange}>
                                            {types.find(type => type.id === typeId) ? types.find(type => type.id === typeId).name : null}
                                        </option>
                                    )
                            })}
                        </select>
                    </form>
                </div>
                <ul>
                    {products.map((product) => {
                        return (
                            <li key={product.id}>
                                <h2>
                                    <img src={product.imageUrl ? product.imageUrl : 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'}/>
                                    <Link to={`/products/${product.id}`}> { product.name }, price: { product.cost} </Link>
                                </h2>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(Products);

