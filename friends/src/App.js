import React, { useState } from 'react';
import './App.css';
import axios from "axios";
import { 
        BrowserRouter, 
        Route, Link, Switch, 
        useHistory, Redirect 
      } 
from 'react-router-dom';

// AUTHORIZATION
const authorization = () => {
  const { token } = localStorage;
  return axios.create({
    headers: { authorization: token },
    baseURL: "http://localhost:5000/api"
  });
};

// PRIVATE ROUTE - FRIENDS LIST //
const PrivateRoute = props => {
  const { component: Component, ...rest } = props;
  return <Route {...rest} render={ () => {
        return localStorage.getItem("token") ? 
              <FriendsList/> : <Redirect path="/login"/>
  }} />
};
const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  authorization()
    .get("/friends")
    .then(res => {
      setFriends(res.data)
    })
    .catch(err => console.log(err))
  return (
    <div>
      <h1>Friends</h1>
      {friends.map(friend => {
        return (
          <div>
            <p>{friend.name}</p>
          </div>
        )
      })}
    </div>
  );
};

// LOGIN AUTHENTICATION //
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const { setItem } = localStorage;

    axios.post("http://localhost:5000/api/login", credentials)
      .then(res => {
        setIsLoading(true);
        setItem("token", res.data.payload);
        setTimeout(() => {
          history.push("/friends")
        }, 1000)
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

  if (isLoading) return <h3>Loading...</h3>
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
// ROUTES
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>Client Auth Project</h2>
      <Link to="/login">Login</Link>
      {}
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute exact path="/friends" component={FriendsList}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
