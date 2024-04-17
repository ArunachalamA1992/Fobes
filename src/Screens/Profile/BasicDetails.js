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
import { Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

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
  const userData = useSelector(state => state.UserReducer.userData);
  var {
    title,
    firstName,
    lastName,
    gender,
    website,
    photo,
    cv,
    bio,
    maritalStatus,
    birthDate,
    visibility,
    cvVisibility,
    receivedJobAlert,
    profileComplete,
    candidateUpdatedAt,
    address,
    exactLocation,
    neighborhood,
    locality,
    place,
    district,
    postcode,
    region,
    country,
    long,
    lat,
    status,
    availableIn,
    whatsappNumber,
    name,
    username,
    email,
    image,
    role,
    recentActivitiesAlert,
    jobExpiredAlert,
    newJobAlert,
    shortlistedAlert,
    isDemoField,
    createdAt,
    updatedAt,
    authType,
    googleId,
    facebookId,
    provider,
    providerId,
    candidateEducations,
    candidateExperiences,
    candidateSkills,
    socialLinks,
    token,
  } = userData;
  const [HigherQualification, setHigherQualification] = useState([]);
  const [selectBasic, setSelectBasic] = useState({
    professional_title: '',
    personal_website: '',
    dob: new Date(),
    qualify: {},
    work_experiance: {},
    experience: {},
    gender: {},
    city: {},
    marital_status: {},
    biography: '',
    profession: {},
    availability: {},
    social_profile: [{ url: '', social_media: '' }],
  });
  const [experienceData, setExperienceData] = useState([
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
  const [ProfessionData] = useState([
    {
      name: 'Mobile Developer',
      profession_id: 1,
    },
    {
      name: 'Web Developer',
      profession_id: 2,
    },
    {
      name: 'Web Designer',
      profession_id: 3,
    },
    {
      name: 'Figma Designer',
      profession_id: 4,
    },
    {
      name: 'Php Developer',
      profession_id: 5,
    },
    {
      name: 'Team Leader',
      profession_id: 6,
    },
  ]);
  const [CityData] = useState([
    {
      id: 1,
      city: 'Salem',
      value: 'Salem',
    },
    {
      id: 2,
      city: 'Coimbatore',
      value: 'Coimbatore',
    },
    {
      id: 3,
      city: 'Trichy',
      value: 'Trichy',
    },
    {
      id: 4,
      city: 'Bangalore',
      value: 'Bangalore',
    },
    {
      id: 5,
      city: 'Chennai',
      value: 'Chennai',
    },
    {
      id: 6,
      city: 'Bangalore',
      value: 'Bangalore',
    },
    {
      id: 7,
      city: 'Hyderabad',
      value: 'Hyderabad',
    },
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
  const [AvailableData] = useState([
    {
      id: 1,
      name: '15 Days',
      value: '15 Days',
    },
    {
      id: 2,
      name: '1 Month',
      value: '1_month',
    },
    {
      id: 3,
      name: '2 Month',
      value: '2_month',
    },
    {
      id: 4,
      name: '3 Month',
      value: '3_month',
    },
    {
      id: 5,
      name: '4 Month',
      value: '4_month',
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

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    setSelectBasic({
      professional_title: selectBasic?.professional_title,
      personal_website: selectBasic?.personal_website,
      dob: date,
      qualify: selectBasic?.qualify,
      work_experiance: selectBasic?.work_experiance,
      experience: selectBasic?.experience,
      gender: selectBasic?.gender,
      city: selectBasic?.city,
      marital_status: selectBasic?.marital_status,
      biography: selectBasic?.biography,
      profession: selectBasic?.profession,
      availability: selectBasic?.availability,
      social_profile: selectBasic?.social_profile,
    });
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
      console.log("clicked  ");
      var data = {
        title: selectBasic?.professional_title,
        website: selectBasic?.personal_website,
        birth_date: moment(selectBasic?.dob).format('YYYY-MM-DD'),
        gender: selectBasic?.gender?.value,
        marital_status: selectBasic?.marital_status?.value,
        sociallink: selectBasic?.social_profile,
        bio: selectBasic?.biography,
        // available_in: selectBasic?.availability?.name,
        education_id: selectBasic?.qualify?.education_id,
        experience_id: selectBasic?.experience?.experience_id,
        // profession_id: selectBasic?.profession?.profession_id,
      };
      const intro_data = await fetchData.candidates_profile(data, token);
      console.log("kdgfnklsdkgfkdll  ", JSON.stringify(intro_data));
      if (intro_data) {
        common_fn.showToast(intro_data?.message);
        navigation.navigate('Education', { item: {} });
      } else {
        common_fn.showToast(intro_data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, [HigherQualification]);

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
                {moment(selectBasic?.dob).format('YYYY-MM-DD')}
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
            <Dropdown
              style={[styles.dropdown, { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={CityData}
              search
              maxHeight={300}
              labelField="city"
              valueField="city"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={selectBasic?.city?.value}
              onChange={item => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  gender: selectBasic?.gender,
                  city: item,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: selectBasic?.profession,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
            />
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
                        selectBasic?.qualify?.education_id == item?.education_id
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
                        selectBasic?.qualify?.education_id == item?.education_id
                          ? '#9DCBE2'
                          : Color.cloudyGrey,
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: item,
                        work_experiance: selectBasic?.work_experiance,
                        experience: selectBasic?.experience,
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
                        selectBasic?.work_experiance?.id == item?.id
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
                        selectBasic?.work_experiance?.id == item?.id
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
                        work_experiance: item,
                        experience: selectBasic?.experience,
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
            {selectBasic?.work_experiance?.value == 'experienced' && (
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
                valueField="name"
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
                    experience: item,
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
                        gender: item,
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
                        selectBasic?.gender?.id === item.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        selectBasic?.gender?.id === item.id
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
                        gender: selectBasic?.gender,
                        city: selectBasic?.city,
                        marital_status: item,
                        biography: selectBasic?.biography,
                        profession: selectBasic?.profession,
                        availability: selectBasic?.availability,
                        social_profile: selectBasic?.social_profile,
                      });
                    }}>
                    <Icon
                      name={
                        selectBasic?.marital_status?.id === item.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        selectBasic?.marital_status?.id === item.id
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
              Profession
            </Text>
            <Dropdown
              style={[styles.dropdown, { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={ProfessionData}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={selectBasic?.profession}
              onChange={item => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: item,
                  availability: selectBasic?.availability,
                  social_profile: selectBasic?.social_profile,
                });
              }}
            />
          </View>
          {/* <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Your availability
            </Text>
            <Dropdown
              style={[styles.dropdown, {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={AvailableData}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Available'}
              searchPlaceholder="Search..."
              value={selectBasic?.availability}
              onChange={item => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: selectBasic?.work_experiance,
                  experience: selectBasic?.experience,
                  gender: selectBasic?.gender,
                  city: selectBasic?.city,
                  marital_status: selectBasic?.marital_status,
                  biography: selectBasic?.biography,
                  profession: selectBasic?.profession,
                  availability: item,
                  social_profile: selectBasic?.social_profile,
                });
              }}
            />
          </View> */}
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
            backgroundColor: Color.primary, height: 45, marginBottom: 10
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
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
