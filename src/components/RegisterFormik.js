import React, {useState} from "react";
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {Feather, FontAwesome} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter valid email.')
        .required('Email is required. '),
    password: Yup.string()
        .min(8,({min})=>`Password must be at least ${min} characters.`)
        .max(12,({max})=>`Password can't be more than ${max} characters.`)
        .required('Password required'),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
});

const RegisterFormik = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const register = async (values) => {
        try {
            await AsyncStorage.setItem('email', values.email);
            await AsyncStorage.setItem('password', values.password);
            await AsyncStorage.setItem('islogin',JSON.stringify( false))
            console.log('Okey.')
            navigation.navigate('Login')
        } catch(e) {
            alert(e)
        }
    }

    return(
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={register}
            validationSchema={registerValidationSchema}>
            {({values, handleSubmit, handleChange, errors}) =>(
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
                            name={'password'}
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
                        <TextInput
                            name={'confirmPassword'}
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            placeholder={'Confirm Password'}
                            secureTextEntry={hideConfirmPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => setHideConfirmPassword(hideConfirmPassword)}
                            style={{position: 'absolute', right: 10, top: 15}}>
                            <FontAwesome
                                name={hideConfirmPassword ? 'eye-slash' : 'eye'}
                                size={17}
                            />
                        </TouchableOpacity>
                        <FontAwesome name="lock" size={24} color="black" style={{position: 'absolute', right: 305, top: 12}}/>
                        {errors.confirmPassword && (
                            <Text style={styles.alert}>{errors.confirmPassword}</Text>
                        )}
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
}

export default RegisterFormik;

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
