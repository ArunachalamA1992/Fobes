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
import { navigationRef } from '../RootNavigation';
import DetailedScreen from './Screens/Home/DetailedScreen';
import { Iconviewcomponent } from './Components/Icontag';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  // useEffect(() => {
  //   const handleInitialUrl = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     if (initialUrl) {
  //       const reviewMatch = initialUrl.match(/\/review\/(\d+)/);
  //       if (reviewMatch) {
  //         const p_id = reviewMatch[1];
  //         navigationRef.current?.navigate('SingleProperty', { p_id });
  //       }
  //     }
  //   };

  //   handleInitialUrl();
  // }, []);

  // useEffect(() => {
  //   const handleDeepLink = ({ url }) => {
  //     // Parse the URL and navigate to the appropriate screen
  //     // Example: /review/456
  //     const reviewMatch = url.match(/\/review\/(\d+)/);
  //     if (reviewMatch) {
  //       const p_id = reviewMatch[1];
  //       navigationRef.current?.navigate('SingleProperty', { p_id });
  //     }
  //   };

  //   const subscription = Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     // Remove the event listener when the component unmounts
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
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
      <Stack.Navigator initialRouteName="Splash">
        {/* Property Screens */}
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
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
