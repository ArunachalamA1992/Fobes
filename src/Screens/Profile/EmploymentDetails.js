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
import {Gilmer} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import {useDispatch, useSelector} from 'react-redux';
import FIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const EmploymentDetails = ({navigation, route}) => {
  const [itemData] = useState(route.params.item);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
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
  const [Current_work_RadioData] = useState([
    {id: 1, title: 'Yes', value: 1},
    {id: 2, title: 'No', value: 0},
  ]);
  const [checked, setChecked] = useState(
    itemData && itemData.id !== '' && itemData?.end == null ? true : false,
  );

  const [selectEmployment, setSelectEmployment] = useState({
    work_experiance: {},
    current_work: itemData?.currently_working || 0,
    emp_type: {},
    job_title: itemData?.designation || '',
    company_name: itemData?.company || '',
    duration: {
      from: itemData.start != undefined ? new Date(itemData.start) : new Date(),
      end: itemData.end != undefined ? new Date(itemData.end) : new Date(),
    },
    current_ctc: '',
    notice_period: {},
    department: itemData?.department || '',
    responsibilities: itemData?.responsibilities || '',
  });

  const getAPI = async () => {
    try {
      var data = {
        experience: [
          {
            company: selectEmployment?.company_name,
            department: selectEmployment?.department,
            designation: selectEmployment?.job_title,
            start: moment(selectEmployment?.duration?.from).format(
              'YYYY-MM-DD',
            ),
            end: checked
              ? null
              : moment(selectEmployment?.duration?.end).format('YYYY-MM-DD'),
            responsibilities: selectEmployment?.responsibilities,
            currently_working: selectEmployment?.current_work?.value,
          },
        ],
      };
      if (itemData && itemData.id !== '' && itemData.id > 0) {
        if (!data.experience[0]) {
          data.experience[0] = {};
        }
        data.experience[0].id = itemData.id;
      }
      const experience_data = await fetchData.candidates_profile(data, token);
      if (experience_data) {
        common_fn.showToast(experience_data?.message);
        navigation.navigate('Skill');
      } else {
        common_fn.showToast(experience_data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [FromdatePickerVisible, setFromDatePickerVisible] = useState(false);

  const showFromDatePicker = () => {
    setFromDatePickerVisible(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisible(false);
  };

  const handleFromConfirm = date => {
    setSelectEmployment({
      work_experiance: selectEmployment?.work_experiance,
      current_work: selectEmployment?.current_work,
      emp_type: selectEmployment?.emp_type,
      job_title: selectEmployment?.job_title,
      company_name: selectEmployment?.company_name,
      duration: {
        from: date,
        end: selectEmployment?.duration?.end,
      },
      current_ctc: selectEmployment?.current_ctc,
      notice_period: selectEmployment?.notice_period,
      department: selectEmployment?.department,
      responsibilities: selectEmployment?.responsibilities,
    });
    hideFromDatePicker();
  };
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndConfirm = date => {
    setSelectEmployment({
      work_experiance: selectEmployment?.work_experiance,
      current_work: selectEmployment?.current_work,
      emp_type: selectEmployment?.emp_type,
      job_title: selectEmployment?.job_title,
      company_name: selectEmployment?.company_name,
      duration: {
        from: selectEmployment?.duration?.from,
        end: date,
      },
      current_ctc: selectEmployment?.current_ctc,
      notice_period: selectEmployment?.notice_period,
      department: selectEmployment?.department,
      responsibilities: selectEmployment?.responsibilities,
    });
    hideEndDatePicker();
  };
  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Color.white}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={2}
        stepCount={4}
        labels={labels}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{marginVertical: 10}}>
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
        </View> */}
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
              fontFamily: Gilmer.SemiBold,
              marginVertical: 10,
            }}>
            Are You Currently Working?
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {Current_work_RadioData.map((item, index) => {
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
                      current_work: item?.value,
                      emp_type: selectEmployment?.emp_type,
                      job_title: selectEmployment?.job_title,
                      company_name: selectEmployment?.company_name,
                      duration: {
                        from: selectEmployment?.duration?.from,
                        end: selectEmployment?.duration?.end,
                      },
                      current_ctc: selectEmployment?.current_ctc,
                      notice_period: selectEmployment?.notice_period,
                      department: selectEmployment?.department,
                      responsibilities: selectEmployment?.responsibilities,
                    });
                  }}>
                  <Icon
                    name={
                      selectEmployment?.current_work === item?.value
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={20}
                    color={
                      selectEmployment?.current_work === item?.value
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
              fontFamily: Gilmer.Bold,
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
                      department: selectEmployment?.department,
                      responsibilities: selectEmployment?.responsibilities,
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
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Your Department
          </Text>
          <TextInput
            placeholder="Enter Your Department"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEmployment?.department}
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
                current_ctc: selectEmployment?.current_ctc,
                notice_period: selectEmployment?.notice_period,
                department: text,
                responsibilities: selectEmployment?.responsibilities,
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
                department: selectEmployment?.department,
                responsibilities: selectEmployment?.responsibilities,
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
                department: selectEmployment?.department,
                responsibilities: selectEmployment?.responsibilities,
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
                  fontFamily: Gilmer.SemiBold,
                }}>
                From
              </Text>
              <TouchableOpacity
                onPress={() => showFromDatePicker()}
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
                  padding: 10,
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
                  {moment(selectEmployment?.duration?.from).format(
                    'YYYY-MM-DD',
                  )}
                </Text>
                <FIcon name="calendar" size={20} color={Color.black} />
              </TouchableOpacity>
              <DateTimePickerModal
                date={selectEmployment?.duration?.from}
                isVisible={FromdatePickerVisible}
                mode="date"
                onConfirm={handleFromConfirm}
                onCancel={hideFromDatePicker}
              />
            </View>
            <View style={{marginVertical: 10, flex: 1}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.SemiBold,
                }}>
                To
              </Text>
              <TouchableOpacity
                onPress={() => showEndDatePicker()}
                disabled={checked}
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
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: checked ? 0.5 : 1,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                  }}>
                  {checked
                    ? 'Present'
                    : moment(selectEmployment?.duration?.end).format(
                        'YYYY-MM-DD',
                      )}
                </Text>
                <FIcon name="calendar" size={20} color={Color.black} />
              </TouchableOpacity>
              <DateTimePickerModal
                date={selectEmployment?.duration?.end}
                isVisible={endDatePickerVisible}
                mode="date"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setChecked(!checked);
            }}>
            <MCIcon
              name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
              size={25}
              color={!checked ? Color.cloudyGrey : '#309CD2'}
            />
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 10,
                fontFamily: Gilmer.Medium,
              }}>
              I'm currently working here
            </Text>
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
              Responsibilities
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              backgroundColor: '#EAEAEF50',
              borderRadius: 5,
            }}>
            <TextInput
              placeholder="Enter your Responsibilities"
              placeholderTextColor={Color.cloudyGrey}
              multiline={true}
              value={selectEmployment?.responsibilities}
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
                  current_ctc: selectEmployment?.current_ctc,
                  notice_period: selectEmployment?.notice_period,
                  department: selectEmployment?.department,
                  responsibilities: text,
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
        {/* <View style={{marginVertical: 10}}>
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
              fontFamily: Gilmer.Bold,
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
        </View> */}
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

export default EmploymentDetails;
