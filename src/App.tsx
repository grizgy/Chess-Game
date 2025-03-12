import './App.css'


function App() {

    const rows = 8;
    const cols = 8;

    const mat = Array.from({ length: rows }, () => new Array(cols));

    const renderGridItems = (mat : any) => {
      const gridItems = []; // Array to hold the grid item elements
    
      for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
          const key = `${i}-${j}`;
          const value =  8*i + j + 1; // The value to display
    
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
