// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Async Action Creator for Logging In
export const login = (username, password) => {
  return async (dispatch) => {
    try {
      // Dispatch a login request action to update the UI
      dispatch(loginRequest());

      // Simulate a login API call (replace with your actual login logic)
      const user = await yourLoginFunction(username, password);

      // Dispatch a login success action with the user data
      dispatch(loginSuccess(user));

      // Redirect the user to the homepage or perform any other required actions
      // You can use react-router for navigation.

      // For example, if you are using react-router-dom, you can do:
      // history.push('/homepage');
    } catch (error) {
      // Handle login failure, dispatch an error action, and show an error message
      dispatch(loginFailure(error.message));
    }
  };
};

// Simulated Login Function (replace this with your actual login logic)
const yourLoginFunction = async (username, password) => {
  // Simulate a successful login with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Replace this with actual user data fetched from your backend
  const user = {
    id: 1,
    username: username,
    // Add other user properties here
  };

  return user;
};


export const loginWithGoogle = () => {
    return async (dispatch) => {
      try {
        // Dispatch a login request action to update the UI
        dispatch(loginRequest());
        window.location.href = 'http://localhost:3030/auth/google';
      } catch (error) {
        // Handle network or other errors
        dispatch(loginFailure('An error occurred while logging in with Google.'));
      }
    };
  };