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
        // webClientId: '1080007356916-6amrf74qvgd060rprqqeegs06s168dn1.apps.googleusercontent.com',
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
      if (email != '' && password != '') {
        var data = {
          email: email,
          password: password,
        };
        const login = await fetchData.login_with_pass(data, null);
        if (login?.message == 'Login Successful') {
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
      console.log('error', error);
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
      <View style={{}}>
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

        <View style={{marginTop: 20}}>
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
                if (password.length < 7) {
                  setMinPass('set minimum character as 6');
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
                paddingVertical: 5,
                fontSize: 14,
                color: 'red',
              }}>
              {minPass}
            </Text>
          ) : null}
        </View>
        <View
          style={{
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
                color={Color.cloudyGrey}
              />
            </TouchableOpacity>
            <View style={{marginHorizontal: 5}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
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
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            borderRadius: 50,
            backgroundColor: Color.primary,
          }}>
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
          onPress={() => googleSignIn()}
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
            Continue with Google
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 10,
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
