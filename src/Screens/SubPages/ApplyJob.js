import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { pick } from 'react-native-document-picker';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import { useSelector } from 'react-redux';

const ApplyJob = ({ navigation, route }) => {
  const [job_id] = useState(route?.params?.job_id);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  const [apply_job, setApply_job] = useState({
    name: '',
    portfolio: '',
    resume: {},
    cover_letter: '',
  });

  const getToggleJobs = async () => {
    try {
      console.log("check clicked");
      var data = {
        job_id: job_id,
        candidate_resume_id: 2362,
        cover_letter: apply_job?.cover_letter,
        application_group_id: 1,
      };
      const Saved_Jobs = await fetchData.toggle_bookmarks(data, token);
      console.log("Applied =========== :", JSON.stringify(Saved_Jobs));
      if (Saved_Jobs) {
        common_fn.showToast(Saved_Jobs?.message);
        navigation.navigate('Applycompletion');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Color.white,
        }}>
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Enter your Full Name"
            placeholderTextColor={Color.transparantBlack}
            value={apply_job?.name}
            onChangeText={text => {
              setApply_job({
                name: text,
                portfolio: apply_job?.portfolio,
                resume: apply_job?.resume,
                cover_letter: apply_job?.cover_letter,
              });
            }}
            keyboardType="name-phone-pad"
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Provide Portfolio link"
            placeholderTextColor={Color.transparantBlack}
            value={apply_job?.portfolio}
            onChangeText={text => {
              setApply_job({
                name: apply_job?.name,
                portfolio: text,
                resume: apply_job?.resume,
                cover_letter: apply_job?.cover_letter,
              });
            }}
            keyboardType="name-phone-pad"
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                const [{ name, uri }] = await pick();
                setApply_job({
                  name: apply_job?.name,
                  portfolio: apply_job?.portfolio,
                  resume: { name, uri },
                  cover_letter: apply_job?.cover_letter,
                });
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
            {apply_job?.resume != null &&
              apply_job?.resume?.name?.length > 0 ? (
              <Text
                style={{
                  fontFamily: Gilmer.SemiBold,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                {apply_job?.resume?.name}
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

        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              value={apply_job?.cover_letter}
              onChangeText={text => {
                setApply_job({
                  name: apply_job?.name,
                  portfolio: apply_job?.portfolio,
                  resume: apply_job?.resume,
                  cover_letter: text,
                });
              }}
              returnKeyType={'done'}
              style={{
                color: 'black',
                minHeight: 150,
                borderRadius: 10,
                padding: 10,
                width: '100%',
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
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
            getToggleJobs();
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
