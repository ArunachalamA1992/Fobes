import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheet } from 'react-native-btr';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Color from '../../Global/Color';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../Icontag';

const CustomDrawerContent = props => {
  const [itemSelected, setItemSelected] = useState('');
  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);
  const dispatch = useDispatch();
  const [loginEnable, setLoginEnable] = useState(false);
  const [AuctionloginEnable, setAuctionLoginEnable] = useState(false);
  const [maxRating, setMaxRating] = useState([
    {
      id: 1,
      rating: 1,
      experience: 'Poor',
    },
    {
      id: 2,
      rating: 2,
      experience: 'Bad',
    },
    {
      id: 3,
      rating: 3,
      experience: 'Okay',
    },
    {
      id: 4,
      rating: 4,
      experience: 'Average',
    },
    {
      id: 5,
      rating: 5,
      experience: 'Good',
    },
  ]);
  // const Login_type = useSelector(state => state.UserReducer.Login_type);
  // const userData = useSelector(state => state.UserReducer.userData);
  // var {
  //   user_id,
  //   username,
  //   profile,
  //   user_type_id,
  //   mobile_number,
  //   email,
  //   post_quota,
  // } = userData;
  // const Auction_userData = useSelector(
  //   state => state.UserReducer.auctionUserData,
  // );
  // var {id, name, phone_number, email} = Auction_userData;
  const starImageCorner = Media.starOutline;
  const [defaultRating, setDefaultRating] = useState(null);
  const starImageFilled = Media.star;

  const onShare = async () => {
    try {
      const playStoreLink =
        'https://play.google.com/store/apps/details?id=com.albion&hl=en';

      const result = await Share.share({
        message: `Try Albion, your go-to housing app, and see how much better your house-hunting experience can be. You won't regret it.: ${playStoreLink}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };

  function submitReview() {
    try {
      setSelectCitybottomSheetVisible(false);
      props.navigation.navigate('Home');
      ToastAndroid.show(
        'Your review will be update on Play Store',
        ToastAndroid.LONG,
      );
    } catch (error) {
      console.log('catch in submit_Review : ', error);
    }
  }

  function selectCity_toggleBottomView() {
    try {
      setSelectCitybottomSheetVisible(!selectCitybottomSheetVisible);
    } catch (error) {
      console.log(
        'catch in Home_interior selectCity_toggleBottomView :',
        error,
      );
    }
  }

  function selCity_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={selectCitybottomSheetVisible}
            onBackButtonPress={selectCity_toggleBottomView}
            onBackdropPress={selectCity_toggleBottomView}>
            <View
              style={{
                backgroundColor: Color.white,
                alignItems: 'center',
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: 15,
                  paddingStart: 30,
                  backgroundColor: '#FBE9EF',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.lightBlack,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Rate Your Experience
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectCitybottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{ color: Color.primary, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.customRatingBarStyle}>
                {maxRating.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => handleRatingPress(item.rating)}
                      style={{
                        marginHorizontal: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.starImageStyle}
                        source={{
                          uri:
                            item.rating <= defaultRating
                              ? starImageFilled
                              : starImageCorner,
                        }}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 14,
                          color: Color.cloudyGrey,
                          marginVertical: 5,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {item.experience}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  // paddingVertical: 10,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  If You are Loving Our App Rate Us 5
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => submitReview()}
                style={{
                  width: '85%',
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.primary,
                  borderRadius: 5,
                  marginBottom: 10,
                }}>
                <Text style={{ fontSize: 14, color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in Home_interior selCity_BottomSheet_menu :', error);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <View>
        <View
          style={{
            backgroundColor: Color.primary,
            height: 200,
            padding: 10,
          }}>
          <View
            // onPress={() => {
            //   props.navigation.navigate('ProfileTab');
            // }}
            style={{
              justifyContent: 'center',
            }}>
            <Image
              source={{ uri: Media.Userpng }}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />

            <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.white,
                  fontFamily: Poppins.Bold,
                  textTransform: 'capitalize',
                  marginVertical: 5,
                  marginHorizontal: 10,
                  marginVertical: Platform.OS == 'ios' ? 5 : 0,
                }}
                numberOfLines={1}>
                *****
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.white,
                  fontFamily: Poppins.SemiBold,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                  marginVertical: Platform.OS == 'ios' ? 5 : 0,
                }}>
                9876543210
              </Text>
            </View>

          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginVertical: 10, marginBottom: 50 }}>
          <View
            style={{
              backgroundColor:
                itemSelected === 'Home' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Home');
                // props.navigation.navigate('Home');
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={itemSelected === 'Home' ? 'home' : 'home'}
                icon_size={itemSelected === 'Home' ? 22 : 18}
                icon_color={
                  itemSelected === 'Home' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color: itemSelected === 'Home' ? Color.white : Color.black,
                  fontFamily: itemSelected === 'Home' ? 'bold' : 'normal',
                }}>
                Home
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'favorite' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('favorite');
                // props.navigation.navigate('PropertyAdvice');
              }}>
              <Iconviewcomponent
                Icontag={'MaterialIcons'}
                iconname={itemSelected === 'favorite' ? 'favorite' : 'favorite-outline'}
                icon_size={itemSelected === 'favorite' ? 22 : 18}
                icon_color={
                  itemSelected === 'favorite' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'favorite' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'favorite' ? 'bold' : 'normal',
                }}>
                Favorite Jobs
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'job' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('job');
                // props.navigation.navigate('PropertyAdvice');
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={
                  itemSelected === 'job' ? 'file-document-edit' : 'file-document-edit-outline'
                }
                icon_size={itemSelected === 'job' ? 22 : 18}
                icon_color={
                  itemSelected === 'job' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'job'
                      ? Color.white
                      : Color.black,
                  fontWeight:
                    itemSelected === 'job' ? 'bold' : 'normal',
                }}>
                Job Alert
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'AboutUs' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('AboutUs');
                props.navigation.navigate('AboutUs');
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={
                  itemSelected === 'AboutUs'
                    ? 'information-circle'
                    : 'information-circle-outline'
                }
                icon_size={itemSelected === 'AboutUs' ? 22 : 18}
                icon_color={
                  itemSelected === 'AboutUs' ? Color.white : Color.grey
                }
              />

              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'AboutUs' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'AboutUs' ? 'bold' : 'normal',
                }}>
                About Us
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Contact' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Contact');
                props.navigation.navigate('ContactUs');
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={
                  itemSelected === 'Contact'
                    ? 'contacts'
                    : 'contacts'
                }
                icon_size={itemSelected === 'Contact' ? 22 : 18}
                icon_color={
                  itemSelected === 'Contact' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'Contact' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'Contact' ? 'bold' : 'normal',
                }}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'FAQs' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('FAQs');
                props.navigation.navigate('FAQs');
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={
                  itemSelected === 'FAQs'
                    ? 'frequently-asked-questions'
                    : 'frequently-asked-questions'
                }
                icon_size={itemSelected === 'FAQs' ? 22 : 18}
                icon_color={
                  itemSelected === 'FAQs' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'FAQs' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'FAQs' ? 'bold' : 'normal',
                }}>
                FAQs
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'termscondition'
                  ? Color.primary
                  : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('termscondition');
                props.navigation.navigate('TermsCondition');
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={
                  itemSelected === 'termscondition'
                    ? 'content-save-all'
                    : 'content-copy'
                }
                icon_size={itemSelected === 'termscondition' ? 22 : 18}
                icon_color={
                  itemSelected === 'termscondition' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'termscondition'
                      ? Color.white
                      : Color.black,
                  fontWeight:
                    itemSelected === 'termscondition' ? 'bold' : 'normal',
                }}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>


          <View
            style={{
              backgroundColor:
                itemSelected === 'PrivacyPolicy' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('PrivacyPolicy');
                props.navigation.navigate('PrivacyPolicy');
              }}>
              <Iconviewcomponent
                Icontag={'MaterialIcons'}
                iconname={
                  itemSelected === 'PrivacyPolicy' ? 'policy' : 'policy'
                }
                icon_size={itemSelected === 'PrivacyPolicy' ? 22 : 18}
                icon_color={
                  itemSelected === 'PrivacyPolicy' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color:
                    itemSelected === 'PrivacyPolicy'
                      ? Color.white
                      : Color.black,
                  fontWeight:
                    itemSelected === 'PrivacyPolicy' ? 'bold' : 'normal',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ width: '90%', height: 0.5, marginVertical: 5, backgroundColor: '#666', justifyContent: 'center', alignSelf: 'center' }}></View> */}
          <View
            style={{
              backgroundColor:
                itemSelected === 'share' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('share');
                onShare();
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={
                  itemSelected === 'share'
                    ? 'share-social-sharp'
                    : 'share-social'
                }
                icon_size={itemSelected === 'share' ? 22 : 18}
                icon_color={
                  itemSelected === 'share' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color: itemSelected === 'share' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'share' ? 'bold' : 'normal',
                }}>
                Share the app
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Settings' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Settings');
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={
                  itemSelected === 'Settings'
                    ? 'settings'
                    : 'settings'
                }
                icon_size={itemSelected === 'Settings' ? 22 : 18}
                icon_color={
                  itemSelected === 'Settings' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color: itemSelected === 'Settings' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'Settings' ? 'bold' : 'normal',
                }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Logout' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Logout');
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={
                  itemSelected === 'Logout'
                    ? 'logout'
                    : 'logout'
                }
                icon_size={itemSelected === 'Logout' ? 22 : 18}
                icon_color={
                  itemSelected === 'Logout' ? Color.white : Color.grey
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 10,
                  color: itemSelected === 'Logout' ? Color.white : Color.black,
                  fontWeight: itemSelected === 'Logout' ? 'bold' : 'normal',
                }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14, color: '#00961A' }}>
              App version : 01
            </Text>
          </View>

          {selCity_BottomSheetmenu()}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

export default CustomDrawerContent;
