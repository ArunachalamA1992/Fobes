//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Gilmer} from '../../Global/FontFamily';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';

// create a component
const OnboardThree = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flex: 2}}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/online-job-search-4836622-4032953.png',
          }}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: Gilmer.SemiBold,
              color: Color.primary,
              textAlign: 'center',
            }}>
            Grab the Oppurtunity
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Gilmer.Regular,
              color: Color.cloudyGrey,
              textAlign: 'center',
            }}
            numberOfLines={5}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            bottom: 0,
            backgroundColor: 'white',
            paddingVertical: 20,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("OnboardTwo")} style={{ paddingHorizontal: 20, padding: 10, }}>
                            <Text style={{ fontSize: 16, color: '#666', fontFamily: Gilmer.SemiBold }}>Prev</Text>
                        </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Auth')}
              style={{paddingHorizontal: 20, padding: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.primary,
                  fontFamily: Gilmer.SemiBold,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: scr_width,
    height: scr_height,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default OnboardThree;
