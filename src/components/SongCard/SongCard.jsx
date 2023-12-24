import React from 'react';


const SongCard = (props) => {

  const handleClick = () => {
       props.history.push('/song', { _id: props._id, instrument: 'guitar' } );
       props.history.go('/song', { _id: props._id, instrument: 'guitar' } );
  };

  return (
    <div className="card i1" onClick={handleClick}>
      <img src={ props.imageUrl || 'https://picsum.photos/id/287/250/300' } alt={ props.title || 'Song' } />
      <div className="card-content">
        <h2>{ props.title || 'Song' }</h2>
        <p>{`${ props.genre || 'Genre' }`}</p>
      </div>
    </div>
  );
  
};

export default SongCard;
