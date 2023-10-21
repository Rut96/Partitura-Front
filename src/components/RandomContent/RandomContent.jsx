import React from "react";
import './RandomContent.css'
import axios from "axios";
import { SongModal } from '../SongModal/SongModal'

export default class RandomContent extends React.Component { 
  constructor(props) { 
    super(props);
    // console.log(props)
    this.state = {
      contentItems: []
    }
  }

  componentDidMount(){
    axios.get('/songs').then(res=>{
      // console.log(res.data);
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

  render() {
    const content = this.shuffle(this.state.contentItems);
    
    return (
      <div className="content-container">
        {
          content.map(({image, title, dateAdded, author, type, _id}) => { 
            // console.log(_id)
            return(
              <SongModal 
                key={_id}
                _id={_id}
                image={image} 
                title={title} 
                dateAdded={dateAdded}
                author={author}
                type={type}
                history={this.props.history}
            />
            )
          })
        }
      </div>
    )
  }
}