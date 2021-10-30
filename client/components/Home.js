import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <div className="homeWelcome">Welcome, {username}</div>
      <div className="homeCard-1">
        <img className="homeImage-1" src="https://www.ikea.com/images/a-gallery-of-bathroom-ideas-55dfbc1c6c29de09c5ac5207600b266c.jpg?f=xxxl"/>
        <div className="card-1-Detail">
          <div className="card-1-Title">Create a magical table for you and your loved ones </div>
          <br/>
          <div>Go the extra mile for those you care about most, and transform your holiday table into an elegant setting with charming décor </div>
        </div>
      </div>
      <div className="cards-2">
        <div className="homeCard-2">
          <img className="homeImage-2" src="https://www.ikea.com/ext/ingkadam/m/3f8d6292a051886f/original/PH178142-crop002.jpg?f=l"/>
          <div className="card-2-Detail">
            <div className="card-2-Title">Create a magical table for you and your loved ones </div>
            <br/>
            <div>Go the extra mile for those you care about most, and transform your holiday table into an elegant setting with charming décor </div>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
        <div className="homeCard-2">
          <img className="homeImage-2" src="https://www.ikea.com/ext/ingkadam/m/2a821bb007b488d7/original/PH168785-crop001.jpg?f=xs"/>
          <div className="card-2-Detail">
            <div className="card-2-Title">Create a magical table for you and your loved ones </div>
            <br/>
            <div>Go the extra mile for those you care about most, and transform your holiday table into an elegant setting with charming décor </div>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
        <div className="homeCard-2">
          <img className="homeImage-2" src="https://www.ikea.com/ext/ingkadam/m/2518ca5862da7907/original/PH176567.jpg?f=xs"/>
          <div className="card-2-Detail">
            <div className="card-2-Title">Create a magical table for you and your loved ones </div>
            <br/>
            <div>Go the extra mile for those you care about most, and transform your holiday table into an elegant setting with charming décor </div>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
