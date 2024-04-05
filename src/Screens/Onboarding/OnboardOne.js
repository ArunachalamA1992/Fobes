import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Gilmer} from '../../Global/FontFamily';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';

const OnboardOne = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/onboard_1.png')}
        style={{width: 500, height: 500, resizeMode: 'contain'}}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: Gilmer.Bold,
              color: Color.primary,
              textAlign: 'center',
              lineHeight: 25,
              letterSpacing: 0.5,
              textTransform: 'capitalize',
            }}>
            Grab the Oppurtunity
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Gilmer.Medium,
              color: Color.routeColor,
              textAlign: 'center',
              lineHeight: 20,
              letterSpacing: 0.5,
              paddingVertical: 10,
            }}
            numberOfLines={2}>
            Thrilled to have you onboard! Let's explore new career horizons
            together.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('OnboardTwo')}
              style={{
                padding: 20,
                backgroundColor: Color.primary,
                borderRadius: 50,
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'chevron-forward-outline'}
                icon_size={25}
                icon_color={Color.white}
              />
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
    padding: 10,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardOne;
