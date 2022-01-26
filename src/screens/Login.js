import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from "react-native";
import LoginFormik from "../components/LoginFormik";
import WelcomeLogo from "../components/WelcomeLogo";

const Login = ({navigation}) => {
    return(
        <SafeAreaView style={styles.body}>
            <WelcomeLogo/>
            <View style={styles.board}>
                <LoginFormik navigation={navigation}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Login;

const styles = StyleSheet.create({
    body: {backgroundColor: 'white', flex: 1,},
    board: {marginTop: 30, paddingHorizontal: 30},
    button: {
        backgroundColor: 'pink',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: '700'
    }
})
