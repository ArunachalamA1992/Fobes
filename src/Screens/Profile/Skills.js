import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Gilmer} from '../../Global/FontFamily';
import {Dropdown} from 'react-native-element-dropdown';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setCompleteProfile} from '../../Redux';
import StepIndicator from 'react-native-step-indicator';
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

const SkillScreen = ({navigation}) => {
  const [SkillsData, setSkillsData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token, candidate_skills, candidate_language} = userData;
  const dispatch = useDispatch();
  const profile_complete = useSelector(
    state => state.UserReducer.profile_complete,
  );
  var {resume, details, skills} = profile_complete;
  const [selectedSkill, setSelectedSkill] = useState(
    candidate_skills?.length > 0 ? candidate_skills : [],
  );

  const handleSkillsPress = itemId => {
    const existingSkillIndex = selectedSkill.findIndex(
      single => single.skill_id === itemId,
    );
    if (existingSkillIndex !== -1) {
      const updatedSelectedSkill = [...selectedSkill];
      updatedSelectedSkill.splice(existingSkillIndex, 1);
      setSelectedSkill(updatedSelectedSkill);
    } else {
      const selectedItemData = SkillsData.find(
        single => single.skill_id === itemId,
      );
      setSelectedSkill([...selectedSkill, selectedItemData]);
    }
  };

  const [languageselect, setLanguageselect] = useState(
    candidate_language?.length > 0 ? candidate_language : [],
  );
  const [languagesData, setLanguagesData] = useState([]);

  const handleLanguagePress = name => {
    const existingLanguage = languageselect.find(
      language => language.name === name,
    );

    if (existingLanguage) {
      const updatedLanguages = languageselect.filter(
        language => language.name !== name,
      );
      setLanguageselect(updatedLanguages);
    } else {
      const selectedItemData = languagesData.find(
        language => language.name === name,
      );
      setLanguageselect([...languageselect, selectedItemData]);
    }
  };

  const dataPayload = () => {
    try {
      const skillsPayload = selectedSkill.map(item => {
        const existingSkill = candidate_skills.find(
          skillItem => item?.name === skillItem?.name,
        );
        return existingSkill
          ? existingSkill
          : item?.skill_id
          ? {name: item?.name || item?.name, skill_id: item?.skill_id}
          : {name: item?.name || item?.name};
      });
      const languagePayload = languageselect.map(item => {
        const existinglanguage = candidate_language.find(
          languageItem => item?.name === languageItem?.name,
        );
        return existinglanguage
          ? existinglanguage
          : {candidate_language_id: item?.id || item?.id};
      });
      return {skills: skillsPayload, languages: languagePayload};
    } catch (error) {
      console.log('error', error);
      return {skills: []};
    }
  };

  const getAPI = async () => {
    try {
      var data = dataPayload();
      const skills_data = await fetchData.candidates_profile(data, token);
      if (skills_data) {
        dispatch(
          setCompleteProfile({
            resume: resume,
            skills: selectedSkill,
            details: details,
          }),
        );
        common_fn.showToast(skills_data?.message);
        navigation.navigate('TabNavigator');
      } else {
        common_fn.showToast(skills_data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // Skills
      const skills_data = await fetchData.list_skills(null, token);
      setSkillsData(skills_data?.data);
      // Languages
      const languages_data = await fetchData.list_language(null, token);
      setLanguagesData(languages_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={3}
        stepCount={4}
        labels={labels}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Skills you have
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
            placeholder={'Enter Your Job Title'}
            searchPlaceholder="Search..."
            onChange={item => {
              handleSkillsPress(item?.skill_id);
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FIcon name={'star'} size={16} color={'#FAE52F'} />
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 5,
                marginVertical: 10,
              }}>
              Add 4 to 6 Skills to get best job recommednations
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderWidth: 1,
            borderColor: Color.cloudyGrey,
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          {selectedSkill?.length == 0 ? (
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 5,
                fontFamily: Gilmer.SemiBold,
                lineHeight: 20,
              }}>
              To receive the best employment recommendations, add four to six
              skills.
            </Text>
          ) : (
            selectedSkill?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#9DCBE2',
                    paddingHorizontal: 10,
                    padding: 10,
                    borderRadius: 50,
                    marginRight: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      marginHorizontal: 5,
                      fontFamily: Gilmer.SemiBold,
                    }}>
                    {item?.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleSkillsPress(item?.skill_id);
                    }}>
                    <FIcon name={'close'} size={16} color={Color.primary} />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
        {/* <View
          style={{
            marginVertical: 10,
            backgroundColor: Color.white,
            paddingEnd: 10,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.black,
              fontWeight: 'bold',
              marginHorizontal: 5,
            }}>
            Select the Suggested skills based on your education
          </Text>
          {SkillsData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: SkillsSelectedItem.includes(item.id)
                    ? '#9DCBE2'
                    : Color.white,
                  // width: width / 3.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  // height: 60,
                  padding: 10,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderColor: SkillsSelectedItem.includes(item.id)
                    ? Color.primary
                    : Color.lightgrey,
                  borderWidth: 1,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  handleSkillsPress(item?.id);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontWeight: 'bold',
                    marginHorizontal: 5,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View> */}
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: Color.black,
              fontWeight: 'bold',
              marginHorizontal: 5,
            }}>
            Languages you know
          </Text>
          <Dropdown
            style={[styles.dropdown, {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={languagesData}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={'Enter Your Language'}
            searchPlaceholder="Search..."
            onChange={item => {
              handleLanguagePress(item?.name);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderWidth: 1,
            borderColor: Color.cloudyGrey,
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          {languageselect?.length == 0 ? (
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 5,
                fontFamily: Gilmer.SemiBold,
                lineHeight: 20,
              }}>
              To receive the best employment recommendations, add four to six
              skills.
            </Text>
          ) : (
            languageselect?.map((item, index) => {
              console.log('item?.name', item?.name);
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#9DCBE2',
                    paddingHorizontal: 10,
                    padding: 10,
                    borderRadius: 50,
                    marginRight: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      marginHorizontal: 5,
                      fontFamily: Gilmer.SemiBold,
                    }}>
                    {item?.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleLanguagePress(item?.name);
                    }}>
                    <FIcon name={'close'} size={16} color={Color.primary} />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
        <Button
          mode="contained"
          onPress={() => {
            getAPI();
          }}
          style={{
            backgroundColor: Color.primary,
            marginVertical: 10,
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

export default SkillScreen;

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
    marginVertical: 10,
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
    color: Color.black,
  },
});
