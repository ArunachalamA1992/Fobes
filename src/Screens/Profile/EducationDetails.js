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
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import {useDispatch, useSelector} from 'react-redux';

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

const EducationDetails = ({navigation, route}) => {
  const [itemData] = useState(route.params.item);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
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
  const [selectEducation, setSelectEducation] = useState({
    qualify: {},
    degree: itemData?.degree || '',
    institute: itemData?.institute_name || '',
    specification: '',
    duration: {
      from: '',
      end: '',
    },
    year_completion: itemData?.year || '',
  });
  const [yearcompletiondata] = useState([
    {
      id: 1,
      name: '2010',
      value: '2010',
    },
    {
      id: 2,
      name: '2011',
      value: '2011',
    },
    {
      id: 3,
      name: '2022',
      value: '2022',
    },
    {
      id: 4,
      name: '2024',
      value: '2024',
    },
  ]);

  const getAPI = async () => {
    try {
      var data = {
        education: [
          {
            institute_name: selectEducation.institute,
            degree: selectEducation.degree,
            year: selectEducation.year_completion,
          },
        ],
      };

      if (itemData && itemData.id !== '' && itemData.id > 0) {
        if (!data.education[0]) {
          data.education[0] = {};
        }
        data.education[0].id = itemData.id;
      }
      console.log('data---------------------', data);
      const education_data = await fetchData.candidates_profile(data, token);
      if (education_data) {
        common_fn.showToast(education_data.message);
        navigation.navigate('Experience');
      } else {
        common_fn.showToast(education_data.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Color.white}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={1}
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
                      selectEducation?.qualify?.id == item?.id
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
                      selectEducation?.qualify?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setSelectEducation({
                      qualify: item,
                      degree: selectEducation?.degree,
                      institute: selectEducation?.institute,
                      specification: selectEducation?.specification,
                      duration: {
                        from: selectEducation?.duration?.from,
                        end: selectEducation?.duration?.end,
                      },
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
            Degree
          </Text>
          <TextInput
            placeholder="Enter Your Degree"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEducation?.degree}
            onChangeText={text => {
              setSelectEducation({
                qualify: selectEducation?.qualify,
                degree: text,
                institute: selectEducation?.institute,
                specification: selectEducation?.specification,
                duration: {
                  from: selectEducation?.duration?.from,
                  end: selectEducation?.duration?.end,
                },
                year_completion: selectEducation?.year_completion,
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
            Institute Name
          </Text>
          <TextInput
            placeholder="Enter Your Institute Name"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEducation?.institute}
            onChangeText={text => {
              setSelectEducation({
                qualify: selectEducation?.qualify,
                degree: selectEducation?.degree,
                institute: text,
                specification: selectEducation?.specification,
                duration: {
                  from: selectEducation?.duration?.from,
                  end: selectEducation?.duration?.end,
                },
                year_completion: selectEducation?.year_completion,
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
        {/* <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Specialization
          </Text>
          <TextInput
            placeholder="Enter Your Course Name"
            placeholderTextColor={Color.cloudyGrey}
            value={selectEducation?.institute}
            onChangeText={text => {
              setSelectEducation({
                qualify: selectEducation?.qualify,
                degree: selectEducation?.degree,
                institute: selectEducation?.institute,
                specification: text,
                duration: {
                  from: selectEducation?.duration?.from,
                  end: selectEducation?.duration?.end,
                },
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
        </View> */}
        {/* <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Course Duration
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
              <TextInput
                placeholder="Starting Year"
                placeholderTextColor={Color.cloudyGrey}
                value={selectEducation?.duration?.from}
                onChangeText={text => {
                  setSelectEducation({
                    qualify: selectEducation?.qualify,
                    degree: selectEducation?.degree,
                    institute: selectEducation?.institute,
                    specification: selectEducation?.specification,
                    duration: {
                      from: text,
                      end: selectEducation?.duration?.end,
                    },
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
                  fontFamily: Gilmer.SemiBold,
                }}>
                End
              </Text>
              <TextInput
                placeholder="End Year"
                placeholderTextColor={Color.cloudyGrey}
                value={selectEducation?.duration?.end}
                onChangeText={text => {
                  setSelectEducation({
                    qualify: selectEducation?.qualify,
                    degree: selectEducation?.degree,
                    institute: selectEducation?.institute,
                    specification: selectEducation?.specification,
                    duration: {
                      from: selectEducation?.duration?.from,
                      end: text,
                    },
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
        </View> */}
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Year of Course Completion
          </Text>
          <Dropdown
            style={[styles.dropdown, {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={yearcompletiondata}
            value={selectEducation?.year_completion}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={
              itemData?.year != ''
                ? itemData?.year
                : "'Year of Course Completion'"
            }
            searchPlaceholder="Search..."
            onChange={item => {
              setSelectEducation({
                qualify: selectEducation?.qualify,
                degree: selectEducation?.degree,
                institute: selectEducation?.institute,
                specification: selectEducation?.specification,
                duration: {
                  from: selectEducation?.duration?.from,
                  end: selectEducation?.duration?.end,
                },
                year_completion: item?.value,
              });
            }}
          />
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

export default EducationDetails;

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
