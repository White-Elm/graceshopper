import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Typography } from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1> <Link to='/'> WHITE ELM </Link> </h1>
    <nav>
      {isLoggedIn ? (
        <div>

          {/* The navbar will show these links after you log in */}
          <Link to="/home"><Typography variant = "h4">Home</Typography></Link>
          <Link to='/products'> <Typography variant = "h4"> SHOP </Typography> </Link>
          <Link to='/cart'> <Typography variant = "h4">cart</Typography> </Link>
          <a href="#" onClick={handleClick}><Typography variant = "h4">
            Logout</Typography>
          </a>
          <Link to='/admin/'><Typography variant = "h4">Admin</Typography></Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to='/products'> SHOP </Link>
          <Link to='/cart'> cart </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
