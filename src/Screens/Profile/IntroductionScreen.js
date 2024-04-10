import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import FIcon from 'react-native-vector-icons/FontAwesome';
import fetchData from '../../Config/fetchData';
import {Button} from 'react-native-paper';
import common_fn from '../../Config/common_fn';
import {useDispatch, useSelector} from 'react-redux';

const IntroductionScreen = ({navigation}) => {
  const [intro, setIntro] = useState({
    first_name: '',
    last_name: '',
    headline: '',
  });

  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const getAPiData = async () => {
    try {
      var data = {
        first_name: intro?.first_name,
        last_name: intro?.last_name,
        bio: intro?.headline,
      };
      const intro_data = await fetchData.candidates_profile(data, token);
      if (intro_data) {
        common_fn.showToast(intro_data?.message);
        navigation.goBack();
      } else {
        common_fn.showToast(intro_data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <Text
        style={{
          fontFamily: Gilmer.Bold,
          fontSize: 20,
          fontWeight: 'bold',
          color: Color.black,
          textTransform: 'capitalize',
          marginHorizontal: 5,
          marginTop: 10,
        }}>
        Introduction
      </Text>
      <Text
        style={{
          fontFamily: Gilmer.Bold,
          fontSize: 16,
          color: Color.cloudyGrey,
          textTransform: 'capitalize',
          marginHorizontal: 5,
        }}>
        Introduce yourself to the recruiters
      </Text>
      <View style={{flex: 1, marginVertical: 20}}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            First Name
          </Text>
          <TextInput
            placeholder="First Name"
            placeholderTextColor={Color.cloudyGrey}
            value={intro?.name}
            onChangeText={text => {
              setIntro({
                first_name: text,
                last_name: intro?.last_name,
                headline: intro?.headline,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Last Name
          </Text>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={Color.cloudyGrey}
            value={intro?.name}
            onChangeText={text => {
              setIntro({
                first_name: intro?.first_name,
                last_name: text,
                headline: intro?.headline,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Profile Headline
          </Text>
          <TextInput
            placeholder="Enter your headline"
            placeholderTextColor={Color.cloudyGrey}
            value={intro?.headline}
            onChangeText={text => {
              setIntro({
                first_name: intro?.first_name,
                last_name: intro?.last_name,
                headline: text,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            backgroundColor: '#9DCBE2',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.primary,
                marginHorizontal: 5,
                marginVertical: 5,
              }}>
              Currenttly working as
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 5,
                marginVertical: 5,
              }}>
              Eg: Software Engineer, etc
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Experiance');
            }}
            style={{padding: 10}}>
            <FIcon name="pencil" size={20} color={Color.blue} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Experiance');
          }}
          style={{padding: 10}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 16,
              fontWeight: 'bold',
              color: Color.primary,
              marginHorizontal: 5,
              marginVertical: 5,
              textAlign: 'right',
            }}>
            Add New
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginVertical: 30,
        }}>
        <Button
          mode="contained"
          onPress={async () => {
            try {
              navigation.navigate('Profile');
            } catch (err) {}
          }}
          style={{
            backgroundColor: '#DBF3FF',
            color: Color.red,
          }}
          textColor="#000">
          Delete
        </Button>
        <Button
          mode="contained"
          onPress={async () => {
            try {
              getAPiData();
            } catch (err) {}
          }}
          style={{
            backgroundColor: Color.primary,
            marginHorizontal: 10,
            alignItems: 'flex-end',
          }}
          textColor={Color.white}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default IntroductionScreen;
