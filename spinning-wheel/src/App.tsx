import { useMemo, useState } from "react";
import { CONFIG } from "./app/config";
import Roulette from "./components/roulette";
import "./App.css";

function App() {
  return(

<div className="container">
  <Roulette />
    </div>
  );
}

export default App;