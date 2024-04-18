import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../../Global/Color';
import { Gilmer } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';
import { Button } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import { Media } from '../../../Global/Media';
import fetchData from '../../../Config/fetchData';
import common_fn from '../../../Config/common_fn';
import { useSelector } from 'react-redux';
import { base_image_url } from '../../../Config/base_url';
import JobItemCard from '../../../Components/JobItemCard';

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.cloudyGrey,
  labelSize: 15,

  currentStepIndicatorSize: 30,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Color.primary,
  stepIndicatorCurrentColor: Color.primary,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: Color.white,
  currentStepLabelColor: Color.black,

  separatorFinishedColor: Color.primary,
  stepIndicatorFinishedColor: Color.primary,
  stepIndicatorLabelFinishedColor: 'white',

  separatorUnFinishedColor: '#ddd',
  stepIndicatorUnFinishedColor: '#ddd',
  stepIndicatorLabelUnFinishedColor: 'white',
};

const labels = [
  'Applied',
  'Application Viewed',
  'Application Shortlisted by HR',
];

const JobStatus = ({ navigation, route }) => {
  const [itemData] = useState(route.params.item);
  const [date] = useState(route.params.resultDate);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const job_list = await fetchData.list_jobs(null, token);
      setJobData(job_list?.data);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: base_image_url + itemData?.job?.company?.logo }}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                fontFamily: Gilmer.Bold,
                textAlign: 'center',
              }}
              numberOfLines={2}>
              {itemData?.job?.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.darkGrey,
                fontFamily: Gilmer.Medium,
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {itemData?.job?.company?.name}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Iconviewcomponent
              Icontag={'Fontisto'}
              iconname={'map-marker-alt'}
              icon_size={20}
              icon_color={Color.Venus}
            />
            <Text
              style={{
                fontSize: 14,
                color: Color.Venus,
                fontFamily: Gilmer.Medium,
                paddingHorizontal: 5,
              }}>
              {itemData?.job?.district}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={async () => {
              navigation.navigate('DetailedScreen', { item: itemData?.job });
            }}
            style={{
              width: '50%',
              backgroundColor: '#DBF3FF',
              color: Color.primary,
              borderRadius: 10,
              marginVertical: 10,
            }}
            textColor="#000">
            View Job Description
          </Button>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={'clock-outline'}
              icon_size={20}
              icon_color={Color.Venus}
            />
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginVertical: 10,
              }}>
              Applied {date}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: Gilmer.Bold,
            fontSize: 18,
            color: Color.black,
            textTransform: 'capitalize',
            marginHorizontal: 5,
            marginVertical: 10,
          }}>
          Application Status
        </Text>
        <View
          style={{
            flex: 1,
            height: 180,
          }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
            stepCount={3}
            labels={labels}
            direction="vertical"
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Image
              source={require('../../../assets/images/app_status.png')}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: Gilmer.Bold,
            fontSize: 18,
            color: Color.black,
            textTransform: 'capitalize',
            marginHorizontal: 5,
            marginVertical: 10,
          }}>
          Similar Jobs
        </Text>
        {jobData.map((item, index) => {
          return (
            <JobItemCard item={item} navigation={navigation} token={token}
              getData={getData} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default JobStatus;
