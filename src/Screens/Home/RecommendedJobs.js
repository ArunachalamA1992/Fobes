import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native';
import Color from '../../Global/Color';
import JobItemCard from '../../Components/JobItemCard';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gilmer} from '../../Global/FontFamily';

const {height} = Dimensions.get('window');

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
                  No Recommended Jobs Found
                </Text>
              </View>
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
