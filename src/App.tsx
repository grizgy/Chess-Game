import './App.css'
import WhiteKing from './assets/whiteKing.png'
import WhiteQueen from './assets/whiteQueen.png'
import WhiteRook from './assets/whiteRook.png'
import WhiteBishop from './assets/whiteBishop.png'
import WhiteKnight from './assets/whiteKnight.png'
import WhitePawn from './assets/whitePawn.png'
import BlackKing from './assets/blackKing.png'
import BlackQueen from './assets/blackQueen.png'
import BlackRook from './assets/blackRook.png'
import BlackBishop from './assets/blackBishop.png'
import BlackKnight from './assets/blackKnight.png'
import BlackPawn from './assets/blackPawn.png'
import { useRef, useState } from 'react'

const rows = 8;
const cols = 8;

const mat = Array.from({ length: rows }, () => new Array(cols));

const initialState : any []= []

for (let i = mat.length-1; i >= 0; i--) {
  for (let j = 0; j < mat[i].length; j++) {
    const key = `${i}-${j}`;
    
    let value

    if(i == 0 && (j == 0 || j == 7) ) {
      value = WhiteRook
    } else if (i == 0 && (j == 1 || j == 6) ) {
      value = WhiteKnight
    } else if (i == 0 && (j == 2 || j == 5)) {
      value = WhiteBishop
    } else if (i == 0 && (j == 3)) {
      value = WhiteQueen
    } else if (i == 0 && (j == 4)) {
      value = WhiteKing
    } else if(i == 1) {
      value =  WhitePawn; 
    } else if (i == 6) {
      value = BlackPawn
    } else if (i == 7 && (j == 0 || j == 7)) {
      value = BlackRook
    } else if (i == 7 && (j == 1 || j == 6) ) {
      value = BlackKnight
    } else if (i == 7 && (j == 2 || j == 5)) {
      value = BlackBishop
    } else if (i == 7 && (j == 3)) {
      value = BlackQueen
    } else if (i == 7 && (j == 4)) {
      value = BlackKing
    }


    // Determine the class name based on the indices
    const className = (i % 2 === j % 2) ? "grid-item black" : "grid-item white";

    initialState.push(
      <div key={key} className={className}>
       {value ? <div className='chess-piece' style={{backgroundImage : `url(${value})`}}></div> : <></>} 
        {/* {value} */}
      </div>
    );


    
  }
}

function App() {
  
    const [gridItems, setGridItems] = useState<any[]>(initialState)
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)

      console.log("Rendering : ")

    
    const grabElement = (e : any) => {

      const element = e.target as HTMLElement;
      const chessBoard = chessTable.current;

      if(element.classList.contains('chess-piece') && chessBoard) {
        console.log(element)

        console.log( "setGridY :" + (Math.abs(Math.floor((e.clientY - chessBoard.offsetTop - 800)/100)) - 1))
        console.log("setGridX :" + (Math.floor((e.clientX - chessBoard.offsetLeft)/100)))


        setGridY(Math.abs(Math.floor((e.clientY - chessBoard.offsetTop - 800)/100)) - 1)
        setGridX(Math.floor((e.clientX - chessBoard.offsetLeft)/100))
        

        const x = e.clientX-50;
        const y = e.clientY-50;
        element.style.position = 'absolute'
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        // activePiece = element;

        setActivePiece(element)
  
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

      console.log(e)
      const chessBoard = chessTable.current;

      if(activePiece && chessBoard) {

        const y = Math.abs(Math.floor((e.clientY - chessBoard.offsetTop - 800)/100)) - 1;
        const x = Math.floor((e.clientX - chessBoard.offsetLeft)/100);
  
        //new grid cell position
        console.log(y,x)

        setGridItems((value : any) => {

          console.log(value)
          const pieces = value.map((piece : any) => {
            console.log(piece)


            if(((piece.key.charAt(0)) == gridY) && ((piece.key.charAt(2)) == gridX)) {

              //position to be removed from 
              //(7 - Y) * 8 + X

              console.log(piece.key.charAt(0)) //y value
              console.log(piece.key.charAt(2)) //x value

              const currentPosition = (7 - Number(piece.key.charAt(0)))* 8 + Number(piece.key.charAt(2))
              // console.log(piece.props)
              console.log(currentPosition)
              // console.log(initialState[currentPosition].props)
              const backgroundImage = initialState[currentPosition].props.children.props.style?.backgroundImage;
              const currentClassname = initialState[currentPosition].props.className
              // console.log(backgroundImage)


              initialState[currentPosition] = 
                <div key={piece.key} className={currentClassname}><></></div>
              
                console.log(initialState[currentPosition].props)

              //position to be moved to
              //(7 - Y) * 8 + X
              // (y,x)

              const newPosition = (7 - y)* 8 + x
              console.log(newPosition)
              console.log(value[currentPosition])

              const className = ( x % 2 === y % 2  ) ? "grid-item black" : "grid-item white";
              console.log(`${y}-${x}`)
              initialState[newPosition] = 
                <div key={`${y}-${x}`} className={className}>
                  <div className='chess-piece' style={{backgroundImage : backgroundImage}}></div>
                </div>


            } 
            

            return piece;
          })
          return pieces;
        })

        setActivePiece(null)

      }

    }
    

  return (
    <>
      <div onMouseDown={e => grabElement(e)} 
      onMouseMove={e => moveElement(e)}
      onMouseUp={e => leaveElement(e)}
      ref={chessTable}
      className="grid-container">
          {gridItems}
      </div>
    </>
  )
}

export default App
