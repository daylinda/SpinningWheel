// import { useMemo, useState } from "react";
// import { CONFIG } from "./app/config";
import Roulette from "./components/roulette";
import "./App.css";
import DotGrid from "./components/DotGrid";

function App() {
  return (
    <div  className="app-container">      
        {/* <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="background-style"
        /> */}
        <div className="content-container">
        <Roulette  />
        </div>
      </div>
    
  );
}

export default App;
