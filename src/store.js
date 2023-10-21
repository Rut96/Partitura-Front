import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

