import React from "react";
import axios from "axios";
import './ProfilePage.css';

import personImg from './person.jpg';

export default class ProfilePage extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            avatarImage: '',
            email: '',
            favoriteSongs: [],
            progress: 0,
            role: '',
            username: '',
            isUserLoggedIn: false,
            accessToken: '', 
            refreshToken: '',
            _id: ''
        }
    }


    setToken(accessToken){
        localStorage.setItem("accessToken", accessToken);
    }

  

    componentDidMount(){
        let token = localStorage.getItem("accessToken");
        let headers = {
            Authorization: `Bearer ${token}`,
        };
        axios.get('/profile', { withCredentials: true,
        headers }).then(res=>{
           // console.log(res);
            let { avatarImage, email, favoriteSongs, progress, role, username, accessToken, _id } = res.data;
            this.setToken(accessToken)
            this.setState({
                avatarImage,
                email,
                favoriteSongs,
                progress,
                role,
                username,
                accessToken,
                _id
            })
        });
    }

    handleDelete = (indexToDelete) => {
      // alert('HERE');
      let arrayOfSongs = this.state.favoriteSongs;
     // console.log(arrayOfSongs)
      arrayOfSongs.splice(indexToDelete, 1);
      this.setState({favoriteSongs: arrayOfSongs})
      //UPDATE USER IN MONGO
      axios.delete(`/user/favorites/${indexToDelete}`).then((res)=>{
        let { avatarImage, email, favoriteSongs, progress, role, username, accessToken, _id } = res.data;
            this.setToken(accessToken)
            this.setState({
                avatarImage,
                email,
                favoriteSongs,
                progress,
                role,
                username,
                accessToken,
                _id
            })
      })
    };

    handleClick = (id) => {
         this.props.history.push('/song', { _id: id, instrument: 'guitar' } );
         this.props.history.go('/song', { _id: id, instrument: 'guitar' } );
    };


    render(){
     // console.log(this.state);
        return (
          <div className="personal-container">

            <div className="personal-info">
              <div className="pers-img">
                <img src={this.state.avatarImage || personImg } alt="Italian Trulli" referrerPolicy="no-referrer" />
              </div>
              <div className="pers-info">
                <div>username: { this.state.username }</div>
                <div>email: {this.state.email}</div>
                <div className="link">
                  <a href="#">Settings</a>
                </div>
              <div className="settings">
                  <div>progression: {this.state.progress}</div>
              </div>
              </div>
            </div>
      
            <div className="favoriteWrapper">
                {
                  //img, title, authorName, genre
                  this.state.favoriteSongs.map((favSong, index)=>{
                   // console.log(this.state.favoriteSongs)
                    favSong = favSong[0]
                    favSong = JSON.parse(favSong)
                   // console.log(favSong)
                    return(
                      <div className="card i1" key={index} onClick={()=>this.handleClick(favSong._id)}>
                        <img src={favSong.image} alt="Favorite 1" referrerPolicy="no-referrer" />
                        <div className="favorite-content">
                          <h2>{favSong.title}</h2>
                          <p>{favSong.genre}</p>
                        </div>
                        {/* Add the delete icon and attach the onClick event handler */}
                        <div className="delete-icon" onClick={()=>this.handleDelete(index, favSong._id)}>
                          🗑️ {/* You can replace this with your preferred delete icon */}
                        </div>
                      </div>
                    )
                  })
                }

              </div>
          </div>
          );
    }
}
