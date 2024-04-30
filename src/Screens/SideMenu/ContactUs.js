import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  UIManager,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {scr_width} from '../../Utils/Dimensions';
import {useDispatch} from 'react-redux';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Gilmer} from '../../Global/FontFamily';

const ContactUs = () => {
  let listOffset = useRef({});
  let listRefArr = useRef([]);
  let isListGliding = useRef(false);
  const [tabIndex, setIndex] = useState(0);

  const [routes] = useState([
    {id: 1, title: 'Buy'},
    {id: 2, title: 'Rent'},
    {id: 3, title: 'Rent'},
    {id: 4, title: 'Rent'},
    {id: 5, title: 'Rent'},
  ]);
  const [BuySection] = useState([
    {
      id: 1,
      title: 'Apply Albion Home Online',
      data: ['Apply Albion Home Online'],
    },
    {id: 3, title: 'How it works', data: ['How it works']},
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, []);

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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: Media.contactUs}}
          style={{
            width: '100%',
            height: 220,
            resizeMode: 'contain',
          }}
        />
        <View style={{}}>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#666',
                fontFamily: Gilmer.Medium,
                paddingTop: 10,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={20}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                }}>
                +91 9943300100
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={20}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                }}>
                admin@fobes.in
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: Gilmer.Medium,
              }}>
              Registered Address:
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingTop: 10,
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Level 5, Tamarai Tech Park,
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              S.P. Plot No. 16-19 & 20 A,{' '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Thiru Vi Ka Industrial Estate, Inner Ring Road,{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Guindy, Chennai,
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Tamil Nadu, 600 032, India.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Gilmer.Bold,
            }}>
            Get In Touch
          </Text>

          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                padding: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Enter Your Name
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor={Color.grey}
                value={''}
                keyboardType="name-phone-pad"
                maxLength={10}
                onChangeText={text => {
                  console.log('text --------- :', text);
                }}
                style={styles.numberTextBox}
              />
            </View>
            {/* <Text style={styles.invalidLogin}>{error}</Text> */}

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                padding: 5,
                marginTop: 20,
                fontFamily: Gilmer.Medium,
              }}>
              Enter Your E-mail
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={Color.grey}
                value={''}
                keyboardType="email-address"
                maxLength={10}
                onChangeText={text => {
                  console.log('text --------- :', text);
                }}
                style={styles.numberTextBox}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginTop: 20,
                padding: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Enter your Subjects
            </Text>
            <View style={[styles.incomeBoxConatiner]}>
              <TextInput
                placeholder="Enter your Subjects"
                placeholderTextColor={Color.grey}
                value={''}
                keyboardType="name-phone-pad"
                maxLength={10}
                onChangeText={text => {
                  console.log('text --------- :', text);
                }}
                style={styles.numberTextBox}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginTop: 20,
                padding: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Enter your Message
            </Text>
            <TextInput
              placeholder="Enter your Message ..."
              placeholderTextColor={Color.cloudyGrey}
              value={''}
              textAlignVertical="top"
              onChangeText={text => {
                console.log('message ============= :', text);
              }}
              multiline
              style={{
                fontSize: 15,
                color: Color.black,
                padding: 10,
                height: 150,
                width: '100%',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                marginVertical: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
              backgroundColor: Color.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
            marginBottom: 50,
          }}>
          <Image
            source={require('../../assets/logos/fobes.png')}
            style={{
              height: 50,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 18,
                color: Color.primary,
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              Fobes Skill Itech Private Limited
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                paddingVertical: 5,
                color: '#666',
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              You are hired! Get yourself registered. The top companies in the
              league are hiring now.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  NumberBoxConatiner: {
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  incomeBoxConatiner: {
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  numberTextBox: {
    width: '100%',
    height: 50,
    color: Color.black,
    fontSize: 16,
    fontFamily: 'Gilmer-Regular',
  },
  invalidLogin: {
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Gilmer-SemiBold',
    color: Color.red,
  },
});

export default ContactUs;
