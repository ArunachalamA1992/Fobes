import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Color from '../../../Global/Color';
import {Gilmer} from '../../../Global/FontFamily';
import {Iconviewcomponent} from '../../../Components/Icontag';
import fetchData from '../../../Config/fetchData';
import {useSelector} from 'react-redux';
import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import common_fn from '../../../Config/common_fn';
import {base_image_url} from '../../../Config/base_url';

const {height} = Dimensions.get('window');

const AppliedJobs = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [ApplyJobData, setApplyJobData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData().finally(() => setLoading(false));
  }, [token]);

  const getData = async () => {
    try {
      setLoading(true);
      const apply_job = await fetchData.list_job_Applied(null, token);
      setApplyJobData(apply_job.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item width="100%" height={150} />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={ApplyJobData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            const currentDate = moment();
            const yourDate = moment(item?.created_at);
            const daysAgo = currentDate.diff(yourDate, 'days');
            const hoursAgo = currentDate.diff(yourDate, 'hours');
            const minutesAgo = currentDate.diff(yourDate, 'minutes');

            let result;

            if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
              result = 'Just now';
            } else if (Math.abs(daysAgo) > 0) {
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
                  navigation.navigate('JobStatus', {item, result});
                }}>
                <View style={{paddingVertical: 10}}>
                  <Image
                    source={{uri: base_image_url + item?.job?.company?.logo}}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: 'contain',
                      borderRadius: 100,
                    }}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        {item?.job?.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.darkGrey,
                          fontFamily: Gilmer.Medium,
                          textAlign: 'justify',
                        }}
                        numberOfLines={1}>
                        {item?.job?.company?.name}
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
                    {item?.job?.district}
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
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      padding: 5,
                      paddingHorizontal: 10,
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
                      Applied {result}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        marginHorizontal: 5,
                        backgroundColor: '#E9F9F6',
                        fontSize: 12,
                        color: Color.lightBlack,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        fontFamily: Gilmer.Medium,
                      }}>
                      {item?.job?.job_type?.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        marginHorizontal: 5,
                        backgroundColor: '#E9F9F6',
                        fontSize: 12,
                        textAlign: 'justify',
                        color: Color.lightBlack,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        fontFamily: Gilmer.Medium,
                      }}>
                      ₹ {item?.job?.min_salary} - {item?.job?.max_salary}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  height: height / 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Gilmer.Bold,
                  }}>
                  No Jobs Applied
                </Text>
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
    padding: 10,
    backgroundColor: Color.white,
  },
});
export default AppliedJobs;
