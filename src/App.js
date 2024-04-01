import React, { useEffect, useState } from 'react';
import {
  LogBox,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Text,
  Pressable,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { Provider as PaperProvider } from 'react-native-paper';
import OnboardOne from './Screens/Onboarding/OnboardOne';
import OnboardTwo from './Screens/Onboarding/OnboardTwo';
import OnboardThree from './Screens/Onboarding/OnboardThree';
import Color from './Global/Color';
import TabNavigator, { Auth } from './route';
import SplashScreen from './SplashScreen';
import Store from './Redux/Store';
import DetailedScreen from './Screens/Home/DetailedScreen';
import { Iconviewcomponent } from './Components/Icontag';
import {navigationRef} from '../RootNavigation';
import AppliedJobs from './Screens/Home/Jobs/AppliedJobs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Media} from './Global/Media';
import JobStatus from './Screens/Home/Jobs/JobStatus';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ swipeEnabled: false }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{ headerShown: false }}
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
  const [height, setHeight] = useState(undefined);
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
      <Stack.Navigator initialRouteName="TabNavigator">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardOne"
          component={OnboardOne}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardTwo"
          component={OnboardTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardThree"
          component={OnboardThree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailedScreen"
          component={DetailedScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Detailed Screen',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.goBack()}>
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
              <TouchableOpacity style={{ right: 10 }}>
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
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
