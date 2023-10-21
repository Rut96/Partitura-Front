import React from "react";

export const Guitar = () => {
    return(
        <div className="instrument" onClick={()=>{
            window.location.href = 'http://localhost:3000/instrument/guitar';
        }}>
          <img src="https://media.istockphoto.com/id/1125647593/vector/guitar-on-a-white-background.jpg?s=1024x1024&w=is&k=20&c=OYtuH9XHvQIx40Cl3P_gPMztGzSW3UKz8on6K_vOG6k=" width={250} alt="" srcSet="" />

        </div>
    )
}

