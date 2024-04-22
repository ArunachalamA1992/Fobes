import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useSelector } from 'react-redux';
import moment from 'moment';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { base_image_url } from '../../Config/base_url';

const { height } = Dimensions.get('window');
const SavedJobScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [resultDate, setResultDate] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  useEffect(() => {
    setLoading(true);
    getData().finally(() => setLoading(false));
  }, [token]);

  const getData = useCallback(async () => {
    try {
      const Saved_Jobs = await fetchData.list_bookmarks(null, token);
      if (Saved_Jobs) {
        setSavedJobs(Saved_Jobs?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [token]);

  const getToggleJobs = async id => {
    try {
      var data = { job_id: id };
      const Saved_Jobs = await fetchData.toggle_bookmarks(data, token);
      if (Saved_Jobs) {
        common_fn.showToast(Saved_Jobs?.message);
        getData()
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item width="100%" height={150} />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{ marginTop: 10 }}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const currentDate = moment();
            const yourDate = moment(item?.created_at);
            const daysAgo = currentDate.diff(yourDate, 'days');
            const hoursAgo = currentDate.diff(yourDate, 'hours');
            const minutesAgo = currentDate.diff(yourDate, 'minutes');

            if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
              setResultDate('Just now');
            } else {
              let result;

              if (Math.abs(daysAgo) > 0) {
                result = `${Math.abs(daysAgo)} day${Math.abs(daysAgo) !== 1 ? 's' : ''
                  } ago`;
              } else if (Math.abs(hoursAgo) > 0) {
                result = `${Math.abs(hoursAgo)} hour${Math.abs(hoursAgo) !== 1 ? 's' : ''
                  } ago`;
              } else {
                result = `${Math.abs(minutesAgo)} minute${Math.abs(minutesAgo) !== 1 ? 's' : ''
                  } ago`;
              }

              setResultDate(result);
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailedScreen', { item });
                }}
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                  }}>
                  <Image
                    source={{ uri: base_image_url + item?.company?.logo }}
                    style={{
                      width: 70,
                      height: 70,
                      resizeMode: 'contain',
                      borderRadius: 100,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.lightBlack,
                        fontFamily: Gilmer.Medium,
                        textAlign: 'justify',
                      }}
                      numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.darkGrey,
                        fontFamily: Gilmer.Regular,
                        textAlign: 'justify',
                        marginTop: 5,
                      }}
                      numberOfLines={1}>
                      {item?.company?.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      getToggleJobs(item?.id);
                    }}>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'bookmark'}
                      icon_size={22}
                      icon_color={Color.primary}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Iconviewcomponent
                      Icontag={'Fontisto'}
                      iconname={'map-marker-alt'}
                      icon_size={20}
                      icon_color={Color.lightgrey}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.lightBlack,
                        fontFamily: Gilmer.Medium,
                        marginHorizontal: 5,
                      }}
                      numberOfLines={2}>
                      {item.place}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginHorizontal: 10,
                      }}>
                      <Iconviewcomponent
                        Icontag={'FontAwesome'}
                        iconname={'briefcase'}
                        icon_size={20}
                        icon_color={Color.lightgrey}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.lightBlack,
                          fontFamily: Gilmer.Medium,
                          paddingHorizontal: 5,
                        }}
                        numberOfLines={2}>
                        {item?.job_type?.name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 30,
                        backgroundColor: Color.lightgrey,
                      }}></View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.lightBlack,
                        fontFamily: Gilmer.Medium,
                        paddingHorizontal: 5,
                      }}
                      numberOfLines={2}>
                      {resultDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  height: height / 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 16, color: Color.black, fontFamily: Gilmer.Bold }}>No Saved Jobs</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});

export default SavedJobScreen;
