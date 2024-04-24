import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Gilmer} from '../Global/FontFamily';
import Color from '../Global/Color';
import {Iconviewcomponent} from './Icontag';
import {Media} from '../Global/Media';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import fetchData from '../Config/fetchData';
import common_fn from '../Config/common_fn';
import {base_image_url} from '../Config/base_url';

const JobItemCard = props => {
  var {item, navigation, token, getData} = props;
  const [resultDate, setResultDate] = useState(null);
  const currentDate = moment();
  const yourDate = moment(item?.created_at);

  useEffect(() => {
    const daysAgo = currentDate.diff(yourDate, 'days');
    const hoursAgo = currentDate.diff(yourDate, 'hours');
    const minutesAgo = currentDate.diff(yourDate, 'minutes');

    if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
      setResultDate('Just now');
    } else {
      let result;

      if (Math.abs(daysAgo) > 0) {
        result = `${Math.abs(daysAgo)} day${
          Math.abs(daysAgo) !== 1 ? 's' : ''
        } ago`;
      } else if (Math.abs(hoursAgo) > 0) {
        result = `${Math.abs(hoursAgo)} hour${
          Math.abs(hoursAgo) !== 1 ? 's' : ''
        } ago`;
      } else {
        result = `${Math.abs(minutesAgo)} minute${
          Math.abs(minutesAgo) !== 1 ? 's' : ''
        } ago`;
      }

      setResultDate(result);
    }
  }, [currentDate, yourDate, item]);

  const getToggleJobs = async id => {
    try {
      var data = {job_id: id};
      const Saved_Jobs = await fetchData.toggle_bookmarks(data, token);
      if (Saved_Jobs) {
        common_fn.showToast(Saved_Jobs?.message);
        getData();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailedScreen', {item})}
      style={{
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.lightgrey,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 20,
            backgroundColor: '#DEFCE4',
            fontSize: 12,
            color: '#0BA02C',
            borderRadius: 5,
            fontFamily: Gilmer.Bold,
            paddingVertical: 10,
          }}>
          {item.job_type?.name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'time-outline'}
            icon_size={20}
            icon_color={Color.Venus}
          />
          <Text
            style={{
              fontSize: 12,
              color: Color.Venus,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            {resultDate}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        {item?.company?.logo == null ? (
          <Image
            source={Media?.user}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
        ) : (
          <Image
            source={{uri: base_image_url + item?.company?.logo}}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
              textAlign: 'justify',
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              textAlign: 'justify',
            }}
            numberOfLines={1}>
            {item.job_category_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            getToggleJobs(item?.id);
          }}>
          <Iconviewcomponent
            Icontag={'FontAwesome'}
            iconname={item?.is_saved ? 'bookmark' : 'bookmark-o'}
            icon_size={22}
            icon_color={item?.is_saved ? Color.primary : Color.Venus}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Salary/Month
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
              marginTop: 5,
            }}>
            ₹ {common_fn.formatNumberWithSuffix(item.min_salary)} -{' '}
            {common_fn.formatNumberWithSuffix(item?.max_salary)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Applicant
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            {/* <Image
              source={Media.vector}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            /> */}
            <MCIcon name="shield-account" size={20} color={Color.primary} />
            <Text
              style={{
                fontSize: 16,
                color: Color.primary,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 5,
              }}>
              {item.job_comp_applicant}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const JobCardHorizontal = props => {
  var {item, navigation, token, getData} = props;
  const [resultDate, setResultDate] = useState(null);
  const currentDate = moment();
  const yourDate = moment(item?.created_at);

  useEffect(() => {
    const daysAgo = currentDate.diff(yourDate, 'days');
    const hoursAgo = currentDate.diff(yourDate, 'hours');
    const minutesAgo = currentDate.diff(yourDate, 'minutes');

    if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
      setResultDate('Just now');
    } else {
      let result;

      if (Math.abs(daysAgo) > 0) {
        result = `${Math.abs(daysAgo)} day${
          Math.abs(daysAgo) !== 1 ? 's' : ''
        } ago`;
      } else if (Math.abs(hoursAgo) > 0) {
        result = `${Math.abs(hoursAgo)} hour${
          Math.abs(hoursAgo) !== 1 ? 's' : ''
        } ago`;
      } else {
        result = `${Math.abs(minutesAgo)} minute${
          Math.abs(minutesAgo) !== 1 ? 's' : ''
        } ago`;
      }

      setResultDate(result);
    }
  }, [currentDate, yourDate, item]);

  const getToggleJobs = async id => {
    try {
      var data = {job_id: id};
      const Saved_Jobs = await fetchData.toggle_bookmarks(data, token);
      if (Saved_Jobs) {
        common_fn.showToast(Saved_Jobs?.message);
        getData();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailedScreen', {item})}
      style={{
        width: 300,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.lightgrey,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 20,
            backgroundColor: '#DEFCE4',
            fontSize: 12,
            color: '#0BA02C',
            borderRadius: 5,
            fontFamily: Gilmer.Bold,
            paddingVertical: 10,
          }}>
          {item.job_type?.name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'time-outline'}
            icon_size={20}
            icon_color={Color.Venus}
          />
          <Text
            style={{
              fontSize: 12,
              color: Color.Venus,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            {resultDate}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        {item?.company?.logo == null ? (
          <Image
            source={Media?.user}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
        ) : (
          <Image
            source={{uri: base_image_url + item?.company?.logo}}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
              textAlign: 'justify',
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              textAlign: 'justify',
            }}
            numberOfLines={1}>
            {item.job_category_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            getToggleJobs(item?.id);
          }}>
          <Iconviewcomponent
            Icontag={'FontAwesome'}
            iconname={item?.is_saved ? 'bookmark' : 'bookmark-o'}
            icon_size={22}
            icon_color={item?.is_saved ? Color.primary : Color.Venus}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Salary/Month
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
              marginTop: 5,
            }}>
            ₹ {common_fn.formatNumberWithSuffix(item.min_salary)} -{' '}
            {common_fn.formatNumberWithSuffix(item?.max_salary)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Applicant
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            {/* <Image
              source={Media.vector}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            /> */}
            <MCIcon name="shield-account" size={20} color={Color.primary} />
            <Text
              style={{
                fontSize: 16,
                color: Color.primary,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 5,
              }}>
              {item.job_comp_applicant}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobItemCard;
