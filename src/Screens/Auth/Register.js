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
const Register = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();


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

    const signIn = () => {                          // <= Added this function

        if (email != "" && password != "") {
            console.log("Email ----- :" + email + " Pass -------- :" + password);
            ToastAndroid.show("Login Successfully", ToastAndroid.SHORT)
        }
        else {
            console.log("Please fill mandatory fields");
            ToastAndroid.show("Please Fill Mandatory Fields", ToastAndroid.SHORT)

            // if (Platform.OS === 'android') {
            //     ToastAndroid.show(msg, ToastAndroid.SHORT)
            // } else {
            //     AlertIOS.alert(msg);
            // }
        }
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white }}>
                <Image
                    source={{ uri: Media.albionlogo }}
                    style={{ width: 60, height: 60, resizeMode: 'contain' }}
                />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 22, color: Color.black, fontFamily: Poppins.Bold, paddingVertical: 20 }}>Register Account</Text>
                </View>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white }}>
                <Animated.View style={{ width: '95%', alignItems: 'center', marginVertical: 10 }}>

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
                        <TextInput
                            style={styles.numberTextBox}
                            placeholder="Enter your Name"
                            placeholderTextColor={Color.cloudyGrey}
                            // onChangeText={(email) => setEmail(email)}
                            onChangeText={value => {
                                setEmail(value);
                                handleValidEmail(value);
                            }}
                        />
                    </View>
                    <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: 'red' }}>Enter your Name</Text>

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
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
                    {/* {emailValidError ? <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: 'red' }}>{emailValidError}</Text> : null} */}
                    <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: 'red' }}>Enter your E-mail</Text>

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
                        <TextInput
                            style={styles.numberTextBox}
                            placeholder="Enter your Password"
                            placeholderTextColor={Color.cloudyGrey}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: 'red' }}>Enter your Password</Text>

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
                        <TextInput
                            style={styles.numberTextBox}
                            placeholder="Enter your Confirm Password"
                            placeholderTextColor={Color.cloudyGrey}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: 'red' }}>Enter your Confirm Password</Text>

                    <TouchableOpacity
                        // onPress={() => signIn()} 
                        style={{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                        <LinearGradient colors={['#0033A0', '#3272fa']} style={[{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center' }, styles.NumberBoxConatiner]}>
                            <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center' }}>REGISTER</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View >
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', bottom: 0 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 15, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, textAlign: 'center' }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, textAlign: 'center', textDecorationLine: 'underline' }}>Login Now</Text>
                    </TouchableOpacity>
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
export default Register;
