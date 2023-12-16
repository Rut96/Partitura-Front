import './App.css';
import { Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AuthorPage from './pages/AuthorPage/AuthorPage';
import ForgotPassPage from './pages/ForgotPassPage/ForgotPassPage';

import Footer from './components/Footer/Footer';
import SongPage from './pages/SongPage/SongPage';
import Navbar  from './components/Navbar/Navbar';
import ContactPage from './pages/ContactPage/ContactPage';
import AdminPage from './pages/AdminPage/AdminPage';

import SignUp from './pages/SignUpPage/SignUpPage';




function App() {

  
  return (
    <div>
        <Navbar/>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exac component={LoginPage} />
        <Route path="/profile" exac component={ProfilePage} />
        <Route path="/contact" exac component={ContactPage} />
        <Route path="/admin" exac component={AdminPage} />
        <Route path="/forgot" exac component={ForgotPassPage} />
        <Route path="/song" exact component={SongPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/author" exac component={AuthorPage} />
        <Footer className='footer'/>
    </div>
  );
};

export default App;
