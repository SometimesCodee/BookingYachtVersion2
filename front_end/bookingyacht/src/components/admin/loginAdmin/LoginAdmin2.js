import React, { useState } from 'react';
import { loginAdmin } from '../../../services/ApiServices';
import './Login.scss';

const LoginAdmin = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () =>{
        


       let response = await loginAdmin(username, password)
       if(response && +response.EC === 0){
        let role = response.DT.role;
        let email = response.DT.email
        let token = response.DT.access_token;

        let data = {
            isAuthenticated : true,
            token,
            account : {role, email, username}
        }
        localStorage.setItem('jwt', token)
        
       }
    }

    return (
        <div className="log">
            <div className="loginContainer">
                <h1>Welcome Admin!</h1>

                <div className="input-container">
                    <label>Username </label>
                    <input 
                    type="email" 
                    name="uname" 
                    required 
                    placeholder='Enter the email'
                    value={username}
                    onChange={(event) =>{setUsername(event.target.value)}}
                     />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input 
                    type="password" 
                    name="pass" 
                    required 
                    placeholder='Enter the password' 
                    value={password}
                    onChange={(event) =>{setPassword(event.target.value)}}
                    />
                </div>
                <button className="loginBut" onClick={() => handleLogin()}>
                    <p>Login</p>
                </button>

                <button className="siG">
                    <img
                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                        alt="Trees"
                        height="30"
                    />
                    <p>Sign in with Google</p>
                </button>
            </div>
        </div>
    )

}

export default LoginAdmin;