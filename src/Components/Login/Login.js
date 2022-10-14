import React from 'react'
 
/* .. add the import .. */
import {useMsal} from 'msal-react-lite'
 
const Login = () => {
  /* .. reference methods and isLoggedIn property from context ..*/
  const {login,logout,getAuthToken,getAuthResult,isLoggedIn} = useMsal()
  return (
    <div>
      MSAL Example:<br/>
      {/*  .. can selectively display content if logged in or not */}
      <br/>Login Status: {isLoggedIn?<span>Logged In</span> :<span>Logged Out</span>} <br/>
 
      {/*  .. can execute login/logout and getAuthToken methods */}
      <button onClick={() => login()}>LogIn</button>
      <button onClick={() => logout()}>LogOut</button>      
      <button onClick={async () => await getAuthToken()}>Get Token</button>
      <button onClick={async () => console.log('AuthResult:',await getAuthResult())}>Get msal.AuthResult</button>
    </div>
  )
}

export default Login;