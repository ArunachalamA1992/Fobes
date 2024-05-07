import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Color from '../../Global/Color';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RecommendedListScreen = ({navigation}) => {
  const [jobData, setJobData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().finally(() => setLoading(false));
  }, [token]);

  const getData = async () => {
    try {
      const job_list = await fetchData.recommended_jobs(null, token);
      setJobData(job_list?.data);
    } catch (error) {
      console.log('error', error);
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
        />
      )}
    </View>
  );
};

export default RecommendedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});
