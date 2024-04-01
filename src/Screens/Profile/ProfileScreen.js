import React, {Component, useEffect, useState} from 'react';
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
import {Poppins} from '../../Global/FontFamily';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Button, Divider} from 'react-native-paper';
import {pick, keepLocalCopy} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const ProfileScreen = ({navigation}) => {
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);
  const [resumeVisible, setResumeVisible] = useState(false);
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
      id: 1,
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
      phone: '9876543211',
    },
  ]);
  const isResumeUploaded = () => {
    return selectedResumeFile != null;
  };

  const filteredProfileCompletion = isResumeUploaded()
    ? profileCompletion.slice(1)
    : profileCompletion;

  const profileupdate = async item => {
    try {
      if (item?.id == 1) {
        const [{name, uri}] = await pick();
        setSelectedResumeFile({name, uri});

        const [copyResult] = await keepLocalCopy({
          files: [
            {
              uri,
              fileName: name ?? 'fallback-name',
            },
          ],
          destination: 'documentDirectory',
        });
        if (copyResult.status === 'success') {
        }
      } else if (item?.id == 2) {
        navigation.navigate('Skill');
      }
    } catch (err) {}
  };

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
    calculateProfileCompletion();
  }, [profileStatus, selectedResumeFile]);

  const calculateProfileCompletion = () => {
    const totalFields = 3;
    let completedFields = 0;

    if (selectedResumeFile != null) {
      completedFields++;
    }
    // if (selectedResumeFile?.trim() !== '') {
    //   completedFields++;
    // }

    const percentage = (completedFields / totalFields) * 100;
    setProfileStatus(percentage);
  };
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
                  fontFamily: Poppins.SemiBold,
                  fontSize: 18,
                  color: Color.black,
                }}>
                Demo User
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 16,
                  color: Color.cloudyGrey,
                }}>
                Dream big, work hard, stay focused
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#DBF3FF',
                padding: 15,
                borderRadius: 100,
              }}>
              <FIcon name="pencil" size={25} color={Color.blue} />
            </View>
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
                  fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
                  fontSize: 14,
                  color: Color.lightBlack,
                  marginHorizontal: 10,
                }}>
                Coimbatore, Tamilnadu
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            justifyContent: 'center',
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
                  fontFamily: Poppins.Bold,
                  fontSize: 16,
                  color: Color.secondary,
                }}>
                15
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Bold,
                  fontSize: 16,
                  color: Color.secondary,
                }}>
                80
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
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
            marginVertical: 20,
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
              radius={40}
              progressValueColor={'#000'}
              valueSuffix="%"
              titleColor={Color.black}
              activeStrokeColor="#0BA02C"
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              activeStrokeSecondaryColor={'#0BA02C'}
            />
            <View
              style={{
                flex: 1,
                padding: 10,
              }}>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 18,
                  color: Color.black,
                }}>
                Profile Score
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
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
                          fontFamily: Poppins.Bold,
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
                            fontFamily: Poppins.Medium,
                            fontSize: 16,
                            color: Color.black,
                          }}>
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: Poppins.Medium,
                            fontSize: 14,
                            color: Color.black,
                            marginVertical: 5,
                          }}>
                          {item?.subname}
                        </Text>
                        <Button
                          mode="contained"
                          onPress={() => {
                            profileupdate(item);
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
                  fontFamily: Poppins.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                }}>
                Basic Details
              </Text>
              <View
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
                    fontFamily: Poppins.Medium,
                    fontSize: 14,
                    color: Color.blue,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  Edit Info
                </Text>
              </View>
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
                        fontFamily: Poppins.Medium,
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
                    <Icon
                      name={'location'}
                      size={20}
                      color={Color.lightBlack}
                    />
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
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
                        fontFamily: Poppins.Medium,
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
                    <Icon name={'call'} size={20} color={Color.lightBlack} />
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                }}>
                Resume
              </Text>
              {selectedResumeFile != null && (
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
                      fontFamily: Poppins.Medium,
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
            {selectedResumeFile != null ? (
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
                      fontFamily: Poppins.SemiBold,
                      fontSize: 18,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                    }}>
                    {selectedResumeFile?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Poppins.Medium,
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
                    fontFamily: Poppins.Medium,
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
                      const [{name, uri}] = await pick();
                      setSelectedResumeFile({name, uri});

                      const [copyResult] = await keepLocalCopy({
                        files: [
                          {
                            uri,
                            fileName: name ?? 'fallback-name',
                          },
                        ],
                        destination: 'documentDirectory',
                      });
                      if (copyResult.status === 'success') {
                      }
                    } catch (err) {}
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
                  fontFamily: Poppins.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                }}>
                biography
              </Text>
              <View
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
                    fontFamily: Poppins.Medium,
                    fontSize: 14,
                    color: Color.blue,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  Edit Info
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              Dream big, work hard, stay focused
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
                fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: '#EAEAEF50',
                padding: 5,
                borderRadius: 50,
                paddingHorizontal: 15,
              }}>
              UXUI
            </Text>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: '#EAEAEF50',
                padding: 5,
                borderRadius: 50,
                paddingHorizontal: 15,
              }}>
              Graphic Design
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
                fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
              style={{width: 80, height: 80, resizeMode: 'contain'}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 16,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                UI designer
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 16,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Avanexa Technologies - Full Time
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Jan 2023 - Present
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
                fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
              style={{width: 80, height: 80, resizeMode: 'contain'}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                B.sc Multimedia and Design
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                PSG College of Arts and Science, Coimbatore
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                2017-2020
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
                fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
                  fontFamily: Poppins.Medium,
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
              style={{width: 80, height: 80, resizeMode: 'contain'}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 18,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Albion Mobile app
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                User Research, UI Designing
              </Text>
              <Text
                style={{
                  fontFamily: Poppins.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
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
                fontFamily: Poppins.Medium,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Personal Details
            </Text>
            <View
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
                  fontFamily: Poppins.Medium,
                  fontSize: 14,
                  color: Color.blue,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}>
                Edit Info
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Gender
            </Text>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Male
            </Text>
          </View>
          <Divider style={{height: 1, marginVertical: 10}} />
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Marital Status
            </Text>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Single
            </Text>
          </View>
          <Divider style={{height: 1, marginVertical: 10}} />
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Languages Known
            </Text>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}>
              Tamil, English
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
                fontFamily: Poppins.Bold,
                fontWeight: 'bold',
                fontSize: 20,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                textAlign: 'center',
                marginVerticalL: 10,
              }}>
              Resume
            </Text>
            <Text
              style={{
                fontFamily: Poppins.Bold,
                fontWeight: '600',
                fontSize: 16,
                color: Color.cloudyGrey,
                textTransform: 'capitalize',
                marginHorizontal: 10,
                marginVerticalL: 10,
              }}>
              Supported file format DOC,DOCX,PDF,RTF,Maximum file size 2MB
            </Text>
            {selectedResumeFile != null ? (
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
                        fontFamily: Poppins.SemiBold,
                        fontSize: 18,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      {selectedResumeFile?.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
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
                        setSelectedResumeFile(null);
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
                        const [{name, uri}] = await pick();
                        setSelectedResumeFile({name, uri});
                        setResumeVisible(false);

                        const [copyResult] = await keepLocalCopy({
                          files: [
                            {
                              uri,
                              fileName: name ?? 'fallback-name',
                            },
                          ],
                          destination: 'documentDirectory',
                        });
                        if (copyResult.status === 'success') {
                        }
                      } catch (err) {}
                    }}
                    style={{
                      backgroundColor: Color.primary,
                      marginHorizontal: 10,
                      alignItems: 'flex-end',
                    }}
                    textColor={Color.white}>
                    {selectedResumeFile != null
                      ? 'Update Resume'
                      : 'Upload Resume'}
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: Poppins.Medium,
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
                      const [{name, uri}] = await pick();
                      setSelectedResumeFile({name, uri});
                      setResumeVisible(false);

                      const [copyResult] = await keepLocalCopy({
                        files: [
                          {
                            uri,
                            fileName: name ?? 'fallback-name',
                          },
                        ],
                        destination: 'documentDirectory',
                      });
                      if (copyResult.status === 'success') {
                      }
                    } catch (err) {}
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
