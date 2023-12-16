import React, { useState } from "react";
import './ContactPage.css';
import axios from 'axios';

export default function ContactPage(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = () => {
      axios.post('/contact/new', { name, email, msg })
      alert('thank you!')
    }

    return(
        <div class="contact-form">
        <h1>Contact Us</h1>
        <form>
            <input type="text" name="field1" placeholder="Your Name" onChange={(e)=>setName(e.target.value)} />
            <input type="email" name="field2" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
            <textarea name="field3" placeholder="Type your Message" onChange={(e)=>setMsg(e.target.value)}></textarea>
            <input type="submit" value="Send" onClick={()=>handleSubmit()}/>
        </form>
        </div>
    )
}