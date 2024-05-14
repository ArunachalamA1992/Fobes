import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
  ScrollView,
  Animated,
  Linking,
  Share,
  useWindowDimensions,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Media} from '../../Global/Media';
import {Iconviewcomponent} from '../../Components/Icontag';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import common_fn from '../../Config/common_fn';
import {base_image_url} from '../../Config/base_url';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {setUserData} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();

const IconData = ({item}) => {
  const formattedItem = item.replace(/_/g, '').toLowerCase();
  switch (formattedItem) {
    case 'experience':
      return (
        <Iconviewcomponent
          Icontag={'FontAwesome'}
          iconname={'briefcase'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
    case 'salary':
      return (
        <Iconviewcomponent
          Icontag={'Entypo'}
          iconname={'wallet'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
    case 'location':
      return (
        <Iconviewcomponent
          Icontag={'FontAwesome5'}
          iconname={'map-marker-alt'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
    case 'vacancies':
      return (
        <Iconviewcomponent
          Icontag={'MaterialCommunityIcons'}
          iconname={'chair-rolling'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
  }
};
const DetailedScreen = ({navigation, route}) => {
  const [slug] = useState(route?.params?.slug);
  const {width: windowWidth} = useWindowDimensions();
  const [singleJobData, setSingleJobdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [similarJobdata, setSimilarJobdata] = useState([]);
  const [jobApplied, setJobApplied] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const scrollY = useRef(new Animated.Value(0)).current;
  const taby = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateRight: 'clamp',
  });
  const [resultDate, setResultDate] = useState(null);
  const currentDate = moment();
  const yourDate = moment(singleJobData?.created_at);

  useEffect(() => {
    setLoading(true);
    getData()
      .then(() => setLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
    getRelatedJobs();
  }, [token]);

  const getData = async () => {
    try {
      const [similarJobData, singleJobData] = await Promise.all([
        fetchData.list_jobs(null, token),
        fetchData.filter_job('slug=' + slug, token),
      ]);
      // setSimilarJobdata(similarJobData?.data);
      setSingleJobdata(singleJobData?.data[0]);

      const PendingProduct = await fetchData.list_job_Applied(null, token);
      const appliedJobs = PendingProduct?.data.map(item => item?.job?.id);
      const selectedJobId = singleJobData?.data[0]?.id;
      const isJobApplied = appliedJobs.includes(selectedJobId);
      setJobApplied(isJobApplied);
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

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
  }, [currentDate, yourDate, singleJobData]);

  const features = [
    {
      id: 1,
      title: 'Experience',
      value: singleJobData?.job_cat_translation?.name || 'N/A',
    },
    {
      id: 2,
      title: 'Salary',
      value: `₹ ${singleJobData?.min_salary || 'N/A'} - ${
        singleJobData?.max_salary || 'N/A'
      }`,
    },
    {
      id: 3,
      title: 'Location',
      value: singleJobData?.place || 'N/A',
    },
    {
      id: 4,
      title: 'Vacancies',
      value: singleJobData?.vacancies || 'N/A',
    },
  ];

  const source = {
    html: `${singleJobData?.description}`,
  };

  const company_source = {
    html: `${singleJobData?.company?.bio}`,
  };

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
  console.log('singleJobData?.id', singleJobData?.id);
  const getRelatedJobs = useCallback(async () => {
    try {
      var data = singleJobData?.id;
      const related_list = await fetchData.related_jobs(data, token);
      if (related_list) {
        setSimilarJobdata(related_list?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [token]);

  const share_job = async slug => {
    const jobDeepLink = `https://fobes.in/job/${slug}`;
    const message = `Check out this job: ${jobDeepLink}`;

    try {
      await Share.share({message});
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => share_job(singleJobData?.slug)}
          style={styles.iconView}>
          <Icon
            name="share-social-outline"
            size={30}
            color={Color.black}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={80}
                height={80}
                borderRadius={100}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item style={{marginTop: 10}}>
              <SkeletonPlaceholder.Item width="40%" height={10} />
              <SkeletonPlaceholder.Item
                width="80%"
                height={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SkeletonPlaceholder.Item width="30%" height={30} />
              <SkeletonPlaceholder.Item
                width="30%"
                height={30}
                marginLeft={20}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                marginTop: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <SkeletonPlaceholder.Item width="40%" height={50} />
              <SkeletonPlaceholder.Item
                width="40%"
                height={50}
                marginLeft={20}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <SkeletonPlaceholder.Item width="40%" height={50} />
              <SkeletonPlaceholder.Item
                width="40%"
                height={50}
                marginLeft={20}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width="20%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={10}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={10}
                marginTop={20}
              />
            </SkeletonPlaceholder>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            style={{flex: 1, padding: 10}}
            contentContainerStyle={{paddingBottom: 120}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: false,
              },
            )}>
            {singleJobData?.company?.logo == null ? (
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
                source={{uri: base_image_url + singleJobData?.company?.logo}}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 20,
                color: Color.black,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 10,
              }}>
              {singleJobData?.title} | {singleJobData?.role}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompanyDetails', {
                  item: singleJobData?.company,
                });
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                }}>
                {singleJobData?.company?.name}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#DEFCE4',
                  padding: 5,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.green,
                    fontFamily: Gilmer.Medium,
                  }}>
                  {singleJobData?.job_type?.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'time-outline'}
                  icon_size={20}
                  icon_color={Color.Venus}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    paddingHorizontal: 5,
                    fontFamily: Gilmer.Medium,
                  }}>
                  {resultDate}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                marginVertical: 10,
                marginHorizontal: 5,
              }}>
              {features?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: '45%',
                      backgroundColor: '#EFFAFF',
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      marginHorizontal: 5,
                      borderRadius: 10,
                    }}>
                    <IconData item={item?.title} />
                    <View style={{marginHorizontal: 5}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.cloudyGrey,
                          fontFamily: Gilmer.Regular,
                          paddingHorizontal: 5,
                        }}>
                        {item?.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Gilmer.Bold,
                          paddingHorizontal: 5,
                        }}>
                        {item?.value}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 5,
                }}>
                Job Description
              </Text>
              <RenderHtml
                source={source}
                contentWidth={windowWidth}
                tagsStyles={{
                  body: {
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 25,
                  },
                }}
              />
            </View>
            {/* <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Qualifications
          </Text>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {singleJobData?.qualification?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Octicons'}
                    iconname={'dot-fill'}
                    icon_size={15}
                    icon_color={Color.black}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                        paddingHorizontal: 5,
                      }}>
                      {item?.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Roles and Responsibilities
          </Text>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {singleJobData?.roles_responsibility?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Octicons'}
                    iconname={'dot-fill'}
                    icon_size={15}
                    icon_color={Color.black}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                        paddingHorizontal: 5,
                      }}>
                      {item?.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View> */}
            {singleJobData?.benefits?.length > 0 && (
              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Gilmer.Bold,
                    paddingHorizontal: 5,
                  }}>
                  Key Benifits
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}>
                  {singleJobData?.benefits?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#DEFCE4',
                          paddingHorizontal: 10,
                          padding: 10,
                          borderRadius: 10,
                          marginRight: 10,
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            marginHorizontal: 5,
                            fontFamily: Gilmer.SemiBold,
                          }}>
                          {item?.benefit_name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {/* <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Job Overview
          </Text>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              backgroundColor: '#EDF9FF',
              padding: 10,
              borderRadius: 10,
            }}>
            {singleJobData?.overview?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                  }}>
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                      }}>
                      {item?.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Medium,
                        marginVertical: 5,
                      }}>
                      {item?.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View> */}
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 5,
                }}>
                About Company
              </Text>
              <RenderHtml
                source={company_source}
                contentWidth={windowWidth}
                tagsStyles={{
                  body: {
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 25,
                  },
                }}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 5,
                }}>
                Phone
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                }}>
                {singleJobData?.company?.phone}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 5,
                }}>
                Email
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                }}>
                {singleJobData?.company?.email}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 5,
                }}>
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                }}>
                {singleJobData?.company?.address}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 5,
                }}>
                Recruiter Details
              </Text>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={{
                    uri: base_image_url + singleJobData?.company?.logo,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.black,
                      fontFamily: Gilmer.Medium,
                    }}>
                    {singleJobData?.company?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.lightBlack,
                      fontFamily: Gilmer.Medium,
                      marginVertical: 10,
                    }}>
                    {singleJobData?.company?.industry_type?.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 10,
                }}>
                Similar Jobs
              </Text>
              <FlatList
                data={similarJobdata}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index}) => {
                  return (
                    <JobItemCard
                      item={item}
                      navigation={navigation}
                      token={token}
                      getData={getData}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
          <Animated.View
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              padding: 10,
              backgroundColor: Color.softGrey,
              transform: [{translateY: taby}],
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  getToggleJobs(singleJobData?.id);
                }}>
                <Iconviewcomponent
                  Icontag="FontAwesome"
                  iconname={singleJobData?.is_saved ? 'bookmark' : 'bookmark-o'}
                  icon_size={22}
                  icon_color={
                    singleJobData?.is_saved ? Color.primary : Color.Venus
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (singleJobData?.apply_on === 'app') {
                    navigation.navigate('ApplyJob', {
                      job_id: singleJobData?.id,
                    });
                  } else if (singleJobData?.apply_on === 'email') {
                    Linking.openURL(singleJobData?.apply_email);
                  }
                }}
                disabled={jobApplied}
                style={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginHorizontal: 10,
                  backgroundColor: jobApplied
                    ? Color.cloudyGrey
                    : Color.primary,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: Color.white,
                    fontFamily: 'Gilmer-Bold',
                  }}>
                  {jobApplied ? 'Applied' : 'Apply Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    paddingHorizontal: 10,
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingEnd: 2,
    height: 30,
  },
  icon: {
    paddingEnd: 12,
  },
  numberCountryCode: {
    height: 48,
    color: Color.black,
    fontSize: 16,
    fontFamily: Gilmer.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
});

export default DetailedScreen;
