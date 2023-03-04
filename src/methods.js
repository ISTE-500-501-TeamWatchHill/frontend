export async function login(email, password) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let loginBody = JSON.stringify({
      email,
      password
  });

  const requestOptions = {
      mode: 'cors',
      method: 'POST',
      headers: myHeaders,
      body: loginBody
  }

  await fetch("http://localhost:3001/login", requestOptions)
  .then(function(result) {
    console.log(result);
  })
  .catch(err => err);
}

// //this will have all of the methods for calling the api 
// export default class Methods {
//   token = "";

//     constructor(props) {
//         //super(props);
//         this.state = {apiResponse: ""};
//     }

//   callAPI() {
//     fetch("http://localhost:8080/")
//       .then(res => res.text())
//       .then(res => this.setState({ apiRespone: res}))
//       .catch(err => err);
//   }
  

//   async login() {
//     let myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     let loginBody = {
//         "email": "dd123@rit.edu",
//         "password": "Password2"
//     }
//     await fetch("http://localhost:3001/login", {
//         method: 'POST',
//         headers: myHeaders,
//         body: JSON.stringify(loginBody)
//     })
//       .then(res => res.json())
//       .then(function(result) {
//         token = result.token;
//       })
//       .catch(err => err);
//   }

//    async getTeams() {
//     let myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("x-access-token", this.token);
//     await fetch("http://localhost:3001/teams/all", {
//       method: 'GET',
//       headers: myHeaders
//     })
//         .then(res => res.json())
//         .catch(err => err);
//    }
  

//   componentDidMount() {
//     this.callAPI();
//   }
// }