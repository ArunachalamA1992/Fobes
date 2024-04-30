import React, {useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Gilmer} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = ({navigation}) => {
  const [notificationData] = useState([
    {
      id: 1,
      image: Media.user,
      name: 'New Job Posted',
      sub_name:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '3.00pm',
      dt: '2024-04-25T12:11:05.381Z',
    },
    {
      id: 2,
      image: Media.user,
      name: 'New Job Posted',
      sub_name:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '3.00pm',
      dt: '2024-04-24T12:11:05.381Z',
    },
    {
      id: 3,
      image: Media.user,
      name: 'New Job Posted',
      sub_name:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '3.00pm',
      dt: '2024-03-07T12:11:05.381Z',
    },
  ]);

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
      const notificationDate = new Date(notification.dt);
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
        renderItem={({item}) => (
          <View>
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
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    marginVertical: 5,
                  }}>
                  {'Mark all as read'}
                </Text>
              </View>
            )}
            {item.data.map((notification, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Image
                    source={notification.image}
                    style={{width: 80, height: 80, resizeMode: 'contain'}}
                  />
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
                      {notification?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Medium,
                      }}
                      numberOfLines={2}>
                      {notification.sub_name}
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
                      {notification.time}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notification;
