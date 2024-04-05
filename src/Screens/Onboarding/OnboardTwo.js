import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Gilmer} from '../../Global/FontFamily';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useDispatch} from 'react-redux';
import {setOnBoardVisible} from '../../Redux';

const OnboardTwo = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/onboard_2.png')}
        style={{width: 500, height: 500, resizeMode: 'contain'}}
      />
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
            fontFamily: Gilmer.SemiBold,
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
            fontFamily: Gilmer.Regular,
            color: Color.routeColor,
            textAlign: 'center',
            lineHeight: 20,
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('OnboardOne')}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: Color.primary,
            borderRadius: 50,
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'chevron-back-outline'}
            icon_size={26}
            icon_color={Color.white}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            dispatch(setOnBoardVisible(true));
            navigation.navigate('Auth');
          }}
          style={{
            padding: 20,
            backgroundColor: Color.primary,
            borderRadius: 50,
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'chevron-forward'}
            icon_size={25}
            icon_color={Color.white}
          />
        </TouchableOpacity>
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

export default OnboardTwo;
