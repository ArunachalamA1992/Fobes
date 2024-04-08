import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Color from '../Config/Color';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Gilmer} from '../Global/FontFamily';

const CheckboxData = ({label, checked, onPress}) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <MCIcon
        name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={25}
        color={!checked ? Color.cloudyGrey : '#309CD2'}
      />
      <Text style={styles.TextData}>{label}</Text>
    </TouchableOpacity>
  );
};

export const RadioData = ({label, checked, onPress}) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <Icon
        name={!checked ? 'radio-button-off' : 'radio-button-on'}
        size={25}
        color={!checked ? Color.cloudyGrey : '#309CD2'}
      />
      <Text style={styles.TextData}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#000',
  },
  TextData: {
    // flex: 1,
    fontSize: 14,
    color: Color.black,
    marginHorizontal: 10,
    fontFamily: Gilmer.Medium,
  },
});

export default CheckboxData;
