import * as React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel, MenuItem} from '@mui/material';
import { createTheme,  ThemeProvider} from '@mui/material';


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
            products.sort((A,B) => A.cost.localeCompare(B.cost))
        }
        if(matchBy === 'HighToLow'){
            products.sort((A,B) => B.cost.localeCompare(A.cost))
        }
        const theme = createTheme();

        //Filters
        return (
            <ThemeProvider theme={theme}>

             <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Our Products
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              We offer the best selections of furniture, think Ikea but better
            </Typography> 
                
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            > 
            <Link to='/Products'><Button variant="contained">Remove Filters / Sorts</Button></Link> 
            <Link to='/Products/Sort/aToz'><Button variant="outlined">A to Z</Button></Link>
            <Link to='/Products/Sort/zToa'><Button variant="outlined">Z to A</Button></Link>
                    <FormControl onSubmit={onSubmit}>
                        <Select value={productRoom} name='productRoom' onChange={onChange}>
                            <InputLabel>Filter By Room</InputLabel>
                            {roomIdArr.map(roomId =>{
                                return(
                                    <MenuItem key={roomId} value ={rooms.find(room => room.id === roomId) ? rooms.find(room => room.id === roomId).name : null} onChange={onChange}>
                                        {rooms.find(room => room.id === roomId) ? rooms.find(room => room.id === roomId).name : null}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl onSubmit={onSubmit}>
                        <Select value={productType} name='productType' onChange={onChange}>
                            <InputLabel>Filter By Product Type</InputLabel>
                            {productTypeIdArr.map(typeId =>{
                                    return(
                                        <MenuItem key={typeId} value ={types.find(type => type.id === typeId) ? types.find(type => type.id === typeId).name : null} onChange={onChange}>
                                            {types.find(type => type.id === typeId) ? types.find(type => type.id === typeId).name : null}
                                        </MenuItem>
                                    )
                            })}
                        </Select>
                    </FormControl>
                </Stack>
                </Container>
            </Box>
                <Grid container spacing={4}>
                    {products.map((product) => {
                        return (
                            <Grid item key={product} xs={12} sm={6} md={4}>
                            <Card
                              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
            
                            <li key={product.id}>
                                <h2>
                                    <img src={product.imageUrl ? product.imageUrl : 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'}/>
                                    <Link to={`/products/${product.id}`}> <Typography>{ product.name }, price: { product.cost}</Typography> </Link>
                                </h2>
                            </li>
                            </Card>
                            </Grid>
                        )
                    })}
            </Grid>
            </ThemeProvider>

        )
    }
}


const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(Products);

