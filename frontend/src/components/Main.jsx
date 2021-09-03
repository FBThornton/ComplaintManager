import React, { useState } from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  const [user, setUser] = useState(null);
  
  return (user ?
    <div>
      <p>lol {user.username}</p>
    </div>
    :
    <div>
      <LoginForm setUser={setUser} />
    </div>
  );
}
