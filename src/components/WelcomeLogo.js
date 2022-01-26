import React from "react";
import {View, Image, StyleSheet} from "react-native";

const WelcomeLogo = () => {
    return(
        <View style={styles.logoArea}>
            <Image style={styles.WelcomeLogo} source={require('../../assets/welcome.jpeg')}/>
        </View>
    );
}

export default WelcomeLogo;

const styles = StyleSheet.create({
    logoArea: {alignItems: 'center', marginTop: 20},
    WelcomeLogo: {width:'100%', height: 350},
})
