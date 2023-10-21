import React from 'react';
import './LoginPage.css'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  setUsername(username){
    this.setState({username})
  }

  setPassword(password){
    this.setState({password})
  }

  handleSubmit(e){
    e.preventDefault();
  }

  handleLoginWithGoogle(){
    window.location.href = 'http://localhost:3030/auth/google';
  }


  render(){
    return(
      <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={(e)=>this.handleSubmit(e)} className='login-form'>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={(e) => this.setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={(e) => this.setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <div className="login-buttons">

        <button className='google-login-button' onClick={this.handleLoginWithGoogle}>Login with Google</button>
        <button className='facebook-login-button'>Login with Facebook</button>
        <button className='sign-up-button'>Sign Up</button>
      </div>
    </div>
    )
  }
}

// export default Login;

export default Login

