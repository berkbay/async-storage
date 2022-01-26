import React, {useState} from "react";
import {View, Text, StyleSheet, SafeAreaView} from "react-native";
import Logout from "../components/Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Delete from "../components/Delete";

const Home = ({navigation}) => {
    const [email, setEmail] = useState()
    const getEmail = async () => {
        try {
            const email = await AsyncStorage.getItem('email')
            return setEmail(email)
        } catch(e) {
            alert(e)
        }
    }

    getEmail();

    return(
        <View style={styles.body}>
            <View style={styles.textView}>
                <Text style={styles.text}> Welcome to Home Page</Text>
                <Text style={styles.text}>{email} </Text>
            </View>
            <View style={styles.logout} >
                <Logout navigation={navigation}/>
            </View>
            <View style={styles.logout} >
                <Delete navigation={navigation}/>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    body: {backgroundColor: 'white', flex: 1},
    textView: {justifyContent: "center", alignItems:"center"},
    text: {fontSize: 25, marginVertical:20, marginHorizontal:30},
    logout: {marginVertical:10}
})
