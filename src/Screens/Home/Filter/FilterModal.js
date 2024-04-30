import React from 'react';
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../../Global/Color';
import {Gilmer} from '../../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import VerticalTabView from '../../../Components/VerticalTabView';

const FilterModal = props => {
  var {setFilterVisible, filterVisible, navigation} = props;
  return (
    <Modal visible={filterVisible} transparent animationType="slide">
      <View style={{flex: 1, backgroundColor: Color.transparantBlack}}>
        <Pressable
          onPress={() => {
            setFilterVisible(false);
          }}
          style={{flex: 1}}
        />
        <View
          style={{
            flex: 3,
            backgroundColor: Color.white,
            // padding: 10,
            paddingTop: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                paddingHorizontal: 10,
                color: Color.primary,
                fontFamily: Gilmer.Medium,
              }}>
              All Filter
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFilterVisible(false);
              }}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Color.lightgrey,
                borderRadius: 10,
              }}>
              <Icon name="close" size={20} color={Color.white} />
            </TouchableOpacity>
          </View>
          <VerticalTabView navigation={navigation} visible={filterVisible}/>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
