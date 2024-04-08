import React, {useState} from 'react';
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
import {Gilmer} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';

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

const BasicDetails = ({navigation}) => {
  const [HigherQualification] = useState([
    {
      id: 1,
      name: '10th Or Below',
    },
    {
      id: 2,
      name: '12th Pass',
    },
    {
      id: 3,
      name: 'Diploma',
    },
    {
      id: 4,
      name: 'Graduate',
    },
    {
      id: 5,
      name: 'Post Graduate',
    },
  ]);
  const [selectBasic, setSelectBasic] = useState({
    professional_title: '',
    personal_website: '',
    dob: new Date(),
    qualify: {},
    work_experiance: {},
    gender: {},
    marital_status: {},
    biography: '',
    profession: {},
    availability: {},
    social_profile: [{id: 1, social_profile: '', selectedIcon: ''}],
  });
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
    {id: 1, title: 'Male', value: 'male'},
    {id: 2, title: 'Female', value: 'female'},
    {id: 3, title: 'Other', value: 'other'},
  ]);
  const [maritalStatus] = useState([
    {id: 1, title: 'Single', value: 'single'},
    {id: 2, title: 'Married', value: 'married'},
  ]);
  const [SkillsData] = useState([
    {
      id: 1,
      name: 'React Native',
    },
    {
      id: 2,
      name: 'Ui/UX designer',
    },
    {
      id: 3,
      name: 'Figma',
    },
    {
      id: 4,
      name: 'Node js',
    },
    {
      id: 5,
      name: 'Java',
    },
    {
      id: 6,
      name: 'Dart',
    },
    {
      id: 7,
      name: 'Mobile Application Developer',
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
      name: 'React Native',
    },
    {
      id: 2,
      name: 'Ui/UX designer',
    },
    {
      id: 3,
      name: 'Figma',
    },
    {
      id: 4,
      name: 'Node js',
    },
    {
      id: 5,
      name: 'Java',
    },
    {
      id: 6,
      name: 'Dart',
    },
    {
      id: 7,
      name: 'Mobile Application Developer',
    },
  ]);
  const [SkillsSelectedItem, setSkillsSelectedItem] = useState([]);
  const handleSkillsPress = itemId => {
    if (SkillsSelectedItem.includes(itemId)) {
      setSkillsSelectedItem(
        SkillsSelectedItem?.filter(single => single !== itemId),
      );
      setSelectBasic({
        professional_title: selectBasic?.professional_title,
        personal_website: selectBasic?.personal_website,
        dob: selectBasic?.dob,
        qualify: selectBasic?.qualify,
        work_experiance: selectBasic?.work_experiance,
        gender: selectBasic?.gender,
        marital_status: selectBasic?.marital_status,
        biography: selectBasic?.biography,
        profession: selectBasic?.profession?.filter(
          single => single.id !== itemId,
        ),
        availability: selectBasic?.availability,
        social_profile: selectBasic?.social_profile,
      });
    } else {
      setSkillsSelectedItem([...SkillsSelectedItem, itemId]);
      const selectedItemData = SkillsData.find(single => single.id === itemId);
      setSelectBasic({
        professional_title: selectBasic?.professional_title,
        personal_website: selectBasic?.personal_website,
        dob: selectBasic?.personal_website,
        qualify: selectBasic?.personal_website,
        work_experiance: selectBasic?.personal_website,
        gender: selectBasic?.personal_website,
        marital_status: selectBasic?.personal_website,
        biography: selectBasic?.personal_website,
        profession: [...selectBasic?.profession, selectedItemData],
        availability: selectBasic?.personal_website,
        social_profile: selectBasic?.personal_website,
      });
    }
  };
  const [availabilitySelectedItem, setAvailabilitySelectedItem] = useState([]);
  const handleAvailabilityPress = itemId => {
    if (availabilitySelectedItem.includes(itemId)) {
      setAvailabilitySelectedItem(
        availabilitySelectedItem?.filter(single => single !== itemId),
      );
      setSelectBasic({
        professional_title: selectBasic?.professional_title,
        personal_website: selectBasic?.personal_website,
        dob: selectBasic?.dob,
        qualify: selectBasic?.qualify,
        work_experiance: selectBasic?.work_experiance,
        gender: selectBasic?.gender,
        marital_status: selectBasic?.marital_status,
        biography: selectBasic?.biography,
        profession: selectBasic?.profession,
        availability: selectBasic?.availability?.filter(
          single => single.id !== itemId,
        ),
        social_profile: selectBasic?.social_profile,
      });
    } else {
      setAvailabilitySelectedItem([...availabilitySelectedItem, itemId]);
      const selectedItemData = AvailableData.find(
        single => single.id === itemId,
      );
      setSelectBasic({
        professional_title: selectBasic?.professional_title,
        personal_website: selectBasic?.personal_website,
        dob: selectBasic?.dob,
        qualify: selectBasic?.qualify,
        work_experiance: selectBasic?.work_experiance,
        gender: selectBasic?.gender,
        marital_status: selectBasic?.marital_status,
        biography: selectBasic?.biography,
        profession: selectBasic?.profession,
        availability: [...selectBasic?.availability, selectedItemData],
        social_profile: selectBasic?.social_profile,
      });
    }
  };
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
      gender: selectBasic?.gender,
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
      gender: selectBasic?.gender,
      marital_status: selectBasic?.marital_status,
      biography: selectBasic?.biography,
      profession: selectBasic?.profession,
      availability: selectBasic?.availability,
      social_profile: [
        ...selectBasic?.social_profile,
        {id: newId, social_profile: '', selectedIcon: ''},
      ],
    });
  };

  const getAPI = async () => {
    try {
      var data = {};
      const basic_data = await fetchData.candidates_profile(data);
      if (basic_data) {
        navigation.navigate('Education');
      } else {
        common_fn.showToast(basic_data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={0}
        stepCount={4}
        labels={labels}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{marginVertical: 10}}>
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
                  gender: selectBasic?.gender,
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
          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  gender: selectBasic?.gender,
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
          <View style={{marginVertical: 10}}>
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
                {selectBasic?.dob?.toLocaleDateString()}
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
          <View style={{marginVertical: 10}}>
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
              {HigherQualification.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectBasic?.qualify?.id == item?.id
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
                        selectBasic?.qualify?.id == item?.id
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
                        gender: selectBasic?.gender,
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
          <View style={{marginVertical: 10}}>
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
                        gender: selectBasic?.gender,
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
            <TextInput
              placeholder="Enter Your Experience Level"
              placeholderTextColor={Color.cloudyGrey}
              value={selectBasic?.work_experiance}
              onChangeText={text => {
                setSelectBasic({
                  professional_title: selectBasic?.professional_title,
                  personal_website: selectBasic?.personal_website,
                  dob: selectBasic?.dob,
                  qualify: selectBasic?.qualify,
                  work_experiance: item,
                  gender: selectBasic?.gender,
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
                fontWeight: 'bold',
              }}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Gender
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        gender: item,
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
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Marital Status
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {maritalStatus.map((item, index) => {
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
                        gender: selectBasic?.gender,
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
          <View style={{marginVertical: 10}}>
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
                  gender: selectBasic?.gender,
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
          <View style={{marginVertical: 10}}>
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
              style={[styles.dropdown, {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={SkillsData}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              //   value={value}
              onChange={item => {
                handleSkillsPress(item?.id);
              }}
            />
          </View>
          <View style={{marginVertical: 10}}>
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
              //   value={value}
              onChange={item => {
                handleAvailabilityPress(item?.id);
              }}
            />
          </View>
          <View style={{marginVertical: 10}}>
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
              <View key={profile.id} style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}>
                  Social Profile {index + 1}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    value={profile.selectedIcon}
                    valueField="icon"
                    onChange={item => {
                      const updatedProfiles = [...selectBasic?.social_profile];
                      updatedProfiles[index].selectedIcon = item;
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: selectBasic?.work_experiance,
                        gender: selectBasic?.gender,
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
                    value={profile.social_profile}
                    onChangeText={text => {
                      const updatedProfiles = [...selectBasic?.social_profile];
                      updatedProfiles[index].social_profile = text;
                      setSelectBasic({
                        professional_title: selectBasic?.professional_title,
                        personal_website: selectBasic?.personal_website,
                        dob: selectBasic?.dob,
                        qualify: selectBasic?.qualify,
                        work_experiance: selectBasic?.work_experiance,
                        gender: selectBasic?.gender,
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
            getAPI();
          }}
          style={{
            backgroundColor: Color.primary,
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
