import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const StepEducation = ({navigation}) => {
  const userData = useSelector(state => state.UserReducer.userData);
  var {candidate_educations} = userData;
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Education', {item: {}});
        }}
        style={{
          paddingHorizontal: 10,
          borderRadius: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <FIcon name="pencil" size={18} color={Color.blue} />
        <Text
          style={{
            fontFamily: Gilmer.Medium,
            fontSize: 14,
            color: Color.blue,
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          Add New
        </Text>
      </TouchableOpacity>
      {candidate_educations?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('Education', {item});
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Color.lightgrey,
              padding: 10,
            }}>
            <FIcon name="graduation-cap" size={25} color={Color.cloudyGrey} />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 16,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}>
                {item?.degree}
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}>
                {item?.institute_name}
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Regular,
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}>
                {item?.year}
              </Text>
            </View>
            <FIcon
              name="pencil"
              size={20}
              color={Color.blue}
              style={{marginHorizontal: 20, marginVertical: 10}}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StepEducation;
