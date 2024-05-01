import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Media} from '../../Global/Media';
import OTPInput from '../../Components/OTPInput';
import {Button} from 'react-native-elements';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import {Gilmer} from '../../Global/FontFamily';
import Color from '../../Global/Color';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const PassOtpVerify = ({navigation, route}) => {
  const [id] = useState(route.params.id);
  const [data] = useState(route.params.data);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const ResendOTP = async () => {
    setSeconds(30);
    const ResendOtpVerify = await fetchData.forgot_password(data);
    if (ResendOtpVerify) {
      common_fn.showToast('OTP Sent Successfully');
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast(ResendOtpVerify?.message);
      } else {
        alert(ResendOtpVerify?.message);
      }
    }
  };

  const chkOTPError = OTP => {
    let reg = /^[6-9][0-9]*$/;

    if (OTP.length === 0) {
      setError('Enter Your OTP Code');
    } else if (reg.test(OTP) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(OTP) === true) {
      setError('');
    }
  };

  const VerifyOTP = async navigation => {
    if (otpCode.length == 6) {
      const VerifyOTP = await fetchData.password_otp({
        id: id,
        otp: otpCode,
      });
      if (VerifyOTP?.message == 'Success') {
        navigation.navigate('ResetPass', {email});
        common_fn.showToast(VerifyOTP?.message);
      } else {
        setOTPCode('');
        inputRef.current.focus();
        var msg = VerifyOTP?.message;
        setError(msg);
      }
    } else {
      common_fn.showToast(
        'Invalid OTP Code Please Enter Your 6 Digit OTP Code',
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', flex: 1}}
      keyboardShouldPersistTaps="handled">
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
            padding: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 40,
            }}>
            <Image
              source={Media.logo}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: Color.black,
                marginRight: 10,
                marginVertical: 10,
              }}>
              Enter OTP
            </Text>
            <Text style={styles.invalidLogin}>{error}</Text>
            <View style={styles.otpInputView}>
              <OTPInput
                inputRef={inputRef}
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={6}
                setIsPinReady={setIsPinReady}
                chkOTPError={chkOTPError}
              />
            </View>
            {seconds > 0 || minutes > 0 ? (
              <View style={styles.noReceivecodeView}>
                <Text style={styles.noReceiveText}>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            ) : (
              <View style={styles.noReceivecodeView}>
                <TouchableOpacity onPress={() => ResendOTP()}>
                  <Text style={styles.resendOtp}>Resend Otp! </Text>
                </TouchableOpacity>
              </View>
            )}
            <Button
              title={'Verify Number'}
              titleStyle={{}}
              buttonStyle={{
                height: 50,
                backgroundColor: Color.primary,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onPress={() => {
                VerifyOTP(navigation);
              }}
            />
          </View>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default PassOtpVerify;
const styles = StyleSheet.create({
  otpInputView: {
    marginVertical: 10,
  },
  noReceivecodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 15,
    marginRight: 10,
  },
  noReceiveText: {
    color: Color.black,
    fontSize: 12,
    fontFamily: Gilmer.Bold,
  },
  resendOtp: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: Gilmer.Bold,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: Gilmer.Bold,
    color: Color.red,
    textAlign: 'center',
  },
});
