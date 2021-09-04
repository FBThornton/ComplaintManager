import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Display from "./Display";

export default function Login() {
  const [user, setUser] = useState(null);
  
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
