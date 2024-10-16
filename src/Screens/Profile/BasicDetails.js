import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import StepIndicator from 'react-native-step-indicator';
import { Gilmer } from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Searchbar } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import { Divider } from 'react-native-elements';

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.cloudyGrey,
  labelSize: 15,

  currentStepIndicatorSize: 30,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#309CD2',
  stepIndicatorCurrentColor: '#309CD2',
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: Color.white,
  currentStepLabelColor: Color.black,

  separatorFinishedColor: '#309CD2',
  stepIndicatorFinishedColor: '#309CD2',
  stepIndicatorLabelFinishedColor: 'white',

  separatorUnFinishedColor: '#ddd',
  stepIndicatorUnFinishedColor: '#ddd',
  stepIndicatorLabelUnFinishedColor: 'white',
};

const labels = ['Basic Details', 'Education', 'Employment', 'Key Skills'];

const BasicDetails = ({ navigation }) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [HigherQualification, setHigherQualification] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [country, setCountry] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var {
    title,
    gender,
    website,
    bio,
    marital_status,
    birth_date,
    experience_id,
    education_id,
    candidate_educations,
    social_links,
    token,
  } = userData;

  // console.log("userData =============== : ",userData);

  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });

  const [selectBasic, setSelectBasic] = useState({
    professional_title: title || '',
    personal_website: website || '',
    dob: birth_date ? new Date(birth_date) : new Date(),
    // dob: new Date(birth_date) || new Date(),
    qualify: education_id || 0,
    work_experiance:
      selectBasic?.work_experiance != 'fresher'
        ? 'experienced'
        : 'fresher' || '',
    experience: experience_id || '',
    current_ctc: '',
    expected_ctc: '',
    gender: gender || '',
    city: {},
    marital_status: marital_status || '',
    biography: bio || '',
    profession: {},
    availability: {},
    social_profile:
      social_links?.length > 0 ? social_links : [{ url: '', social_media: '' }],
  });

  // console.log("DATE OFFFFFFFFF ============ :", new Date());

  const [periorExperience] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);
  const [genderData] = useState([
    { id: 1, title: 'Male', value: 'male' },
    { id: 2, title: 'Female', value: 'female' },
    { id: 3, title: 'Other', value: 'other' },
  ]);
  const [maritalStatusData] = useState([
    { id: 1, title: 'Single', value: 'single' },
    { id: 2, title: 'Married', value: 'married' },
  ]);

  const [socialData] = useState([
    {
      id: 1,
      icon: 'facebook',
    },
    {
      id: 2,
      icon: 'instagram',
    },
    {
      id: 3,
      icon: 'linkedin-square',
    },
  ]);

  const renderItem = item => {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FIcon name={item?.icon} size={18} color={Color.black} />
      </View>
    );
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    setSelectBasic(prevState => ({
      ...prevState,
      dob: date,
    }));
    hideDatePicker();
  };

  const addProfile = () => {
    const newId = selectBasic?.social_profile.length + 1;
    setSelectBasic({
      professional_title: selectBasic?.professional_title,
      personal_website: selectBasic?.personal_website,
      dob: selectBasic?.dob,
      qualify: selectBasic?.qualify,
      work_experiance: selectBasic?.work_experiance,
      experience: selectBasic?.experience,
      current_ctc: selectBasic?.current_ctc,
      expected_ctc: selectBasic?.expected_ctc,
      gender: selectBasic?.gender,
      city: selectBasic?.city,
      marital_status: selectBasic?.marital_status,
      biography: selectBasic?.biography,
      profession: selectBasic?.profession,
      availability: selectBasic?.availability,
      social_profile: [
        ...selectBasic?.social_profile,
        { id: newId, social_profile: '', selectedIcon: '' },
      ],
    });
  };

  const getAPiData = async () => {
    try {
      var data = {
        title: selectBasic?.professional_title,
        website: selectBasic?.personal_website,
        birth_date: moment(selectBasic?.dob).format('YYYY-MM-DD'),
        gender: selectBasic?.gender,
        marital_status: selectBasic?.marital_status,
        sociallink: selectBasic?.social_profile,
        bio: selectBasic?.biography,
        place: searchLocation,
        exact_location: searchLocation,
        district: searchLocation,
        country: country,
        // available_in: selectBasic?.availability?.name,
        education_id: selectBasic?.qualify,
        experience_id: selectBasic?.experience,
        // profession_id: selectBasic?.profession?.profession_id,
      };
      if (
        selectBasic?.gender?.length != 0 &&
        selectBasic?.marital_status?.length != 0
      ) {
        const intro_data = await fetchData.candidates_profile(data, token);
        if (intro_data) {
          common_fn.showToast(intro_data?.message);
          if (candidate_educations?.length > 0) {
            navigation.navigate('StepEducation');
          } else {
            navigation.navigate('Education', { item: {} });
          }
        } else {
          common_fn.showToast(intro_data?.message);
        }
      } else {
        common_fn.showToast('Please Select the fields');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, [HigherQualification, experienceData]);

  const getData = async () => {
    try {
      //get higher qualification
      const qualification = await fetchData.get_education(null, token);
      setHigherQualification(qualification?.data);
      //Experience
      const experience_data = await fetchData.get_experience(null, token);
      setExperienceData(experience_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSuggestions = async text => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&city=${text}`,
      );
      setLocationSuggestion({
        data: response?.data,
        visible: true,
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={0}
        stepCount={4}
        labels={labels}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Professional Title/Tagline
            </Text>
            <TextInput
              placeholder="Enter Your Title"
              placeholderTextColor={Color.cloudyGrey}
              value={selectBasic?.professional_title}
              onChangeText={text => {
                setSelectBasic({
                  professional_title: text,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  current_ctc: selectBasic?.current_ctc,
                  expected_ctc: selectBasic?.expected_ctc,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: selectBasic?.profession,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
              style={{
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                }}>
                Personal Website
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                }}>
                {' '}
                (optional)
              </Text>
            </View>
            <TextInput
              placeholder="Enter Your Website Link"
              placeholderTextColor={Color.cloudyGrey}
              value={selectBasic?.personal_website}
              onChangeText={text => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: text,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  current_ctc: selectBasic?.current_ctc,
                  expected_ctc: selectBasic?.expected_ctc,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: selectBasic?.profession,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
              style={{
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Date Of Birth
            </Text>
            <TouchableOpacity
              onPress={() => showDatePicker()}
              style={{
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 20,
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                }}>
                {common_fn.isSameDay(selectBasic?.dob, new Date())
                  ? 'Select Your DOB'
                  : moment(selectBasic?.dob).format('DD-MM-YYYY')}
              </Text>
              <FIcon name="calendar" size={20} color={Color.black} />
            </TouchableOpacity>
            <DateTimePickerModal
              date={selectBasic?.dob}
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Current City
            </Text>
            <Searchbar
              placeholder="Search Location"
              placeholderTextColor={Color.grey}
              style={styles.searchView}
              value={searchLocation}
              icon={() => (
                <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
              )}
              iconColor={Color.grey}
              inputStyle={{ color: Color.black }}
              onChangeText={search => {
                setSearchLocation(search);
                fetchSuggestions(search);
              }}
            />
            {LocationSuggestion?.data?.length != 0 && (
              <View
                style={{
                  maxHeight: 200,
                  padding: 10,
                  backgroundColor: Color.white,
                  elevation: 3,
                  borderRadius: 5,
                  marginTop: 5,
                }}>
                {LocationSuggestion?.data?.map((item, index) => {
                  // console.log("SEARCH ==============  :",item);
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSearchLocation(item?.display_name?.split(',')[0]);
                        setCountry(item?.displayName.split(',').pop().trim());
                        setLocationSuggestion({
                          data: [],
                          visible: false,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: Gilmer.Medium,
                          color: Color.black,
                        }}>
                        {item?.display_name?.split(',')[0]}
                      </Text>
                      {index < LocationSuggestion?.data.length - 1 && (
                        <Divider style={{ height: 1, marginVertical: 5 }} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginVertical: 10,
              }}>
              Higher Qualification
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {HigherQualification?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectBasic?.qualify == item?.education_id
                          ? '#9DCBE2'
                          : Color.white,
                      // width: 150,
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      marginVertical: 10,
                      justifyContent: 'center',
                      borderRadius: 50,
                      marginHorizontal: 5,
                      borderWidth: 1,
                      borderColor:
                        selectBasic?.qualify == item?.education_id
                          ? '#9DCBE2'
                          : Color.cloudyGrey,
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: item?.education_id,
                        work_experiance: selectBasic?.work_experiance,
                        experience: selectBasic?.experience,
                        current_ctc: selectBasic?.current_ctc,
                        expected_ctc: selectBasic?.expected_ctc,
                        gender: selectBasic?.gender,
                        city: selectBasic?.city,
                        marital_status: selectBasic?.marital_status,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: selectBasic?.social_profile,
                      });
                    }}>
                    <Text
                      style={{
                        fontFamily: Gilmer.Bold,
                        fontSize: 14,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 5,
                        marginVertical: 10,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              prior work experience
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {periorExperience.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectBasic?.work_experiance == item?.value
                          ? '#9DCBE2'
                          : Color.white,
                      // width: 150,
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      marginVertical: 10,
                      justifyContent: 'center',
                      borderRadius: 50,
                      marginHorizontal: 5,
                      borderWidth: 1,
                      borderColor:
                        selectBasic?.work_experiance == item?.value
                          ? '#9DCBE2'
                          : Color.cloudyGrey,
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: item?.value,
                        experience: selectBasic?.experience,
                        current_ctc: selectBasic?.current_ctc,
                        expected_ctc: selectBasic?.expected_ctc,
                        gender: selectBasic?.gender,
                        city: selectBasic?.city,
                        marital_status: selectBasic?.marital_status,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: selectBasic?.social_profile,
                      });
                    }}>
                    <Text
                      style={{
                        fontFamily: Gilmer.Bold,
                        fontSize: 14,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 5,
                        marginVertical: 10,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectBasic?.work_experiance != 'fresher' && (
              // <TextInput
              //   placeholder="Enter Your Experience Level"
              //   placeholderTextColor={Color.cloudyGrey}
              //   value={selectBasic?.work_experiance}
              //   onChangeText={text => {
              //   }}
              //   style={{
              //     borderColor: Color.cloudyGrey,
              //     borderWidth: 1,
              //     borderRadius: 5,
              //     marginVertical: 10,
              //     paddingHorizontal: 10,
              //     fontSize: 14,
              //     color: Color.cloudyGrey,
              //     fontWeight: 'bold',
              //   }}
              // />
              <Dropdown
                style={[styles.dropdown, { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={experienceData}
                search
                maxHeight={300}
                labelField="name"
                valueField="experience_id"
                placeholder={'Select item'}
                searchPlaceholder="Search..."
                value={selectBasic?.experience}
                onChange={item => {
                  setSelectBasic({
                    professional_title: selectBasic?.professional_title,
                    personal_website: selectBasic?.personal_website,
                    dob: selectBasic?.dob,
                    qualify: selectBasic?.qualify,
                    work_experiance: selectBasic?.work_experiance,
                    experience: item?.experience_id,
                    current_ctc: selectBasic?.current_ctc,
                    expected_ctc: selectBasic?.expected_ctc,
                    gender: selectBasic?.gender,
                    city: selectBasic?.city,
                    marital_status: selectBasic?.marital_status,
                    biography: selectBasic?.biography,
                    profession: selectBasic?.profession,
                    availability: selectBasic?.availability,
                    social_profile: selectBasic?.social_profile,
                  });
                }}
              />
            )}
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Your Current CTC
            </Text>
            <TextInput
              placeholder="Enter Your Current CTC"
              placeholderTextColor={Color.cloudyGrey}
              value={selectBasic?.current_ctc}
              onChangeText={text => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  current_ctc: text,
                  expected_ctc: selectBasic?.expected_ctc,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: selectBasic?.profession,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
              style={{
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Your Expected CTC
            </Text>
            <TextInput
              placeholder="Enter Your Expected CTC"
              placeholderTextColor={Color.cloudyGrey}
              value={selectBasic?.expected_ctc}
              onChangeText={text => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  current_ctc: selectBasic?.current_ctc,
                  expected_ctc: text,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: selectBasic?.profession,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
              style={{
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Gender
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {genderData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}
                    onPress={() => {
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: selectBasic?.work_experiance,
                        experience: selectBasic?.experience,
                        current_ctc: selectBasic?.current_ctc,
                        expected_ctc: selectBasic?.expected_ctc,
                        gender: item?.value,
                        city: selectBasic?.city,
                        marital_status: selectBasic?.marital_status,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: selectBasic?.social_profile,
                      });
                    }}>
                    <Icon
                      name={
                        selectBasic?.gender === item.value
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        selectBasic?.gender === item.value
                          ? Color.primary
                          : Color.black
                      }
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.SemiBold,
                        marginHorizontal: 5,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Marital Status
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {maritalStatusData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}
                    onPress={() => {
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: selectBasic?.work_experiance,
                        experience: selectBasic?.experience,
                        current_ctc: selectBasic?.current_ctc,
                        expected_ctc: selectBasic?.expected_ctc,
                        gender: selectBasic?.gender,
                        city: selectBasic?.city,
                        marital_status: item?.value,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: selectBasic?.social_profile,
                      });
                    }}>
                    <Icon
                      name={
                        selectBasic?.marital_status === item?.value
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        selectBasic?.marital_status === item.value
                          ? Color.primary
                          : Color.black
                      }
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.SemiBold,
                        marginHorizontal: 5,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Biography
            </Text>
            <TextInput
              placeholder="Enter Your Biography Details"
              placeholderTextColor={Color.cloudyGrey}
              value={selectBasic?.biography}
              onChangeText={text => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  current_ctc: selectBasic?.current_ctc,
                  expected_ctc: selectBasic?.expected_ctc,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: text,
                  profession: selectBasic?.profession,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
              style={{
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontWeight: 'bold',
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Social Profile
            </Text>
            {selectBasic?.social_profile?.map((profile, index) => (
              <View key={profile.id} style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}>
                  Social Profile {index + 1}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Dropdown
                    style={{
                      height: 50,
                      width: 100,
                      borderColor: 'gray',
                      borderWidth: 0.5,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={socialData}
                    maxHeight={300}
                    placeholder="icon"
                    labelField="icon"
                    value={profile.social_media}
                    valueField="icon"
                    onChange={item => {
                      const updatedProfiles = [...selectBasic?.social_profile];
                      updatedProfiles[index].social_media = item?.icon;
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: selectBasic?.work_experiance,
                        experience: selectBasic?.experience,
                        current_ctc: selectBasic?.current_ctc,
                        expected_ctc: selectBasic?.expected_ctc,
                        gender: selectBasic?.gender,
                        city: selectBasic?.city,
                        marital_status: selectBasic?.marital_status,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: updatedProfiles,
                      });
                    }}
                    renderItem={renderItem}
                  />
                  <TextInput
                    placeholder="Enter Your Social Profile Link"
                    placeholderTextColor={Color.cloudyGrey}
                    value={profile.url}
                    onChangeText={text => {
                      const updatedProfiles = [...selectBasic?.social_profile];
                      updatedProfiles[index].url = text;
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: selectBasic?.work_experiance,
                        experience: selectBasic?.experience,
                        current_ctc: selectBasic?.current_ctc,
                        expected_ctc: selectBasic?.expected_ctc,
                        gender: selectBasic?.gender,
                        city: selectBasic?.city,
                        marital_status: selectBasic?.marital_status,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: updatedProfiles,
                      });
                    }}
                    style={{
                      flex: 1,
                      borderColor: Color.cloudyGrey,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={addProfile}>
              <Text
                style={{
                  fontFamily: Gilmer.Bold,
                  fontSize: 16,
                  color: Color.primary,
                }}>
                + Add More Social Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            getAPiData();
          }}
          style={{
            backgroundColor: Color.primary,
            height: 45,
            marginBottom: 10,
          }}
          labelStyle={{
            fontSize: 18,
          }}
          textColor={Color.white}>
          Continue
        </Button>
      </ScrollView>
    </View>
  );
};

export default BasicDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Color.black,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Color.cloudyGrey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Color.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Color.black,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginTop: 10,
  },
});
