import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import F5Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './Screens/Home/HomeScreen';
import AboutUs from './Screens/SideMenu/AboutUs';
import ContactUs from './Screens/SideMenu/ContactUs';
import NotificationList from './Screens/SideMenu/NotificationList';
import TermsCondition from './Screens/SideMenu/TermsCondition';
import PrivacyPolicy from './Screens/SideMenu/PrivacyPolicy';
import Color from './Global/Color';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import LogoTitle, {PrimeLogoTitle} from './Components/LogoTitle';
import {NavigationDrawerStructure} from './Components/Nav/NavDrawer';
import Login from './Screens/Auth/Login';
import Register from './Screens/Auth/Register';
import {Media} from './Global/Media';
import {Poppins} from './Global/FontFamily';
import FAQs from './Screens/SideMenu/FAQs';
import AppliedJobs from './Screens/Home/Jobs/AppliedJobs';
import {Iconviewcomponent} from './Components/Icontag';
import {Badge} from 'react-native-paper';
import JobListScreen from './Screens/Home/JobListScreen';
import DetailedScreen from './Screens/Home/DetailedScreen';
import ApplyJob from './Screens/SubPages/ApplyJob';
import CompanyList from './Screens/Home/CompanyList';
import CompanyDetails from './Screens/Home/CompanyDetails';
import SavedJobScreen from './Screens/Home/SavedJobScreen';
import EducationDetails from './Screens/Profile/EducationDetails';
import EmploymentDetails from './Screens/Profile/EmploymentDetails';
import SkillScreen from './Screens/Profile/Skills';
import ProjectScreen from './Screens/Profile/ProjectScreen';
import FilterScreen from './Screens/Home/FilterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary, elevation: 0},
          headerLeft: () => (
            <NavigationDrawerStructure navigation={navigation} home={true} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{right: 10}}>
              <Badge
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -5,
                  zIndex: 1000,
                }}>
                05
              </Badge>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'notifications-sharp'}
                icon_size={26}
                icon_color={Color.white}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({navigation, route}) => ({
          headerTitle: 'About Us',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={({navigation, route}) => ({
          headerTitle: 'Contact Us',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={({navigation, route}) => ({
          headerTitle: 'FAQs',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationList}
        options={({navigation, route}) => ({
          headerTitle: 'Notifications List',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={({navigation, route}) => ({
          headerTitle: 'Terms & Conditions',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({navigation, route}) => ({
          headerTitle: 'Privacy Policy',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="JobListScreen"
        component={JobListScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Job List',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="DetailedScreen"
        component={DetailedScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Detailed Screen',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{right: 10}}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'sharealt'}
                icon_size={26}
                icon_color={Color.white}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ApplyJob"
        component={ApplyJob}
        options={({navigation, route}) => ({
          headerTitle: 'Apply Job',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="CompanyList"
        component={CompanyList}
        options={({navigation, route}) => ({
          headerTitle: 'Company List',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="CompanyDetails"
        component={CompanyDetails}
        options={({navigation, route}) => ({
          headerTitle: 'Company Details',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Filter',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const AppliedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Prime">
      <Stack.Screen
        name="AppliedJobs"
        component={AppliedJobs}
        options={({navigation, route}) => ({
          headerTitle: 'Applied Jobs',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginHorizontal: 10}}>
              <Image
                source={{uri: Media.fobes_white}}
                style={{
                  width: 100,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const SavedJobStack = () => {
  return (
    <Stack.Navigator initialRouteName="Saved">
      <Stack.Screen
        name="Saved"
        component={SavedJobScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Saved Jobs',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginHorizontal: 10}}>
              <Image
                source={{uri: Media.fobes_white}}
                style={{
                  width: 100,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Profile',
          headerTitleStyle: {color: Color.white},
          headerStyle: {backgroundColor: Color.primary},
          // headerTitle: '',
          // headerTitleStyle: { color: Color.white },
          // headerStyle: { backgroundColor: Color.white },
          // headerTitleStyle: { color: Color.black, fontFamily: Poppins.SemiBold },
          // headerTitleAlign: 'center',
          // headerStyle: { backgroundColor: Color.white },
          // headerLeft: () => (
          //   <NavigationDrawerStructure navigation={navigation} home={false} />
          // ),
          // headerRight: () => (
          //   <TouchableOpacity style={{ marginHorizontal: 10 }}>
          //     <Text
          //       style={{
          //         fontFamily: Poppins.SemiBold,
          //         fontSize: 18,
          //         color: Color.white,
          //       }}>
          //       Edit
          //     </Text>
          //   </TouchableOpacity>
          // ),
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginHorizontal: 10}}>
              <Image
                source={{uri: Media.fobes_white}}
                style={{
                  width: 100,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
          // headerRightContainerStyle: { marginRight: 10 },
        })}
      />
      <Stack.Screen
        name="Education"
        component={EducationDetails}
        options={({navigation, route}) => ({
          headerTitle: 'Education Details',
          headerTitleStyle: {color: Color.black},
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Color.white},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.black}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Experiance"
        component={EmploymentDetails}
        options={({navigation, route}) => ({
          headerTitle: 'Employement Details',
          headerTitleStyle: {color: Color.black},
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Color.white},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.black}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Skill"
        component={SkillScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Key Skills',
          headerTitleStyle: {color: Color.black},
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Color.white},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.black}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Project"
        component={ProjectScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Projects',
          headerTitleStyle: {color: Color.black},
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Color.white},
          headerLeft: () => (
            <View style={{marginHorizontal: 10}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.black}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    // backgroundColor: Color.white,
                    // width: 50,
                    // height: 50,
                    // borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // position: 'absolute',
                    // bottom: 5,
                  }}>
                  <Icon name={'home'} size={25} color={Color.primary} />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    // marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    // backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Home
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'home'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? '#8C193F' : '#000',
                  }}>
                  Home
                </Text>
              </View>
            );
          } else if (route.name === 'ApplyJobs') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    // backgroundColor: Color.white,
                    // width: 50,
                    // height: 50,
                    // borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // position: 'absolute',
                    // bottom: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'location-arrow'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    // marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    // backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Applied Jobs
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'FontAwesome5'}
                  iconname={'location-arrow'}
                  icon_size={23}
                  icon_color={color}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  Applied Jobs
                </Text>
              </View>
            );
          } else if (route.name === 'SavedJobs') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    // backgroundColor: Color.white,
                    // width: 50,
                    // height: 50,
                    // borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // position: 'absolute',
                    // bottom: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'bookmark'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    // marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    // backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Saved Jobs
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'bookmark-outline'}
                  icon_size={25}
                  icon_color={color}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  Saved Jobs
                </Text>
              </View>
            );
          } else if (route.name === 'ProfileTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    // backgroundColor: Color.white,
                    // width: 50,
                    // height: 50,
                    // borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // position: 'absolute',
                    // bottom: 5,
                  }}>
                  <Icon
                    name={'person-circle-outline'}
                    size={25}
                    color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    // marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    // backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Profile
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'person-circle-outline'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  Profile
                </Text>
              </View>
            );
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.smokeyGrey,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ApplyJobs"
        component={AppliedStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
