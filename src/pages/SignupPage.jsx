import React from 'react';
import './SignupPage.css'
import axios from 'axios';


//user/register
export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      avatarImage: ''
    };
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.password === this.state.password2){
      try{
        axios.post('/user/register', this.state).then((res)=>{
          this.props.history.push('/profile', { user: res.data });
          this.props.history.go('/profile', { user: res.data });
        })
      }catch(err){
        this.props.history.push('/signup');
        this.props.history.go('/signup');
      }
    }
    else{
      alert('pasword should be same in 2 inputs')
    }
   
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <div className="signup-container">
      <form className="signup-form" onSubmit={(e)=>this.handleSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={(e)=>this.handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e)=>this.handleChange(e)}
        />
        <input
          type="password"
          name="password2"
          placeholder="Repeat password"
          value={this.state.password2}
          onChange={(e)=>this.handleChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={(e)=>this.handleChange(e)}
        />
        <button type="submit">Sign Up</button>
        <button type="back-to-login-button">Back to Login</button>
      </form>
    </div>
    )
  }
}


