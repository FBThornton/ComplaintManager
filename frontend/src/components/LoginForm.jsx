import React from "react";
import "../css/style.css";
import { useForm } from 'react-hook-form';
import { url } from './api';
import axios from 'axios';

export default function Form({setUser}) {
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    axios.post(url + '/user/login', 
    { username: data.username, password: data.password}, 
    { withCredentials: true })
    .then((response) => {
      setUser(response.data);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div class='center'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class='txt_field'>
        <input {...register("username")} required />
          <span></span>
          <label>Username</label>
        </div>
        <div class='txt_field'>
          <input {...register("password")} required />
          <span></span>
          <label>Password</label>
        </div>
        <div class='pass'></div>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}
