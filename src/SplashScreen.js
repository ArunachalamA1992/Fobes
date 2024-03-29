import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import Color from './Global/Color';
import {Poppins} from './Global/FontFamily';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // setIsLoading(true);
      const SplashLoad = setTimeout(() => {
        navigation.navigate('OnboardOne');
      }, 3000);
      return () => {
        clearInterval(SplashLoad);
      };
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);

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
          {fontSize: 20, color: Color.primary, fontFamily: Poppins.SemiBold},
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
