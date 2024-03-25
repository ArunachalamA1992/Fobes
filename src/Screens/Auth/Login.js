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
import { Iconviewcomponent } from '../../Components/Icontag';

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
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white }}>
                <View style={{
                    width: '100%', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image
                        // source={{ uri: Media.logo }}
                        source={require('../../assets/logos/fobes.png')}
                        style={{ width: 120, height: 70, resizeMode: 'contain' }}
                    />
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 20, paddingHorizontal: 10, color: Color.black, fontFamily: Poppins.SemiBold, marginTop: 20 }}>Welcome Back !</Text>
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 15, paddingHorizontal: 10, color: Color.routeColor, fontFamily: Poppins.Regular }}>Let’s login. You’ve been missed !</Text>

                </View>
                {/* <View style={{}}>
                </View> */}
            </View>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: Color.white }}>

                <Animated.View style={{ width: '90%', alignItems: 'center', marginVertical: 0 }}>
                    <Text style={{ width: '100%', textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingVertical: 10 }}>Enter Email Address</Text>
                    <View style={styles.NumberBoxConatiner}>
                        <View style={styles.numberCountryCode}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'mail'}
                                icon_size={22}
                                iconstyle={{ color: Color.cloudyGrey, marginRight: 10 }}
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
                        <Text style={{ width: '100%', textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold }}>Enter Password</Text>

                        <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
                            <TouchableOpacity onPress={() => setPasswordvisibility(!password_visible)} style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={password_visible ? 'lock' : 'unlock'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.cloudyGrey, marginRight: 10 }}
                                />
                            </TouchableOpacity>
                            <TextInput
                                style={email ? styles.numberTextBox : styles.placeTextBox}
                                placeholder="Enter your Password"
                                placeholderTextColor={Color.cloudyGrey}
                                // secureTextEntry={true}
                                secureTextEntry={password_visible}
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                            />

                            {/* <TouchableOpacity style={styles.numberCountryCode} onPress={() => setPasswordvisibility(!password_visible)} >
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={password_visible ? 'lock' : 'unlock'}
                                icon_size={15}
                                iconstyle={{ color: Color.black, padding: 5 }} />
                        </TouchableOpacity> */}
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ width: '100%', textAlign: 'right', fontSize: 15, color: Color.primary, textDecorationLine: 'underline' }}>Fogot Your Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => signIn()} style={{ width: '100%', height: 55, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 5, backgroundColor: Color.primary }}>
                        {/* <LinearGradient colors={['#0033A0', '#3272fa']} style={[{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center' }, styles.NumberBoxConatiner]}> */}
                        <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center' }}>LOGIN</Text>
                        {/* </LinearGradient> */}
                    </TouchableOpacity>

                </Animated.View >
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Regular }}>(or use)</Text>
                </View>
                <View style={{ flex: 2, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', height: 60, backgroundColor: Color.white, elevation: 2 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Image
                                source={{ uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" }}
                                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={{ textAlign: 'center', fontSize: 16, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold }}>Continue with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1.5, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 10 }}>
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
        height: 55,
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
        height: 55,
        borderLeftColor: Color.Venus,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 16, letterSpacing: 1,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Poppins.SemiBold,
        alignItems: "flex-start",
    },
    placeTextBox: {
        flex: 1,
        display: "flex",
        height: 55,
        borderLeftColor: Color.grey,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 14, letterSpacing: 1,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Poppins.Light,
        alignItems: "flex-start",
    },
});

//make this component available to the app
export default Login;
