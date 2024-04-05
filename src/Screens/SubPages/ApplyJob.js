import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {scr_height, scr_width} from '../../Utils/Dimensions';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker, {pick} from 'react-native-document-picker';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ApplyJob = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [cover, setcover] = useState('');

  const applyJob = () => {
    try {
      // if (username != '' && email != '' && phone != '') {
      navigation.navigate('Applycompletion');
      // ToastAndroid.show('Applied Successfully', ToastAndroid.SHORT);
      // } else {
      //   ToastAndroid.show('Please Fill Mandatory Fields', ToastAndroid.SHORT);
      // }
    } catch (error) {
      console.log('catch in applyJob_Click : ', error);
    }
  };

  const [applyJobData, setApllyJobData] = useState({
    name: '',
    portfolio: '',
    resume: {},
    cover_letter: '',
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Color.white,
        }}>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                paddingVertical: 5,
                fontSize: 16,
                color: Color.black,
              }}>
              Full Name{' '}
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                paddingVertical: 5,
                fontSize: 20,
                color: Color.red,
              }}>
              *
            </Text>
          </View>
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
            placeholder="Enter your Full Name"
            placeholderTextColor={Color.transparantBlack}
            value={applyJobData?.name}
            onChangeText={text => {
              setApllyJobData({
                name: text,
                portfolio: applyJobData?.portfolio,
                resume: applyJobData?.resume,
                cover_letter: applyJobData?.cover_letter,
              });
            }}
            keyboardType="name-phone-pad"
          />
        </View>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                paddingVertical: 5,
                fontSize: 16,
                color: Color.black,
              }}>
              Portfolio
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: Gilmer.Regular,
                paddingVertical: 5,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              {' '}
              (Optional)
            </Text>
          </View>
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
            placeholder="Provide Portfolio link"
            placeholderTextColor={Color.transparantBlack}
            value={applyJobData?.portfolio}
            onChangeText={text => {
              setApllyJobData({
                name: applyJobData?.name,
                portfolio: text,
                resume: applyJobData?.resume,
                cover_letter: applyJobData?.cover_letter,
              });
            }}
            keyboardType="name-phone-pad"
          />
        </View>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                paddingVertical: 5,
                fontSize: 16,
                color: Color.black,
              }}>
              Upload Resume{' '}
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                paddingVertical: 5,
                fontSize: 20,
                color: Color.red,
              }}>
              *
            </Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              try {
                const [{name, uri}] = await pick();
                setApllyJobData({
                  name: applyJobData?.name,
                  portfolio: applyJobData?.portfolio,
                  resume: {name, uri},
                  cover_letter: applyJobData?.cover_letter,
                });
                console.log('{name, uri}', {name, uri}, applyJobData?.resume);
              } catch (error) {
                console.log('error', error);
              }
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 130,
              borderWidth: 1,
              borderColor: Color.cloudyGrey,
              borderRadius: 5,
              borderStyle: 'dashed',
              marginVertical: 10,
              padding: 10,
            }}>
            {applyJobData?.resume != null &&
            applyJobData?.resume?.name?.length > 0 ? (
              <Text
                style={{
                  fontFamily: Gilmer.SemiBold,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                {applyJobData?.resume?.name}
              </Text>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'folder-open'}
                  icon_size={30}
                  icon_color={'#A0C7EB'}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    textAlign: 'center',
                    fontFamily: Gilmer.Medium,
                    marginVertical: 10,
                  }}>
                  File Should be DOC, PDF, JPG
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.primary,
                    textAlign: 'center',
                    fontFamily: Gilmer.Bold,
                  }}>
                  Browse Files
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                paddingVertical: 5,
                fontFamily: Gilmer.Bold,
                fontSize: 16,
                color: Color.black,
              }}>
              Cover Letter
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: Gilmer.Regular,
                paddingVertical: 5,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              {' '}
              (Optional)
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              backgroundColor: '#EAEAEF50',
              // borderWidth: 1,
              // borderColor: Color.cloudyGrey,
              borderRadius: 5,
            }}>
            <TextInput
              placeholder="Enter your Cover Letter"
              placeholderTextColor={Color.cloudyGrey}
              multiline={true}
              value={cover}
              onChangeText={text => {
                setApllyJobData({
                  name: applyJobData?.name,
                  portfolio: applyJobData?.portfolio,
                  resume: applyJobData?.resume,
                  cover_letter: text,
                });
              }}
              returnKeyType={'done'}
              style={{
                color: 'black',
                minHeight: 100,
                fontSize: 16,
                textAlign: 'justify',
                fontFamily: Gilmer.Medium,
                paddingHorizontal: 10,
              }}
              textAlignVertical="top"
              showSoftInputOnFocus={true}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            applyJob();
          }}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.primary,
            marginVertical: 20,
            borderRadius: 50,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              textAlign: 'center',
              fontFamily: Gilmer.Bold,
            }}>
            Apply Now
          </Text>
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
  },
  NumberBoxConatiner: {
    borderColor: Color.Venus,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.Venus,
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: Gilmer.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 7,
  },
  numberTextBox: {
    height: 50,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    paddingTop: 7,
    borderRadius: 10,
    fontFamily: Gilmer.SemiBold,
    alignItems: 'flex-start',
    backgroundColor: '#EAEAEF50',
  },
  input: {
    margin: 5,
    minHeight: 100,
    maxHeight: 200,
  },
});

export default ApplyJob;
