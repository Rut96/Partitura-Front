import React from "react";

export const Ukulele= () => {
    return(
        <div className="instrument" onClick={()=>{
            window.location.href = 'http://localhost:3000/instrument/ukulele';
        }}>
      
        <img src="https://media.istockphoto.com/id/1365067960/vector/ukulele-icon-design-template-vector-isolated.jpg?s=1024x1024&w=is&k=20&c=9LYmOcjXAicKW8JKqFpwqSTpHfU-EoA3BvNcZ6Rti8c=" width={250} alt="" srcSet="" />
      
        </div>
    )
}