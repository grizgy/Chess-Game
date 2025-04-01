import './App.css'
import WhiteKing from './assets/whiteKing.png'
import WhiteQueen from './assets/whiteQueen.png'
import WhiteRook from './assets/whiteRook.png'
import WhiteBishop from './assets/whiteBishop.png'
import WhiteKnight from './assets/whiteKnight.png'
import whitePawn from './assets/whitePawn.png'
import BlackKing from './assets/blackKing.png'
import BlackQueen from './assets/blackQueen.png'
import BlackRook from './assets/blackRook.png'
import BlackBishop from './assets/blackBishop.png'
import BlackKnight from './assets/blackKnight.png'
import BlackPawn from './assets/blackPawn.png'
import { useRef } from 'react'


function App() {

    const rows = 8;
    const cols = 8;

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


    let activePiece : any = null; 

    
    const grabElement = (e : any) => {

      const element = e.target as HTMLElement;

      if(element.classList.contains('chess-piece')) {
        console.log(element)

        const x = e.clientX-50;
        const y = e.clientY-50;
        element.style.position = 'absolute'
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
  
      }

    }


    const chessTable = useRef<HTMLDivElement>(null)

   
    const moveElement = (e : any) => {
      const chessBoard = chessTable.current;

      if(activePiece && chessBoard) {

        const minX = chessBoard.offsetLeft - 25;
        const minY = chessBoard.offsetTop - 25;
        const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
        const maxY = chessBoard.offsetTop + chessBoard.clientHeight - 75;
        const x = e.clientX-50;
        const y = e.clientY-50;
        activePiece.style.position = 'absolute'
        // activePiece.style.left = `${x}px`;
        // activePiece.style.top = `${y}px`;
  

        if(x < minX) {
          activePiece.style.left = `${minX}px`;
        } else if (x > maxX) {
          activePiece.style.left = `${maxX}px`;
        } else {
          activePiece.style.left = `${x}px`;
        }



        if(y < minY) {
          activePiece.style.top = `${minY}px`;
        } else if (y > maxY) {
          activePiece.style.top = `${maxY}px`;
        } else {
          activePiece.style.top = `${y}px`;
        }


      }

    }



    const leaveElement = (e : any) => {

      if(activePiece) {
        activePiece = null
      }

    }
    

  return (
    <>
      <div onMouseDown={e => grabElement(e)} 
      onMouseMove={e => moveElement(e)}
      onMouseUp={e => leaveElement(e)}
      ref={chessTable}
      className="grid-container">
          {renderGridItems(mat)}
      </div>
    </>
  )
}

export default App
