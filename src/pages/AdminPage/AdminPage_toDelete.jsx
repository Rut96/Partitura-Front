import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  //msg states
  const [msgs, setMsgs] = useState(null);
  const [displayMsg, setDisplayMsg ] = useState('none')
  const [displayStats, setDisplayStats ] = useState('none')
  //stats states
  const [state, setState] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getMsgs = () => {
    axios.get('/contact').then((res)=>{
      console.log(res.data)
      setMsgs(res.data);
      setDisplayMsg('block')
    })
  }

  const DrawMsg = (msgs) => {

    return(
      <div className='msgTab' style={{display: displayMsg}}>
        {
          msgs.map((msg, index) => {
            return(
              <div className='msgCard' key={index}>
                <p> From email: { msg.contactEmail } </p>
                <p> From Contact Name: { msg.contactName } </p>
                <p>Message: { msg.contactMsg } </p>
                <p>Date: { msg.dateAdded } </p>
              </div>
            )
          })
        }
      </div>
    )
  }

  const getStatistic = async () => {
    setDisplayMsg('none');
    let songs = await axios.get('/songs');
    let lastAdded = await axios.get('/songs/lastAdded');
    let authors = await axios.get('/authors');
    setState({
      songs,
      lastAdded,
      authors,
      msgs
    });
    setDisplayStats('block')
  }


  const DrawStatistic = (state) => {
    let {
      songs,
      lastAdded,
      authors,
      msgs 
    }  = state

    let songsCont = songs.lenght;
    let authorsCount = authors.lenght;
    let msgsCount = msgs.lenght;

    return(
      <div className='statsTab' style={{display: displayStats}}>
        <p>Song Count: {songsCont} </p>
        <p>Authors Count: {authorsCount} </p>
        <p>Msgs Count: {msgsCount} </p>
      </div>
    )
  }


  useEffect( async () => {
    switch(activeTab){
      case 'tab1':
        return await getMsgs(msgs);
      case 'tab2':
        return await getStatistic(state)
      default:
        return
      // case 'tab3':
      //   break;
    }
  }, [activeTab]);

  return (
    <div className="popup">
      <div className="tabs">
        <input
          type="radio"
          id="tab1"
          name="tab"
          checked={activeTab === 'tab1'}
          onChange={() => handleTabChange('tab1')}
        />
        <label htmlFor="tab1">Messages</label>

        <input
          type="radio"
          id="tab2"
          name="tab"
          checked={activeTab === 'tab2'}
          onChange={() => handleTabChange('tab2')}
        />
        <label htmlFor="tab2">Statistics</label>

        <input
          type="radio"
          id="tab3"
          name="tab"
          checked={activeTab === 'tab3'}
          onChange={() => handleTabChange('tab3')}
        />
        <label htmlFor="tab3">Content Management</label>

        <input
          type="radio"
          id="tab4"
          name="tab"
          checked={activeTab === 'tab4'}
          onChange={() => handleTabChange('tab4')}
        />
        <div className="marker">
          <div id="top"></div>
          <div id="bottom"></div>
        </div>
      </div>
      <div className='activeContent'>
        {
         msgs? DrawMsg(msgs) : null
        }
        {/* {
          state ? DrawStatistic(state) : null
        } */}
      </div>
    </div>
  );
};

export default AdminPage;
