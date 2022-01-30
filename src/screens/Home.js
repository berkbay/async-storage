import React, {useState, useEffect, useRef} from "react";
import {View, Text, StyleSheet, Button, Platform} from "react-native";
import Logout from "../components/Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Delete from "../components/Delete";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {TextInput} from "react-native-web";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Home = ({navigation}) => {
    const [email, setEmail] = useState()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const getEmail = async () => {
        try {
            const email = await AsyncStorage.getItem('email')
            return setEmail(email)
        } catch(e) {
            alert(e)
        }
    }
    getEmail();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to dget push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const sendMessage = (token) => {
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                title: 'Mind Ofis',
                body: 'You have a new message',
                data: {data: 'goes here'},
                _displayInForeground: true,
            }),
        });
    }

    return(
        <View style={styles.body}>
            <View style={styles.textView}>
                <Text style={styles.text}> Welcome to Home Page</Text>
                <Text style={styles.text}>{email} </Text>
            </View>
            <View style={styles.button} >
                <Logout navigation={navigation}/>
            </View>
            <View style={styles.button} >
                <Delete navigation={navigation}/>
            </View>
            <View style={styles.button}>
                <Button title="Send Message" onPress={() => sendMessage(expoPushToken)}/>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    body: {backgroundColor: 'white', flex: 1, marginTop: 50},
    textView: {justifyContent: "center", alignItems:"center"},
    text: {fontSize: 25, marginVertical:20, marginHorizontal:30},
    button: {marginVertical:10}
})
