import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
  LogBox,
  SectionList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Media} from '../../Global/Media';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Button} from 'react-native-paper';
import {setAsync, setCompleteProfile, setUserData} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../Config/common_fn';
import {ApplyJobData} from '../../Global/Content';
import {JobCardHorizontal} from '../../Components/JobItemCard';

LogBox.ignoreAllLogs();
const HomeScreen = ({navigation}) => {
  const [selectTab, setSelectTab] = useState('FullTime');
  const dispatch = useDispatch();
  const [profileStatus, setProfileStatus] = useState(0);
  const [height, setHeight] = useState(undefined);
  const userData = useSelector(state => state.UserReducer.userData);
  var {name, email, role} = userData;
  const profile_complete = useSelector(
    state => state.UserReducer.profile_complete,
  );
  var {resume, details, skills} = profile_complete;

  useEffect(() => {
    const profiledata = common_fn.calculateProfileCompletion(
      resume,
      skills,
      details,
    );
    setProfileStatus(profiledata);
  }, [profileStatus, resume, skills, details]);

  const [topCompany, setTopCompany] = useState([
    {
      id: 1,
      comp_logo: Media.propertyMain,
      comp_name: 'Calibre Infotech',
      comp_address: 'Coimbatore',
      comp_offer_count: '10',
      image: Media.propertyMain,
    },
    {
      id: 2,
      comp_logo: Media.propertyMain,
      comp_name: 'Calibre Infotech',
      comp_address: 'Coimbatore',
      comp_offer_count: '10',
      image: Media.propertyMain,
    },
    {
      id: 3,
      comp_logo: Media.propertyMain,
      comp_name: 'Calibre Infotech',
      comp_address: 'Coimbatore',
      comp_offer_count: '10',
      image: Media.propertyMain,
    },
    {
      id: 4,
      comp_logo: Media.propertyMain,
      comp_name: 'Calibre Infotech',
      comp_address: 'Coimbatore',
      comp_offer_count: '10',
      image: Media.propertyMain,
    },
    {
      id: 5,
      comp_logo: Media.propertyMain,
      comp_name: 'Calibre Infotech',
      comp_address: 'Coimbatore',
      comp_offer_count: '10',
      image: Media.propertyMain,
    },
  ]);

  const [BuySection] = useState([
    {
      id: 1,
      title: 'Apply Albion Home Online',
      data: ['Apply Albion Home Online'],
    },
    {id: 2, title: 'Check your Eligibility', data: ['Check your Eligibility']},
    {id: 3, title: 'Top Company', data: ['Top Company']},
    {id: 3, title: 'Banner', data: ['Banner']},
    {id: 3, title: 'RecommendedJobs', data: ['RecommendedJobs']},
  ]);

  const [profileCompletion] = useState([
    {
      id: 1,
      name: 'Add resume',
      subname: 'Boost profile for your dream job with a standout resume',
      btname: 'Upload Resume',
      icon: 'card-account-details-outline',
    },
    {
      id: 2,
      name: 'Add Your Skills',
      subname: 'Highlight your best Skills to strengthen your profile',
      btname: 'Add Skills',
      icon: 'folder-open',
    },
    {
      id: 3,
      name: 'Personal Details',
      subname: 'Add personal details to enrich your profile',
      btname: 'Add Details',
      icon: 'card-account-details-outline',
    },
  ]);

  const filteredProfileCompletion = profileCompletion.filter(item => {
    if (resume != null && resume.name?.length > 0 && item.id === 1) {
      return false;
    }
    if (skills?.length > 0 && item.id === 2) {
      return false;
    }
    return true;
  });

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    getUserData();
  }, [name, email, role]);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Regular,
          }}>
          Welcome Back !
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Color.black,
            fontFamily: Gilmer.Bold,
          }}
          numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Color.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginRight: 5,
            // borderColor: Color.lightgrey,
            // borderWidth: 1,
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
            flex: 1,
            height: 50,
            backgroundColor: '#EAEAEF50',
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <View style={{}}>
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'search'}
              icon_size={25}
              icon_color={Color.lightgrey}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              paddingTop: 2,
              paddingHorizontal: 10,
              color: Color.lightgrey,
              fontFamily: Gilmer.Medium,
            }}
            numberOfLines={1}>
            {`Search Jobs`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Filter')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.primary,
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}>
          <Iconviewcomponent
            Icontag={'MaterialCommunityIcons'}
            iconname={'filter-menu-outline'}
            icon_size={28}
            icon_color={Color.white}
          />
        </TouchableOpacity>
      </View>
      <SectionList
        sections={BuySection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({item}) => {
          switch (item) {
            case 'Apply Albion Home Online':
              return (
                <View style={{flex: 1, marginVertical: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CircularProgress
                      value={profileStatus}
                      radius={30}
                      progressValueColor={'#000'}
                      valueSuffix="%"
                      titleColor={Color.black}
                      activeStrokeColor={
                        profileStatus < 40
                          ? Color.sunShade
                          : profileStatus < 80
                          ? Color.green
                          : '#0BA02C'
                      }
                      activeStrokeWidth={10}
                      inActiveStrokeWidth={10}
                    />
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: Gilmer.Bold,
                          fontSize: 18,
                          color: Color.black,
                        }}>
                        Complete Your Profile
                      </Text>
                      <Text
                        style={{
                          fontFamily: Gilmer.Regular,
                          fontSize: 14,
                          color: Color.black,
                        }}>
                        Complete Pending Actions for Job Suggestions
                      </Text>
                    </View>
                  </View>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      {filteredProfileCompletion?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              flex: 1,
                              backgroundColor: '#DBF3FF',
                              marginHorizontal: 10,
                              padding: 10,
                              borderRadius: 10,
                              width: 280,
                              alignItems: 'flex-end',
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                backgroundColor: '#DEFCE4',
                                paddingHorizontal: 10,
                                padding: 5,
                                borderRadius: 10,
                              }}>
                              <Text
                                style={{
                                  fontFamily: Gilmer.Medium,
                                  fontSize: 12,
                                  color: Color.green,
                                }}>
                                Boost 10%
                              </Text>
                            </View>
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                              }}>
                              <View
                                style={{
                                  backgroundColor: Color.white,
                                  padding: 10,
                                  borderRadius: 100,
                                }}>
                                <MCIcon
                                  name={item.icon}
                                  size={30}
                                  color={Color.blue}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 20,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Gilmer.Bold,
                                    fontSize: 16,
                                    color: Color.black,
                                  }}>
                                  {item?.name}
                                </Text>
                                <Text
                                  style={{
                                    flex: 1,
                                    fontFamily: Gilmer.Regular,
                                    fontSize: 14,
                                    color: Color.black,
                                    marginVertical: 5,
                                  }}>
                                  {item?.subname}
                                </Text>
                                <Button
                                  mode="contained"
                                  onPress={async () => {
                                    try {
                                      const data =
                                        await common_fn.profileupdate(
                                          item?.id,
                                          navigation,
                                        );
                                      if (data) {
                                        dispatch(
                                          setCompleteProfile({
                                            resume: data,
                                            details: details,
                                            skills: skills,
                                          }),
                                        );
                                      }
                                    } catch (err) {
                                      console.error('Error occurred:', err);
                                    }
                                  }}
                                  style={{
                                    marginVertical: 10,
                                    backgroundColor: Color.primary,
                                    borderRadius: 10,
                                  }}>
                                  {item.btname}
                                </Button>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              );
            case 'Check your Eligibility':
              return (
                <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Gilmer.Bold,
                    }}>
                    Explore by Categories
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectTab('FullTime');
                      }}
                      style={{
                        padding: 10,
                        borderRadius: 50,
                        paddingHorizontal: 20,
                        backgroundColor:
                          selectTab === 'FullTime'
                            ? Color.primary
                            : Color.lightgrey,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color:
                            selectTab === 'FullTime'
                              ? Color.white
                              : Color.black,
                          textAlign: 'center',
                          fontSize: 14,
                          paddingTop: 2,
                          fontFamily: Gilmer.Medium,
                        }}>
                        Full Time
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectTab('PartTime');
                      }}
                      style={{
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        marginTop: 2,
                        backgroundColor:
                          selectTab === 'PartTime'
                            ? Color.primary
                            : Color.lightgrey,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color:
                            selectTab === 'PartTime'
                              ? Color.white
                              : Color.black,
                          textAlign: 'center',
                          fontSize: 14,
                          paddingTop: 2,
                          fontFamily: Gilmer.Medium,
                        }}>
                        Part Time
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectTab('Freelance');
                      }}
                      style={{
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        marginTop: 2,
                        backgroundColor:
                          selectTab === 'Freelance'
                            ? Color.primary
                            : Color.lightgrey,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color:
                            selectTab === 'Freelance'
                              ? Color.white
                              : Color.black,
                          textAlign: 'center',
                          fontSize: 14,
                          paddingTop: 2,
                          fontFamily: Gilmer.Medium,
                        }}>
                        Freelance
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Gilmer.Bold,
                        }}>
                        You Might Like
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('JobListScreen')}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#0033A0',
                            fontFamily: Gilmer.Bold,
                            paddingHorizontal: 10,
                          }}>
                          See All
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={ApplyJobData}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({item, index}) => {
                        return (
                          <JobCardHorizontal
                            item={item}
                            navigation={navigation}
                          />
                        );
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              );
            case 'Top Company':
              return (
                <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        color: 'black',
                        fontFamily: Gilmer.Bold,
                        paddingHorizontal: 10,
                      }}>
                      Top Companies
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CompanyList')}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#0033A0',
                          fontFamily: Gilmer.Bold,
                          paddingHorizontal: 10,
                        }}>
                        See All
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={topCompany}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: 180,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: Color.white,
                            borderWidth: 0.5,
                            padding: 5,
                            margin: 5,
                            borderRadius: 10,
                            elevation: 1,
                            backgroundColor: '#EFFAFF',
                          }}>
                          <Image
                            source={require('../../assets/logos/user.png')}
                            style={{
                              width: 80,
                              height: 80,
                              resizeMode: 'contain',
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              color: Color.black,
                              fontFamily: Gilmer.Bold,
                              paddingVertical: 5,
                            }}>
                            {item.comp_name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Iconviewcomponent
                              Icontag={'Fontisto'}
                              iconname={'map-marker-alt'}
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
                              {item.comp_address}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Color.primary,
                              fontFamily: Gilmer.Medium,
                              textDecorationLine: 'underline',
                              paddingVertical: 5,
                            }}>
                            {item.comp_offer_count} Jobs Open
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              );
            case 'Banner':
              return (
                <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/banner.png')}
                    style={{
                      width: '100%',
                      height: 180,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              );
            case 'RecommendedJobs':
              return (
                <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Gilmer.Bold,
                          paddingHorizontal: 10,
                        }}>
                        Recommended Jobs
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('JobListScreen')}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#0033A0',
                            fontFamily: Gilmer.Bold,
                            paddingHorizontal: 10,
                          }}>
                          See All
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={ApplyJobData}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({item, index}) => {
                        return (
                          <JobCardHorizontal
                            item={item}
                            navigation={navigation}
                          />
                        );
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              );
          }
        }}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  numberCountryCode: {
    height: 48,
    color: Color.black,
    fontSize: 16,
    fontFamily: Gilmer.Bold,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
});

//make this component available to the app
export default HomeScreen;
