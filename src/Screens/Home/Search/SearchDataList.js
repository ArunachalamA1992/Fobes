import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Divider, Searchbar} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Color from '../../../Global/Color';
import fetchData from '../../../Config/fetchData';
import {FlatList} from 'react-native';
import JobItemCard from '../../../Components/JobItemCard';
import {Gilmer} from '../../../Global/FontFamily';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {height} = Dimensions.get('screen');

const SearchDataList = ({navigation, route}) => {
  const [searchLocation, setSearchLocation] = useState(route.params.location);
  const [type, setType] = useState(route.params.type);
  const [searchJob, setSearchJob] = useState(route.params.jobs);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState({
    data: [],
    visible: false,
  });
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
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
      setLoading(true);
      var data = `place=${searchLocation}&${type}=${searchJob}`;
      const job_list = await fetchData.filter_job(data, token);
      setJobData(job_list?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [searchLocation, searchJob, type, token]);

  useEffect(() => {
    getData();
  }, [token]);

  const handleSearch = async () => {
    try {
      const data = `string=${searchJob}`;
      const getData = await fetchData.add_search(data, token);
      setSearchModalVisible(false);
      getData();
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const propertySearch = async data => {
    setSearchJob(data);
    try {
      const data = `search=${searchJob}&page=1&limit=10`;
      const getData = await fetchData.search(data, token);
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
      const filterData = await fetchData.search(data, token);
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

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <TouchableOpacity
        onPress={() => setSearchModalVisible(true)}
        activeOpacity={0.7}
        style={{
          width: '100%',
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 50,
          marginBottom: 10,
          borderColor: Color.lightgrey,
          borderWidth: 1,
        }}>
        <FIcon name="search" size={18} color={Color.cloudyGrey} />
        <Text
          style={{
            fontSize: 16,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Medium,
            marginHorizontal: 10,
          }}
          numberOfLines={1}>
          {`jobs for ${searchJob}, ${searchLocation}`}
        </Text>
      </TouchableOpacity>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item width="100%" height={150} />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          <FlatList
            data={jobData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => {
              return (
                <JobItemCard
                  item={item}
                  navigation={navigation}
                  token={token}
                  getData={getData}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: height / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    width: '100%',
                  }}>
                  <MCIcon
                    name="briefcase-variant-off"
                    color={Color.primary}
                    size={20}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      padding: 5,
                      paddingHorizontal: 20,
                      marginStart: 5,
                      borderRadius: 5,
                      marginVertical: 10,
                      color: Color.primary,
                      fontFamily: Gilmer.Bold,
                    }}>
                    No Company Found
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <Modal
            visible={isSearchModalVisible}
            transparent={true}
            animationType={'fade'}>
            <Pressable
              style={{
                backgroundColor: Color.transparantBlack,
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
              onPress={() => setSearchModalVisible(false)}
            />
            <View style={styles.searchModal}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Gilmer.Medium,
                  color: Color.cloudyGrey,
                  marginVertical: 5,
                }}>
                Enter Skills ,designation
              </Text>
              <Searchbar
                placeholder="Search Jobs, Companies"
                placeholderTextColor={Color.grey}
                style={styles.searchView}
                value={searchJob}
                iconColor={Color.grey}
                inputStyle={{color: Color.black}}
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
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            console.log('item', item);
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
                            <Divider style={{height: 1, marginVertical: 5}} />
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

              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Gilmer.Medium,
                  color: Color.cloudyGrey,
                  marginVertical: 5,
                }}>
                Enter Location
              </Text>
              <Searchbar
                placeholder="Search Location"
                placeholderTextColor={Color.grey}
                style={styles.searchView}
                value={searchLocation}
                icon={() => (
                  <F6Icon
                    name="location-dot"
                    size={20}
                    color={Color.lightgrey}
                  />
                )}
                iconColor={Color.grey}
                inputStyle={{color: Color.black}}
                onChangeText={search => setSearchLocation(search)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setSearchModalVisible(false);
                  }}
                  style={styles.searchButton}>
                  cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    handleSearch();
                  }}
                  style={styles.searchButton}>
                  Search
                </Button>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default SearchDataList;

const styles = StyleSheet.create({
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginBottom: 10,
  },
  searchModal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    padding: 20,
  },
  searchButton: {
    marginVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: Color.primary,
  },
});
