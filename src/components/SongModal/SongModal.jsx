import React from "react";

export const SongModal = ({image, title, dateAdded, author, type, _id, history}) => {
    // const history = useHistory();    
    let normalDate = new Date(dateAdded).toDateString()
    let normalTime = new Date(dateAdded).toLocaleTimeString()

    const handleClick = () => {
        // console.log(history)
        // Redirect to the 'song' page with the _id prop
        // navigate('/song', { state: { _id: _id } });
        history.push('/song', { _id: _id } );
        history.go('/song', { _id: _id } );
        // console.log(history)
    };

    return(
        <div className="content-item" onClick={handleClick}>
        {/* <div className=""> */}
          <img src={image} alt="img" className="" width={300} referrerPolicy="no-referrer"/>
        {/* </div> */}
        <div className="content-title">
          {
            title
          }
        </div>
        <div className="content-author">
          {
            normalDate
            // JSON.stringify(normalDate)
          }
          <br/>
          {
            normalTime
            // JSON.stringify(normalTime)
          }
          <br/>
          {
            type
          }
          <br/>
          {
            author
          }
        </div>
      </div>
    )
}
