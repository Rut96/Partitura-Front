// authReducer.js

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from '../actions/authActions'; // Import your action types
  
  const initialState = {
    loggedIn: false,
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loggedIn: true,
          user: action.payload,
          loading: false,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          loggedIn: false,
          user: null,
          loading: false,
          error: action.payload,
        };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  