import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../../../Global/Color';
import JobItemCard from '../../../Components/JobItemCard';
import {FlatList} from 'react-native';
import fetchData from '../../../Config/fetchData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gilmer} from '../../../Global/FontFamily';
import {ActivityIndicator} from 'react-native-paper';

const {height} = Dimensions.get('window');
const FilterListScreen = ({navigation, route}) => {
  const [itemData] = useState(route?.params?.item);
  const [filterJobData, setFilterJobData] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  useEffect(() => {
    getDataAPI();
  }, []);

  const getDataAPI = async () => {
    try {
      setLoading(true);
      var data = itemData;
      const response = await fetchData.filter_job(data, token);
      setFilterJobData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      const updatedData = itemData.replace(/page=\d+/, `page=${nextPage}`);
      const response = await fetchData.filter_job(updatedData, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const mergedData = [...filterJobData, ...response?.data];
        setFilterJobData(mergedData);
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
    <View style={styles.container}>
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
        <FlatList
          data={filterJobData}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <JobItemCard item={item} navigation={navigation} token={token} />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: height / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  width: '100%',
                }}>
                <MCIcon
                  name="briefcase-variant-off"
                  color={Color.primary}
                  size={25}
                />
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    paddingHorizontal: 20,
                    marginStart: 5,
                    borderRadius: 5,
                    marginVertical: 10,
                    color: Color.primary,
                    fontFamily: Gilmer.Bold,
                  }}>
                  No Jobs Found
                </Text>
              </View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {loadMore && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.black,
                        marginHorizontal: 10,
                        fontFamily: Gilmer.Medium,
                      }}>
                      Loading...
                    </Text>
                    <ActivityIndicator />
                  </View>
                )}
              </View>
            );
          }}
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});

export default FilterListScreen;
