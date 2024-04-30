import React, {useState} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Keyboard,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import {Gilmer} from '../../Global/FontFamily';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const chkNumberError = value => {
    let reg = /^[6-9][0-9]*$/;

    if (value.length === 0) {
      setError('Enter Your Email or Mobile Number');
    } else if (reg.test(value) === false) {
      setError(false);
    } else if (reg.test(value) === true) {
      setError('');
    }
  };
  const forgotfn = async () => {
    try {
      var data = {
        email: email,
      };
      if (email?.trimStart().trimEnd()) {
        const forgot_password = await fetchData.forgot_password(data);
        if (forgot_password) {
          navigation.navigate('NumberVerify', {
            id: forgot_password?.id,
            data: data,
          });
        } else {
          common_fn.showToast(forgot_password?.message);
        }
      } else {
        common_fn.showToast('Enter Mobile Number Or Email ID');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.white,
          padding: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={Media.logo}
            style={{width: 100, height: 100, resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
          }}>
          <View style={{marginVertical: 5}}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
                marginVertical: 5,
              }}>
              Enter your Email
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor={Color.cloudyGrey}
                value={email}
                onChangeText={value => {
                  setEmail(value);
                  chkNumberError(value);
                }}
                style={styles.numberTextBox}
              />
            </View>
            {error && <Text style={styles.invalidLogin}>{error}</Text>}
          </View>

          <Button
            title={'Forgot Password'}
            titleStyle={{}}
            buttonStyle={{
              backgroundColor: Color.primary,
              borderRadius: 5,
              height: 50,
              marginVertical: 30,
            }}
            onPress={() => {
              forgotfn(navigation);
            }}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  NumberBoxConatiner: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: Gilmer.Bold,
  },
  invalidLogin: {
    fontSize: 12,
    fontFamily: Gilmer.Bold,
    color: Color.red,
    textAlign: 'left',
    marginTop: 10,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    padding: 10,
    color: Color.black,
    marginVertical: 10,
    fontSize: 12,
    fontFamily: Gilmer.Medium,
  },
  RequestView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  requestTextTitle: {
    color: Color.cloudyGrey,
    fontSize: 15,
    fontFamily: Gilmer.Bold,
  },
  DemoText: {
    color: Color.primary,
    fontSize: 15,
    fontFamily: Gilmer.Bold,
    textDecorationLine: 'underline',
    marginStart: 5,
  },
  noInternetText: {
    backgroundColor: Color.black,
    color: Color.white,
    paddingVertical: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});