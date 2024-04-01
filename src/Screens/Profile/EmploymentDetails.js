import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import StepIndicator from 'react-native-step-indicator';
import {Poppins} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';

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

const labels = ['Education', 'Employment', 'Key Skills'];

const EmploymentDetails = ({navigation}) => {
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
  const [notice_period] = useState([
    {
      id: 1,
      name: '15 Days or Less',
      value: '15_days_or_less',
    },
    {
      id: 2,
      name: '1 Month',
      value: '1_month',
    },
    {
      id: 2,
      name: '2 Months',
      value: '2_month',
    },
    {
      id: 2,
      name: '3 Months',
      value: '3_month',
    },
    {
      id: 2,
      name: 'more than 3 months',
      value: 'more_than_3_months',
    },
  ]);
  const [employmentType] = useState([
    {
      id: 1,
      name: 'Full - Time',
      value: 'full_time',
    },
    {
      id: 2,
      name: 'Part Time',
      value: 'part_time',
    },
  ]);
  const [radioData] = useState([
    {id: 1, title: 'Yes', value: 'Yes'},
    {id: 2, title: 'No', value: 'No'},
  ]);
  const [selectEmployment, setSelectEmployment] = useState({
    work_experiance: {},
    current_work: {},
    emp_type: {},
    job_title: '',
    company_name: '',
    duration: {
      from: '',
      end: '',
    },
    current_ctc: '',
    notice_period: {},
  });
  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Color.white}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={1}
        stepCount={3}
        labels={labels}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Poppins.Bold,
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
                      selectEmployment?.work_experiance?.id == item?.id
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
                      selectEmployment?.work_experiance?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setSelectEmployment({
                      work_experiance: item,
                      current_work: selectEmployment?.current_work,
                      emp_type: selectEmployment?.emp_type,
                      job_title: selectEmployment?.job_title,
                      company_name: selectEmployment?.company_name,
                      duration: {
                        from: selectEmployment?.duration?.from,
                        end: selectEmployment?.duration?.end,
                      },
                      current_ctc: selectEmployment?.current_ctc,
                      notice_period: selectEmployment?.notice_period,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
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
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Employment Details
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Poppins.SemiBold,
              marginVertical: 10,
            }}>
            Are You Currently Working?
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {radioData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => {
                    setSelectEmployment({
                      work_experiance: selectEmployment?.work_experiance,
                      current_work: item,
                      emp_type: selectEmployment?.emp_type,
                      job_title: selectEmployment?.job_title,
                      company_name: selectEmployment?.company_name,
                      duration: {
                        from: selectEmployment?.duration?.from,
                        end: selectEmployment?.duration?.end,
                      },
                      current_ctc: selectEmployment?.current_ctc,
                      notice_period: selectEmployment?.notice_period,
                    });
                  }}>
                  <Icon
                    name={
                      selectEmployment?.current_work?.id === item.id
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={20}
                    color={
                      selectEmployment?.current_work?.id === item.id
                        ? Color.primary
                        : Color.black
                    }
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Poppins.SemiBold,
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
              fontFamily: Poppins.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Employment Type
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {employmentType.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      selectEmployment?.emp_type?.id == item?.id
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
                      selectEmployment?.emp_type?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setSelectEmployment({
                      work_experiance: selectEmployment?.work_experiance,
                      current_work: selectEmployment?.current_work,
                      emp_type: item,
                      job_title: selectEmployment?.job_title,
                      company_name: selectEmployment?.company_name,
                      duration: {
                        from: selectEmployment?.duration?.from,
                        end: selectEmployment?.duration?.end,
                      },
                      current_ctc: selectEmployment?.current_ctc,
                      notice_period: selectEmployment?.notice_period,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
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
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Your Job Title
          </Text>
          <TextInput
            placeholder="Enter Your Job Title"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEmployment?.job_title}
            onChangeText={text => {
              setSelectEmployment({
                work_experiance: selectEmployment?.work_experiance,
                current_work: selectEmployment?.current_work,
                emp_type: selectEmployment?.emp_type,
                job_title: text,
                company_name: selectEmployment?.company_name,
                duration: {
                  from: selectEmployment?.duration?.from,
                  end: selectEmployment?.duration?.end,
                },
                current_ctc: selectEmployment?.current_ctc,
                notice_period: selectEmployment?.notice_period,
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
            Your Company Name
          </Text>
          <TextInput
            placeholder="Enter Your Company Name"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEmployment?.company_name}
            onChangeText={text => {
              setSelectEmployment({
                work_experiance: selectEmployment?.work_experiance,
                current_work: selectEmployment?.current_work,
                emp_type: selectEmployment?.emp_type,
                job_title: selectEmployment?.job_title,
                company_name: text,
                duration: {
                  from: selectEmployment?.duration?.from,
                  end: selectEmployment?.duration?.end,
                },
                current_ctc: selectEmployment?.current_ctc,
                notice_period: selectEmployment?.notice_period,
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
            Work Duration
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginVertical: 10, flex: 1}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                From
              </Text>
              <TextInput
                placeholder="Starting Year"
                placeholderTextColor={Color.cloudyGrey}
                value={selectEmployment?.duration?.from}
                onChangeText={text => {
                  setSelectEmployment({
                    work_experiance: selectEmployment?.work_experiance,
                    current_work: selectEmployment?.current_work,
                    emp_type: selectEmployment?.emp_type,
                    job_title: selectEmployment?.job_title,
                    company_name: selectEmployment?.company_name,
                    duration: {
                      from: text,
                      end: selectEmployment?.duration?.end,
                    },
                    current_ctc: selectEmployment?.current_ctc,
                    notice_period: selectEmployment?.notice_period,
                  });
                }}
                style={{
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
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
            <View style={{marginVertical: 10, flex: 1}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                To
              </Text>
              <TextInput
                placeholder="End Year"
                placeholderTextColor={Color.cloudyGrey}
                value={selectEmployment?.duration?.end}
                onChangeText={text => {
                  setSelectEmployment({
                    work_experiance: selectEmployment?.work_experiance,
                    current_work: selectEmployment?.current_work,
                    emp_type: selectEmployment?.emp_type,
                    job_title: selectEmployment?.job_title,
                    company_name: selectEmployment?.company_name,
                    duration: {
                      from: selectEmployment?.duration?.from,
                      end: text,
                    },
                    current_ctc: selectEmployment?.current_ctc,
                    notice_period: selectEmployment?.notice_period,
                  });
                }}
                style={{
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
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
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Current CTC
          </Text>
          <TextInput
            placeholder="Enter Your Current CTC"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEmployment?.company_name}
            onChangeText={text => {
              setSelectEmployment({
                work_experiance: selectEmployment?.work_experiance,
                current_work: selectEmployment?.current_work,
                emp_type: selectEmployment?.emp_type,
                job_title: selectEmployment?.job_title,
                company_name: selectEmployment?.company_name,
                duration: {
                  from: selectEmployment?.duration?.from,
                  end: selectEmployment?.duration?.end,
                },
                current_ctc: text,
                notice_period: selectEmployment?.notice_period,
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
              fontFamily: Poppins.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Notice Period
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {notice_period.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      selectEmployment?.notice_period?.id == item?.id
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
                      selectEmployment?.notice_period?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setSelectEmployment({
                      work_experiance: selectEmployment?.work_experiance,
                      current_work: selectEmployment?.current_work,
                      emp_type: selectEmployment?.emp_type,
                      job_title: selectEmployment?.job_title,
                      company_name: selectEmployment?.company_name,
                      duration: {
                        from: selectEmployment?.duration?.from,
                        end: selectEmployment?.duration?.end,
                      },
                      current_ctc: selectEmployment?.current_ctc,
                      notice_period: item,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
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
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Skill');
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

export default EmploymentDetails;
