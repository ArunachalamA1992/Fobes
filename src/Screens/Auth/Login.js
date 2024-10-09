import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import analytics from '@react-native-firebase/analytics';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [password, setPassword] = useState('');
  const [password_visible, setPasswordvisibility] = useState(false);
  const [minPass, setMinPass] = useState('');

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '375312400820-b7p9j55sv1i76l7ndh17josclr7blc5t.apps.googleusercontent.com',
        offlineAccess: false,
        // offlineAccess: true,
        // hostedDomain: '',
        // forceConsentPrompt: true,
      });
    } catch (error) {
      console.log('error ----------- : ', error);
    }
  }, []);

  const signIn = async () => {
    try {
      // await analytics.logLogin({
      //   method: 'facebook',
      // })

      // console.log("kldfngklsdlgklkl", analytics());          For Analaytics purpose only
      analytics().logEvent('bicket', {
        id: '3745092',
        item: 'Mens grey shirt',
        description: ['round neck', 'long sleeved'],
        size: 'L',
      });

      if (email != '' && password != '') {
        var data = {
          email: email,
          password: password,
        };
        const login = await fetchData.login_with_pass(data, null);
        if (login?.status) {
          const combinedData = {
            ...login?.data,
            token: login?.token,
          };
          await AsyncStorage.setItem('user_data', JSON.stringify(combinedData));
          navigation.replace('TabNavigator');
          common_fn.showToast(login?.message);
        } else {
          common_fn.showToast(login?.message);
        }
      } else {
        common_fn.showToast('Invalid Email or Password');
      }
    } catch (error) {
      console.log('error in sign_In :', error);
    }
  };

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

  const googleSignIn = async navigation => {
    try {
      const replace = navigation;
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User info ============== :', JSON.stringify(userInfo));
      // if (userInfo) {
      //   var data = {
      //     email: userInfo?.user?.email,
      //   };
      //   const updateProfiledata = await fetchData.login_with_gmail(data);
      //   console.log(updateProfiledata);
      //   if (updateProfiledata.message) {
      //     dispatch(setUserData(updateProfiledata?.users));

      //     setPercentage(percentage);
      //     const UserLogin = {
      //       ...updateProfiledata?.users,
      //     };
      //     await AsyncStorage.setItem(
      //       'user_data',
      //       JSON.stringify(updateProfiledata?.users),
      //     );
      //     await AsyncStorage.setItem(
      //       'action_login_type',
      //       JSON.stringify({ login_type: 'properties' }),
      //     );
      //     dispatch(setLoginType('properties'));
      //     if (percentage == 100) {
      //       replace('TabNavigator', UserLogin);
      //     } else {
      //       replace('TabNavigator', UserLogin);
      //     }
      //   }
      // }
    } catch (error) {
      console.log('catch in google_Signing', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <Image
          source={require('../../assets/logos/fobes.png')}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            bottom: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              paddingHorizontal: 10,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
              marginTop: 20,
            }}>
            Welcome Back !
          </Text>
          <Text
            style={{
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 18,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Regular,
            }}>
            Let’s login. You’ve been missed !
          </Text>
        </View>
      </View>

      <View style={{ flex: 2, width: '95%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.NumberBoxConatiner}>
          <Iconviewcomponent
            Icontag={'Feather'}
            iconname={'mail'}
            icon_size={22}
            iconstyle={{color: Color.transparantBlack}}
          />
          <TextInput
            style={styles.numberTextBox}
            placeholder="Email Address"
            placeholderTextColor={Color.cloudyGrey}
            value={email}
            onChangeText={value => {
              setEmail(value);
              handleValidEmail(value);
            }}
            keyboardType="email-address"
          />
        </View>
        {emailValidError ? (
          <Text
            style={{
              width: '100%',
              textAlign: 'left',
              fontFamily: Gilmer.Regular,
              paddingVertical: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {emailValidError}
          </Text>
        ) : null}

        <View style={{ width: '100%', marginTop: 20 }}>
          <View
            style={[
              styles.NumberBoxConatiner,
              {marginVertical: 5, paddingHorizontal: 15},
            ]}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={'lock'}
              icon_size={22}
              iconstyle={{color: Color.transparantBlack}}
            />
            <TextInput
              style={styles.numberTextBox}
              placeholder="Password"
              placeholderTextColor={Color.cloudyGrey}
              secureTextEntry={!password_visible}
              value={password}
              keyboardType="name-phone-pad"
              onChangeText={password => {
                if (password.length < 6) {
                  setMinPass('Enter Minimum Six Characters');
                  setPassword(password);
                } else {
                  setPassword(password);
                  setMinPass('');
                }
              }}
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

          {minPass != 'null' ? (
            <Text
              style={{
                width: '95%',
                paddingVertical: 5, paddingHorizontal: 10,
                fontSize: 12,
                color: 'red',
              }}>
              {minPass}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setChecked(!checked);
              }}>
              <MCIcon
                name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
                size={20}
                color={checked ? Color.primary : Color.cloudyGrey}
              />
            </TouchableOpacity>
            <View style={{marginHorizontal: 5}}>
              <Text
                style={{
                  fontSize: 14,
                  color: checked ? Color.primary : Color.cloudyGrey,
                  textAlign: 'center',
                  fontFamily: Gilmer.Medium,
                }}>
                Remember me
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.primary,
                textDecorationLine: 'underline',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => signIn()}
          style={{
            width: '95%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            borderRadius: 50,
            backgroundColor: checked ? Color.primary : Color.cloudyGrey,
          }}
          disabled={!checked}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              textAlign: 'center',
              fontFamily: Gilmer.SemiBold,
            }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
                textAlign: 'center',
              }}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.primary,
                  fontFamily: Gilmer.Heavy,
                  textAlign: 'center',
                }}>
                Sign up
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
              fontFamily: Gilmer.Medium, padding: 3
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
                textDecorationLine: 'underline', padding: 3,
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
                paddingHorizontal: 5, padding: 3
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, alignItems: 'center',
    backgroundColor: Color.white,
  },
  NumberBoxConatiner: {
    display: 'flex',
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEF50',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  numberCountryCode: {
    justifyContent: 'center',
    color: Color.black,
    fontSize: 14,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    color: Color.black,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: Gilmer.Medium,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  placeTextBox: {
    flex: 1,
    display: 'flex',
    height: 50,
    color: Color.black,
    fontSize: 14,
    letterSpacing: 1,
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    fontFamily: Gilmer.Light,
    alignItems: 'flex-start',
  },
});

export default Login;
