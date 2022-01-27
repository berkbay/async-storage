import MainStackNavigation from "./src/navigations/MainStackNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedInNavigation from "./src/navigations/LoggedInNavigation";
import {useEffect, useState} from "react";


export default function App() {
  const [loggedIn, setLoggedIn] = useState()
  const StackController = async () => {
    const loginCorrection = await AsyncStorage.getItem('islogin')
    if(loginCorrection === 'true') {
      setLoggedIn('true')
    }else {
      setLoggedIn('false')
    }
    console.log(loggedIn);
  }

  StackController();

  if(loggedIn === 'true'){
    return (
        <LoggedInNavigation/>
    );
  }else {
    return (
        <MainStackNavigation/>
    );
  }
}

