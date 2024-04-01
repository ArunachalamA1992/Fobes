//import liraries
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TextInput,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  StatusBar,
  TouchableOpacity,
  SectionList,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Modal,
  Button,
} from 'react-native';

import {scr_height, scr_width} from '../../Utils/Dimensions';
import Color from '../../Global/Color';
import {Poppins} from '../../Global/FontFamily';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../../Global/Media';
import {Iconviewcomponent} from '../../Components/Icontag';

LogBox.ignoreAllLogs();

const HeaderHeight = 150;

// create a component
const CompanyDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectTab, setSelectTab] = useState('FullTime');

  const [tabIndex, setIndex] = useState(0);
  const [scrheight, setScrheight] = useState(undefined);
  let listRefArr = useRef([]);
  let isListGliding = useRef(false);
  let listOffset = useRef({});

  const [ActionSelect, setActionSelect] = useState([
    {
      id: 0,
      job_name: 'Business Development Executive',
      image: Media.propertyMain,
      subImage: Media.propertysub,
      job_type: 'Full Time',
      job_post_date: '1 day ago',
      job_comp_logo: '',
      job_comp_name: 'Wipro Technologies ',
      job_comp_book_status: true,
      job_comp_salary: '₹10k -  ₹20 k',
      job_comp_applicant: '500',
      job_comp_loc: 'Coimbatore',
    },
    {
      id: 1,
      job_name: 'Mobile App Development',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Full Time',
      job_post_date: '3 days ago',
      job_comp_logo: '',
      job_comp_name: 'TCS',
      job_comp_book_status: false,
      job_comp_salary: '₹40k -  ₹70 k',
      job_comp_applicant: '250',
      job_comp_loc: 'Coimbatore',
    },
    {
      id: 2,
      job_name: 'Graphics Designer',
      image: Media.propertyMain,
      subImage: Media.propertysub,
      job_type: 'Freelance',
      job_post_date: '1 day ago',
      job_comp_logo: '',
      job_comp_name: 'KGISL Group',
      job_comp_book_status: false,
      job_comp_salary: '₹30k -  ₹50 k',
      job_comp_applicant: '50',
      job_comp_loc: 'Chennai',
    },
    {
      id: 3,
      job_name: 'Website designer',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Full Time',
      job_post_date: '4 days ago',
      job_comp_logo: '',
      job_comp_name: 'Brightway Group Tech',
      job_comp_book_status: false,
      job_comp_salary: '₹25k -  ₹60 k',
      job_comp_applicant: '7',
      job_comp_loc: 'Bangalore',
    },
    {
      id: 4,
      job_name: 'SEO Analyst',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Part Time',
      job_post_date: '2 days ago',
      job_comp_logo: '',
      job_comp_name: 'Avanexa Technologies',
      job_comp_book_status: false,
      job_comp_salary: '₹15k -  ₹30 k',
      job_comp_applicant: '15',
      job_comp_loc: 'Chennai',
    },
    {
      id: 5,
      job_name: 'Website designer',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Full Time',
      job_post_date: '4 days ago',
      job_comp_logo: '',
      job_comp_name: 'Brightway Group Tech',
      job_comp_book_status: false,
      job_comp_salary: '₹25k -  ₹60 k',
      job_comp_applicant: '7',
      job_comp_loc: 'Bangalore',
    },
    {
      id: 6,
      job_name: 'SEO Analyst',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Part Time',
      job_post_date: '2 days ago',
      job_comp_logo: '',
      job_comp_name: 'Avanexa Technologies',
      job_comp_book_status: false,
      job_comp_salary: '₹15k -  ₹30 k',
      job_comp_applicant: '15',
      job_comp_loc: 'Chennai',
    },
    {
      id: 7,
      job_name: 'Website designer',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Full Time',
      job_post_date: '4 days ago',
      job_comp_logo: '',
      job_comp_name: 'Brightway Group Tech',
      job_comp_book_status: false,
      job_comp_salary: '₹25k -  ₹60 k',
      job_comp_applicant: '7',
      job_comp_loc: 'Bangalore',
    },
    {
      id: 8,
      job_name: 'SEO Analyst',
      image: Media.AuctionMain,
      subImage: Media.AuctionSub,
      job_type: 'Part Time',
      job_post_date: '2 days ago',
      job_comp_logo: '',
      job_comp_name: 'Avanexa Technologies',
      job_comp_book_status: false,
      job_comp_salary: '₹15k -  ₹30 k',
      job_comp_applicant: '15',
      job_comp_loc: 'Chennai',
    },
  ]);

  const [benefitData, setBenefitData] = useState([
    {
      id: 0,
      benefit_data: 'Health insurance',
    },
    {
      id: 1,
      benefit_data: 'Plans for retirement',
    },
    {
      id: 2,
      benefit_data: 'Paid time off (PTO)',
    },
    {
      id: 3,
      benefit_data: 'Disability insurance',
    },
    {
      id: 4,
      benefit_data: 'Life insurance',
    },
    {
      id: 5,
      benefit_data: 'Employee assistance programs',
    },
  ]);

  const [rolesData, setRolesData] = useState([
    {
      id: 0,
      roles_data: 'Research and generate lists of potential customers',
    },
    {
      id: 1,
      roles_data:
        'To nurture the database and ensure maximum customer progression',
    },
    {
      id: 2,
      roles_data:
        'Provide input on customer briefs, presentations, and sales literature',
    },
    {
      id: 3,
      roles_data: 'Help develop client relationships.',
    },
    {
      id: 4,
      roles_data: 'Learn and apply sales techniques',
    },
    {
      id: 5,
      roles_data: 'Handle CRM and maintain sales records',
    },
    {
      id: 6,
      roles_data: 'Rotating Shift depending on region requirements',
    },
  ]);

  const [qualifyData, setQualifyData] = useState([
    {
      id: 0,
      qualify_data:
        'Experience in new business development, lead generation, and account management',
    },
    {
      id: 1,
      qualify_data: 'Excellent communication skills, both verbal and written',
    },
    {
      id: 2,
      qualify_data:
        'Ability to build and maintain relationships with clients and team members',
    },
    {
      id: 3,
      qualify_data: 'Strong analytical and problem-solving skills',
    },
    {
      id: 4,
      qualify_data: 'Experience in the IT industry is a plus',
    },
    {
      id: 5,
      qualify_data:
        'Bachelors degree in Business, Communications, Marketing, or a related field is preferred',
    },
  ]);

  const [routes] = useState([
    {id: 1, title: 'Buy'},
    {id: 2, title: 'Rent'},
    {id: 3, title: 'Rent'},
    {id: 4, title: 'Rent'},
    {id: 5, title: 'Rent'},
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const taby = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateRight: 'clamp',
  });

  const [BuySection] = useState([
    {
      id: 1,
      title: 'Apply Albion Home Online',
      data: ['Apply Albion Home Online'],
    },
    {id: 2, title: 'Check your Eligibility', data: ['Check your Eligibility']},
    {id: 3, title: 'How it works', data: ['How it works']},
    {id: 3, title: 'Banner', data: ['Banner']},
    {id: 3, title: 'RecommendedJobs', data: ['RecommendedJobs']},
    {id: 3, title: 'SimilarJobs', data: ['SimilarJobs']},
  ]);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, []);

  // useEffect(() => {
  //     try {
  //         const unsubscribe = NetInfo.addEventListener(state => {
  //             setNetinfo(state.isConnected);
  //         });
  //         return () => unsubscribe;
  //     } catch (error) {
  //         console.log("catch in use_effect's Detailed_Screen : ", error);
  //     }
  // }, []);

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const syncScrollOffset = () => {
    // const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.SectionList
        sections={BuySection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({item}) => {
          switch (item) {
            case 'Apply Albion Home Online':
              return (
                <View style={{width: scr_width, backgroundColor: 'white'}}>
                  <View style={{width: '100%'}}>
                    <View style={{width: '100%', height: 145}}>
                      <Image
                        source={require('../../assets/images/sub_banner.png')}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 90,
                      marginHorizontal: 10,
                      width: 100,
                      height: 100,
                      elevation: 2,
                      padding: 10,
                      backgroundColor: Color.white,
                      borderRadius: 50,
                    }}>
                    <Image
                      // source={Media.albionlogo}
                      source={{uri: Media.albionlogo}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
              );
            case 'Check your Eligibility':
              return (
                <View
                  style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                        paddingHorizontal: 10,
                      }}>
                      Business Development Executive
                    </Text>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Poppins.Light,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                      }}>
                      Avanexa Technologies
                    </Text>

                    <View
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 2,
                      }}>
                      <Iconviewcomponent
                        Icontag={'FontAwesome'}
                        iconname={'star'}
                        icon_size={20}
                        icon_color={Color.sunShade}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          color: Color.Venus,
                          fontFamily: Poppins.Medium,
                          paddingHorizontal: 5,
                        }}>
                        4.5
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: Color.Venus,
                          fontFamily: Poppins.Medium,
                          paddingHorizontal: 5,
                        }}>
                        (500+ reviews)
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        paddingVertical: 5,
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            paddingVertical: 20,
                            backgroundColor: '#EFFAFF',
                            borderRadius: 10,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Iconviewcomponent
                              Icontag={'MaterialCommunityIcons'}
                              iconname={'home-city-outline'}
                              icon_size={36}
                              icon_color={Color.primary}
                            />
                          </View>
                          <View
                            style={{
                              flex: 2,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 16,
                                color: Color.primary,
                                fontFamily: Poppins.Bold,
                                paddingHorizontal: 5,
                              }}>
                              Private
                            </Text>
                            <Text
                              style={{
                                width: '100%',
                                fontSize: 13,
                                textAlign: 'center',
                                color: Color.secondary,
                                fontFamily: Poppins.Medium,
                                paddingHorizontal: 5,
                              }}
                              numberOfLines={2}>
                              Organization Type
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: 10,
                            height: '100%',
                            backgroundColor: Color.white,
                          }}></View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            paddingVertical: 30,
                            backgroundColor: '#EFFAFF',
                            borderRadius: 10,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Iconviewcomponent
                              Icontag={'FontAwesome'}
                              iconname={'users'}
                              icon_size={36}
                              icon_color={Color.primary}
                            />
                          </View>
                          <View
                            style={{
                              flex: 2,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 16,
                                color: Color.primary,
                                fontFamily: Poppins.Bold,
                                paddingHorizontal: 5,
                              }}>
                              20-50
                            </Text>
                            <Text
                              style={{
                                width: '100%',
                                fontSize: 13,
                                textAlign: 'center',
                                color: Color.secondary,
                                fontFamily: Poppins.Medium,
                                paddingHorizontal: 5,
                              }}
                              numberOfLines={2}>
                              Employees
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            case 'RecommendedJobs':
              return (
                <View
                  style={{
                    width: scr_width,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          // width: '90%',
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                          paddingHorizontal: 10,
                        }}>
                        About Company
                      </Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'left',
                          marginHorizontal: 10,
                          fontFamily: 'Poppins-Regular',
                          letterSpacing: 0.5,
                          lineHeight: 25,
                        }}>
                        ODD Infotech is a leading IT solutions provider known
                        for its innovation and commitment to delivering
                        top-notch services to clients. We are seeking a skilled
                        Business Development Executive with proven experience in
                        the IT Service industry to drive revenue generation and
                        client acquisition.{' '}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <View style={{paddingVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: Color.cloudyGrey,
                            fontFamily: Poppins.Light,
                          }}>
                          Phone
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: Color.lightBlack,
                            fontFamily: Poppins.Medium,
                          }}>
                          +91 74185 55205
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <View style={{paddingVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: Color.cloudyGrey,
                            fontFamily: Poppins.Light,
                          }}>
                          Email
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: Color.lightBlack,
                            fontFamily: Poppins.Medium,
                          }}>
                          info@oddinfotech.com
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <View style={{paddingVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: Color.cloudyGrey,
                            fontFamily: Poppins.Light,
                          }}>
                          Website
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: Color.lightBlack,
                            fontFamily: Poppins.Medium,
                          }}>
                          Https://www.oddinfotech.com/
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <View style={{paddingVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: Color.cloudyGrey,
                            fontFamily: Poppins.Light,
                          }}>
                          Address
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: Color.lightBlack,
                            fontFamily: Poppins.Medium,
                          }}>
                          37/1, First Floor Rajeshwari Nager Udayampalayam Main
                          Road, Nava India Rd, Coimbatore, Tamil Nadu 641028
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      backgroundColor: '#EDF9FF',
                      borderRadius: 5,
                      padding: 10,
                    }}>
                    {/* <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10, paddingVertical: 10 }}>
                                            Recruiter Details
                                        </Text> */}

                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <View style={{paddingVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: Color.cloudyGrey,
                            fontFamily: Poppins.Light,
                          }}>
                          Follow Us
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingVertical: 10,
                          }}>
                          <TouchableOpacity
                            style={{
                              width: 44,
                              height: 44,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#0a66c2',
                              borderRadius: 50,
                              marginHorizontal: 5,
                            }}>
                            <Iconviewcomponent
                              Icontag={'Entypo'}
                              iconname={'linkedin'}
                              icon_size={22}
                              icon_color={Color.white}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              width: 44,
                              height: 44,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#4867aa',
                              borderRadius: 50,
                              marginHorizontal: 5,
                            }}>
                            <Iconviewcomponent
                              Icontag={'Fontisto'}
                              iconname={'facebook'}
                              icon_size={22}
                              icon_color={Color.white}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              width: 44,
                              height: 44,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#f00',
                              borderRadius: 50,
                              marginHorizontal: 5,
                            }}>
                            <Iconviewcomponent
                              Icontag={'Entypo'}
                              iconname={'youtube'}
                              icon_size={22}
                              icon_color={Color.white}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              width: 44,
                              height: 44,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#ff66bf',
                              borderRadius: 50,
                              marginHorizontal: 5,
                            }}>
                            <Iconviewcomponent
                              Icontag={'Entypo'}
                              iconname={'instagram'}
                              icon_size={22}
                              icon_color={Color.white}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );

            case 'SimilarJobs':
              return (
                <View
                  style={{
                    width: scr_width,
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                          paddingHorizontal: 10,
                        }}>
                        Current Openings
                      </Text>
                    </View>
                  </View>

                  <View style={{width: '95%'}}>
                    <FlatList
                      data={ActionSelect}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: 320,
                              // alignItems: 'center',
                              // justifyContent: 'center',
                              borderColor: Color.lightgrey,
                              borderWidth: 1,
                              padding: 10,
                              margin: 5,
                              borderRadius: 5,
                            }}>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  padding: 10,
                                  paddingHorizontal: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    padding: 7,
                                    paddingHorizontal: 20,
                                    backgroundColor: '#DEFCE4',
                                    fontSize: 12,
                                    color: '#0BA02C',
                                    borderRadius: 5,
                                    fontFamily: Poppins.Medium,
                                  }}>
                                  {item.job_type}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
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
                                    fontFamily: Poppins.Medium,
                                    paddingHorizontal: 5,
                                  }}>
                                  {item.job_post_date}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  padding: 10,
                                  paddingHorizontal: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#EFFAFF',
                                  borderRadius: 50,
                                }}>
                                <Image
                                  source={{uri: item.image}}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 2,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  paddingHorizontal: 10,
                                }}>
                                <Text
                                  style={{
                                    width: '100%',
                                    fontSize: 14,
                                    color: Color.lightBlack,
                                    fontFamily: Poppins.SemiBold,
                                    textAlign: 'justify',
                                  }}
                                  numberOfLines={2}>
                                  {item.job_name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.Venus,
                                    fontFamily: Poppins.Medium,
                                    textAlign: 'justify',
                                  }}
                                  numberOfLines={1}>
                                  {item.job_comp_name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 0.5,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Iconviewcomponent
                                  Icontag={'FontAwesome'}
                                  iconname={'bookmark-o'}
                                  icon_size={22}
                                  icon_color={Color.Venus}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: 10,
                              }}>
                              <View
                                style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.lightBlack,
                                    fontFamily: Poppins.Medium,
                                    paddingHorizontal: 5,
                                  }}>
                                  Salary / Month
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    color: Color.primary,
                                    fontFamily: Poppins.SemiBold,
                                    paddingHorizontal: 5,
                                  }}>
                                  {item.job_comp_salary}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.lightBlack,
                                    fontFamily: Poppins.Medium,
                                    paddingHorizontal: 5,
                                  }}>
                                  Applicant
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    source={require('../../assets/images/vector.png')}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 17,
                                      color: Color.primary,
                                      fontFamily: Poppins.SemiBold,
                                      paddingHorizontal: 5,
                                    }}>
                                    {item.job_comp_applicant}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      horizontal
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
    // width: scr_width,
    // height: scr_height,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  numberCountryCode: {
    height: 48,
    color: Color.black,
    fontSize: 16,
    fontFamily: Poppins.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
});

//make this component available to the app
export default CompanyDetails;
