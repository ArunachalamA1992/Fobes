import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Gilmer} from '../../Global/FontFamily';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Iconviewcomponent} from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = useTheme();
  const [password_visible, setPasswordvisibility] = useState(false);

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

  const signUp = async () => {
    try {
      if (username != '' && email != '' && phone != '' && password != '') {
        var data = {
          name: username,
          email: email,
          phone: phone,
          password: password,
          role: 'candidate',
        };
        const register_data = await fetchData.register(data);
        if (register_data?.message) {
          common_fn.showToast(register_data?.message);
          navigation.replace('Auth');
        } else {
          common_fn.showToast(register_data?.message);
        }
      } else {
        common_fn.showToast('Please fill mandatory fields');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <Image
          source={require('../../assets/logos/fobes.png')}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            paddingHorizontal: 10,
            color: Color.lightBlack,
            fontFamily: Gilmer.Bold,
            marginTop: 20,
          }}>
          Let's Get Started !
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            paddingHorizontal: 10,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Medium,
            marginVertical: 10,
          }}>
          by creating a free account
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Color.white,
        }}>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'person'}
            icon_size={22}
            iconstyle={{color: Color.transparantBlack}}
          />
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
            placeholder="Full Name"
            placeholderTextColor={Color.transparantBlack}
            value={username}
            onChangeText={text => {
              setUsername(text);
            }}
            keyboardType="name-phone-pad"
          />
        </View>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'mail'}
            icon_size={22}
            iconstyle={{color: Color.transparantBlack}}
          />
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
            placeholder="Email Address"
            placeholderTextColor={Color.transparantBlack}
            onChangeText={text => {
              setEmail(text);
              handleValidEmail(text);
            }}
            keyboardType="email-address"
          />
          {emailValidError ? (
            <Text
              style={{
                width: '100%',
                textAlign: 'left',
                paddingVertical: 5,
                fontSize: 14,
                color: 'red',
              }}>
              {emailValidError}
            </Text>
          ) : null}
        </View>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'call'}
            icon_size={22}
            iconstyle={{color: Color.transparantBlack}}
          />
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
            placeholder="Mobile Number"
            placeholderTextColor={Color.transparantBlack}
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'MaterialCommunityIcons'}
            iconname={'lock'}
            icon_size={22}
            iconstyle={{color: Color.transparantBlack}}
          />
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
            placeholder="Create Password"
            placeholderTextColor={Color.transparantBlack}
            secureTextEntry={!password_visible}
            value={password}
            onChangeText={text => setPassword(text)}
            keyboardType="name-phone-pad"
          />
          <TouchableOpacity
            onPress={() => setPasswordvisibility(!password_visible)}
            style={styles.numberCountryCode}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={!password_visible ? 'eye-off' : 'eye'}
              icon_size={22}
              iconstyle={{color: Color.transparantBlack}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => signUp()}
        style={{
          height: 50,
          backgroundColor: Color.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}>
        <Text style={{fontSize: 16, color: Color.white, textAlign: 'center'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '35%',
              height: 1,
              backgroundColor: Color.lightgrey,
            }}></View>
          <Text
            style={{
              fontSize: 16,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            or use
          </Text>
          <View
            style={{
              width: '35%',
              height: 1,
              backgroundColor: Color.lightgrey,
            }}></View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderRadius: 10,
            padding: 5,
            backgroundColor: Color.white,
            elevation: 1,
          }}>
          <Image
            source={{
              uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
            }}
            style={{width: 45, height: 45, resizeMode: 'contain'}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.SemiBold,
              marginHorizontal: 20,
            }}>
            Signup With Google
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              textAlign: 'center',
            }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                color: Color.primary,
                fontFamily: Gilmer.Heavy,
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Color.black,
            textAlign: 'center',
            fontFamily: Gilmer.Medium,
          }}>
          By Signing up, you agree to our{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TermsCondition');
          }}>
          <Text
            style={{
              fontSize: 15,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              textDecorationLine: 'underline',
            }}>
            Terms of Use
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            color: Color.black,
            fontFamily: Gilmer.Medium,
          }}>
          {' '}
          and{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PrivacyPolicy');
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              textDecorationLine: 'underline',
              paddingHorizontal: 5,
            }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.white,
  },
  textContainer: {
    marginVertical: 20,
    borderColor: Color.cloudyGrey,
    backgroundColor: '#EAEAEF50',
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: Gilmer.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 7,
  },
  numberTextBox: {
    flex: 1,
    display: 'flex',
    height: 50,
    // borderLeftColor: Color.Venus,
    // borderLeftWidth: 1,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    paddingTop: 7,
    fontFamily: Gilmer.SemiBold,
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default Register;
