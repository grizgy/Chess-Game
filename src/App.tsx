import './App.css'
import WhiteKing from './assets/whiteKing.png'
import WhiteQueen from './assets/whiteQueen.png'
import WhiteRook from './assets/whiteRook.png'
import WhiteBishop from './assets/whiteBishop.png'
import WhiteKnight from './assets/whiteKnight.png'
import whitePawn from './assets/whitePawn.png'


// import WhiteKing from './assets/whiteKing.png'
// import WhiteKing from './assets/whiteKing.png'
// import WhiteKing from './assets/whiteKing.png'
// import WhiteKing from './assets/whiteKing.png'

import BlackKing from './assets/blackKing.png'
import BlackQueen from './assets/blackQueen.png'
import BlackRook from './assets/blackRook.png'
import BlackBishop from './assets/blackBishop.png'
import BlackKnight from './assets/blackKnight.png'
import BlackPawn from './assets/blackPawn.png'


function App() {

    const rows = 8;
    const cols = 8;

    // const whiteKing = '\u2654';
    // const whiteQueen = '\u2655';
    // const whiteRook = '\u2656';
    // const whiteBishop = '\u2657';
    // const whiteKnight = '\u2658'
    // const whitePawn = '\u2659'


    // const blackKing = '\u265A';
    // const blackQueen = '\u265B';
    // const blackRook = '\u265C';
    // const blackBishop : any = {BlackBishop};
    // const blackKnight = '\u265E'
    // const blackPawn = '\u265F'


    const horizontalAxis = ["1","2","3","4","5","6","7","8"]
    const verticalAxis = ["a","b","c","d","e","f","g","h"]

    const mat = Array.from({ length: rows }, () => new Array(cols));

    const renderGridItems = (mat : any) => {
      const gridItems = []; // Array to hold the grid item elements
    
      for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
          const key = `${i}-${j}`;
          
          let value

          if(i == 0 && (j == 0 || j == 7) ) {
            value = BlackRook
          } else if (i == 0 && (j == 1 || j == 6) ) {
            value = BlackKnight
          } else if (i == 0 && (j == 2 || j == 5)) {
            value = BlackBishop
          } else if (i == 0 && (j == 3)) {
            value = BlackQueen
          } else if (i == 0 && (j == 4)) {
            value = BlackKing
          } else if(i == 1) {
            value =  BlackPawn; 
          } else if (i == 6) {
            value = whitePawn
          } else if (i == 7 && (j == 0 || j == 7)) {
            value = WhiteRook
          } else if (i == 7 && (j == 1 || j == 6) ) {
            value = WhiteKnight
          } else if (i == 7 && (j == 2 || j == 5)) {
            value = WhiteBishop
          } else if (i == 7 && (j == 3)) {
            value = WhiteQueen
          } else if (i == 7 && (j == 4)) {
            value = WhiteKing
          }

    
          // Determine the class name based on the indices
          const className = (i % 2 === j % 2) ? "grid-item black" : "grid-item white";
    
          gridItems.push(
            <div key={key} className={className}>
             {value ? <div className='chess-piece' style={{backgroundImage : `url(${value})`}}></div> : <></>} 
              {/* {value} */}
            </div>
          );
        }
      }
    
      return gridItems; // Return the array of JSX elements
    };

        

  return (
    <>
      <div className="grid-container">
          {renderGridItems(mat)}
      </div>
    </>
  )
}

export default App
