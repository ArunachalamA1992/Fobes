import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';
import { Media } from '../../Global/Media';
import { Iconviewcomponent } from '../../Components/Icontag';
import { ApplyJobData } from '../../Global/Content';
import { JobCardHorizontal } from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { base_image_url } from '../../Config/base_url';
import { Linking } from 'react-native';

const CompanyDetails = ({ navigation, route }) => {
  const [itemData] = useState(route?.params?.item);
  const [jobData, setJobData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const job_list = await fetchData.list_jobs(null, token);
      setJobData(job_list?.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={{}}>
          <Image
            source={{
              uri: base_image_url + itemData?.banner,
            }}
            style={{
              width: '100%',
              height: 150,
              resizeMode: 'contain', borderColor: Color.white, borderWidth: 0.2
            }}
          />

          <View
            style={{
              width: 80,
              height: 80,
              position: 'absolute',
              top: 90,
              marginHorizontal: 10,
              elevation: 2,
              padding: 5,
              backgroundColor: Color.white,
              borderRadius: 100,
            }}>
            <Image
              source={{
                uri: base_image_url + itemData?.logo,
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 30, padding: 10 }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
            }}>
            {itemData?.vision.replace(/<[^>]+>/g, '')}
            {/* Business Development Executive */}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              marginVertical: 5,
              paddingVertical: 10,
            }}>
            {itemData?.name}
            {/* Avanexa Technologies */}
          </Text>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Iconviewcomponent
              Icontag={'FontAwesome'}
              iconname={'star'}
              icon_size={20}
              icon_color={Color.sunShade}
            />
            <Text
              style={{
                fontSize: 12,
                color: Color.black,
                fontFamily: Gilmer.Medium,
                paddingHorizontal: 5,
              }}>
              4.5 (500+ reviews)
            </Text>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingVertical: 20,
                backgroundColor: '#EFFAFF',
                borderRadius: 10,
                marginHorizontal: 5,
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'home-city-outline'}
                icon_size={36}
                icon_color={Color.primary}
              />
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.primary,
                    fontFamily: Gilmer.Bold,
                  }}>
                  {itemData?.origanization_type?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.secondary,
                    fontFamily: Gilmer.Medium,
                  }}
                  numberOfLines={2}>
                  origanization type
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingVertical: 20,
                backgroundColor: '#EFFAFF',
                borderRadius: 10,
                marginHorizontal: 5,
              }}>
              <Iconviewcomponent
                Icontag={'FontAwesome'}
                iconname={'users'}
                icon_size={36}
                icon_color={Color.primary}
              />
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.primary,
                    fontFamily: Gilmer.Bold,
                  }}>
                  {itemData?.team_size?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.secondary,
                    fontFamily: Gilmer.Medium,
                  }}
                  numberOfLines={2}>
                  Employees
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ padding: 10 }}>
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
            {itemData?.bio.replace(/<[^>]+>/g, '')}
          </Text>
          <View style={{ padding: 5 }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Phone
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                }}>
                {itemData?.phone}
              </Text>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Email
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                }}>
                {itemData?.email}
              </Text>
            </View>
            {itemData?.website === null &&
              itemData?.website === 'null' &&
              itemData?.website === '' ? null : (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    paddingHorizontal: 5,
                  }}>
                  Website
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 25,
                  }}>
                  {itemData?.website}
                </Text>
              </View>
            )}

            <View style={{ marginVertical: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                }}>
                {itemData?.exact_location}
              </Text>
            </View>

            {itemData?.social_links === null ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    paddingHorizontal: 5,
                  }}>
                  Follow Us
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingVertical: 10,
                  }}>
                  {itemData?.social_links.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          Linking.openURL(item?.url);
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 5,
                        }}>
                        <Iconviewcomponent
                          Icontag={'Entypo'}
                          iconname={item?.social_media}
                          icon_size={22}
                          icon_color={Color.blue}
                        />
                      </TouchableOpacity>
                    );
                  })}

                  {/* <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'linkedin'}
                    icon_size={22}
                    icon_color={Color.blue}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Fontisto'}
                    iconname={'facebook'}
                    icon_size={22}
                    icon_color={Color.blue}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'youtube'}
                    icon_size={22}
                    icon_color={Color.blue}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'instagram'}
                    icon_size={22}
                    icon_color={Color.blue}
                  />
                </TouchableOpacity> */}
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Current Openings
            </Text>
          </View>
          <FlatList
            data={jobData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => {
              return (
                <JobCardHorizontal
                  item={item}
                  navigation={navigation}
                  token={token}
                  getData={getData}
                />
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default CompanyDetails;
