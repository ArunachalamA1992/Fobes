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

const EducationDetails = ({navigation}) => {
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
    degree: '',
    institute: '',
    specification: '',
    duration: {
      from: '',
      end: '',
    },
  });
  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Color.white}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={0}
        stepCount={3}
        labels={labels}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: Poppins.Bold,
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
        </View>
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
                fontFamily: Poppins.SemiBold,
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
                fontFamily: Poppins.SemiBold,
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
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Experiance');
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
