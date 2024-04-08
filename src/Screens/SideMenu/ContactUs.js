//import liraries
import React, {Component, useEffect, useRef, useState} from 'react';
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

// create a component

const ContactUs = () => {
  const dispatch = useDispatch();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);

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
                  <View style={{width: scr_width}}>
                    <Image
                      source={{uri: Media.home_loan_bann}}
                      style={{
                        width: scr_width,
                        height: 220,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '100',
                      alignItems: 'center',
                    }}>
                    {/* <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                                            <Text
                                                style={{
                                                    width: '95%',
                                                    fontSize: 16,
                                                    color: Color.cloudyGrey,
                                                    fontFamily: 'Gilmer-SemiBold',
                                                    lineHeight: 25,
                                                    textAlign: 'justify'
                                                }}>
                                                For further queries, comments, or requests, please feel free to
                                            </Text>
                                        </View> */}
                    <View
                      style={{
                        width: '100%',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      {/* <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Gilmer-SemiBold' }}>Contact Us</Text> */}
                      <Text
                        style={{
                          width: '95%',
                          fontSize: 16,
                          color: '#666',
                          fontFamily: 'Gilmer-Regular',
                          paddingTop: 10,
                        }}>
                        For any other queries and feedback can reach us with
                        below address{' '}
                      </Text>

                      <TouchableOpacity
                        style={{
                          width: '95%',
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
                            fontFamily: 'Gilmer-SemiBold',
                            paddingHorizontal: 10,
                          }}>
                          +91 9943300100
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: '95%',
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
                            width: '95%',
                            fontSize: 18,
                            color: 'black',
                            fontFamily: 'Gilmer-SemiBold',
                            paddingHorizontal: 10,
                          }}>
                          admin@fobes.in
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        width: '95%',
                        paddingHorizontal: 10,
                        marginTop: 10,
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontFamily: 'Gilmer-SemiBold',
                        }}>
                        Registered Address:
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Gilmer-SemiBold',
                          lineHeight: 25,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        Level 5, Tamarai Tech Park,
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Gilmer-SemiBold',
                          lineHeight: 25,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        S.P. Plot No. 16-19 & 20 A,{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Gilmer-SemiBold',
                          lineHeight: 25,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        Thiru Vi Ka Industrial Estate, Inner Ring Road,{' '}
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Gilmer-SemiBold',
                          lineHeight: 25,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        Guindy, Chennai,
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Gilmer-SemiBold',
                          lineHeight: 25,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        Tamil Nadu, 600 032, India.
                      </Text>
                    </View>
                  </View>
                </View>
              );
            case 'How it works':
              return (
                <View
                  style={{
                    width: scr_width,
                    height: height,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Gilmer-SemiBold',
                        paddingHorizontal: 10,
                      }}>
                      Get In Touch
                    </Text>

                    <Text
                      style={{
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Gilmer-Regular',
                        padding: 5,
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
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Gilmer-Regular',
                        padding: 5,
                        marginTop: 10,
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
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        marginTop: 20,
                        fontFamily: 'Gilmer-Regular',
                        padding: 5,
                      }}>
                      Enter your Subjects
                    </Text>
                    <View style={[styles.incomeBoxConatiner, {width: '88%'}]}>
                      <TextInput
                        placeholder="Enter your Subjects"
                        placeholderTextColor={Color.grey}
                        value={''}
                        keyboardType="name-phone-pad"
                        maxLength={10}
                        onChangeText={text => {
                          // setIncome(text);
                          console.log('text --------- :', text);
                        }}
                        style={styles.numberTextBox}
                      />
                    </View>

                    <Text
                      style={{
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        marginTop: 20,
                        fontFamily: 'Gilmer-Regular',
                        padding: 5,
                      }}>
                      Enter your Message
                    </Text>
                    <View style={{width: '88%'}}>
                      <TextInput
                        placeholder="Enter your Message ..."
                        placeholderTextColor={Color.cloudyGrey}
                        value={''}
                        textAlignVertical="top"
                        onChangeText={text => {
                          console.log('message ============= :', text);
                        }}
                        // onContentSizeChange={event => {
                        //   setCardHeight(
                        //     Math.max(150, event.nativeEvent.contentSize.height),
                        //   );
                        // }}
                        multiline
                        style={{
                          fontSize: 15,
                          flex: 1,
                          color: Color.black,
                          padding: 10,
                          height: 150,
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
                        width: '88%',
                        height: 50,
                        marginVertical: 10,
                        backgroundColor: Color.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Text style={{fontSize: 16, color: 'white'}}>
                        Send Message
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 30,
                      marginBottom: 50,
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: Media.fobes_main}}
                        style={{
                          width: '100%',
                          height: 60,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 18,
                          color: Color.primary,
                          fontFamily: 'Gilmer-SemiBold',
                        }}>
                        Fobes Skill Itech Private Limited
                      </Text>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Gilmer-Regular',
                        }}>
                        You are hired! Get yourself registered. The top
                        companies in the league are hiring now.
                      </Text>
                    </View>
                  </View>
                </View>
              );
          }
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  NumberBoxConatiner: {
    width: '88%',
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
    width: '88%',
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
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Gilmer-SemiBold',
    color: Color.red,
  },
});

//make this component available to the app
export default ContactUs;
