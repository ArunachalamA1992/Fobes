//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, TouchableOpacity, ToastAndroid, AlertIOS, Platform } from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// create a component
const Login = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    const signIn = () => {                          // <= Added this function

        navigation.navigate("TabNavigator");
        // if (email != "" && password != "") {
        //     console.log("Email ----- :" + email + " Pass -------- :" + password);
        //     ToastAndroid.show("Login Successfully", ToastAndroid.SHORT)
        //     navigation.navigate("TabNavigator");
        // }
        // else {
        //     console.log("Please fill mandatory fields");
        //     ToastAndroid.show("Please Fill Mandatory Fields", ToastAndroid.SHORT)

        //     // if (Platform.OS === 'android') {
        //     //     ToastAndroid.show(msg, ToastAndroid.SHORT)
        //     // } else {
        //     //     AlertIOS.alert(msg);
        //     // }
        // }
    }

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
            setEmailValidError('Email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('Enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white }}>
                <View
                    style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{ uri: Media.logo }}
                        style={{ width: 130, height: 130, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ flex: 0 }}>
                    <Text style={{ fontSize: 22, color: Color.black, fontFamily: Poppins.Bold, paddingVertical: 20 }}>Login to your Account</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: Color.white }}>
                <Animated.View style={{ width: '95%', alignItems: 'center', marginVertical: 10 }}>
                    <View style={styles.NumberBoxConatiner}>
                        <TextInput
                            style={styles.numberTextBox}
                            placeholder="Enter your E-mail"
                            placeholderTextColor={Color.cloudyGrey}
                            // onChangeText={(email) => setEmail(email)}
                            onChangeText={value => {
                                setEmail(value);
                                handleValidEmail(value);
                            }}
                        />
                    </View>
                    {emailValidError ? <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: 'red' }}>{emailValidError}</Text> : null}

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 20 }]}>
                        <TextInput
                            style={styles.numberTextBox}
                            placeholder="Enter your Password"
                            placeholderTextColor={Color.cloudyGrey}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => signIn()} style={{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGradient colors={['#0033A0', '#3272fa']} style={[{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center' }, styles.NumberBoxConatiner]}>
                            <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center' }}>LOGIN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 15 }}>
                        <Text style={{ width: '100%', textAlign: 'right', fontSize: 15, color: Color.primary, textDecorationLine: 'underline' }}>Fogot Your Password?</Text>
                    </TouchableOpacity>
                </Animated.View >
            </View>
            <View style={{ flex: 1, alignItems: 'center', }}>
                <View style={{ flex: 0, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Regular }}>(or)</Text>
                </View>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10 }}>
                        <Image
                            source={{ uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" }}
                            style={{ width: 70, height: 70, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
                        <Image
                            source={{ uri: "https://png.pngtree.com/png-clipart/20180515/ourmid/pngtree-facebook-logo-facebook-icon-png-image_3566127.png" }}
                            style={{ width: 65, height: 65, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, textAlign: 'center' }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, textAlign: 'center', textDecorationLine: 'underline' }}>Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: scr_width,
        height: scr_height,
        backgroundColor: Color.white,
    },
    NumberBoxConatiner: {
        display: "flex",
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    numberCountryCode: {
        color: Color.black,
        marginHorizontal: 10,
        fontSize: 14,
        fontFamily: Poppins.SemiBold,
        textAlign: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: 7,
    },
    numberTextBox: {
        flex: 1,
        display: "flex",
        height: 50,
        borderLeftColor: Color.Venus,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 14,
        padding: 5,
        paddingTop: 7,
        fontFamily: Poppins.SemiBold,
        alignItems: "flex-start",
    },
});

//make this component available to the app
export default Login;
