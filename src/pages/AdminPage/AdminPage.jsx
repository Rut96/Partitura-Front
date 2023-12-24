import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

import AdminAddSong from '../../components/AdminAddSong/AdminAddSong';
import AdminDeleteSong from '../../components/AdminDeleteSong/AdminDeleteSong';
import AdminAddAuthor from '../../components/AdminAddAuthor/AdminAddAuthor';
import AdminDeleteAuthor from '../../components/AdminDeleteAuthor/AdminDeleteAuthor';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const [msgs, setMsgs] = useState(null);
  const [stats, setStats] = useState(null);
  const [contentManagment, setContentManagment] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect( () => {
    switch(activeTab){
      case 'tab1':
        getMsgs();
        break;
      case 'tab2':
        getStatistic();
        break;
      case 'tab3':
        getContentManagment();
        break;
      default:
        break;
    }
  }, [activeTab, contentManagment]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getMsgs = () => {
    axios.get('/contact').then((res)=>{
      console.log(res.data)
      setMsgs(res.data);
    })
  }

  const getStatistic = () => {
    axios.get('/admin/stats').then((res)=>{
      console.log(res.data)
      setStats(res.data);
    })
  }

  const getContentManagment = () => {
    axios.get('/authors').then((res)=>{
      console.log(res.data)
      setContentManagment(res.data);
    })
    axios.get('/songs').then((res)=>{
      console.log(res.data);
      setSongs(res.data);
    })
  }

  const TableComponent = ({ jsonData }) => {
    const contentFields = Object.entries(jsonData);
    return (
      <div className="wrapper">

        <div className="rowTable">
          <div>
            <h2 className="heading">Admin Dashboard Stat</h2>
          </div>
        </div>

        <div className="rowTable">

          {
            contentFields.map((item, index)=>{
              console.log(item);
              return(
                <div className="item-wrapper" key={index}>

                  <div className="dashboard-stat">
                    <div className="details">
                      <div className="number">
                        <span>{item[1]}</span>
                      </div>
                      <div className="desc">{item[0]}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        
        </div>


      </div>
    );
  };

  const DrawStats = (stats) => {
    return(
      <TableComponent jsonData={stats} />
    )
  }

  const DrawMsg =  (msgs) => {
    const handleDelete = (id) => {
      axios.post('/contact/delete', { id }).then((res)=>{
        console.log(res);
        setContentManagment(res.data);
      })
    } 
    return(
      <div className='msgTab' style={{display: 'block'}}>
        {
          msgs.map((msg, index) => {
            console.log(msg);
            return(
              <div className='msgCard' key={index}>
                <p> From email: { msg.contactEmail } </p>
                <p> From Contact Name: { msg.contactName } </p>
                <p> Message: { msg.contactMsg } </p>
                <p> Date: { msg.dateAdded } </p>
                <p><button className='admin-msg-delete' onClick={()=>handleDelete(msg._id)}>Delete</button></p>
              </div>
            )
          })
        }
      </div>
    )
  }

  const DrawContentManagment = (contentManagment) => {
    return(
      <div className='drawContentManagment'>
        <AdminAddSong authorsArr={contentManagment}/>
        <AdminDeleteSong songs={songs}/>
        <AdminAddAuthor/>
        <AdminDeleteAuthor authors={contentManagment}/>
      </div>
    )
  }

  const drawContent = () => {
    switch(activeTab){
      case 'tab1':
        return  msgs ? DrawMsg(msgs) : null
      case 'tab2':
        return  stats ? DrawStats(stats) : null
      case 'tab3':
        return contentManagment ? DrawContentManagment(contentManagment) : null
      default:
        break
    }
  }

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

        <div className="marker">
          <div id="top"></div>
          <div id="bottom"></div>
        </div>
      </div>
      <div className='activeContent'>
       {
        drawContent()
       }
      </div>
    </div>
  );
};

export default AdminPage;
