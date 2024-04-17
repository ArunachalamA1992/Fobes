import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Color from '../../../Global/Color';
import { Gilmer } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';
import fetchData from '../../../Config/fetchData';
import { useSelector } from 'react-redux';
import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import common_fn from '../../../Config/common_fn';
import { scr_height, scr_width } from '../../../Utils/Dimensions';

const AppliedJobs = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [resultDate, setResultDate] = useState(null);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const [ApplyJobData, setApplyJobData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData().finally(() => setLoading(false));
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const apply_job = await fetchData.list_job_Applied(null, token);

      // console.log("Applied JOBS ------------- : ", JSON.stringify(apply_job));
      setApplyJobData(apply_job.data);
      setLoading(false);
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
          data={ApplyJobData}
          showsVerticalScrollIndicator={false}
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
                key={index}
                style={{
                  flex: 1,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onPress={() => {
                  navigation.navigate('JobStatus', { item });
                }}>
                <View style={{ paddingVertical: 10 }}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: '#EFFAFF',
                      padding: 5,
                      borderRadius: 50,
                    }}>
                    <Image
                      source={require('../../../assets/images/app_status.png')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        flex: 1,
                        marginVertical: 5,
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
                          color: Color.darkGrey,
                          fontFamily: Gilmer.Medium,
                          textAlign: 'justify',
                        }}
                        numberOfLines={1}>
                        {item.company_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Iconviewcomponent
                        Icontag={'Ionicons'}
                        iconname={'chevron-forward-outline'}
                        icon_size={22}
                        icon_color={Color.lightBlack}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
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
                    {item.apply_job_comp_loc}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      padding: 5,
                      backgroundColor: '#DEFCE4',
                    }}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome'}
                      iconname={'check-square'}
                      icon_size={16}
                      icon_color={'#0BA02C'}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.black,
                        borderRadius: 5,
                        fontFamily: Gilmer.Medium,
                        paddingHorizontal: 5,
                      }}>
                      Applied {resultDate}
                    </Text>
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        marginHorizontal: 5,
                        backgroundColor: '#E9F9F6',
                        fontSize: 12,
                        color: Color.lightBlack,
                        borderRadius: 5,
                        fontFamily: Gilmer.Medium,
                      }}>
                      {item.apply_job_type}
                    </Text>
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        marginHorizontal: 5,
                        backgroundColor: '#E9F9F6',
                        fontSize: 12,
                        color: Color.lightBlack,
                        borderRadius: 5,
                        fontFamily: Gilmer.Medium,
                      }}>
                      ₹ {common_fn.formatNumberWithSuffix(item.min_salary)} -{' '}
                      {common_fn.formatNumberWithSuffix(item.max_salary)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{ width: scr_width, height: scr_height, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: Color.black }}>No Data</Text>
              </View>
            )
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});
export default AppliedJobs;
