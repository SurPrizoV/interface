import './App.css';
import { AppRoutes } from './services/Routes/Routes';
import { useState } from 'react';

function App() {
  const user = localStorage.getItem("token");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <AppRoutes user={user} login={login} setLogin={setLogin} password={password} setPassword={setPassword}/>
    </div>
  );
}

export default App;
