// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.scss';
// export default function LoginHook() {
//     // let history = useHistory();
//     let navigate = useNavigate();
//     let [username, setUsername] = useState("");
//     let [password, setPassword] = useState("");


//     let setParams = (event) => {
//         if (event.target.name === 'username') {
//             setUsername(event.target.value)
//         }
//         if (event.target.name === 'password') {
//             setPassword(event.target.value)
//         }
//     }
//     let login = () => {
//         const myHeaders = new Headers();
//         myHeaders.append('Authorization', "Bearer " + localStorage.getItem("data"));

//         const formdata = new FormData();
//         formdata.append("username", username);
//         formdata.append("password", password);

//         const requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: formdata,
//             redirect: 'follow'
//         };

//         fetch("http://localhost:8080/login/signin", requestOptions)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw Error(response.status)
//             })
//             .then(result => {
//                 console.log(result)
//                 localStorage.setItem("data", result.data)
//                   alert("Thanh cong")
//                 //   this.setState({isLogin : true})
//                 // history.replace("/homeAdmin")
//                 navigate("/homeAdmin");
//             })
//             .catch(error => console.log('error', error));
//             // alert("Username, password are wrong")
//     }

//     //   onLogout = () =>{
//     //     this.setState({isLogin : false})
//     //   }

//     return <div>
//         {/* {isLogin ?
//             <Profile key={this.state.isLogin} onLogout={this.onLogout} /> : */}
//             <form>
//                 <div className="log">
//                     <div className="loginContainer">
//                         <h1>Welcome Admin!</h1>

//                         <div className="input-container">
//                             <label>Username </label>
//                             <input type="email" name="username" required placeholder='Enter the email' onChange={setParams} />
//                         </div>
//                         <div className="input-container">
//                             <label>Password </label>
//                             <input type="password" name="password" required placeholder='Enter the password' onChange={setParams} />
//                         </div>
//                         <div>
//                             <button type='button' className="loginBut" onClick={login}>
//                                 <p>Login</p>
//                             </button>
//                         </div>


//                         <button className="siG">
//                             <img
//                                 src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
//                                 alt="Trees"
//                                 height="30"
//                             />
//                             <p>Sign in with Google</p>
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         {/* } */}
//     </div>
// };
