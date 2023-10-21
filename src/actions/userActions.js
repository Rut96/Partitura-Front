// src/actions/userActions.js

// Action Types
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

// Action Creators
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// Async Action Creator for Fetching User Data
export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      // Dispatch a fetch user request action to update the UI
      dispatch(fetchUserRequest());

      // Simulate fetching user data from an API (replace with your actual logic)
      const user = await yourFetchUserFunction();

      // Dispatch a fetch user success action with the user data
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      // Handle fetch user failure, dispatch an error action, and show an error message
      dispatch(fetchUserFailure(error.message));
    }
  };
};

// Simulated Fetch User Function (replace this with your actual logic)
const yourFetchUserFunction = async () => {
  // Simulate fetching user data with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Replace this with actual user data fetched from your backend
  const user = {
    id: 1,
    username: 'exampleUser',
    // Add other user properties here
  };

  return user;
};
