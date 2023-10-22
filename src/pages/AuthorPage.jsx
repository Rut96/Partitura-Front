import React from 'react';
import './AuthorPage.css';
import axios from 'axios';

export default class AuthorPage extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
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
            console.log(res.data);
            let { bio, birthdate, image, name} = res.data;
            this.setState({
                bio,
                authorImage: image,
                name,
                birthdate
            });
            axios.get(`/songs/search/author/${this.state.authorID}`).then((res)=>{
                let authorSongs = res.data.map((item)=>{
                    return {
                        title: item.title,
                        id: item._id
                    }
                })
                this.setState({authorSongs})
                console.log(this.state);
            })
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="author-page">
                <div className="author-header">
                    <div className="author-image">
                        <img src={this.state.authorImage} alt="Author" referrerPolicy="no-referrer" className='image'/>
                    </div>
                    <div className="author-details">
                        <div className="author-name">{this.state.name}</div>
                        <div className="birthdate">
                            <h3>Date created:</h3>
                            {this.state.birthdate.split('T')[0]}
                            </div>
                    </div>
                </div>
                <div className="biography">
                    <h2>
                        Biography:
                    </h2>
                    {this.state.bio}
                    </div>
                {/* Add song list rendering logic here */}
                <div className="songs">
                    {
                        this.state.authorSongs.map((song)=>{
                            return(<a href="http://"onClick={(e)=>{
                                e.preventDefault();
                                this.props.history.push('/song', { _id: song.id });
                                this.props.history.go('/song', { _id: song.id });
                            }}>{song.title}</a>)
                        })
                    }
                </div>
            </div>
        );
    }
}
