import React from "react";
import './RandomContent.css'
import axios from "axios";
import { SongModal } from '../SongModal/SongModal'

export default class RandomContent extends React.Component { 
  constructor(props) { 
    super(props);
    //// console.log(props)
    this.state = {
      contentItems: []
    }
  }

  componentDidMount(){
    axios.get('/songs').then(res=>{
      //// console.log(res.data);
      this.setState({
        contentItems: res.data
      })
    })
  }



  shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

handleFavoriteClick(item){
  // alert('add to favorite')
 // console.log(item);
  let body = item
  axios.post('/user/favorites', body).then((res)=>{
   // console.log(res);
    alert('add song to favorite')
  })
}

  render() {
    const content = this.shuffle(this.state.contentItems);
    console.log(this.props)
    return (
      <div className="content-container">
        {
  
          content.map((item, index) => { 
            let {image, title, dateAdded, author, genre, _id} = item;
           // console.log(this.props)
            return(
              <div key={index}>
              {/* Display your song details */}
              <SongModal
                key={_id}
                _id={_id}
                image={image}
                title={title}
                dateAdded={dateAdded}
                author={author}
                genre={genre}
                history={this.props.history}
                instrument={this.props.instrument}
              />
        
              {/* Favorite icon */}
              
              {
                this.props.isLogin ? <div onClick={()=>this.handleFavoriteClick(item)} style={{ cursor: 'pointer' }}>
                '❤️' 
              </div> : null
              }
            </div>
            )
          })
        }
      </div>
    )
  }
}