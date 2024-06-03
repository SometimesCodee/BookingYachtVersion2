import axios from 'axios';
import React, { useState } from 'react';
import './Login.scss';
// import Profile from './Profile';
// export default class Login extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       isLogin : localStorage.getItem("accessToken") != null
//     }
//   }
//   setParams = (event) =>{
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }
//   login = () =>{
//     let myHeaders = new Headers();
//     myHeaders.append('Authorization', "Bearer " + localStorage.getItem("accessToken"));

//     let urlencoded = new URLSearchParams();
//     urlencoded.append("username", this.state.username);
//     urlencoded.append("password", this.state.password);

//     let requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     }

//     fetch("http://localhost:8080/login/signin", requestOptions)
//     .then(response => {
//       if(response.ok){
//         return response.json
//       }
//       throw Error(response.status)
//     })
//     .then(result => {
//       console.log(result)
//       localStorage.setItem("accessToken", result.accessToken)
//       alert("Thanh cong")
//       this.setState({isLogin : true})
//     })
//     .catch(error => console.log('error', error));
//     alert("Username, password are wrong")
//   }

//   onLogout = () =>{
//     this.setState({isLogin : false})
//   }
//   render(){
//     return <div>
//         {this.state.isLogin ? 
//       <Profile key={this.state.isLogin} onLogout={this.onLogout}/>: 
//     <form>
//       <div className="log">
//         <div className="loginContainer">
//           <h1>Welcome Admin!</h1>
  
//           <div className="input-container">
//             <label>Username </label>
//             <input type="email" name="username" required placeholder='Enter the email' onChange={this.setParams}/>
//           </div>
//           <div className="input-container">
//             <label>Password </label>
//             <input type="password" name="password" required placeholder='Enter the password' onChange={this.setParams}/>
//           </div>
//           <div>
//             <button type='button' className="loginBut" onClick={this.login}>
//             <p>Login</p>
//             </button>
//           </div>
          
  
//           <button className="siG">
//             <img
//               src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
//               alt="Trees"
//               height="30"
//             />
//             <p>Sign in with Google</p>
//           </button>
//         </div>
//       </div>
//     </form>
//         }
//     </div>
//   }
// }
;
// const Login = () => {
//     // const [email, setEmail] = useState('');
//     // const [password, setPassword] = useState('');
//     // const [error, setError] = useState('');
//     // const navigate = useNavigate(); 

//     // const handleSubmit = async (e) =>{
//     //     e.preventDefault();
//     //     setError('');

//     //     try{
//     //         const response = await axios.post('http://localhost:8080/login/signin',{
//     //             email,
//     //             password
//     //         });
//     //         const data = response.data;

//     //         if(response.status === 200 && data.role === 'ADMIN'){
//     //             navigate('/home');
//     //         }else{
//     //             setError('Invalid login credentials or not an admin');
//     //         }
//     //     }catch(err){
//     //         setError('Error logging in, please try again');
//     //     }
//     // };

//     return(
//         <div className="log">
//         <div className="loginContainer">
//           <h1>Welcome Admin!</h1>
  
//           <div className="input-container">
//             <label>Username </label>
//             <input type="email" name="uname" required placeholder='Enter the email'/>
//             {/* {renderErrorMessage("uname")} */}
//           </div>
//           <div className="input-container">
//             <label>Password </label>
//             <input type="password" name="pass" required placeholder='Enter the password'/>
//             {/* {renderErrorMessage("pass")} */}
//           </div>
//           <button className="loginBut">
//             <p>Login</p>
//           </button>
  
//           <button className="siG">
//             <img
//               src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
//               alt="Trees"
//               height="30"
//             />
//             <p>Sign in with Google</p>
//           </button>
//         </div>
//       </div>
//     )
// }

// export default Login;



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login/signin', {
                username: username,
                password: password
            });
            
            if (response.data.success) {
                // Save the JWT token in local storage or context
                localStorage.setItem('token', response.data.data);
                console.log('Login successful:', response.data.data);
                // Redirect to another page or perform other actions
            } else {
                setErrorMessage('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An error occurred during login');
        }
    };

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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input 
                        type="password" 
                        name="pass" 
                        required 
                        placeholder='Enter the password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </div>
                <button className="loginBut" onClick={handleLogin}>
                    <p>Login</p>
                </button>

                <button className="siG">
                    <img
                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                        alt="Google Sign In"
                        height="30"
                    />
                    <p>Sign in with Google</p>
                </button>
            </div>
        </div>
    );
}

export default Login;
