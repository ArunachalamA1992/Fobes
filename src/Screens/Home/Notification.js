import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Gilmer} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import moment from 'moment';
import common_fn from '../../Config/common_fn';

const {height} = Dimensions.get('window');

const Notification = ({navigation}) => {
  const [notificationData, setNotificationData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = useCallback(async () => {
    try {
      const notification_list = await fetchData.notification(null, token);
      if (notification_list) {
        setNotificationData(notification_list?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [token]);

  const single_notification = async id => {
    try {
      const data = id;
      const notification_list = await fetchData.update_notification(
        data,
        token,
      );
      console.log(
        'notification_list-----------------------------',
        notification_list,
      );
      if (notification_list) {
        common_fn?.showToast(notification_list?.message);
        getNotification();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getMarkAllData = useCallback(async () => {
    try {
      const notification_list = await fetchData.mark_all_notification(
        {},
        token,
      );
      if (notification_list) {
        common_fn?.showToast(notification_list?.message);
        getNotification();
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [token]);

  const groupNotificationsByDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const groupedNotifications = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    notificationData.forEach(notification => {
      const notificationDate = new Date(notification?.created_at);
      if (notificationDate.toDateString() === today.toDateString()) {
        groupedNotifications['Today'].push(notification);
      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
        groupedNotifications['Yesterday'].push(notification);
      } else {
        groupedNotifications['Earlier'].push(notification);
      }
    });

    return groupedNotifications;
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <FlatList
        data={[
          {category: 'Today', data: groupedNotifications['Today']},
          {category: 'Yesterday', data: groupedNotifications['Yesterday']},
          {category: 'Earlier', data: groupedNotifications['Earlier']},
        ]}
        keyExtractor={(item, index) => item.category}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              {item.data.length > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 18,
                      color: Color.lightBlack,
                      fontFamily: Gilmer.Bold,
                      marginVertical: 5,
                    }}>
                    {item.category}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      getMarkAllData();
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Medium,
                        marginVertical: 5,
                      }}>
                      {'Mark all as read'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.data.map((single_notify, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flex: 1,
                    borderColor: Color.lightgrey,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 5,
                  }}
                  disabled={single_notify?.read_at != null}
                  onPress={() => {
                    single_notification(single_notify?.id);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    {/* <Image
                  source={single_notify.image}
                  style={{width: 80, height: 80, resizeMode: 'contain'}}
                /> */}
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Color.lightBlack,
                          fontFamily: Gilmer.Bold,
                          marginVertical: 5,
                        }}>
                        {single_notify?.notification?.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.cloudyGrey,
                          fontFamily: Gilmer.Medium,
                        }}
                        numberOfLines={2}>
                        {single_notify?.notification?.title2}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Icon
                        name="information-circle"
                        size={20}
                        color={Color.primary}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Gilmer.Medium,
                        }}
                        numberOfLines={2}>
                        {/* {single_notify.time} */}
                        {moment(single_notify?.created_at).format('HH:mm:ss')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: height / 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                width: '100%',
              }}>
              <MCIcon
                name="briefcase-variant-off"
                color={Color.primary}
                size={20}
              />
              <Text
                style={{
                  fontSize: 12,
                  padding: 5,
                  paddingHorizontal: 20,
                  marginStart: 5,
                  borderRadius: 5,
                  marginVertical: 10,
                  color: Color.primary,
                  fontFamily: Gilmer.Bold,
                }}>
                No Notification Found
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notification;
