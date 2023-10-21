import React from "react";
import './HomePage.css'

// import Header from "../components/Header/Header";
import LastAdded from "../components/LastAdded/LastAdded";
import Instruments from "../components/Instruments/Instruments"
import RandomContent from "../components/RandomContent/RandomContent";
// import Footer from "../components/Footer/Footer";
import axios from "axios";

export default class HomePage extends React.Component { 
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      isUserLoggedIn: false
    }
  }

  componentDidMount(){
    axios.get('/isLogIn').then(res=>{
      // console.log(res.data)
      this.setState({
        isUserLoggedIn: res.data
      })
    })
  }

  render() { 
    return (
      <div>
        <div className="home-page-container">
          <div className="home-page-container-left">
            <LastAdded/>
            {/* left */}
          </div>
          <div className="home-page-container-right">
            <Instruments/>
            <div className="content">
              <RandomContent history={this.props.history}/>
            </div>
          </div>

        </div>
      </div>
    )
  }
}