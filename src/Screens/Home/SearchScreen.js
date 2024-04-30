import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Button, Searchbar} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import {Gilmer} from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import {base_image_url} from '../../Config/base_url';
import {Iconviewcomponent} from '../../Components/Icontag';

const SearchScreen = ({navigation}) => {
  const [searchJob, setSearchJob] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [TopCompany, setTopCompany] = useState([]);
  const [recentSearch] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [MostSearch] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);

  const getData = useCallback(async () => {
    try {
      var data = `page_number=1`;
      const top_company_list = await fetchData.list_company(data, token);
      if (top_company_list) {
        setTopCompany(top_company_list?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [token]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar
          placeholder="Search Jobs, Companies"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={searchJob}
          iconColor={Color.grey}
          inputStyle={{color: Color.black}}
          onChangeText={search => setSearchJob(search)}
        />
        <Searchbar
          placeholder="Search Location"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={searchLocation}
          icon={() => (
            <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
          )}
          iconColor={Color.grey}
          inputStyle={{color: Color.black}}
          onChangeText={search => setSearchLocation(search)}
        />

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
          <Text style={{fontSize: 16, color: Color.white}}>Search</Text>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Bold,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              Recent Search
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.primary,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              Clear All
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {recentSearch.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#9DCBE250',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor: '#9DCBE2',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            Most Popular Searches
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {MostSearch.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#9DCBE250',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor: '#9DCBE2',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            Top Companies
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {TopCompany.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 180,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: Color.white,
                      borderWidth: 0.5,
                      marginVertical: 10,
                      padding: 10,
                      margin: 5,
                      borderRadius: 10,
                      elevation: 1,
                      backgroundColor: '#EFFAFF',
                    }}>
                    <Image
                      source={{uri: base_image_url + item?.logo}}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: 'contain',
                        borderRadius: 100,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Bold,
                        paddingVertical: 5,
                      }}>
                      {item?.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Iconviewcomponent
                        Icontag={'Fontisto'}
                        iconname={'map-marker-alt'}
                        icon_size={20}
                        icon_color={Color.Venus}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.Venus,
                          fontFamily: Gilmer.Medium,
                          paddingHorizontal: 5,
                        }}>
                        {item?.district}
                      </Text>
                    </View>
                    {/* <Text
                      style={{
                        fontSize: 16,
                        color: Color.primary,
                        fontFamily: Gilmer.Medium,
                        textDecorationLine: 'underline',
                        paddingVertical: 5,
                      }}>
                      {item.comp_offer_count} Jobs Open
                    </Text> */}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginVertical: 10,
  },
});
