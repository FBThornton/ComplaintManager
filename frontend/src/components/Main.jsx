import React, { useState, useEffect } from "react";
import axios from 'axios';
import { url } from './api';
import LoginForm from "./LoginForm";
import Display from "./Display";

export default function Login() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    axios.get(url + '/user/auth', 
    { withCredentials: true })
    .then((response) => {
      setUser(response.data);
    })}, []);

  return (user ?
    <div>
      <Display user={user} setUser={setUser}/>
    </div>
    :
    <div>
      <LoginForm setUser={setUser} />
    </div>
  );
}
