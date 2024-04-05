import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {ApplyJobData} from '../../Global/Content';
import JobItemCard from '../../Components/JobItemCard';

const JobListScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={ApplyJobData}
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
