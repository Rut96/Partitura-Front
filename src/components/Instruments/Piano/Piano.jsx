import React from "react";

export const Piano = () =>{
    return(
        <div className="instrument" onClick={()=>{
            window.location.href = 'http://localhost:3000/instrument/piano';
        }}>

            <img src="https://media.istockphoto.com/id/1348484809/vector/grand-piano-on-white-background-grand-piano-symbol-classical-music-sign-music-concept-logo.jpg?s=1024x1024&w=is&k=20&c=CcN7R3TRxEmT7Fqsb2IW9jaVxGPa5_BT1-ntIySaUUQ=" width={250} alt="" srcSet="" />

        </div>
    )   
}