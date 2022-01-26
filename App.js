import MainStackNavigation from "./src/navigations/MainStackNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedInNavigation from "./src/navigations/LoggedInNavigation";
import {useState} from "react";


export default function App() {
  const [loggedIn, setLoggedIn] = useState()
  const StackController = async () => {
    try {
      const isLogin = await AsyncStorage.getItem('islogin');
      if(isLogin === true) {
        setLoggedIn(true)
      }else {
        setLoggedIn(false)
      }
    } catch (e) {
      alert(e)
    }
    return loggedIn;
  }

  StackController();

  if(loggedIn === true){
    return (
        <LoggedInNavigation/>
    );
  }else {
    return (
        <MainStackNavigation/>
    );
  }
}

