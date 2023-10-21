import React from "react";
import './Header.css'

import { withRouter } from 'react-router-dom';


class Header extends React.Component {
  
  constructor(props) { 
    super(props);
    this.state = {
      isUserLoggedIn: false,
      searchText: '',
      placeHolder: 'Search',
      searchData: [],
    }
  }

  searchField = ({searchText, placeHolder}) => {
    return (
      <div className="grid-item">

      <input
        value={searchText}
        placeholder={placeHolder}
        onChange={(e)=>this.setState({searchText: e.target.value})}
        className="search-field"
      >
      </input>
      </div>
    )
  };
  
  clickOnSearch() {
    // create Request to server to pull response with search result 

    console.log(this.state.searchText);
    alert(this.state.searchText)
    this.setState({ searchText:'' })
  }

  searchButton = () => {
    return (
      <button
        className="grid-item search-button"
        onClick={()=> this.clickOnSearch()}>
        Search
      </button>
    )
  }

  navigateTotLogin() {
    const { history } = this.props;
    history.push('/login');
  }

  logIn() {
    return (
      <button
        className="grid-item log item4"
        onClick={()=> this.navigateTotLogin()}
      >
        LOGIN
      </button>
    )
  }

  logOut() {
    return (
      <button className="grid-item log item4">
        LOGOUT
      </button>
    )
  }

  menu() {
    return (
      // <nav role="navigation">
        <div id="menuToggle" className="item1 grid-item">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>


          {
            this.drawMenu()
}
        </div>
      // </nav>
    )
    
    // return this.state.isMenuOpen ? menuImage : this.drawMenu();
  }

  drawMenu() { 
    const menuItemsForLoggedUser = ['Home', 'Personal', 'Instruments', 'Genres', 'Tuner', 'Help'];
    const menuItemsForNotLoggedUser = ['Home', 'Instruments', 'Genres', 'Tuner', 'Help']
    let userStatus = this.state.isUserLoggedIn;
    let userMenu = userStatus ? menuItemsForLoggedUser : menuItemsForNotLoggedUser;
    return (
      <ul id="menu">
        {
          userMenu.map((item, index) => {
            return <a href="#" key={index}><li>{item}</li></a>
            // <div key={index}>{item}</div>
          })
        }
      </ul>
    )
  }


  render() { 
    return (
        <nav role="navigation">
          <div className="navigation-container ">

          {
            this.menu()  
          }
          {
            <div className="home item3">
              <div>
              Partitura
              </div>
            </div>
          }
          {/* <div className="header"> */}
          <div className="item2">
          {
            this.searchField(this.state)
          }
          {
            this.searchButton()
          }
          </div>
          {
            this.state.isUserLoggedIn ? this.logOut() : this.logIn()
          }
          {/* </div> */}
          </div>
          </nav>
        
    )
  }
}


export default withRouter(Header)