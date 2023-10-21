import ChordSheetJS from 'chordsheetjs'
import { ChordBox } from 'vexchords'
import h from 'hyperscript'
import './styles.css'

const chordSheet = `
       Am         C/G        F          C
Let it be, let it be, let it be, let it be
C                G              F  C/E Dm C
Whisper words of wisdom, let it be

Am         C/G        F          C
Let it be, let it be, let it be, let it be
C                G              F  C/E Dm C
Whisper words of wisdom, let it be`.substring(1)

const parser = new ChordSheetJS.ChordSheetParser()
const song = parser.parse(chordSheet)
// console.log(
//   JSON.stringify(
//     song.paragraphs.map(p =>
//       p.lines.map(l => l.items.map(pair => [pair.chords.trim(), pair.lyrics]))
//     ),
//     null,
//     2
//   )
// )

const formatter = new ChordSheetJS.HtmlDivFormatter()
const disp = formatter.format(song)
document.body.innerHTML += `${disp}`

function toChord(numstr, translFrets = 0) {
  if (numstr.length !== 6) throw new Error('wrong length!')
  const fingers = numstr
    .split('')
    .reverse()
    .map(f => (f === 'x' ? 'x' : Number(f)))
  const min = Math.min(...fingers.filter(f => f !== 'x'))
  if (min === 0) return { chord: fingers.map((s, i) => [i + 1, s]) }
  else
    return {
      position: min + translFrets,
      chord: fingers
        .map((s, i) => [i + 1, s])
        .filter(([j, s]) => s !== min)
        .map(([j, s]) => [j, s - min + 1]),
      barres: [{ fromString: 6, toString: 1, fret: 1 }],
    }
}

const notes = {
  C: 'x32010',
  D: 'xx0232',
  E: '022100',
  F: '133211',
  // 'F#': ('133211', 1),
  // G: ('133211', 2),
  G: '320003',
  A: '02220x',

  Cm: 'x31013',
  Dm: 'xx0231',
  Em: '022000',
  Fm: '133211',
  Gm: '320033',
  Am: '02210x',

  'C/G': '332010',
  'C/E': '032013',
}

function draw(k, el = document.body) {
  const container = el.appendChild(
    h('div', {
      className: `chord-container chord-${k}`,
    }),
  )

  const dim = { w: 45, h: 55 }
  new ChordBox(container, {
    width: dim.w,
    height: dim.h,
    showTuning: false,
    numFrets: 4,
    defaultColor: 'black',
  }).draw(toChord(notes[k]))

  const s = container.querySelector('svg')
  s.setAttribute('height', dim.h - 15)
  s.setAttribute('viewBox', `2 5 ${dim.w} ${dim.h - 15}`)

  container.appendChild(document.createTextNode(k))

  return container
}

Object.keys(notes).forEach(k => draw(k))

document.querySelectorAll('.chord').forEach(chord => {
  const k = chord.innerText.trim()
  const row = chord.parentNode.parentNode
  if (notes[k]) {
    chord.classList.add('clickable')

    chord.addEventListener('click', () => {
      if (chord.displayedChord) {
        chord.displayedChord.parentNode.removeChild(chord.displayedChord)
        chord.displayedChord = null
      } else {
        chord.displayedChord = draw(k, row)
      }
    })
  }
})
