import React, {useEffect, useState} from 'react';
import {LogBox, StatusBar, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import {Provider, useDispatch, useSelector} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import OnboardOne from './Screens/Onboarding/OnboardOne';
import OnboardTwo from './Screens/Onboarding/OnboardTwo';
import OnboardThree from './Screens/Onboarding/OnboardThree';
import Color from './Global/Color';
import TabNavigator, {Auth} from './route';
import SplashScreen from './SplashScreen';
import Store from './Redux/Store';
import AppliedJobs from './Screens/Home/Jobs/AppliedJobs';
import Icon from 'react-native-vector-icons/Ionicons';
import JobStatus from './Screens/Home/Jobs/JobStatus';
import Notification from './Screens/Home/Notification';
import SkillScreen from './Screens/Profile/Skills';
import Applycompletion from './Screens/Home/Jobs/Applycompletion';
import BasicDetails from './Screens/Profile/BasicDetails';
import SearchScreen from './Screens/Home/Search/SearchScreen';
import DetailedScreen from './Screens/Home/DetailedScreen';
import FilterListScreen from './Screens/Home/Filter/FilterListScreen';
import ForgotPassword from './Screens/Auth/ForgotPassword';
import PassOtpVerify from './Screens/Auth/PassOtpVerify';
import ResetPass from './Screens/Auth/ResetPass';
import {Linking} from 'react-native';
import {navigationRef} from '../RootNavigation';
import SearchDataList from './Screens/Home/Search/SearchDataList';
import {setNotificationCount, setUserData} from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchData from './Config/fetchData';
import TermsCondition from './Screens/SideMenu/TermsCondition';
import PrivacyPolicy from './Screens/SideMenu/PrivacyPolicy';
import CompanyDetails from './Screens/Home/CompanyDetails';
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const dispatch = useDispatch();

  const linking = {
    prefixes: ['https://fobes.in/jobs', 'fobes://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        DetailedScreen: {
          path: '/:slug',
        },
      },
    },
  };

  useEffect(() => {
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

    getUserData();
  }, [dispatch]);

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      try {
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        // navigation.navigate('DetailedScreen', { slug });
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    const handleInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          handleDeepLink({url: initialUrl});
        }
      } catch (error) {
        console.error('Error handling initial URL:', error);
      }
    };

    handleInitialUrl();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{swipeEnabled: false}}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailedScreen"
            component={DetailedScreen}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
const logAppOpen = async () => {
  await analytics().logAppOpen();
};

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyA8etAWCPn0ae48YZTYLpFmFZrZQGek-Sk',
    authDomain: 'fobes-94a68.appspot.com',
    projectId: 'fobes-94a68',
    appId: '1:375312400820:android:7025695b58018bc97832e1',
  };

  useEffect(() => {
    try {
      logAppOpen();
      console.log('Firebase ============ : ', firebase);
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (error) {
      console.log('catch in App :', error);
    }
  }, []);

  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );

  const getNotificationData = async () => {
    try {
      const notifyData = await fetchData.notification(null, token);
      if (notifyData) {
        setGetData(notifyData.data);
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };

  useEffect(() => {
    const notify = setInterval(() => {
      getNotificationData();
      unreadNotify();
    }, 2000);
    return () => {
      clearInterval(notify);
    };
  }, [getData, userData, notificationCount]);

  const unreadNotify = async () => {
    let unreadNotifications = getData.filter(
      notification => notification?.read_at == null,
    );
    // setUnreadCount(unreadNotifications.length);
    dispatch(setNotificationCount(unreadNotifications.length));
  };

  return (
    <>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardOne"
          component={OnboardOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardTwo"
          component={OnboardTwo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardThree"
          component={OnboardThree}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailedScreen"
          component={DetailedScreen}
          // options={({navigation, route}) => ({
          //   headerTitle: '',
          //   headerTitleStyle: {color: Color.black},
          //   headerStyle: {backgroundColor: Color.white},
          //   headerLeft: () => (
          //     <TouchableOpacity
          //       style={{marginHorizontal: 10}}
          //       onPress={() => navigation.goBack()}>
          //       <Iconviewcomponent
          //         Icontag={'Ionicons'}
          //         iconname={'arrow-back'}
          //         icon_size={30}
          //         icon_color={Color.black}
          //       />
          //     </TouchableOpacity>
          //   ),
          //   headerRight: () => (
          //     <TouchableOpacity style={{right: 10}}>
          //       <Iconviewcomponent
          //         Icontag={'AntDesign'}
          //         iconname={'sharealt'}
          //         icon_size={26}
          //         icon_color={Color.black}
          //       />
          //     </TouchableOpacity>
          //   ),
          // })}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Search Jobs',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
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
          name="SearchDataList"
          component={SearchDataList}
          options={({navigation, route}) => ({
            headerTitle: 'Jobs',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
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
          name="AppliedJobs"
          component={AppliedJobs}
          options={({navigation, route}) => ({
            headerTitle: 'Applied Jobs',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
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
          name="Notification"
          component={Notification}
          options={({navigation, route}) => ({
            headerTitle: 'Notification',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
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
          name="JobStatus"
          component={JobStatus}
          options={({navigation, route}) => ({
            headerTitle: 'Applied Jobs Status',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
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
          name="CompanyDetails"
          component={CompanyDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Company Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
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
          name="basicdetails"
          component={BasicDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Basic Details',
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
          name="Applycompletion"
          component={Applycompletion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterList"
          component={FilterListScreen}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.black},
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
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.black},
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
          name="PassOtpVerify"
          component={PassOtpVerify}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.black},
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
          name="ResetPass"
          component={ResetPass}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.black},
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
          name="TermsCondition"
          component={TermsCondition}
          options={({navigation, route}) => ({
            headerTitle: 'Terms & Conditions',
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
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
