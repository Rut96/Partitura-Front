import React from 'react';
import './AuthorPage.css';
import axios from 'axios';

export default class AuthorPage extends React.Component { 
    constructor(props) {
        super(props);
       // console.log(props)
        this.state = {
            // authorID: '',
            authorID: props.location.state.author,
            authorImage: '',
            name: '',
            bio: '',
            birthdate: '',
            authorSongs: []
        }
    }

    componentDidMount(){
        axios.get(`/authors/${this.state.authorID}`).then((res)=>{
           // console.log(res.data);
            let { bio, birthdate, image, name} = res.data;
            this.setState({
                bio,
                authorImage: image,
                name,
                birthdate
            });
            axios.get(`/songs/search/author/${this.state.authorID}`).then((res)=>{
               // console.log(res.data)
                let authorSongs = res.data.map((item)=>{
                    return {
                        title: item.title,
                        id: item._id,
                        genre: item.genre,
                        image: item.image
                    }
                })
                this.setState({authorSongs})
               // console.log(this.state);
            })
        })
    }

    render() {
       // console.log(this.state);
        return (

            <div className="author-container">

                <div className="about">

                    <div className="bio">
                        {
                            this.state.bio
                        }
                    </div>

                    <div className="au-img">
                      <img src={this.state.authorImage} alt="Author" referrerPolicy="no-referrer" className='image'/>
                    </div>

                </div>

                <div className="au-songs">

                    {
                        this.state.authorSongs.map((song)=>{
                           // console.log(song)
                            return(
                                <div className="card r1" onClick={(e)=>{
                                    e.preventDefault();
                                    this.props.history.push('/song', { _id: song.id });
                                    this.props.history.go('/song', { _id: song.id });
                                }}>
                                    <img src={song.image} referrerPolicy="no-referrer"/>
                                    <div className="card-content">
                                        <h2>{song.title}</h2>
                                        <p>{this.state.name}, {song.genre}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        );
    }
}
