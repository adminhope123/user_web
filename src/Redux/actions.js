// import axios from 'axios'
// import { error } from 'console'
// import * as type from './actionType'

// const getUSers=(users)=>({
//     type:type.GET_USERS,
//     payload:users
// })

// export const loadUsers=()=>{
//     return function (dispatch){
//             axios.get(`${process.env.REACT_APP_API}`)
//             .then((resp)=>{
//             console.log("resp",resp)
//             dispatch(getUSers(resp.data))
//         })
//         .catch((error)=>console.log("error",error))
//     }
// }