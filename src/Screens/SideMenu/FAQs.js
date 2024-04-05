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

const FAQs = () => {
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
                  <View style={{width: '97%'}}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          width: '95%',
                          fontSize: 18,
                          color: Color.black,
                          fontFamily: 'Gilmer-SemiBold',
                          textAlign: 'justify',
                        }}>
                        Candidates FAQs
                      </Text>
                    </View>

                    <View style={{width: '95%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          1
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          How is Fobes different from other traditional portals?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Traditional hiring is long, expensive, and
                          inefficient. Fobes simplifies the process by
                          connecting employers directly with job seekers with
                          relevant skills and experience.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '95%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          2
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          How can I get the best company from your portal?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Fobes has over 5000 active companies across 70+ job
                          categories. Our AI algorithm selects the best-fit
                          company for your resume.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '95%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          3
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          Do I need to pay to apply to a job or get an Interview
                          call?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          No. You can apply to jobs for FREE on Fobes.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '95%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          4
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          Recruiters are asking me to pay to schedule interview
                          for job?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Note that genuine recruiters do not ask for money to
                          schedule interviews or offer a job. If you are
                          receiving such calls or emails, beware as this might
                          be a job scam.
                        </Text>
                      </View>
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
                      Recruiters FAQs
                    </Text>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          5
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          Why is my job being under a review?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          We promise to endeavor that your job is made active at
                          the earliest. Few job approval decisions can take up
                          to 1 day due to a delay in verifying your account.
                          Until your account KYC gets completed, your jobs will
                          remain under review.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          6
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          Why the documents are required?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Most job portals do not verify if someone is using
                          your name or your company’s name to list jobs and
                          defraud job seekers. Often times it affects the
                          company’s reputation as an employer in the market. But
                          on Fobes we verify the identity of the recruiter and
                          their association with the company before their job
                          post is active on the platform.{' '}
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          7
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          How do I post a job?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          To post a job you must be logged in to the employer
                          dashboard with your mobile number.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Under "Jobs" Menu, click on Post a Job and fill in the
                          job criteria.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          On the Job Details page, select your Job role,
                          Department, Category of the job, and type of job.{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          You can also select the job location, compensation and
                          salary range from this page.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          On the Candidate Requirements page, select the minimum
                          education level, total experience, the job titles of
                          the candidates and the English level that are required
                          for the job.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          In Additional Requirements, you can add age, gender,
                          skills, regional language, degree, assets and industry
                          preferences required for the job, if any, and your job
                          description.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          On the Interviewer information page, select the
                          interviewer details, interview method, and interview
                          address, and select communication preferences on how
                          you want to contact the candidates.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Preview your job thoroughly as these are the details
                          applicants will see before applying.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Select a plan and Agree to our employer code of
                          conduct and click on Post Job with xxx plans.
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          If you do not have sufficient balance in your employer
                          account, you may be prompted get subscription plans.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          8
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          How long will it take for my job to go live?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          We assure you that we will make every effort to
                          activate your job as soon as possible. Please note
                          that certain job approval decisions may take up to 1
                          day due to a delay in verifying your account. Your
                          jobs will remain under review until your account's KYC
                          verification is completed. If your KYC verification is
                          not pending. You can also contact our customer support
                          on WhatsApp ( xxxxxxxxxxxxx ) from 9 am to 6 pm every
                          day.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          9
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          What is the meaning of unlimited applications?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Unlimited job applications refer to a feature that
                          allows you to receive an unrestricted number of
                          applications from potential candidates for your job
                          posting. There are no limitations or restrictions
                          placed on the number of applications you can receive.
                          10. How can I boost my job? What is Smart Boost Via
                          WhatsApp? To boost your job, you can upgrade to the
                          Premium plan and post your job using that plan.
                          Boosting is not available for jobs posted with the
                          Classic plan. By boosting your job, you can enhance
                          its visibility and attract a larger pool of qualified
                          candidates.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          10
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          What is job branding?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Job branding refers to the process of creating a
                          unique and compelling image for a particular job. It
                          involves positioning the job in a way that sets it
                          apart from similar roles and attracts qualified
                          candidates.
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '100%', marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          11
                        </Text>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            textAlign: 'justify',
                            marginHorizontal: 10,
                            fontFamily: 'Gilmer-SemiBold',
                          }}>
                          How can I contact Fobes customer care?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 25,
                            fontFamily: 'Gilmer-Regular',
                          }}>
                          Call or WhatsApp: 9385245210,9385245296.
                        </Text>
                      </View>
                    </View>
                  </View>

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
                      }}>
                      Contact Us
                    </Text>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: '#666',
                        fontFamily: 'Gilmer-Regular',
                        paddingTop: 10,
                      }}>
                      For any other queries and feedback can reach us with below
                      address{' '}
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
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                          borderColor: Color.primary,
                          borderWidth: 1,
                        }}>
                        <Iconviewcomponent
                          Icontag={'Feather'}
                          iconname={'phone-call'}
                          icon_size={22}
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
                        +91 994-330-0100
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
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                          borderColor: Color.primary,
                          borderWidth: 1,
                        }}>
                        <Iconviewcomponent
                          Icontag={'Ionicons'}
                          iconname={'mail'}
                          icon_size={22}
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
export default FAQs;
