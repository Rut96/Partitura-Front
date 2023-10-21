import React from "react";
import './LastAdded.css'
import axios from "axios";

export default class LastAdded extends React.Component { 
  constructor(props) { 
    super(props);
    this.state = {
      LastAddedItems: [
        {
        imageUrl: 'https://media.istockphoto.com/id/804271878/vector/vector-music-icon-sound-note-illustration.jpg?s=2048x2048&w=is&k=20&c=4H1lLuX-2YyqsPIOy9lFBQHQ6cMDSjI5mefEJL13Agc=',
        title: 'Alexander',
        author: 'ASDFGH'
        },
        {
        imageUrl: 'https://media.istockphoto.com/id/804271878/vector/vector-music-icon-sound-note-illustration.jpg?s=2048x2048&w=is&k=20&c=4H1lLuX-2YyqsPIOy9lFBQHQ6cMDSjI5mefEJL13Agc=',
        title: 'Alexander',
        author: 'ASDFGH'
        },
        {
        imageUrl: 'https://media.istockphoto.com/id/804271878/vector/vector-music-icon-sound-note-illustration.jpg?s=2048x2048&w=is&k=20&c=4H1lLuX-2YyqsPIOy9lFBQHQ6cMDSjI5mefEJL13Agc=',
        title: 'Alexander',
        author: 'ASDFGH'
        },
        {
        imageUrl: 'https://media.istockphoto.com/id/804271878/vector/vector-music-icon-sound-note-illustration.jpg?s=2048x2048&w=is&k=20&c=4H1lLuX-2YyqsPIOy9lFBQHQ6cMDSjI5mefEJL13Agc=',
        title: 'Alexander',
        author: 'ASDFGH'
        }
      ]
    }
  }

  componentDidMount(){
    axios.get('/songs/lastAdded').then(res=>{
      // console.log(res.data);
      this.setState({
        LastAddedItems: res.data
      })
    })
  }

  LastAddedItem({image, title, author}, index) {
    return (
      <div className="last-added-item" key={index}>
        {/* <div className=""> */}
          <img src={image} alt="img" className="last-added-image" width={200}/>
        {/* </div> */}
        <div className="last-added-title">
          {
            title
          }
        </div>
        <div className="last-added-author">
          {
            author
          }
        </div>
      </div>
    )
  }

  render() { 
    return (
      <div className="last-added-item-container">
        {
          this.state.LastAddedItems.map((item, index) => { 
            return this.LastAddedItem(item, index)
          })
        }
      </div>
    )
  }
    
}