import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Media} from '../../Global/Media';
import {Iconviewcomponent} from '../../Components/Icontag';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';

LogBox.ignoreAllLogs();

const IconData = ({item}) => {
  const formattedItem = item.replace(/_/g, '').toLowerCase();
  console.log('formattedItem', formattedItem);
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
  const [jobData, setJobData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

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
  const [itemData] = useState(route?.params?.item);
  const scrollY = useRef(new Animated.Value(0)).current;

  const taby = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateRight: 'clamp',
  });
  const [resultDate, setResultDate] = useState(null);
  const currentDate = moment();
  const yourDate = moment(itemData?.created_at);

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
  }, [currentDate, yourDate, itemData]);

  const [features] = useState([
    {id: 1, title: 'Experience', value: itemData?.experience},
    {
      id: 2,
      title: 'Salary',
      value: `${itemData.min_salary} - ${itemData?.max_salary}`,
    },
    {id: 3, title: 'Location', value: itemData?.place},
    {id: 4, title: 'Vacancies', value: itemData?.vacancies},
  ]);
  const source = {
    html: `${itemData?.description}`,
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1, padding: 10}}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <Image
          source={Media.user}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: Color.black,
            fontFamily: Gilmer.Bold,
            paddingHorizontal: 10,
          }}>
          {itemData?.title} | {itemData?.role}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CompanyDetails');
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            {itemData?.company_name}
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
              {itemData?.job_type}
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
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          {features?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#EFFAFF',
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
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
          {/* <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              marginHorizontal: 10,
              marginVertical: 10,
              fontFamily: Gilmer.Medium,
              lineHeight: 25,
            }}>
            {itemData?.description}
          </Text> */}
          <RenderHtml source={source} />
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
            {itemData?.qualification?.map((item, index) => {
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
            {itemData?.roles_responsibility?.map((item, index) => {
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
            {itemData?.key_benifits?.map((item, index) => {
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
                    {item?.benefit_data}
                  </Text>
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
            {itemData?.overview?.map((item, index) => {
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
            {itemData?.about_company}
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
            {itemData?.number}
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
            {itemData?.email}
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
            {itemData?.address}
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
                uri: 'https://play-lh.googleusercontent.com/Jplgjxv_1k2B1iHy41wIMWfbBwpsjqlt2gvCwxhwQ-ujokUFtDCCYXrPaiiWn2pIwwY',
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
                {itemData?.recruiter_deatils?.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.lightBlack,
                  fontFamily: Gilmer.Medium,
                  marginVertical: 10,
                }}>
                {itemData?.recruiter_deatils?.position}
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
            data={jobData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              return <JobItemCard item={item} navigation={navigation} />;
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
          // opacity: headerOpacity,
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
            }}>
            <Iconviewcomponent
              Icontag={'FontAwesome'}
              iconname={'bookmark'}
              icon_size={25}
              icon_color={Color.cloudyGrey}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ApplyJob')}
            style={{
              flex: 1,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginHorizontal: 10,
              backgroundColor: Color.primary,
            }}>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                color: Color.white,
              }}>
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
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
