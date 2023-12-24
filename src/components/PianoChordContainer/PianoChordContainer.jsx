import React from "react";
import './PianoChordContainer.css';



export default function PianoChordContainer({chords}) {
  
    const groupChords = (chordsArray, groupSize) => {
        const groupedChords = [];
        chordsArray = chordsArray.map((chord)=>{
          chord = chord.replace(/\s/g, '');
          if(chord.length===1){
            chord = chord+'maj'
          }
          if(chord.includes('5')){
            chord = chord.replaceAll('5','maj')
          }
          chord = changeChordName(chord);
          console.log(chord)
          if(chord.includes('/')){
            chord = chord.split('/')[1];
            if(chord.length===1){
              chord = chord+'maj'
            }
            return chord;
          }else{
            return chord;
          }
        })
        chordsArray = chordsArray.filter((item,
          index) => chordsArray.indexOf(item) === index);
        for (let i = 0; i < chordsArray.length; i += groupSize) {
          const group = chordsArray.slice(i, i + groupSize);
          groupedChords.push(group);
        }
        
        return groupedChords;
    }

    const changeChordName = (chord) => {
      chord = chord.toLowerCase();
      if(chord.includes('#')){
        chord = chord.replaceAll('#', 'aug')
        return chord
      }else{
        return chord
      }
    }

    const chordsCorector = (chords) => {
        chords = chords
        .map((chord)=>{
          chord = chord.replace(/\s/g, '');
          if(chord.length===1){
            chord = chord+'maj'
          }
          if(chord.includes('5')){
            chord = chord.replaceAll('5','maj')
          }
          if(chord.includes('m') && !chord.includes('maj')){
            chord = chord.replaceAll('m','min')
          }
          chord = changeChordName(chord);
          console.log(chord)
          if(chord.includes('/')){
            chord = chord.split('/')[1];
            if(chord.length===1){
              chord = chord+'maj'
            }
            return chord;
          }else{
            return chord;
          }
        }) 
        return chords;
    }

    const groupedChords = groupChords(chords, 2);
    // console.log(groupedChords)
    return(
      <div className='chords-container-piano'>
        {
            groupedChords.map((group, index)=>{
            group = chordsCorector(group)
            group = group.join(',')
            let srcUrl = "https://tomeraberbach.github.io/piano#"
            srcUrl = srcUrl+group;
            console.log(srcUrl)
            return(
              <div key={index} className='piano_group'>
                <iframe 
                  title={index}
                  frameborder="0"
                  width="400px" height="150px"
                  src={srcUrl}>
                </iframe>
              </div>
            )
          })
        }
      </div>
    )

}