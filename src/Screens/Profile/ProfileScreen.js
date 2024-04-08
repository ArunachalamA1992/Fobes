import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Gilmer} from '../../Global/FontFamily';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Button, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import common_fn from '../../Config/common_fn';
import {setCompleteProfile} from '../../Redux';

const ProfileScreen = ({navigation}) => {
  const [resumeVisible, setResumeVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.userData);
  var {
    title,
    firstName,
    lastName,
    gender,
    website,
    photo,
    cv,
    bio,
    maritalStatus,
    birthDate,
    visibility,
    cvVisibility,
    receivedJobAlert,
    profileComplete,
    candidateUpdatedAt,
    address,
    exactLocation,
    neighborhood,
    locality,
    place,
    district,
    postcode,
    region,
    country,
    long,
    lat,
    status,
    availableIn,
    whatsappNumber,
    name,
    username,
    email,
    image,
    role,
    recentActivitiesAlert,
    jobExpiredAlert,
    newJobAlert,
    shortlistedAlert,
    isDemoField,
    createdAt,
    updatedAt,
    authType,
    googleId,
    facebookId,
    provider,
    providerId,
    candidateEducations,
    candidateExperiences,
    candidateSkills,
    socialLinks,
  } = userData;
  const profile_complete = useSelector(
    state => state.UserReducer.profile_complete,
  );
  var {resume, details, skills} = profile_complete;
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
  const [profileStatus, setProfileStatus] = useState(0);
  const [basicDetails] = useState([
    {
      id: 1,
      location: 'Gandhipuram, Coimbatore, Tamilnadu - India',
      experiance: 'Fresher',
      email: 'Naveenkumar@avanexa.in',
      website: 'navee.com',
      phone: '9876543211',
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

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadResume = async () => {
    // let date = new Date();
    // let image_URL = '';
    // image_URL.map(itemImage => {
    //   let ext = getExtention(itemImage);
    //   ext = '.' + ext[0];
    //   const {config, fs} = RNFetchBlob;
    //   let DocumentDir = fs.dirs.DocumentDir;
    //   let options = {
    //     fileCache: true,
    //     addAndroidDownloads: {
    //       useDownloadManager: true,
    //       notification: true,
    //       path:
    //         DocumentDir +
    //         '/fobes' +
    //         '/File_' +
    //         Math.floor(date.getTime() + date.getSeconds() / 2) +
    //         ext,
    //       description: 'Image',
    //     },
    //   };
    //   config(options)
    //     .fetch('GET', itemImage)
    //     .then(async res => {
    //       // console.log('res.data', res.data);
    //       // Alert.alert('Success', `${item.product_name} Downloaded Successfully`);
    //     });
    // });
  };

  useEffect(() => {
    const profiledata = common_fn.calculateProfileCompletion(
      resume,
      skills,
      details,
    );
    setProfileStatus(profiledata);
  }, [profileStatus, resume, skills, details]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
          }}>
          <Image
            source={Media.user}
            style={{
              width: 120,
              height: 120,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Gilmer.Bold,
                  fontSize: 20,
                  color: Color.black,
                }}>
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 16,
                  color: Color.cloudyGrey,
                }}>
                {bio}
                {/* Dream big, work hard, stay focused */}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('profileIntro');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                padding: 15,
                borderRadius: 100,
              }}>
              <FIcon name="pencil" size={25} color={Color.blue} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <FIcon name="briefcase" size={20} color={Color.lightBlack} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.lightBlack,
                  marginHorizontal: 5,
                }}>
                UI Designer at Avanexa Technologies
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <F6Icon name="location-dot" size={20} color={Color.lightBlack} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.lightBlack,
                  marginHorizontal: 10,
                }}>
                {district}, {country}
                {/* Coimbatore, Tamilnadu */}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.white,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor: '#EFFAFF',
              padding: 15,
              margin: 10,
              borderRadius: 10,
            }}>
            <FIcon name="briefcase" size={20} color={Color.secondary} />
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate('AppliedJobs');
              }}>
              <Text
                style={{
                  fontFamily: Gilmer.Bold,
                  fontSize: 16,
                  color: Color.secondary,
                }}>
                15
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.secondary,
                }}>
                Applied Jobs
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor: '#EFFAFF',
              padding: 15,
              margin: 10,
              borderRadius: 10,
            }}>
            <F6Icon name="eye" size={20} color={Color.secondary} />
            <View
              style={{
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: Gilmer.Bold,
                  fontSize: 16,
                  color: Color.secondary,
                }}>
                80
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.secondary,
                }}>
                Profile Views
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // marginVertical: 20,
            padding: 10,
            backgroundColor: '#D9F2FE',
          }}>
          <View
            style={{
              marginVertical: 10,
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
                  fontFamily: Gilmer.Medium,
                  fontSize: 18,
                  color: Color.black,
                }}>
                Profile Score
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                }}>
                Boost your profile for your dream job
              </Text>
            </View>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {filteredProfileCompletion?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      backgroundColor: Color.white,
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
                          fontFamily: Gilmer.Bold,
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
                      <MCIcon name={item.icon} size={40} color={Color.blue} />
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: Gilmer.Medium,
                            fontSize: 16,
                            color: Color.black,
                          }}>
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: Gilmer.Medium,
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
                              const data = await common_fn.profileupdate(
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
                          }}
                          textColor={Color.white}>
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
        <View
          style={{
            backgroundColor: Color.white,
          }}>
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: Gilmer.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                }}>
                Basic Details
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('basicdetails');
                }}
                style={{
                  backgroundColor: '#DBF3FF',
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FIcon name="pencil" size={18} color={Color.blue} />
                <Text
                  style={{
                    fontFamily: Gilmer.Medium,
                    fontSize: 14,
                    color: Color.blue,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  Edit Info
                </Text>
              </TouchableOpacity>
            </View>
            {basicDetails?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: Color.white,
                  }}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Icon
                      name={'briefcase'}
                      size={20}
                      color={Color.lightBlack}
                    />
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.lightBlack,
                        marginHorizontal: 10,
                      }}>
                      {item?.experiance}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <F6Icon
                      name={'location-dot'}
                      size={20}
                      color={Color.lightBlack}
                    />
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.lightBlack,
                        marginHorizontal: 10,
                      }}>
                      {item?.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Icon name={'mail'} size={20} color={Color.lightBlack} />
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.lightBlack,
                        marginHorizontal: 10,
                      }}>
                      {item?.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <F6Icon
                      name={'folder-open'}
                      size={20}
                      color={Color.lightBlack}
                    />
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.lightBlack,
                        marginHorizontal: 10,
                      }}>
                      {item?.website}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Icon name={'call'} size={20} color={Color.lightBlack} />
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.lightBlack,
                        marginHorizontal: 10,
                      }}>
                      {item?.phone}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: Gilmer.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                }}>
                Resume
              </Text>
              {resume != null && resume?.name?.length > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#DBF3FF',
                    paddingHorizontal: 10,
                    borderRadius: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setResumeVisible(true);
                  }}>
                  <FIcon name="pencil" size={18} color={Color.blue} />
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 14,
                      color: Color.blue,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}>
                    Edit Info
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {resume != null && resume?.name?.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  downloadResume();
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: Color.cloudyGrey,
                  padding: 20,
                  borderRadius: 10,
                }}>
                <FIcon name={'folder-open'} size={40} color={Color.sunShade} />
                <View style={{marginHorizontal: 10, flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Gilmer.SemiBold,
                      fontSize: 18,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                    }}>
                    {resume?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                    }}>
                    Apr 01
                  </Text>
                </View>
                <FIcon name={'download'} size={25} color={Color.black} />
              </TouchableOpacity>
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: Gilmer.Medium,
                    fontSize: 14,
                    color: Color.black,
                    textTransform: 'capitalize',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  Uploading resume helps HRs learn more about you
                </Text>
                <Button
                  icon="upload"
                  mode="contained"
                  onPress={async () => {
                    try {
                      const data = await common_fn.profileupdate(1, navigation);
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
                    width: '50%',
                    backgroundColor: '#DBF3FF',
                    color: Color.black,
                  }}
                  textColor="#000">
                  Upload Resume
                </Button>
              </>
            )}
          </View>
          <Divider style={{height: 1, marginVertical: 10}} />
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: Gilmer.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                }}>
                biography
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DBF3FF',
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('basicdetails');
                }}>
                <FIcon name="pencil" size={18} color={Color.blue} />
                <Text
                  style={{
                    fontFamily: Gilmer.Medium,
                    fontSize: 14,
                    color: Color.blue,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  Edit Info
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              {bio}
              {/* Dream big, work hard, stay focused */}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Medium,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Skills
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Skill');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                {skills?.length > 0 ? 'Edit Info' : 'Add Skills'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {candidateSkills?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#EAEAEF50',
                    padding: 10,
                    borderRadius: 50,
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 16,
                      color: Color.black,
                      textTransform: 'capitalize',
                      paddingHorizontal: 15,
                    }}>
                    {item?.url}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Medium,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Experience
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Experiance');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Add
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Experiance');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Edit Info
              </Text>
            </TouchableOpacity>
          </View>
          {candidateExperiences?.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginVertical: 15,
                }}>
                <Image
                  source={Media.user}
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 16,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    {/* UI designer */}
                    {item?.designation}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    {/* Avanexa Technologies - Full Time */}
                    {item?.company}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Regular,
                      fontSize: 12,
                      color: Color.cloudyGrey,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    {/* Jan 2023 - Present */}
                    {item?.start} - {item?.end}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Medium,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Education
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Education');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Add
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Education');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Edit Info
              </Text>
            </TouchableOpacity>
          </View>
          {candidateEducations?.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginVertical: 15,
                }}>
                <Image
                  source={Media.user}
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 16,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    {/* B.sc Multimedia and Design */}
                    {item?.degree}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    {/* PSG College of Arts and Science, Coimbatore */}
                    {item?.institute_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Regular,
                      fontSize: 12,
                      color: Color.cloudyGrey,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    {/* 2017-2020 */}
                    {item?.year}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Medium,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Projects
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Project');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Add
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Project');
              }}
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Edit Info
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginVertical: 15,
            }}>
            <Image
              source={Media.user}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 16,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}>
                Albion Mobile app
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}>
                User Research, UI Designing
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Regular,
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}>
                Jan 2024 - Mar 2024
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Medium,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Personal Details
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#DBF3FF',
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
              }}
              onPress={() => {
                navigation.navigate('basicdetails');
              }}>
              <FIcon name="pencil" size={18} color={Color.blue} />
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Edit Info
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginVertical: 10}}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Gender
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Male
            </Text>
          </View>
          <View style={{flex: 1, marginVertical: 10}}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Marital Status
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Single
            </Text>
          </View>
          <View style={{flex: 1, marginVertical: 10}}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Languages Known
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Tamil, English
            </Text>
          </View>
          <View style={{flex: 1, marginVertical: 10}}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Date of Birth
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              01 - 05 - 1996
            </Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={resumeVisible}
        onRequestClose={() => {}}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.transparantBlack,
            justifyContent: 'center',
          }}>
          <Pressable
            style={{flex: 1, backgroundColor: Color.transparantBlack}}
            onPress={() => {
              setResumeVisible(false);
            }}
          />
          <View
            style={{
              backgroundColor: Color.white,
              padding: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontWeight: 'bold',
                fontSize: 20,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Resume
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontWeight: '600',
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              Supported file format DOC,DOCX,PDF,RTF,Maximum file size 2MB
            </Text>
            {resume != null && resume?.name?.length > 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    downloadResume();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: Color.cloudyGrey,
                    padding: 20,
                    borderRadius: 10,
                  }}>
                  <FIcon
                    name={'folder-open'}
                    size={40}
                    color={Color.sunShade}
                  />
                  <View style={{marginHorizontal: 10, flex: 1}}>
                    <Text
                      style={{
                        fontFamily: Gilmer.SemiBold,
                        fontSize: 18,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      {resume?.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      Apr 01
                    </Text>
                  </View>
                  <FIcon name={'download'} size={25} color={Color.black} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Button
                    mode="contained"
                    onPress={async () => {
                      try {
                        dispatch(
                          setCompleteProfile({
                            resume: null,
                            details: details,
                            skills: skills,
                          }),
                        );
                      } catch (err) {}
                    }}
                    style={{
                      backgroundColor: '#DBF3FF',
                      color: Color.red,
                    }}
                    textColor="#000">
                    Delete
                  </Button>
                  <Button
                    mode="contained"
                    onPress={async () => {
                      try {
                        const data = await common_fn.profileupdate(
                          1,
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
                      backgroundColor: Color.primary,
                      marginHorizontal: 10,
                      alignItems: 'flex-end',
                    }}
                    textColor={Color.white}>
                    {resume != null && resume?.name?.length > 0
                      ? 'Update Resume'
                      : 'Upload Resume'}
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: Gilmer.Medium,
                    fontSize: 14,
                    color: Color.black,
                    textTransform: 'capitalize',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  Uploading resume helps HRs learn more about you
                </Text>
                <Button
                  icon="upload"
                  mode="contained"
                  onPress={async () => {
                    try {
                      const data = await common_fn.profileupdate(1, navigation);
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
                    backgroundColor: '#DBF3FF',
                    color: Color.black,
                    alignItems: 'center',
                  }}
                  textColor="#000">
                  Upload Resume
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
});

export default ProfileScreen;
