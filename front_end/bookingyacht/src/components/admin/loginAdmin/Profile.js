
// import React from "react";


// export default class Profile extends React.Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         "user" : {}
//       }
//     }
//     componentDidMount(){
//         this.loadDataProfile();
//     }
//     loadDataProfile = () =>{
//         let myHeaders = new Headers();
//         myHeaders.append("Authorization", "Bearer" +localStorage.getItem("accessToken"));

//         let requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         fetch("http://localhost:8080/login", requestOptions)
//         .then(response => {
//             if(response.ok){
//                 return response.json()
//             }

//             throw new  Error(response.status)
//         })
//         .then(result => {
//             console.log(result)
//             this.setState({"user" : result})
//             })
//         .catch(error => {
//             console.log('error', error)
//             this.logout()
//         });    
//     }

//     logout = () =>{
//         localStorage.removeItem("accessToken");
//         // alert("Logout success");
//         this.props.onLogout();
//     }
//     render(){
//         return(
//             <div>
//                 <div>Name : {this.state.user.name}</div>
//                 <button type="button" onClick={this.logout}>Logout</button>
//             </div>
//         );
//     }
// }