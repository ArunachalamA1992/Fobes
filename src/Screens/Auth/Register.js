//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, TouchableOpacity, ToastAndroid, AlertIOS, Platform } from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// create a component
const Register = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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

        if (username != "" && email != "" && phone != "" && password != "") {
            console.log("Email ----- :" + email + " Pass -------- :" + password);
            ToastAndroid.show("Register Successfully", ToastAndroid.SHORT)
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
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white }}>

                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            // source={{ uri: Media.logo }}
                            source={require('../../assets/logos/fobes.png')}
                            style={{ width: '35%', height: '35%', resizeMode: 'contain' }}
                        />

                    </View>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
                        <Text style={{ width: '100%', textAlign: 'center', fontSize: 18, paddingHorizontal: 10, color: Color.routeColor, fontFamily: Poppins.Bold, marginTop: 20 }}>Let's Get Started !</Text>
                        <Text style={{ width: '100%', textAlign: 'center', fontSize: 15, paddingHorizontal: 10, color: Color.routeColor, fontFamily: Poppins.Light }}>by creating a free account</Text>
                    </View>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white }}>
                    <Animated.View style={{ width: '95%', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontFamily: Poppins.Medium, paddingVertical: 5, fontSize: 14, color: Color.cloudyGrey }}>Enter your Name *</Text>

                        <View style={[styles.NumberBoxConatiner, { marginVertical: 0 }]}>
                            <TextInput
                                style={[styles.numberTextBox, { paddingHorizontal: 10, }]}
                                placeholder="Enter your Name"
                                placeholderTextColor={Color.transparantBlack}
                                value={username}
                                onChangeText={text => {
                                    setUsername(text);
                                    // handleValidEmail(value);
                                }}
                                keyboardType='name-phone-pad'
                            />
                        </View>
                        {/* {emailValidError ?  */}
                        {/* <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontSize: 14, color: 'red' }}>Enter your name</Text> */}
                        {/* : null} */}

                        <View style={{ width: '100%', marginVertical: 5 }}>
                            <Text style={{ width: '100%', textAlign: 'left', fontFamily: Poppins.Medium, paddingVertical: 5, fontSize: 14, color: Color.cloudyGrey }}>Enter your E-mail *</Text>
                            <View style={[styles.NumberBoxConatiner, { marginVertical: 0 }]}>
                                <TextInput
                                    style={[styles.numberTextBox, { paddingHorizontal: 10, }]}
                                    placeholder="Enter your E-mail"
                                    placeholderTextColor={Color.transparantBlack}
                                    onChangeText={text => {
                                        setEmail(text);
                                        handleValidEmail(text);
                                    }}
                                    keyboardType="email-address"
                                />
                            </View>
                            {emailValidError ?
                                <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontSize: 14, color: 'red' }}>{emailValidError}</Text>
                                : null}
                        </View>

                        <View style={{ width: '100%', marginVertical: 5 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontFamily: Poppins.Medium, fontSize: 14, color: Color.cloudyGrey }}>Enter your Phone Number *</Text>
                            <View style={[styles.NumberBoxConatiner, { marginVertical: 0 }]}>
                                <TextInput
                                    style={[styles.numberTextBox, { paddingHorizontal: 10, }]}
                                    placeholder="Enter your Phone"
                                    placeholderTextColor={Color.transparantBlack}
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                    keyboardType='number-pad'
                                    maxLength={10}
                                />
                            </View>
                            {/* <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontSize: 14, color: 'red' }}>Enter your phone number</Text> */}
                        </View>

                        <View style={{ width: '100%', marginVertical: 5 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontFamily: Poppins.Medium, fontSize: 14, color: Color.cloudyGrey }}>Enter your Password *</Text>
                            <View style={[styles.NumberBoxConatiner, { marginVertical: 0 }]}>
                                <TextInput
                                    style={[styles.numberTextBox, { paddingHorizontal: 10, }]}
                                    placeholder="Enter your Password"
                                    placeholderTextColor={Color.transparantBlack}
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    keyboardType='name-phone-pad'
                                />
                            </View>
                            {/* <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontSize: 14, color: 'red' }}>Enter your password</Text> */}
                        </View>

                        <TouchableOpacity
                            onPress={() => signIn()}
                            style={{ width: '100%', height: 50, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 50 }}>
                            <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center' }}>REGISTER</Text>

                        </TouchableOpacity>
                    </Animated.View >
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', bottom: 0 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 15, color: Color.cloudyGrey, fontFamily: Poppins.Medium, textAlign: 'center' }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, textAlign: 'center', textDecorationLine: 'underline' }}>Login Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
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
        // borderLeftColor: Color.Venus,
        // borderLeftWidth: 1,
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
