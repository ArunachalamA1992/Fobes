import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Color from '../../Global/Color';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';

const JobListScreen = ({navigation}) => {
  const [jobData, setJobData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

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
    <View style={styles.container}>
      <FlatList
        data={jobData}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <JobItemCard item={item} navigation={navigation} />;
        }}
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
