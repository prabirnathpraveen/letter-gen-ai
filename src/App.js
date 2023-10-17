import { useState } from "react";
import Dropdownlist from "./component/dropdownlist";
import Login from "./component/login";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routing/routing";

function App() {
  return (
    <div className="App" style={{background:"#F6F6F7",height:"100vh"}}>
      <BrowserRouter>
        <div>
          <Routing />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
