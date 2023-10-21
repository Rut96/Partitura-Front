import './App.css';
import { Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
// import { Router } from 'react-router-dom/cjs/react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SongPage from './pages/SongPage';

import SignUp from './pages/SignupPage';

// import { BrowserRouter as Switch } from 'react-router-dom';


function App() {

  
  return (
    <div>
      <Header />
      {/* <Switch> */}

        <Route path="/login" exac component={LoginPage} />
        <Route path="/profile" exac component={ProfilePage} />
        <Route path="/song" exact component={SongPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/invoices" component={InvoicesPage} /> */}
      {/* </Switch> */}
        <Footer className='footer'/>
    </div>
  );
};

export default App;
