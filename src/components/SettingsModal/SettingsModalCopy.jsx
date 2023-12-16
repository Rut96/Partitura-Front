import React, { useState } from "react";
import './SettingsModal.css';


export default function SettingsModal(props) {
  const [username, setUsername] = useState(props.userName);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [imagUrl, setImgUrl] = useState(props.avatarImage);

  const triggerReset = () => {
    props.resetProgress()
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(password === password2){
      props.updateUser(username, password, imagUrl)
    }else{
        console.log('Password doesnt match')
        props.updateUser(username, null, imagUrl)
    }
    document.querySelectorAll('[class=settings-menu] [class="inp"]').forEach((input)=>{
      input.value = ''
    });
    props.toggleSettings()
  }


  const handleResetForm = () => {
    setImgUrl('');
    setPassword('');
    setPassword2('');
    setUsername('');
    document.querySelectorAll('[class=settings-menu] [class="inp"]').forEach((input)=>{
      input.value = ''
    })
  }


  return(
    <div className="settings-menu">
      <h2>Change Username</h2>
      <input class="inp" type="username" placeholder="new Username" onChange={(e)=>setUsername(e.target.value)}/>
      <h2>Change Password</h2>
      <input class="inp" type="password" placeholder="new Password" onChange={(e)=>setPassword(e.target.value)}/>
      <input class="inp" type="password" placeholder="check Password" onChange={(e)=>setPassword2(e.target.value)}/>
      <h2>Change Picture</h2>
      <input class="inp" type="text" placeholder="url" onChange={(e)=>setImgUrl(e.target.value)}/>
      <button type="button" onClick={()=>triggerReset()}> Reset Progress </button>
      <button type="button" onClick={()=>handleResetForm()}> Reset Form </button>
      <button type="submit" onClick={handleSubmit}> Submit </button>
    </div>
  )
}