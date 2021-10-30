import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav>
    <div className="logo"> <Link to='/'> WHITE ELM </Link> </div>
      {isLoggedIn ? isAdmin? (
        <div>
          <Link to='/admin/'>Admin</Link>
          <a href="#" onClick={handleClick}>Logout</a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to='/products'> Shop </Link>
          <Link to='/cart'> Cart </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to='/products'> Shop </Link>
          <Link to='/cart'> Cart </Link>
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
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.username === 'amata' || state.auth.username === 'jamie' || state.auth.username === 'patricia'
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
