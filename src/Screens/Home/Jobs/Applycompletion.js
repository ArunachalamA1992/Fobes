import React from 'react';
import {Text, View} from 'react-native';
import Color from '../../../Global/Color';
import {Gilmer} from '../../../Global/FontFamily';
import {Button} from 'react-native-paper';

const Applycompletion = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 40,
      }}>
      <View>
        <Text
          style={{
            fontFamily: Gilmer.Bold,
            marginVertical: 10,
            fontSize: 18,
            color: Color.black,
            textAlign: 'center',
          }}>
          You’ve Applied
        </Text>
        <Text
          style={{
            fontFamily: Gilmer.Medium,
            marginVertical: 10,
            fontSize: 16,
            textAlign: 'center',
            color: Color.cloudyGrey,
          }}>
          You have successfully applied for the job. Thank you for your
          application!
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.replace('TabNavigator');
          }}
          style={{
            backgroundColor: Color.primary,
            marginVertical: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
          labelStyle={{
            fontSize: 16,
            fontFamily: Gilmer.Medium,
          }}
          textColor={Color.white}>
          Back To Home
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.replace('AppliedJobs');
          }}
          style={{
            backgroundColor: '#DBF3FF',
            marginVertical: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
          labelStyle={{
            fontSize: 16,
            fontFamily: Gilmer.Medium,
          }}
          textColor={Color.black}>
          See Applied Jobs
        </Button>
      </View>
    </View>
  );
};

export default Applycompletion;
