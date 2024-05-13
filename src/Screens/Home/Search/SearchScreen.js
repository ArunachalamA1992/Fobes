import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import { Button, Searchbar } from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import { Gilmer } from '../../../Global/FontFamily';
import fetchData from '../../../Config/fetchData';
import { useSelector } from 'react-redux';
import { base_image_url } from '../../../Config/base_url';
import { Iconviewcomponent } from '../../../Components/Icontag';
import { Divider } from 'react-native-elements';
import common_fn from '../../../Config/common_fn';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const [searchJob, setSearchJob] = useState('');
  const [type, setType] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [TopCompany, setTopCompany] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState({
    data: [],
    visible: false,
  });
  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });

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
      var data = `page=1`;
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

  const propertySearch = async data => {
    setSearchJob(data);
    try {
      const data = `search=${searchJob}&page=1&limit=10`;
      const getData = await fetchData.search(data);
      setJobSuggestions({
        data: getData?.data?.keyword,
        visible: true,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = `search=${searchJob}&page=${nextPage}&limit=10`;
      const filterData = await fetchData.search(data);
      if (filterData.length > 0) {
        setPage(nextPage);
        const updatedData = [...jobSuggestions, ...filterData];
        setJobSuggestions(updatedData);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  const getSearchData = async () => {
    try {
      if (searchJob != '' && searchLocation != '') {
        const data = `string=${searchJob}`;
        const getData = await fetchData.add_search(data, token);
        navigation.navigate('SearchDataList', {
          location: searchLocation,
          jobs: searchJob,
          type: type,
        });
      } else {
        common_fn.showToast('Please select the Job and Location');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSuggestions = async text => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&city=${text}`,
      );
      setLocationSuggestion({
        data: response?.data,
        visible: true,
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <Searchbar
        placeholder="Search Jobs, Companies"
        placeholderTextColor={Color.grey}
        style={styles.searchView}
        value={searchJob}
        iconColor={Color.grey}
        inputStyle={{ color: Color.black }}
        onChangeText={search => propertySearch(search)}
      />
      {jobSuggestions?.visible == true && (
        <View
          style={{
            maxHeight: 200,
            padding: 10,
            backgroundColor: Color.white,
            elevation: 3,
            borderRadius: 5,
            marginTop: 5,
          }}>
          <FlatList
            data={jobSuggestions?.data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchJob(item?.keyword);
                    setType(item?.type);
                    setJobSuggestions({
                      data: [],
                      visible: false,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Gilmer.Medium,
                      color: Color.black,
                    }}>
                    {item?.keyword}
                  </Text>
                  {index < jobSuggestions?.data.length - 1 && (
                    <Divider style={{ height: 1, marginVertical: 5 }} />
                  )}
                </TouchableOpacity>
              );
            }}
            onEndReached={() => {
              loadMoreData();
            }}
            onEndReachedThreshold={3}
          />
        </View>
      )}

      <Searchbar
        placeholder="Search Location"
        placeholderTextColor={Color.grey}
        style={styles.searchView}
        value={searchLocation}
        icon={() => (
          <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
        )}
        iconColor={Color.grey}
        inputStyle={{ color: Color.black }}
        onChangeText={search => {
          setSearchLocation(search);
          fetchSuggestions(search);
        }}
      />
      {LocationSuggestion?.data?.length != 0 && (
        <View
          style={{
            maxHeight: 200,
            padding: 10,
            backgroundColor: Color.white,
            elevation: 3,
            borderRadius: 5,
            marginTop: 5,
          }}>
          {LocationSuggestion?.data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSearchLocation(item?.display_name?.split(',')[0]);
                  setLocationSuggestion({
                    data: [],
                    visible: false,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Gilmer.Medium,
                    color: Color.black,
                  }}>
                  {item?.display_name?.split(',')[0]}
                </Text>
                {index < LocationSuggestion?.data.length - 1 && (
                  <Divider style={{ height: 1, marginVertical: 5 }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: '100%',
          height: 40,
          marginVertical: 10,
          backgroundColor: Color.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
        onPress={() => {
          getSearchData();
        }}>
        <Text style={{ fontSize: 16, color: Color.white }}>Search</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Bold,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
              }}>
              Recent Search
            </Text>
            <TouchableOpacity onPress={() => {
              setSearchJob(""),
              setSearchLocation("")
            }}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.primary,
                  textTransform: 'capitalize',
                  marginHorizontal: 5,
                }}>
                Clear All
              </Text>
            </TouchableOpacity>
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
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
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
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
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
                    onPress={() => {
                      navigation.navigate('CompanyDetails', {
                        item: item,
                      });
                    }}
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
                    {item?.logo == null ? (
                      <Image
                        source={require('../../../assets/logos/user.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                          borderRadius: 100,
                          backgroundColor: Color.softGrey,
                          borderWidth: 0.5,
                          borderColor: Color.lightgrey,
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: base_image_url + item?.logo }}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                          borderRadius: 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Bold,
                        paddingVertical: 5,
                        textTransform: 'capitalize',
                      }}
                      numberOfLines={1}>
                      {item?.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
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
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.primary,
                        fontFamily: Gilmer.Medium,
                        textDecorationLine: 'underline',
                        paddingVertical: 5,
                      }}>
                      {item?.openings?.[0]?.vacancies} Jobs Open
                    </Text>
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
    marginTop: 10,
  },
});
