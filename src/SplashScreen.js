import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import Color from './Global/Color';
import {Gilmer} from './Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAsync, setUserData} from './Redux';
import {useDispatch} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  var {replace} = navigation;

  useEffect(() => {
    try {
      const SplashLoad = setTimeout(() => {
        getloginData();
      }, 3000);
      return () => clearInterval(SplashLoad);
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);

  const getloginData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserState');
      if (value !== null) {
        dispatch(setAsync(JSON.parse(value)));
      }
      var {onboardVisible} = JSON.parse(value);
      const user_data = await AsyncStorage.getItem('user_data');
      if (onboardVisible == true && user_data == null) {
        replace('Auth');
      } else if (onboardVisible == false && user_data == null) {
        replace('OnboardOne');
      } else {
        var {token} = JSON.parse(user_data);
        if (token == '' || token == null) {
          replace('OnboardOne');
        } else {
          dispatch(setUserData(user_data));
          replace('TabNavigator');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/logos/fobes_logo.png')}
        style={[styles.image, {transform: [{scale: imageScale}]}]}
      />
      <Animated.Text
        style={[
          {fontSize: 20, color: Color.primary, fontFamily: Gilmer.SemiBold},
          {transform: [{scale: imageScale}]},
        ]}>
        Fobes
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
