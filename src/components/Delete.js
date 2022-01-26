import React from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Delete = ({navigation}) => {

    const onDelete = async () => {
        try {
            await AsyncStorage.removeItem('email')
            await AsyncStorage.removeItem('password')
            await AsyncStorage.removeItem('islogin')
            navigation.navigate('Login')
        }catch (e) {
            alert(e)
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text>Delete Acount</Text>
        </TouchableOpacity>
    );
}

export default Delete;

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
