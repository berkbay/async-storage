import React, {useState} from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Logout = ({navigation}) => {

    const onLogout = async () => {
        try {
            await AsyncStorage.setItem('islogin', JSON.stringify(false))
            navigation.navigate('Login')
        }catch (e) {
            alert(e)
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onLogout}>
            <Text>Logout</Text>
        </TouchableOpacity>
    );
}

export default Logout;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'pink',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 30
    },
})
