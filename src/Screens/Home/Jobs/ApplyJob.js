import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Color from '../../../Global/Color';
import {Gilmer} from '../../../Global/FontFamily';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {pick, types} from 'react-native-document-picker';
import common_fn from '../../../Config/common_fn';
import fetchData from '../../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {setUserData} from '../../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const ApplyJob = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [job_id] = useState(route?.params?.job_id);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token, candidate_resume} = userData;
  console.log('candidate_resume', candidate_resume);

  const [apply_job, setApply_job] = useState({
    name: '',
    portfolio: '',
    resume: {},
    cover_letter: '',
  });

  useEffect(() => {
    getAPiData();
  }, [token, userData]);

  const getApplyjob = async () => {
    try {
      var data = {
        job_id: job_id,
        candidate_resume_id: apply_job?.resume?.id,
        cover_letter: apply_job?.cover_letter,
        application_group_id: 1,
      };
      if (apply_job?.resume?.file != undefined) {
        const create_job = await fetchData.create_applied_job(data, token);
        if (create_job?.message == 'Job Applied successfully') {
          common_fn.showToast(create_job?.message);
          navigation.replace('Applycompletion');
        } else {
          common_fn.showToast(create_job?.message);
        }
      } else {
        common_fn.showToast('Please Select the Mandatory field');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAPiData = async () => {
    try {
      const single_data = await fetchData.single_candidate(null, token);
      console.log('v?.data', single_data?.data);
      if (single_data) {
        const combinedData = {
          ...single_data?.data,
          token: token,
        };
        dispatch(setUserData(combinedData));
        await AsyncStorage.setItem('user_data', JSON.stringify(combinedData));
      } else {
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getResumeUpload = async item => {
    try {
      var data = {
        name: item?.name,
        cv: item?.uri,
      };
      const resume_data = await fetchData.upload_resume(data, token);
      console.log('resume_data', resume_data);
      if (resume_data?.message == 'CV Added Successful') {
        common_fn.showToast(resume_data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
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
            {/* <Text
              style={{
                fontFamily: Gilmer.Bold,
                paddingVertical: 5,
                fontSize: 20,
                color: Color.red,
              }}>
              *
            </Text> */}
          </View>
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
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
          {candidate_resume != null &&
            candidate_resume?.length > 0 &&
            candidate_resume?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setApply_job({
                      name: apply_job?.name,
                      portfolio: apply_job?.portfolio,
                      resume: item,
                      cover_letter: apply_job?.cover_letter,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: Color.cloudyGrey,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <FIcon
                    name={'folder-open'}
                    size={30}
                    color={Color.sunShade}
                  />
                  <View style={{marginHorizontal: 5, flex: 1}}>
                    <Text
                      style={{
                        fontFamily: Gilmer.SemiBold,
                        fontSize: 16,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      {moment(item?.created_at).format('MMM, YYYY')}
                    </Text>
                  </View>
                  <Icon
                    name={
                      apply_job?.resume?.id == item?.id
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={25}
                    color={
                      apply_job?.resume?.id == item?.id
                        ? '#309CD2'
                        : Color.cloudyGrey
                    }
                  />
                </TouchableOpacity>
              );
            })}
          {apply_job?.resume != null && apply_job?.resume?.name?.length > 0 && (
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 14,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              {apply_job?.resume?.name}
            </Text>
          )}
          <TouchableOpacity
            onPress={async () => {
              try {
                const [{name, uri}] = await pick({
                  type: [types.pdf, types.doc, types.images],
                  allowMultiSelection: false,
                });
                getResumeUpload({name, uri});
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
            getApplyjob();
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
      </ScrollView>
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
