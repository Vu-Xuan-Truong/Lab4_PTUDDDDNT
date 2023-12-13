import React,{useEffect} from "react"
import { StyleSheet,Text,View } from "react-native" 
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { MyContextControllerProvider } from "./src/context"
import Router from "./src/screens/Router"
import { NavigationContainer } from '@react-navigation/native'
import { initializeApp } from '@react-native-firebase/app';
import RouterServices from "./src/screens/RouterServices"

// const initial =()=>{
//   const USERS =  firestore().collection("USERS")
//   const admin ={
//     name: "admin",
//     phone: "09111111",
//     address: "Binh Duong",
//     email: "truong@gmail.com",
//     password: "123456",
//     role:"admin"
//   }
//   USERS.doc(admin.email)
//   .onSnapshot(u=>{
//     if(!u.exists)
//     {
//       auth().createUserWithEmailAndPassword(admin.email,admin.password)
//       .then(()=>
//         USERS.doc(admin.email).set(admin)
//         .then(()=> console.log("Add new user admin!"))
//         )
//     }
//   })
// }

const initial = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    name: "admin",
    phone: "09111111",
    address: "Binh Duong",
    email: "truong@gmail.com",
    password: "123456",
    role: "admin",
  };

  USERS.doc(admin.email).get().then((u) => {
    if (!u.exists) {
      auth()
        .createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() =>
          USERS.doc(admin.email)
            .set(admin)
              .then(() => console.log("Add new user admin!"))
          )
          .catch((error) => console.error("Error creating user:", error));
      }
    });
  };


export default App = ()=>{
  useEffect(()=>{
    initial()
  },[])
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
         
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
const styles = StyleSheet.create(
  {
    container:{
      flex:1
    }
  }
)