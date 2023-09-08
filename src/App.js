import { useState } from "react";
import Dropdownlist from "./component/dropdownlist";
import Login from "./component/login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <div className="App">
      {loggedIn ? (
        <Dropdownlist />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
