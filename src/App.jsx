import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './services/Routes/Routes';
import { useState } from 'react';
import { UserContext } from "./services/Context/UserContext";

function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <AppRoutes user={user ? user : token}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
