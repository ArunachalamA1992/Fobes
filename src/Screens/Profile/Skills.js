import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Poppins} from '../../Global/FontFamily';
import {Dropdown} from 'react-native-element-dropdown';
import {Button} from 'react-native-paper';

const SkillScreen = ({navigation}) => {
  const [SkillsData] = useState([
    {
      id: 1,
      name: 'React Native',
    },
    {
      id: 2,
      name: 'Ui/UX designer',
    },
    {
      id: 3,
      name: 'Figma',
    },
    {
      id: 4,
      name: 'Node js',
    },
    {
      id: 5,
      name: 'Java',
    },
    {
      id: 6,
      name: 'Dart',
    },
    {
      id: 7,
      name: 'Mobile Application Developer',
    },
  ]);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [SkillsSelectedItem, setSkillsSelectedItem] = useState([]);

  const handleSkillsPress = itemId => {
    if (SkillsSelectedItem.includes(itemId)) {
      setSkillsSelectedItem(
        SkillsSelectedItem?.filter(single => single !== itemId),
      );
      setSelectedSkill(selectedSkill?.filter(single => single.id !== itemId));
    } else {
      setSkillsSelectedItem([...SkillsSelectedItem, itemId]);
      const selectedItemData = SkillsData.find(single => single.id === itemId);
      setSelectedSkill([...selectedSkill, selectedItemData]);
    }
  };
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <View style={{marginVertical: 10}}>
        <Text
          style={{
            fontSize: 16,
            color: Color.black,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Your Job Title
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={SkillsData}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'Select item'}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            handleSkillsPress(item?.id);
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FIcon name={'star'} size={16} color={'#FAE52F'} />
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            Add 4 to 6 Skills to get best job recommednations
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderColor: Color.cloudyGrey,
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}>
        {selectedSkill?.length == 0 ? (
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              marginHorizontal: 5,
              fontFamily: Poppins.SemiBold,
              lineHeight: 20,
            }}>
            To receive the best employment recommendations, add four to six
            skills.
          </Text>
        ) : (
          selectedSkill?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#9DCBE2',
                  paddingHorizontal: 10,
                  padding: 10,
                  borderRadius: 50,
                  marginRight: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginHorizontal: 5,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  {item?.name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleSkillsPress(item?.id);
                  }}>
                  <FIcon name={'close'} size={16} color={Color.primary} />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>
      <View style={{marginVertical: 10}}>
        <View
          style={{
            backgroundColor: Color.white,
            paddingEnd: 10,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.black,
              fontWeight: 'bold',
              marginHorizontal: 5,
            }}>
            Select the Suggested skills based on your education
          </Text>
          {SkillsData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: SkillsSelectedItem.includes(item.id)
                    ? '#9DCBE2'
                    : Color.white,
                  // width: width / 3.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  // height: 60,
                  padding: 10,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderColor: SkillsSelectedItem.includes(item.id)
                    ? Color.primary
                    : Color.lightgrey,
                  borderWidth: 1,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  handleSkillsPress(item?.id);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontWeight: 'bold',
                    marginHorizontal: 5,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Profile');
        }}
        style={{
          backgroundColor: Color.primary,
          marginVertical: 10,
        }}
        labelStyle={{
          fontSize: 18,
        }}
        textColor={Color.white}>
        Continue
      </Button>
    </View>
  );
};

export default SkillScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
