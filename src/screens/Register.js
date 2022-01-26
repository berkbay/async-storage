import React from "react";
import {View, StyleSheet, SafeAreaView, Text, TouchableOpacity} from "react-native";
import RegisterFormik from "../components/RegisterFormik";

const Register = ({navigation}) => {
    return(
        <SafeAreaView>
            <View style={styles.board}>
                <RegisterFormik navigation={navigation}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Return Login Page</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Register;

const styles = StyleSheet.create({
    board: {marginTop: 30, paddingHorizontal: 30},
    button: {
        backgroundColor: 'red',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '700'
    }
})
