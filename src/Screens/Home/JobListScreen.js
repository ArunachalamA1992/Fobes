import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Color from '../../Global/Color';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import { useSelector } from 'react-redux';

const JobListScreen = ({ navigation }) => {
  const [jobData, setJobData] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  useEffect(() => {
    getData();
  }, [token]);

  const getData = async () => {
    try {
      const job_list = await fetchData.list_jobs(null, token);
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
      var data = 'page_number=' + nextPage;
      const response = await fetchData.list_company(data, token);
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
      <FlatList
        data={jobData}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <JobItemCard item={item} navigation={navigation} token={token} getData={getData} />
          );
        }}
        onEndReached={() => {
          loadMoreData();
        }}
        onEndReachedThreshold={3}
      />
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

export default JobListScreen;
