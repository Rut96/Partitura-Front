import React from "react";
import axios from "axios";
import './SongPage.css';

export default class SongPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            author: '',
            lyrics: '',
            genre: '',
            type: '',
            chords: '',
            image: '',
            dateAdded: '',
            _id: props.location.state._id
        }
    }


    componentDidMount(){
        // console.log(this.state)
        axios.get(`/songs/${this.state._id}`).then((res)=>{
            let {title,
                author,
                lyrics,
                genre,
                // type,
                chords,
                image,
                dateAdded } = res.data;
                lyrics = this.parseLyrics(lyrics)
            this.setState({
                title,
                author,
                lyrics,
                genre,
                // type,
                chords,
                image,
                dateAdded
            })
            // console.log(res.data)
        })
    }

    parseLyrics(lyrics){
        // let items = lyrics.replaceAll("/n","<br/>")
        // console.log(items)
        return lyrics;
    }


    render(){
        return(
            <div className="song-page-container">
                <h1>
                    {
                        this.state.title
                    }
                </h1>
                <p>
                    {
                        this.state.genre
                    }
                </p>
                {/* <p> */}
                    {
                        this.state.lyrics
                    }
                {/* </p> */}
                <img src={this.state.image} alt="" width={300} referrerPolicy="no-referrer"/>
            </div>
        )
    }
}