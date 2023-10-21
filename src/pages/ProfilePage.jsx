import React from "react";
// import Header from '../components/Header/Header';
// import Footer from "../components/Footer/Footer";
import axios from "axios";

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
            refreshToken: ''
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
            let { avatarImage, email, favoriteSongs, progress, role, username, accessToken } = res.data;
            this.setToken(accessToken)
            this.setState({
                avatarImage,
                email,
                favoriteSongs,
                progress,
                role,
                username,
                accessToken
            })
        });
    }

    userModal(){
        return(
            <div>
                
            </div>
        )
    }

    render(){
        return(
            <div>
                <h1>
                    {this.state.username ? `Hello ${this.state.username}` : 'Loading.....'}
                </h1>
                    <img src={this.state.avatarImage} width={50} alt="avatar" referrerPolicy="no-referrer" />
            </div>
        )
    }
}