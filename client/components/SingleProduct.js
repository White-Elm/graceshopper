import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import UpdateQty from './UpdateQty';
//import SimilarProducts from './SimilarProducts'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { MenuItem }from '@mui/material';



const SingleProduct = ({products, match: {params: {id}} , history}) =>{
    if(products.length === 0){
        return <div>No Product found here :(</div>
    }
    const product = products.find(product => product.id === id*1)
    if(product === undefined){
        return (
            <div>No Product found here :(</div>
        )
    }

    return(
        <Grid item key={product} xs={12} sm={6} md={4}>
           <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
           <Link to='/Products'><Button variant="contained">Back to Products</Button></Link>
            <div>
                <img src={product.imageUrl ? product.imageUrl : ''}/>
            </div>
            <div>
                <MenuItem>{product.name}</MenuItem>
                <MenuItem>{product.cost}</MenuItem>
                <MenuItem>{product.description}</MenuItem>
            </div>
            <UpdateQty product={product} history={history}/>
            </Card>
             </Grid>
    )
}


const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(SingleProduct)

