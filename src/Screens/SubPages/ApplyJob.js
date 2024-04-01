//import liraries
import React, { Component, useState } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, Animated, TouchableOpacity, ToastAndroid, AlertIOS, Platform,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import { scr_height, scr_width } from '../../Utils/Dimensions';
import Color from '../../Global/Color';
import { Poppins } from '../../Global/FontFamily';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

// create a component
const ApplyJob = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [cover, setcover] = useState('');
    const { colors } = useTheme();

    const [fileName, setfileName] = useState('');


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

    async function selectOneFile() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res[0].uri);
            console.log('Type : ' + res[0].type);
            console.log('File Name : ' + res[0].name);
            console.log('File Size : ' + res[0].size);
            setfileName(res[0].name)
        } catch (error) {
            console.log("catch in selectOne_File : ", error);
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    function applyJobClick() {
        try {
            if (username != "" && email != "" && phone != "") {
                console.log("Username ====== :" + username + " E-mail ===== :" + email + "  phone ===== :" + phone + " cover  ==== :" + cover);
                ToastAndroid.show("Applied Successfully", ToastAndroid.SHORT)
            } else {
                ToastAndroid.show("Please Fill Mandatory Fields", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.log("catch in applyJob_Click : ", error);
        }
    }

    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior={'position'}
        //     keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        // >
        <KeyboardAwareScrollView>
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white }}>
                        <Animated.View style={{ width: '95%', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', fontFamily: Poppins.Medium, paddingVertical: 5, fontSize: 14, color: Color.cloudyGrey }}>Full Name *</Text>

                            <View style={[styles.NumberBoxConatiner, { marginVertical: 0 }]}>
                                <TextInput
                                    style={[styles.numberTextBox, { paddingHorizontal: 10, }]}
                                    placeholder="Enter your Full Name"
                                    placeholderTextColor={Color.transparantBlack}
                                    value={username}
                                    onChangeText={text => {
                                        setUsername(text);
                                    }}
                                    keyboardType='name-phone-pad'
                                    autoFocus={username.length == '' ? false : true}
                                />
                            </View>
                            {/* {emailValidError ?  */}
                            {/* <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontSize: 14, color: 'red' }}>Enter your name</Text> */}
                            {/* : null} */}

                            <View style={{ width: '100%', marginVertical: 5 }}>
                                <Text style={{ width: '100%', textAlign: 'left', fontFamily: Poppins.Medium, paddingVertical: 5, fontSize: 14, color: Color.cloudyGrey }}>E-mail *</Text>
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
                                <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontFamily: Poppins.Medium, fontSize: 14, color: Color.cloudyGrey }}>Phone *</Text>
                                <View style={styles.NumberBoxConatiner}>
                                    <Text style={styles.numberCountryCode}>+91</Text>
                                    <TextInput
                                        placeholder="Enter your Phone Number"
                                        placeholderTextColor={Color.Venus}
                                        value={phone}
                                        keyboardType="phone-pad"
                                        maxLength={10}
                                        // autoFocus={phone.length == 10 ? false : true}
                                        onChangeText={(text) => setPhone(text)}
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            height: 50,
                                            borderLeftColor: Color.Venus,
                                            borderLeftWidth: 1,
                                            color: Color.black,
                                            fontSize: 14,
                                            padding: 5,
                                            paddingTop: 7, paddingHorizontal: 10,
                                            fontFamily: Poppins.SemiBold,
                                            alignItems: "flex-start",
                                        }}
                                    />
                                </View>
                                {/* <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontSize: 14, color: 'red' }}>Enter your phone number</Text> */}
                            </View>

                            <View style={{ width: '100%', marginVertical: 5 }}>
                                <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontFamily: Poppins.Medium, fontSize: 14, color: Color.cloudyGrey }}>Upload Resume</Text>
                                <TouchableOpacity onPress={() => selectOneFile()} style={{ justifyContent: 'center', alignItems: 'center', minHeight: 130, borderWidth: 1, borderColor: Color.cloudyGrey, borderRadius: 5, }}>
                                    <Iconviewcomponent
                                        Icontag={'SimpleLineIcons'}
                                        iconname={'cloud-upload'}
                                        icon_size={22}
                                        icon_color={Color.lightBlack}
                                        iconstyle={{ padding: 5 }}
                                    />
                                    <Text style={{ fontSize: 12, color: Color.cloudyGrey, textAlign: 'center', fontFamily: Poppins.Light }}>File Should be DOC, PDF, JPG</Text>
                                    <Text style={{ fontSize: 14, color: Color.primary, textAlign: 'center', fontFamily: Poppins.Medium }}>Browse Files</Text>
                                </TouchableOpacity>
                            </View>
                            {fileName != "" ?
                                <Text style={{ width: '100%', fontSize: 14, color: Color.cloudyGrey, textAlign: 'left', fontFamily: Poppins.Medium, paddingVertical: 5 }}>{fileName}</Text>
                                :
                                <Text style={{ width: '100%', fontSize: 14, color: Color.cloudyGrey, textAlign: 'left', fontFamily: Poppins.Medium, paddingVertical: 5 }}>(file name.pdf)</Text>
                            }
                            <View style={{ width: '100%', marginVertical: 0 }}>
                                <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 5, fontFamily: Poppins.Medium, fontSize: 14, color: Color.cloudyGrey }}>Cover Letter</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 5,
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: Color.cloudyGrey,
                                        borderRadius: 5,
                                    }}>
                                    <TextInput
                                        placeholder="Enter your Cover Letter"
                                        placeholderTextColor={Color.cloudyGrey}
                                        multiline={true}
                                        value={cover}
                                        onChangeText={text => setcover(text)}
                                        returnKeyType={'done'}
                                        style={{
                                            width: '100%',
                                            color: 'black',
                                            minHeight: 100,
                                            maxHeight: 160,
                                            fontSize: 16,
                                            padding: 10,
                                            textAlign: 'justify',
                                            lineHeight: 25, letterSpacing: 0.5
                                        }}
                                        textAlignVertical='top'
                                        showSoftInputOnFocus={true}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => applyJobClick()}
                                style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, marginVertical: 20, borderRadius: 50 }}>
                                <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center' }}>Apply Now</Text>
                            </TouchableOpacity>
                        </Animated.View >
                    </View>
                </View>
            </DismissKeyboard>
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
        borderColor: Color.Venus,
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    numberCountryCode: {
        color: Color.Venus,
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
    input: {
        margin: 5,
        minHeight: 100,
        maxHeight: 200,
    },
});

//make this component available to the app
export default ApplyJob;
