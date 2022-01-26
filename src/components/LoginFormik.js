import React, {useState} from "react";
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {FontAwesome} from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .min(8,({min})=>`Email must be at least ${min} characters.`)
        .max(30,({max})=>`Email can't be more than ${max} characters.`)
        .required('Email required.'),
    password: Yup.string()
        .min(8,({min})=>`Password must be at least ${min} characters.`)
        .max(12,({max})=>`Password can't be more than ${max} characters.`)
        .required('Password required'),
})

const LoginFormik = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLogin, setIsLogin] = useState(AsyncStorage.getItem('islogin'))
    const login = async (values) => {
        try {
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            if(values.email === email && values.password === password) {
                setIsLogin(JSON.stringify(true))
                navigation.navigate('Home')
            }
        } catch (e) {
            alert(e)
        }
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={login}
            validationSchema={loginValidationSchema}>
            {({values, handleSubmit, handleChange, errors}) => (
                <View>
                    <View style={styles.item}>
                        <TextInput
                            name={'email'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            placeholder={'Email Address'}
                            style={styles.input}
                            keyboardType='email-address'
                        />
                        <Feather name="mail" size={24} color="black" style={{position: 'absolute', right: 300, top: 12}}/>
                        {errors.email && (
                            <Text style={styles.alert}>{errors.email}</Text>
                        )}
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            placeholder={'Password'}
                            secureTextEntry={hidePassword}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                setHidePassword(!hidePassword)
                            }
                            style={{position: 'absolute', right: 10, top: 15}}>
                            <FontAwesome
                                name={hidePassword ? 'eye-slash' : 'eye'}
                                size={17}
                            />
                        </TouchableOpacity>
                        <FontAwesome name="lock" size={24} color="black" style={{position: 'absolute', right: 305, top: 12}}/>
                        {errors.password && (
                            <Text style={styles.alert}>{errors.password}</Text>
                        )}
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
}

export default LoginFormik;

const styles = StyleSheet.create({
    item: {marginBottom: 20},
    input: {
        borderWidth: 1,
        borderColor: '#B0B0C3',
        backgroundColor: '#F7F7F7',
        paddingVertical: 10,
        paddingHorizontal: 30,
        height: 50,
    },
    alert: {color: 'red', fontSize: 15},
    button: {
        backgroundColor: '#4CE500',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: '700'}
})
