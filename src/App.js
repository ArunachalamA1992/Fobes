import React from 'react';
import {LogBox, StatusBar, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import {Provider} from 'react-redux';

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
import Applycompletion from './Screens/SubPages/Applycompletion';
import BasicDetails from './Screens/Profile/BasicDetails';
import SearchScreen from './Screens/Home/SearchScreen';
import DetailedScreen from './Screens/Home/DetailedScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{swipeEnabled: false}}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
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
          options={({navigation, route}) => ({
            headerTitle: 'Detailed Screen',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => navigation.goBack()}>
                {/* <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                /> */}
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'arrow-back'}
                  icon_size={30}
                  icon_color={Color.white}
                />
              </TouchableOpacity>
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
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
