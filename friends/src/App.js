import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';


const Login = ()=> {
  return (<h2>Login</h2>)
}

function App() {
  return (
    <div className="App">
      <h2>Client Auth Project</h2>
      <form>
        <input placeholder="username"/>
        <input placeholder="password"/>
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
