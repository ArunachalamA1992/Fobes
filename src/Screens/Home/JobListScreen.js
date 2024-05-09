import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, Dimensions} from 'react-native';
import Color from '../../Global/Color';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gilmer} from '../../Global/FontFamily';

const {height} = Dimensions.get('window');
const JobListScreen = ({navigation, route}) => {
  const [index] = useState(route.params.index);
  const [jobData, setJobData] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().finally(() => setLoading(false));
  }, [token]);

  const getData = async () => {
    try {
      var data = `job_type_id=` + index;
      const job_list = await fetchData.filter_job(data, token);
      setJobData(job_list?.data);
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
      var data = 'page=' + nextPage;
      const response = await fetchData.filter_job(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...jobData, ...response?.data];
        setJobData(updatedData);
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
          data={jobData}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
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
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={3}
        />
      )}
    </View>
  );
};

export default JobListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});
