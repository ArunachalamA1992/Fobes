//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, TouchableOpacity, ToastAndroid, AlertIOS, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

// create a component
const Login = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();
    const [password_visible, setPasswordvisibility] = useState(true);

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
        // <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white }}>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            // source={{ uri: Media.logo }}
                            source={require('../../assets/logos/fobes.png')}
                            style={{ width: '35%', height: '35%', resizeMode: 'contain' }}
                        />

                    </View>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center', bottom: 30 }}>
                        <Text style={{ width: '100%', textAlign: 'center', fontSize: 18, paddingHorizontal: 10, color: Color.routeColor, fontFamily: Poppins.Bold, marginTop: 20 }}>Welcome Back !</Text>
                        <Text style={{ width: '100%', textAlign: 'center', fontSize: 15, paddingHorizontal: 10, color: Color.routeColor, fontFamily: Poppins.Light }}>Let’s login. You’ve been missed !</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: Color.white }}>

                    <Animated.View style={{ width: '90%', alignItems: 'center', marginVertical: 0 }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Poppins.Light, paddingVertical: 5 }}>Enter Email Address *</Text>
                        <View style={styles.NumberBoxConatiner}>
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'mail'}
                                    icon_size={30}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                            {/* <Text style={styles.numberCountryCode}>+91</Text> */}
                            <TextInput
                                style={email ? styles.numberTextBox : styles.placeTextBox}
                                placeholder="Enter your E-mail"
                                placeholderTextColor={Color.cloudyGrey}
                                value={email}
                                // onChangeText={(email) => setEmail(email)}
                                onChangeText={value => {
                                    setEmail(value);
                                    handleValidEmail(value);
                                }}
                            />
                        </View>
                        {emailValidError ? <Text style={{ width: '100%', textAlign: 'left', fontFamily: Poppins.Regular, paddingVertical: 5, fontSize: 14, color: 'red' }}>{emailValidError}</Text> : null}

                        <View style={{ width: '100%', marginTop: 20 }}>
                            <Text style={{ width: '100%', textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Poppins.Light }}>Enter Password *</Text>

                            <View style={[styles.NumberBoxConatiner, { marginVertical: 5 }]}>
                                <View style={styles.numberCountryCode}>
                                    <Iconviewcomponent
                                        Icontag={'Feather'}
                                        iconname={'lock'}
                                        icon_size={26}
                                        iconstyle={{ color: Color.cloudyGrey }}
                                    />
                                </View>
                                <TextInput
                                    style={email ? styles.numberTextBox : styles.placeTextBox}
                                    placeholder="Enter your Password"
                                    placeholderTextColor={Color.cloudyGrey}
                                    // secureTextEntry={true}
                                    secureTextEntry={password_visible}
                                    value={password}
                                    onChangeText={(password) => setPassword(password)}
                                />

                                <TouchableOpacity style={styles.numberCountryCode} onPress={() => setPasswordvisibility(!password_visible)} >
                                    <Iconviewcomponent
                                        Icontag={'Entypo'}
                                        iconname={password_visible ? 'eye' : 'eye-with-line'}
                                        icon_size={26}
                                        iconstyle={{ color: Color.black, padding: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 }}>
                            <Text style={{ width: '100%', textAlign: 'right', fontFamily: Poppins.Medium, fontSize: 14, color: Color.primary, textDecorationLine: 'underline' }}>Fogot Your Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => signIn()} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 30, backgroundColor: Color.primary }}>
                            <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center', fontFamily: Poppins.SemiBold }}>LOGIN</Text>
                        </TouchableOpacity>

                    </Animated.View >
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '35%', height: 1, backgroundColor: Color.lightgrey }}></View>
                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Light, paddingHorizontal: 5 }}>(or use)</Text>
                        <View style={{ width: '35%', height: 1, backgroundColor: Color.lightgrey }}></View>
                    </View>
                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: 0 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', height: 55, backgroundColor: Color.white, elevation: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" }}
                                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold }}>Continue with Google</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 10 }}>
                            <Text style={{ fontSize: 14, color: Color.routeColor, fontFamily: Poppins.Medium, textAlign: 'center' }}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, textAlign: 'center', textDecorationLine: 'underline', paddingHorizontal: 5 }}>Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </DismissKeyboard>
        // </KeyboardAwareScrollView>
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
        borderColor: Color.transparantBlack,
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    numberCountryCode: {
        height: 50,
        // backgroundColor: Color.transparantBlack,
        color: Color.black,
        marginHorizontal: 0,
        fontSize: 14,
        fontFamily: Poppins.SemiBold,
        textAlign: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    numberTextBox: {
        flex: 1,
        display: "flex",
        height: 50,
        // borderLeftColor: Color.transparantBlack,
        // borderLeftWidth: 1,
        color: Color.black,
        fontSize: 15, letterSpacing: 1,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Poppins.SemiBold,
        alignItems: "flex-start",
    },
    placeTextBox: {
        flex: 1,
        display: "flex",
        height: 50,
        borderLeftColor: Color.transparantBlack,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 15, letterSpacing: 1,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Poppins.Light,
        alignItems: "flex-start",
    },
});

//make this component available to the app
export default Login;
