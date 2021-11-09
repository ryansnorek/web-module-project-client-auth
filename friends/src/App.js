import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch, useHistory} from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", credentials)
      .then(res => {
        setIsLoading(true);
        const token = res.data.payload;
        localStorage.setItem("token", token);
        history.push("/friends")
      })
      .catch(err => {
        console.error("ERROR ", err);
      })
      .finally(() => setIsLoading(false));
    };

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  };
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          name="username"
          type="text"
          placeholder="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input 
          name="password"
          type="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  )
};


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>Client Auth Project</h2>
      <Switch>
        <Route path="/" component={Login}/>
        <Route path="/login" component={Login}/>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
