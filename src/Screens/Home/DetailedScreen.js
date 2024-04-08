import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
  ScrollView,
  Animated,
} from 'react-native';

import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Media} from '../../Global/Media';
import {Iconviewcomponent} from '../../Components/Icontag';
import {ApplyJobData} from '../../Global/Content';
import JobItemCard from '../../Components/JobItemCard';

LogBox.ignoreAllLogs();

const IconData = ({item}) => {
  const formattedItem = item.replace(/_/g, '').toLowerCase();
  console.log('formattedItem', formattedItem);
  switch (formattedItem) {
    case 'experience':
      return (
        <Iconviewcomponent
          Icontag={'FontAwesome'}
          iconname={'briefcase'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
    case 'salary':
      return (
        <Iconviewcomponent
          Icontag={'Entypo'}
          iconname={'wallet'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
    case 'location':
      return (
        <Iconviewcomponent
          Icontag={'FontAwesome5'}
          iconname={'map-marker-alt'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
    case 'vacancies':
      return (
        <Iconviewcomponent
          Icontag={'MaterialCommunityIcons'}
          iconname={'chair-rolling'}
          icon_size={30}
          icon_color={Color.primary}
        />
      );
  }
};
const DetailedScreen = ({navigation, route}) => {
  const [itemData] = useState(route?.params?.item);
  const scrollY = useRef(new Animated.Value(0)).current;

  const taby = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateRight: 'clamp',
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1, padding: 10}}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <Image
          source={Media.user}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: Color.black,
            fontFamily: Gilmer.Bold,
            paddingHorizontal: 10,
          }}>
          {itemData?.job_name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CompanyDetails');
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            {itemData?.job_comp_name}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View
            style={{
              backgroundColor: '#DEFCE4',
              padding: 5,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.green,
                fontFamily: Gilmer.Medium,
              }}>
              {itemData?.job_type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Iconviewcomponent
              Icontag={'Ionicons'}
              iconname={'time-outline'}
              icon_size={20}
              icon_color={Color.Venus}
            />
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                paddingHorizontal: 5,
                fontFamily: Gilmer.Medium,
              }}>
              {itemData?.job_type}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          {itemData?.features?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#EFFAFF',
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <IconData item={item?.title} />
                <View style={{marginHorizontal: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Gilmer.Regular,
                      paddingHorizontal: 5,
                    }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Gilmer.Bold,
                      paddingHorizontal: 5,
                    }}>
                    {item?.value}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Job Description
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              marginHorizontal: 10,
              marginVertical: 10,
              fontFamily: Gilmer.Medium,
              lineHeight: 25,
            }}>
            {itemData?.description}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Qualifications
          </Text>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {itemData?.qualification?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Octicons'}
                    iconname={'dot-fill'}
                    icon_size={15}
                    icon_color={Color.black}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                        paddingHorizontal: 5,
                      }}>
                      {item?.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Roles and Responsibilities
          </Text>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {itemData?.roles_responsibility?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Octicons'}
                    iconname={'dot-fill'}
                    icon_size={15}
                    icon_color={Color.black}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                        paddingHorizontal: 5,
                      }}>
                      {item?.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Key Benifits
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {itemData?.key_benifits?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#DEFCE4',
                    paddingHorizontal: 10,
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      marginHorizontal: 5,
                      fontFamily: Gilmer.SemiBold,
                    }}>
                    {item?.benefit_data}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Job Overview
          </Text>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              backgroundColor: '#EDF9FF',
              padding: 10,
              borderRadius: 10,
            }}>
            {itemData?.overview?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                  }}>
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                      }}>
                      {item?.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Medium,
                        marginVertical: 5,
                      }}>
                      {item?.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            About Company
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              marginHorizontal: 10,
              marginVertical: 10,
              fontFamily: Gilmer.Medium,
              lineHeight: 25,
            }}>
            {itemData?.about_company}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Phone
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              marginHorizontal: 10,
              marginVertical: 10,
              fontFamily: Gilmer.Medium,
              lineHeight: 25,
            }}>
            {itemData?.number}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Email
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              marginHorizontal: 10,
              marginVertical: 10,
              fontFamily: Gilmer.Medium,
              lineHeight: 25,
            }}>
            {itemData?.email}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Address
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              marginHorizontal: 10,
              marginVertical: 10,
              fontFamily: Gilmer.Medium,
              lineHeight: 25,
            }}>
            {itemData?.address}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
            }}>
            Recruiter Details
          </Text>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              source={{
                uri: 'https://play-lh.googleusercontent.com/Jplgjxv_1k2B1iHy41wIMWfbBwpsjqlt2gvCwxhwQ-ujokUFtDCCYXrPaiiWn2pIwwY',
              }}
              style={{
                width: 60,
                height: 60,
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: Color.black,
                  fontFamily: Gilmer.Medium,
                }}>
                {itemData?.recruiter_deatils?.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.lightBlack,
                  fontFamily: Gilmer.Medium,
                  marginVertical: 10,
                }}>
                {itemData?.recruiter_deatils?.position}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 10,
            }}>
            Similar Jobs
          </Text>

          <FlatList
            data={ApplyJobData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              return <JobItemCard item={item} navigation={navigation} />;
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // opacity: headerOpacity,
          padding: 10,
          backgroundColor: Color.softGrey,
          transform: [{translateY: taby}],
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Iconviewcomponent
              Icontag={'FontAwesome'}
              iconname={'bookmark'}
              icon_size={25}
              icon_color={Color.cloudyGrey}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ApplyJob')}
            style={{
              flex: 1,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginHorizontal: 10,
              backgroundColor: Color.primary,
            }}>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                color: Color.white,
              }}>
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  numberCountryCode: {
    height: 48,
    color: Color.black,
    fontSize: 16,
    fontFamily: Gilmer.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
});

export default DetailedScreen;
