import './App.css'


function App() {

    const rows = 8;
    const cols = 8;

    const whiteKing = '\u2654';
    const whiteQueen = '\u2655';
    const whiteRook = '\u2656';
    const whiteBishop = '\u2657';
    const whiteKnight = '\u2658'
    const whitePawn = '\u2659'


    const blackKing = '\u265A';
    const blackQueen = '\u265B';
    const blackRook = '\u265C';
    const blackBishop = '\u265D';
    const blackKnight = '\u265E'
    const blackPawn = '\u265F'


    console.log(whiteKing);

    const mat = Array.from({ length: rows }, () => new Array(cols));

    const renderGridItems = (mat : any) => {
      const gridItems = []; // Array to hold the grid item elements
    
      for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
          const key = `${i}-${j}`;
          
          let value

          if(i == 0 && (j == 0 || j == 7) ) {
            value = blackRook
          } else if (i == 0 && (j == 1 || j == 6) ) {
            value = blackKnight
          } else if (i == 0 && (j == 2 || j == 5)) {
            value = blackBishop
          } else if (i == 0 && (j == 3)) {
            value = blackQueen
          } else if (i == 0 && (j == 4)) {
            value = blackKing
          } else if(i == 1) {
            value =  blackPawn; 
          } else if (i == 6) {
            value = whitePawn
          } else if (i == 7 && (j == 0 || j == 7)) {
            value = whiteRook
          } else if (i == 7 && (j == 1 || j == 6) ) {
            value = whiteKnight
          } else if (i == 7 && (j == 2 || j == 5)) {
            value = whiteBishop
          } else if (i == 7 && (j == 3)) {
            value = blackQueen
          } else if (i == 7 && (j == 4)) {
            value = blackKing
          }

    
          // Determine the class name based on the indices
          const className = (i % 2 === j % 2) ? "grid-item black" : "grid-item white";
    
          gridItems.push(
            <div key={key} className={className}>
              {value}
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
