import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProfilePage.css';
import CustomLink from '../../components/CustomLink/CustomLink';
import personImg from './person.jpg';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import SettingsModal from '../../components/SettingsModal/SettingsModal';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={onClose}>
              <h2>close</h2>
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const ProfilePage = ({ history }) => {
  const [displaySettings, setDisplaySettings] = useState(false);
  const [state, setState] = useState({
    avatarImage: '',
    email: '',
    favoriteSongs: [],
    progress: [],
    role: '',
    username: '',
    isUserLoggedIn: false,
    _id: ''
  });


  const deleteFromProgress = (_id) => {
    let progress = state.progress;
    let index = progress.filter((item) => item !== _id)
    console.log(_id);
    console.log(index);
    setState({ ...state, progress: index });
    progress = index;
    axios.post('/user/progress', { progress }).then((res)=>{
      let { avatarImage, email, favoriteSongs, progress, role, username, _id } = res.data;
      setState({
        avatarImage,
        email,
        favoriteSongs,
        progress,
        role,
        username,
        _id
      });
    })

  }

  const handleDelete = (indexToDelete, event, _id) => {
    event.preventDefault()
    deleteFromProgress(_id);
    let arrayOfSongs = state.favoriteSongs;

    arrayOfSongs = arrayOfSongs.map((song) => JSON.parse(song));

    arrayOfSongs.splice(indexToDelete, 1);
    console.log(arrayOfSongs)
    arrayOfSongs = arrayOfSongs.map((song) => JSON.stringify(song))
    setState({ ...state, favoriteSongs: arrayOfSongs });

    axios.delete(`/user/favorites/${indexToDelete}`).then((res) => {
      let { avatarImage, email, favoriteSongs, progress, role, username, _id } = res.data;
      setState({
        avatarImage,
        email,
        favoriteSongs,
        progress,
        role,
        username,
        _id
      });
    })
  };

  const handleAddToProgress = (_id) => {
    let songId = _id;
    console.log('HELP')
    let exist = state.progress.filter((obj) => {
      return obj === _id
    });
    if (exist.length === 0) {
      let progress = state.progress
      progress.push(songId)
      setState({ ...state, progress })
      axios.post('/user/progress', { progress })
    }
  }

  const handleClick = (id) => {
    history.push('/song', { _id: id, instrument: 'guitar' });
    history.go('/song', { _id: id, instrument: 'guitar' });
  };

  const toggleSettings = () => {
    setDisplaySettings(!displaySettings);
  }

  const resetProgress = () => {
    let progress = [];
    setState({ ...state, progress })
    axios.post('/user/progress', { progress })
  }

  const updateUser = (username, password, imagUrl) => {
    axios.post('/user/updateUser', { username, password, imagUrl })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/auth/profile', {
           withCredentials: true, 
          });
        console.log(res);
        let { avatarImage, email, favoriteSongs, progress, role, username, _id } = res.data;
        setState({
          avatarImage,
          email,
          favoriteSongs,
          progress,
          role,
          username,
          _id
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will only run once on mount

  return (
    <div className="personal-container">

            <div className="personal-info">
              <div className="pers-img">
                <img src={state.avatarImage || personImg } alt="Italian Trulli" referrerPolicy="no-referrer" />
              </div>
              <div className="pers-info">
                <div>username: { state.username }</div>
                <div>email: {state.email}</div>
                <div className="link-settings">
                  <div className="toggleSetings" onClick={()=>toggleSettings() }>
                    <CustomLink text='Settings' fontSize="20px"/> 
                  </div>
                  <Modal isOpen={displaySettings} onClose={toggleSettings}>
                    <SettingsModal resetProgress={resetProgress} updateUser={updateUser} toggleSettings={toggleSettings} userName={state.username} avatarImage={state.avatarImage}/>
                  </Modal>
                </div>
              <div className="progression">
                <CircularProgressbar 
                value={state.progress.length} 
                maxValue={state.favoriteSongs.length} 
                text={`${ Math.floor((state.progress.length/state.favoriteSongs.length) * 100) || 0 }%`}/>:
                <div>progression</div>
              </div>
              </div>
            </div>
      
            <div className="favoriteWrapper">
                {
                  //img, title, authorName, genre
                  state.favoriteSongs.map((favSong, index)=>{
                   // console.log(this.state.favoriteSongs)
                    // favSong = favSong[0]
                    favSong = JSON.parse(favSong)
                   // console.log(favSong)
                    return(
                      <div key={index}>
                      
                      <div className="card_profile i1" >
                        

                        <img src={favSong.image} alt="Favorite 1" referrerPolicy="no-referrer" onClick={()=>handleClick(favSong._id)} />
                        <div className="favorite-content">
                          <h2>{favSong.title}</h2>
                          <p>{favSong.genre}</p>
                        </div>
                        
                        
                      </div>

                      <div className="icon-wrapper">
                        <div className="delete-icon" onClick={(event)=>handleDelete(index, event, favSong._id)}>
                          🗑️
                        </div>
                        <div className="add-icon" onClick={()=>handleAddToProgress(favSong._id)}>
                          ➕
                        </div>
                      </div>
                      
                      </div>
                    )
                  })
                }

              </div>
          </div>
  );
}

export default ProfilePage;
